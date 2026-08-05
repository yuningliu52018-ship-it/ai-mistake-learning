(() => {
  const input = document.getElementById('paperInput');
  const workspace = document.getElementById('scanWorkspace');
  const canvas = document.getElementById('paperCanvas');
  const ctx = canvas.getContext('2d');
  const paperName = document.getElementById('paperName');
  const detectedList = document.getElementById('detectedList');
  const clearBtn = document.getElementById('clearMarksBtn');

  let image = null;
  let boxes = [];
  let dragStart = null;
  let draftBox = null;
  let dragging = false;

  canvas.draggable = false;

  function eventPoint(event) {
    const source = event.touches?.[0] || event.changedTouches?.[0] || event;
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(canvas.width, (source.clientX - rect.left) * (canvas.width / rect.width))),
      y: Math.max(0, Math.min(canvas.height, (source.clientY - rect.top) * (canvas.height / rect.height)))
    };
  }

  function normalizeBox(start, end) {
    return {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y)
    };
  }

  function draw() {
    if (!image) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.lineWidth = Math.max(3, canvas.width / 350);
    ctx.font = `${Math.max(18, canvas.width / 35)}px sans-serif`;

    boxes.forEach((box, index) => {
      ctx.strokeStyle = '#dc2626';
      ctx.fillStyle = 'rgba(220,38,38,.12)';
      ctx.fillRect(box.x, box.y, box.width, box.height);
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      ctx.fillStyle = '#dc2626';
      ctx.fillText(String(index + 1), box.x + 8, box.y + 28);
    });

    if (draftBox) {
      ctx.strokeStyle = '#2563eb';
      ctx.fillStyle = 'rgba(37,99,235,.16)';
      ctx.fillRect(draftBox.x, draftBox.y, draftBox.width, draftBox.height);
      ctx.strokeRect(draftBox.x, draftBox.y, draftBox.width, draftBox.height);
    }
  }

  function cropDataUrl(box) {
    const crop = document.createElement('canvas');
    crop.width = Math.max(1, Math.round(box.width));
    crop.height = Math.max(1, Math.round(box.height));
    crop.getContext('2d').drawImage(image, box.x, box.y, box.width, box.height, 0, 0, crop.width, crop.height);
    return crop.toDataURL('image/jpeg', 0.86);
  }

  function renderDetected() {
    if (!boxes.length) {
      detectedList.innerHTML = '<div class="empty compact">尚未框選錯題。請在考卷圖片上按住滑鼠左鍵拖曳。</div>';
      return;
    }
    detectedList.innerHTML = boxes.map((box, index) => `
      <article class="detected-item">
        <img src="${cropDataUrl(box)}" alt="錯題裁切 ${index + 1}" />
        <div class="detected-body">
          <h3>錯題 ${index + 1}</h3>
          <label>題號<input class="detected-number" data-index="${index}" placeholder="例如：23" /></label>
          <div class="detected-actions">
            <button type="button" data-action="remove" data-index="${index}">刪除此框</button>
            <button type="button" class="primary" data-action="add" data-index="${index}">加入錯題資料庫</button>
          </div>
        </div>
      </article>`).join('');
  }

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) return alert('請選擇圖片檔案。');
    const reader = new FileReader();
    reader.onload = () => {
      const nextImage = new Image();
      nextImage.onload = () => {
        image = nextImage;
        boxes = [];
        const scale = Math.min(1, 1500 / image.naturalWidth);
        canvas.width = Math.round(image.naturalWidth * scale);
        canvas.height = Math.round(image.naturalHeight * scale);
        paperName.textContent = file.name;
        workspace.classList.remove('hidden');
        draw();
        renderDetected();
        workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      nextImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function startDrag(event) {
    if (!image || (event.button !== undefined && event.button !== 0)) return;
    event.preventDefault();
    dragging = true;
    dragStart = eventPoint(event);
    draftBox = { x: dragStart.x, y: dragStart.y, width: 0, height: 0 };
    draw();
  }

  function moveDrag(event) {
    if (!dragging || !dragStart) return;
    event.preventDefault();
    draftBox = normalizeBox(dragStart, eventPoint(event));
    draw();
  }

  function endDrag(event) {
    if (!dragging || !dragStart) return;
    event.preventDefault();
    const box = normalizeBox(dragStart, eventPoint(event));
    dragging = false;
    dragStart = null;
    draftBox = null;
    if (box.width >= 20 && box.height >= 20) boxes.push(box);
    draw();
    renderDetected();
  }

  input.addEventListener('change', (event) => loadFile(event.target.files[0]));

  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointermove', moveDrag, { passive: false });
    window.addEventListener('pointerup', endDrag, { passive: false });
    window.addEventListener('pointercancel', endDrag, { passive: false });
  } else {
    canvas.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);
    canvas.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('touchend', endDrag, { passive: false });
  }

  clearBtn.addEventListener('click', () => {
    boxes = [];
    draw();
    renderDetected();
  });

  detectedList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const index = Number(button.dataset.index);
    if (!Number.isInteger(index) || !boxes[index]) return;
    if (button.dataset.action === 'remove') {
      boxes.splice(index, 1);
      draw();
      renderDetected();
      return;
    }
    const numberInput = detectedList.querySelector(`.detected-number[data-index="${index}"]`);
    document.getElementById('addBtn').click();
    document.getElementById('subject').value = '自然';
    document.getElementById('number').value = numberInput?.value.trim() || '';
    document.getElementById('question').value = '請依照裁切的考卷圖片補上完整題目。';
    document.getElementById('correctAnswer').value = '待確認';
    document.getElementById('mistake').value = '由考卷照片框選加入，尚待分析錯誤原因。';
    document.getElementById('tags').value = '考卷匯入, 待整理';
  });

  renderDetected();
})();