(() => {
  const input = document.getElementById('paperInput');
  const workspace = document.getElementById('scanWorkspace');
  const viewport = document.getElementById('annotationViewport');
  const paperName = document.getElementById('paperName');
  const detectedList = document.getElementById('detectedList');
  const drawModeBtn = document.getElementById('drawModeBtn');
  const selectModeBtn = document.getElementById('selectModeBtn');
  const deleteBoxBtn = document.getElementById('deleteBoxBtn');
  const clearBoxesBtn = document.getElementById('clearBoxesBtn');

  let stage = null;
  let layer = null;
  let transformer = null;
  let imageNode = null;
  let sourceImage = null;
  let boxes = [];
  let selectedRect = null;
  let drawingRect = null;
  let drawStart = null;
  let mode = 'draw';

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);
  }

  function setMode(nextMode) {
    mode = nextMode;
    drawModeBtn.classList.toggle('primary', mode === 'draw');
    selectModeBtn.classList.toggle('primary', mode === 'select');
    if (stage) stage.container().style.cursor = mode === 'draw' ? 'crosshair' : 'default';
    boxes.forEach((item) => item.rect.draggable(mode === 'select'));
    if (mode === 'draw') selectRect(null);
    layer?.draw();
  }

  function selectRect(rect) {
    selectedRect = rect;
    transformer.nodes(rect ? [rect] : []);
    layer?.draw();
  }

  function normalizedRect(rect) {
    const scaleX = rect.scaleX();
    const scaleY = rect.scaleY();
    const width = Math.max(1, rect.width() * scaleX);
    const height = Math.max(1, rect.height() * scaleY);
    rect.scale({ x: 1, y: 1 });
    rect.size({ width, height });
    return { x: rect.x(), y: rect.y(), width, height };
  }

  function cropRect(rect) {
    const box = normalizedRect(rect);
    const scaleX = sourceImage.naturalWidth / imageNode.width();
    const scaleY = sourceImage.naturalHeight / imageNode.height();
    const sx = Math.max(0, Math.round(box.x * scaleX));
    const sy = Math.max(0, Math.round(box.y * scaleY));
    const sw = Math.min(sourceImage.naturalWidth - sx, Math.round(box.width * scaleX));
    const sh = Math.min(sourceImage.naturalHeight - sy, Math.round(box.height * scaleY));

    const canvas = document.createElement('canvas');
    const maxSide = 1400;
    const outputScale = Math.min(1, maxSide / Math.max(sw, sh));
    canvas.width = Math.max(1, Math.round(sw * outputScale));
    canvas.height = Math.max(1, Math.round(sh * outputScale));
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sourceImage, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.84);
  }

  function renderDetected() {
    if (!boxes.length) {
      detectedList.innerHTML = '<div class="empty compact">尚未框選錯題。選擇「畫新框」，在考卷上拖曳即可。</div>';
      return;
    }

    detectedList.innerHTML = boxes.map((item, index) => `
      <article class="detected-item">
        <img src="${cropRect(item.rect)}" alt="錯題 ${index + 1}" />
        <div class="detected-body">
          <h3>錯題 ${index + 1}</h3>
          <label>科目<select class="detected-subject" data-index="${index}">
            ${['國文','英文','數學','自然','社會'].map((subject) => `<option ${subject === item.subject ? 'selected' : ''}>${subject}</option>`).join('')}
          </select></label>
          <label>題號<input class="detected-number" data-index="${index}" value="${escapeHtml(item.number)}" placeholder="例如：23" /></label>
          <div class="detected-actions">
            <button type="button" data-action="focus" data-index="${index}">定位此框</button>
            <button type="button" data-action="remove" data-index="${index}">刪除此框</button>
            <button type="button" class="primary" data-action="add" data-index="${index}">加入錯題資料庫</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function addBox(rect) {
    rect.on('click tap', (event) => {
      event.cancelBubble = true;
      if (mode === 'select') selectRect(rect);
    });
    rect.on('dragend transformend', () => {
      normalizedRect(rect);
      renderDetected();
    });
    boxes.push({ rect, subject: '自然', number: '' });
    layer.add(rect);
    renderDetected();
  }

  function setupStage(image) {
    viewport.innerHTML = '<div id="annotationStage"></div>';
    const maxWidth = Math.min(1000, viewport.clientWidth || 1000);
    const displayScale = Math.min(1, maxWidth / image.naturalWidth);
    const width = Math.round(image.naturalWidth * displayScale);
    const height = Math.round(image.naturalHeight * displayScale);

    stage = new Konva.Stage({ container: 'annotationStage', width, height });
    layer = new Konva.Layer();
    stage.add(layer);
    imageNode = new Konva.Image({ image, x: 0, y: 0, width, height, listening: false });
    layer.add(imageNode);

    transformer = new Konva.Transformer({
      rotateEnabled: false,
      keepRatio: false,
      enabledAnchors: ['top-left','top-center','top-right','middle-left','middle-right','bottom-left','bottom-center','bottom-right'],
      anchorSize: 12,
      borderStrokeWidth: 2,
      boundBoxFunc: (oldBox, newBox) => newBox.width < 24 || newBox.height < 20 ? oldBox : newBox
    });
    layer.add(transformer);

    stage.on('mousedown touchstart', (event) => {
      if (mode !== 'draw' || event.target !== stage) return;
      const pos = stage.getPointerPosition();
      drawStart = pos;
      drawingRect = new Konva.Rect({
        x: pos.x, y: pos.y, width: 1, height: 1,
        stroke: '#dc2626', strokeWidth: 3, fill: 'rgba(220,38,38,.10)', draggable: false
      });
      layer.add(drawingRect);
    });

    stage.on('mousemove touchmove', () => {
      if (!drawingRect || !drawStart) return;
      const pos = stage.getPointerPosition();
      drawingRect.setAttrs({
        x: Math.min(drawStart.x, pos.x),
        y: Math.min(drawStart.y, pos.y),
        width: Math.abs(pos.x - drawStart.x),
        height: Math.abs(pos.y - drawStart.y)
      });
      layer.batchDraw();
    });

    stage.on('mouseup touchend', () => {
      if (!drawingRect) return;
      const rect = drawingRect;
      drawingRect = null;
      drawStart = null;
      if (rect.width() < 24 || rect.height() < 20) {
        rect.destroy();
      } else {
        addBox(rect);
      }
      layer.draw();
    });

    stage.on('click tap', (event) => {
      if (mode === 'select' && event.target === stage) selectRect(null);
    });

    setMode('draw');
    layer.draw();
  }

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) return alert('請選擇圖片檔案。');
    boxes = [];
    selectedRect = null;
    renderDetected();
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        sourceImage = image;
        paperName.textContent = file.name;
        workspace.classList.remove('hidden');
        setupStage(image);
        workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  input.addEventListener('change', (event) => {
    loadFile(event.target.files?.[0]);
    input.value = '';
  });
  drawModeBtn.addEventListener('click', () => setMode('draw'));
  selectModeBtn.addEventListener('click', () => setMode('select'));
  deleteBoxBtn.addEventListener('click', () => {
    if (!selectedRect) return alert('請先用「選取調整」點選一個框。');
    const index = boxes.findIndex((item) => item.rect === selectedRect);
    if (index >= 0) boxes.splice(index, 1);
    selectedRect.destroy();
    selectRect(null);
    renderDetected();
  });
  clearBoxesBtn.addEventListener('click', () => {
    if (!boxes.length || !confirm('確定清除全部框選嗎？')) return;
    boxes.forEach((item) => item.rect.destroy());
    boxes = [];
    selectRect(null);
    renderDetected();
  });

  detectedList.addEventListener('input', (event) => {
    const index = Number(event.target.dataset.index);
    const item = boxes[index];
    if (!item) return;
    if (event.target.classList.contains('detected-number')) item.number = event.target.value;
    if (event.target.classList.contains('detected-subject')) item.subject = event.target.value;
  });

  detectedList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const index = Number(button.dataset.index);
    const item = boxes[index];
    if (!item) return;

    if (button.dataset.action === 'focus') {
      setMode('select');
      selectRect(item.rect);
      viewport.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (button.dataset.action === 'remove') {
      item.rect.destroy();
      boxes.splice(index, 1);
      selectRect(null);
      renderDetected();
      return;
    }
    if (button.dataset.action === 'add') {
      if (typeof window.openQuestionFromCrop !== 'function') return alert('錯題表單尚未載入，請重新整理後再試。');
      window.openQuestionFromCrop({
        image: cropRect(item.rect), subject: item.subject, number: item.number,
        question: `【考卷框選圖片】請補上第 ${item.number || '　'} 題完整題目。`,
        correctAnswer: '待確認', mistake: '由考卷照片框選匯入，尚待分析錯誤原因。',
        concept: '待整理', knowledge: '待分類', explanation: '待完成詳細解答。',
        tags: ['考卷匯入', '待整理']
      });
    }
  });

  renderDetected();
})();