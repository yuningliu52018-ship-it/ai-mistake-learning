(() => {
  const input = document.getElementById('paperInput');
  const workspace = document.getElementById('scanWorkspace');
  const imageEl = document.getElementById('paperImage');
  const paperName = document.getElementById('paperName');
  const detectedList = document.getElementById('detectedList');
  const captureBtn = document.getElementById('captureCropBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const rotateLeftBtn = document.getElementById('rotateLeftBtn');
  const rotateRightBtn = document.getElementById('rotateRightBtn');
  const resetBtn = document.getElementById('resetCropBtn');

  let cropper = null;
  let croppedQuestions = [];
  let currentObjectUrl = null;

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);
  }

  function renderDetected() {
    if (!croppedQuestions.length) {
      detectedList.innerHTML = '<div class="empty compact">尚未裁切錯題。調整裁切框後，按「裁切此題」。</div>';
      return;
    }

    detectedList.innerHTML = croppedQuestions.map((item, index) => `
      <article class="detected-item">
        <img src="${item.image}" alt="錯題裁切 ${index + 1}" />
        <div class="detected-body">
          <h3>錯題 ${index + 1}</h3>
          <label>科目
            <select class="detected-subject" data-index="${index}">
              ${['國文', '英文', '數學', '自然', '社會'].map((subject) =>
                `<option ${subject === item.subject ? 'selected' : ''}>${subject}</option>`
              ).join('')}
            </select>
          </label>
          <label>題號<input class="detected-number" data-index="${index}" value="${escapeHtml(item.number || '')}" placeholder="例如：23" /></label>
          <div class="detected-actions">
            <button type="button" data-action="remove" data-index="${index}">刪除裁切</button>
            <button type="button" class="primary" data-action="add" data-index="${index}">加入錯題資料庫</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function destroyCropper() {
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
  }

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('請選擇圖片檔案。');
      return;
    }

    destroyCropper();
    croppedQuestions = [];
    renderDetected();

    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(file);
    imageEl.src = currentObjectUrl;
    paperName.textContent = file.name;
    workspace.classList.remove('hidden');

    imageEl.onload = () => {
      if (typeof Cropper === 'undefined') {
        alert('圖片裁切元件載入失敗，請確認網路連線後重新整理。');
        return;
      }

      cropper = new Cropper(imageEl, {
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.45,
        background: false,
        responsive: true,
        restore: false,
        guides: true,
        center: true,
        highlight: true,
        movable: true,
        rotatable: true,
        scalable: true,
        zoomable: true,
        zoomOnWheel: true,
        zoomOnTouch: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        minCropBoxWidth: 80,
        minCropBoxHeight: 60
      });

      workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  input.addEventListener('change', (event) => {
    loadFile(event.target.files?.[0]);
    input.value = '';
  });

  captureBtn.addEventListener('click', () => {
    if (!cropper) {
      alert('請先選擇考卷照片。');
      return;
    }

    const cropCanvas = cropper.getCroppedCanvas({
      maxWidth: 1200,
      maxHeight: 1200,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
      fillColor: '#ffffff'
    });

    if (!cropCanvas || cropCanvas.width < 30 || cropCanvas.height < 30) {
      alert('裁切範圍太小，請重新調整。');
      return;
    }

    croppedQuestions.push({
      id: crypto.randomUUID(),
      image: cropCanvas.toDataURL('image/jpeg', 0.82),
      number: '',
      subject: '自然'
    });

    renderDetected();
    detectedList.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  rotateLeftBtn.addEventListener('click', () => cropper?.rotate(-90));
  rotateRightBtn.addEventListener('click', () => cropper?.rotate(90));
  zoomInBtn.addEventListener('click', () => cropper?.zoom(0.1));
  zoomOutBtn.addEventListener('click', () => cropper?.zoom(-0.1));
  resetBtn.addEventListener('click', () => cropper?.reset());

  detectedList.addEventListener('change', (event) => {
    const index = Number(event.target.dataset.index);
    const item = croppedQuestions[index];
    if (!item) return;
    if (event.target.classList.contains('detected-number')) item.number = event.target.value;
    if (event.target.classList.contains('detected-subject')) item.subject = event.target.value;
  });

  detectedList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const index = Number(button.dataset.index);
    const item = croppedQuestions[index];
    if (!Number.isInteger(index) || !item) return;

    if (button.dataset.action === 'remove') {
      croppedQuestions.splice(index, 1);
      renderDetected();
      return;
    }

    const number = detectedList.querySelector(`.detected-number[data-index="${index}"]`)?.value.trim() || '';
    const subject = detectedList.querySelector(`.detected-subject[data-index="${index}"]`)?.value || '自然';

    if (typeof window.openQuestionFromCrop !== 'function') {
      alert('錯題表單尚未載入，請重新整理頁面後再試。');
      return;
    }

    window.openQuestionFromCrop({
      image: item.image,
      subject,
      number,
      question: `【考卷裁切圖片】請補上第 ${number || '　'} 題完整題目。`,
      correctAnswer: '待確認',
      mistake: '由考卷照片裁切匯入，尚待分析錯誤原因。',
      concept: '待整理',
      knowledge: '待分類',
      explanation: '待完成詳細解答。',
      tags: ['考卷匯入', '待整理']
    });
  });

  window.addEventListener('beforeunload', () => {
    destroyCropper();
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  });

  renderDetected();
})();