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
  let zoom = 1;
  let spacePressed = false;
  let panning = false;
  let panStart = null;
  let history = [];
  let historyIndex = -1;
  let restoringHistory = false;

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getBoxData(item) {
    const rect = item.rect;
    normalizeRect(rect);
    return {
      x: rect.x(), y: rect.y(), width: rect.width(), height: rect.height(),
      subject: item.subject, number: item.number
    };
  }

  function saveHistory() {
    if (restoringHistory || !stage) return;
    const snapshot = JSON.stringify(boxes.map(getBoxData));
    if (history[historyIndex] === snapshot) return;
    history = history.slice(0, historyIndex + 1);
    history.push(snapshot);
    if (history.length > 50) history.shift();
    historyIndex = history.length - 1;
  }

  function restoreHistory(index) {
    if (index < 0 || index >= history.length || !stage) return;
    restoringHistory = true;
    boxes.forEach((item) => item.rect.destroy());
    boxes = [];
    selectRect(null);
    JSON.parse(history[index]).forEach((data) => createBox(data, false));
    historyIndex = index;
    restoringHistory = false;
    layer.draw();
    renderDetected();
  }

  function undo() { restoreHistory(historyIndex - 1); }
  function redo() { restoreHistory(historyIndex + 1); }

  function setMode(nextMode) {
    mode = nextMode;
    drawModeBtn.classList.toggle('primary', mode === 'draw');
    selectModeBtn.classList.toggle('primary', mode === 'select');
    boxes.forEach((item) => item.rect.draggable(mode === 'select'));
    if (mode === 'draw') selectRect(null);
    updateCursor();
    layer?.draw();
  }

  function updateCursor() {
    if (!stage) return;
    stage.container().style.cursor = spacePressed ? (panning ? 'grabbing' : 'grab') : mode === 'draw' ? 'crosshair' : 'default';
  }

  function selectRect(rect) {
    selectedRect = rect;
    transformer?.nodes(rect ? [rect] : []);
    layer?.draw();
  }

  function normalizeRect(rect) {
    const width = Math.max(1, rect.width() * rect.scaleX());
    const height = Math.max(1, rect.height() * rect.scaleY());
    rect.scale({ x: 1, y: 1 });
    rect.size({ width, height });
    rect.position({
      x: clamp(rect.x(), 0, Math.max(0, imageNode.width() - width)),
      y: clamp(rect.y(), 0, Math.max(0, imageNode.height() - height))
    });
  }

  function cropRect(rect) {
    normalizeRect(rect);
    const scaleX = sourceImage.naturalWidth / imageNode.width();
    const scaleY = sourceImage.naturalHeight / imageNode.height();
    const sx = Math.max(0, Math.round(rect.x() * scaleX));
    const sy = Math.max(0, Math.round(rect.y() * scaleY));
    const sw = Math.max(1, Math.min(sourceImage.naturalWidth - sx, Math.round(rect.width() * scaleX)));
    const sh = Math.max(1, Math.min(sourceImage.naturalHeight - sy, Math.round(rect.height() * scaleY)));
    const canvas = document.createElement('canvas');
    const outputScale = Math.min(1, 1400 / Math.max(sw, sh));
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
      </article>`).join('');
  }

  function createBox(data, recordHistory = true) {
    const rect = new Konva.Rect({
      x: data.x, y: data.y, width: data.width, height: data.height,
      stroke: '#dc2626', strokeWidth: 3 / zoom, fill: 'rgba(220,38,38,.10)',
      draggable: mode === 'select',
      dragBoundFunc: (pos) => ({
        x: clamp(pos.x, 0, imageNode.width() - rect.width()),
        y: clamp(pos.y, 0, imageNode.height() - rect.height())
      })
    });
    const item = { rect, subject: data.subject || '自然', number: data.number || '' };
    rect.on('click tap', (event) => {
      event.cancelBubble = true;
      if (mode === 'select' && !spacePressed) selectRect(rect);
    });
    rect.on('dragend transformend', () => {
      normalizeRect(rect);
      saveHistory();
      renderDetected();
    });
    boxes.push(item);
    layer.add(rect);
    transformer.moveToTop();
    if (recordHistory) saveHistory();
    return rect;
  }

  function applyZoom(nextZoom, clientX, clientY) {
    if (!stage) return;
    const oldZoom = zoom;
    zoom = clamp(nextZoom, 0.5, 3.5);
    if (zoom === oldZoom) return;
    const rect = viewport.getBoundingClientRect();
    const px = clientX ?? rect.left + viewport.clientWidth / 2;
    const py = clientY ?? rect.top + viewport.clientHeight / 2;
    const contentX = (viewport.scrollLeft + px - rect.left) / oldZoom;
    const contentY = (viewport.scrollTop + py - rect.top) / oldZoom;
    stage.scale({ x: zoom, y: zoom });
    stage.size({ width: imageNode.width() * zoom, height: imageNode.height() * zoom });
    boxes.forEach((item) => item.rect.strokeWidth(3 / zoom));
    transformer.anchorSize(12 / zoom);
    transformer.borderStrokeWidth(2 / zoom);
    layer.draw();
    viewport.scrollLeft = contentX * zoom - (px - rect.left);
    viewport.scrollTop = contentY * zoom - (py - rect.top);
  }

  function setupStage(image) {
    viewport.innerHTML = '<div id="annotationStage"></div>';
    const maxWidth = Math.min(1000, viewport.clientWidth || 1000);
    const displayScale = Math.min(1, maxWidth / image.naturalWidth);
    const width = Math.round(image.naturalWidth * displayScale);
    const height = Math.round(image.naturalHeight * displayScale);
    zoom = 1;
    stage = new Konva.Stage({ container: 'annotationStage', width, height });
    layer = new Konva.Layer();
    stage.add(layer);
    imageNode = new Konva.Image({ image, x: 0, y: 0, width, height, listening: false });
    layer.add(imageNode);
    transformer = new Konva.Transformer({
      rotateEnabled: false, keepRatio: false,
      enabledAnchors: ['top-left','top-center','top-right','middle-left','middle-right','bottom-left','bottom-center','bottom-right'],
      anchorSize: 12, borderStrokeWidth: 2,
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < 24 || newBox.height < 20 || newBox.x < 0 || newBox.y < 0 || newBox.x + newBox.width > imageNode.width() || newBox.y + newBox.height > imageNode.height()) return oldBox;
        return newBox;
      }
    });
    layer.add(transformer);

    stage.on('mousedown touchstart', (event) => {
      if (spacePressed) return;
      if (mode !== 'draw' || event.target !== stage) return;
      const pos = stage.getRelativePointerPosition();
      drawStart = { x: clamp(pos.x, 0, width), y: clamp(pos.y, 0, height) };
      drawingRect = new Konva.Rect({ x: drawStart.x, y: drawStart.y, width: 1, height: 1, stroke: '#dc2626', strokeWidth: 3 / zoom, fill: 'rgba(220,38,38,.10)' });
      layer.add(drawingRect);
    });
    stage.on('mousemove touchmove', () => {
      if (!drawingRect || !drawStart) return;
      const pos = stage.getRelativePointerPosition();
      const x = clamp(pos.x, 0, width);
      const y = clamp(pos.y, 0, height);
      drawingRect.setAttrs({ x: Math.min(drawStart.x, x), y: Math.min(drawStart.y, y), width: Math.abs(x - drawStart.x), height: Math.abs(y - drawStart.y) });
      layer.batchDraw();
    });
    stage.on('mouseup touchend', () => {
      if (!drawingRect) return;
      const data = { x: drawingRect.x(), y: drawingRect.y(), width: drawingRect.width(), height: drawingRect.height(), subject: '自然', number: '' };
      drawingRect.destroy(); drawingRect = null; drawStart = null;
      if (data.width >= 24 && data.height >= 20) createBox(data);
      layer.draw(); renderDetected();
    });
    stage.on('click tap', (event) => {
      if (mode === 'select' && event.target === stage && !spacePressed) selectRect(null);
    });
    viewport.onwheel = (event) => {
      event.preventDefault();
      applyZoom(zoom * (event.deltaY < 0 ? 1.12 : 0.89), event.clientX, event.clientY);
    };
    viewport.onmousedown = (event) => {
      if (!spacePressed) return;
      event.preventDefault(); panning = true;
      panStart = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
      updateCursor();
    };
    window.addEventListener('mousemove', handlePanMove);
    window.addEventListener('mouseup', stopPanning);
    history = [JSON.stringify([])]; historyIndex = 0;
    setMode('draw'); layer.draw();
  }

  function handlePanMove(event) {
    if (!panning || !panStart) return;
    viewport.scrollLeft = panStart.left - (event.clientX - panStart.x);
    viewport.scrollTop = panStart.top - (event.clientY - panStart.y);
  }
  function stopPanning() { panning = false; panStart = null; updateCursor(); }

  function deleteSelected() {
    if (!selectedRect) return;
    const index = boxes.findIndex((item) => item.rect === selectedRect);
    if (index >= 0) boxes.splice(index, 1);
    selectedRect.destroy(); selectRect(null); saveHistory(); renderDetected();
  }

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) return alert('請選擇圖片檔案。');
    boxes = []; selectedRect = null; renderDetected();
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        sourceImage = image; paperName.textContent = file.name; workspace.classList.remove('hidden');
        setupStage(image); workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  input.addEventListener('change', (event) => { loadFile(event.target.files?.[0]); input.value = ''; });
  drawModeBtn.addEventListener('click', () => setMode('draw'));
  selectModeBtn.addEventListener('click', () => setMode('select'));
  deleteBoxBtn.addEventListener('click', () => selectedRect ? deleteSelected() : alert('請先用「選取調整」點選一個框。'));
  clearBoxesBtn.addEventListener('click', () => {
    if (!boxes.length || !confirm('確定清除全部框選嗎？')) return;
    boxes.forEach((item) => item.rect.destroy()); boxes = []; selectRect(null); saveHistory(); renderDetected();
  });

  window.addEventListener('keydown', (event) => {
    const tag = document.activeElement?.tagName;
    const editingText = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    if (event.code === 'Space' && !editingText) { event.preventDefault(); spacePressed = true; updateCursor(); }
    if (!editingText && (event.key === 'Delete' || event.key === 'Backspace')) { event.preventDefault(); deleteSelected(); }
    if (!editingText && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); }
    if (!editingText && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); redo(); }
  });
  window.addEventListener('keyup', (event) => { if (event.code === 'Space') { spacePressed = false; stopPanning(); } });
  window.addEventListener('blur', () => { spacePressed = false; stopPanning(); });

  detectedList.addEventListener('input', (event) => {
    const item = boxes[Number(event.target.dataset.index)];
    if (!item) return;
    if (event.target.classList.contains('detected-number')) item.number = event.target.value;
    if (event.target.classList.contains('detected-subject')) item.subject = event.target.value;
  });
  detectedList.addEventListener('change', saveHistory);
  detectedList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const index = Number(button.dataset.index); const item = boxes[index];
    if (!item) return;
    if (button.dataset.action === 'focus') { setMode('select'); selectRect(item.rect); viewport.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (button.dataset.action === 'remove') { item.rect.destroy(); boxes.splice(index, 1); selectRect(null); saveHistory(); renderDetected(); return; }
    if (button.dataset.action === 'add') {
      if (typeof window.openQuestionFromCrop !== 'function') return alert('錯題表單尚未載入，請重新整理後再試。');
      window.openQuestionFromCrop({ image: cropRect(item.rect), subject: item.subject, number: item.number, question: `【考卷框選圖片】請補上第 ${item.number || '　'} 題完整題目。`, correctAnswer: '待確認', mistake: '由考卷照片框選匯入，尚待分析錯誤原因。', concept: '待整理', knowledge: '待分類', explanation: '待完成詳細解答。', tags: ['考卷匯入', '待整理'] });
    }
  });

  renderDetected();
})();