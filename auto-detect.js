(() => {
  const input = document.getElementById('paperInput');
  const endpoint = window.AI_MISTAKE_CONFIG?.visionEndpoint;
  const section = document.getElementById('autoDetectPanel');
  const button = document.getElementById('autoDetectBtn');
  const results = document.getElementById('autoDetectResults');
  const workspace = document.getElementById('scanWorkspace');
  if (!input || !section || !button || !results) return;

  let pageImage = '';
  let storedPageImage = '';
  let detected = [];

  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c]);
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  function formatQuestion(item) {
    const lines = [item.question || ''];
    for (const key of ['A','B','C','D']) if (item.options?.[key]) lines.push(`(${key}) ${item.options[key]}`);
    return lines.filter(Boolean).join('\n');
  }

  function compressForStorage(dataUrl) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        const maxWidth = 900;
        const scale = Math.min(1, maxWidth / image.naturalWidth);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.62));
      };
      image.onerror = () => resolve('');
      image.src = dataUrl;
    });
  }

  function draftFromDetected(item) {
    const hasStudentAnswer = Boolean(String(item.studentAnswer || '').trim());
    return {
      image: storedPageImage,
      subject: item.subject || '待確認',
      chapter: item.chapter || '',
      number: item.questionNumber || '',
      questionType: item.questionType || '',
      difficulty: item.difficulty || 3,
      question: formatQuestion(item),
      correctAnswer: item.correctAnswer || '待確認',
      myAnswer: hasStudentAnswer ? item.studentAnswer : '待確認',
      mistake: hasStudentAnswer && item.mistake
        ? item.mistake
        : '尚未確認學生原答案與解題過程，請在桌機確認後再分析錯誤原因。',
      concept: item.concept || '待整理',
      knowledge: item.knowledge || '待分類',
      explanation: item.explanation || '待在桌機確認完整解析。',
      tags: ['整張考卷自動辨識', 'Gemini 自動找錯題', '保留原題圖片', ...(item.tags || [])]
    };
  }

  function render() {
    if (!detected.length) {
      results.innerHTML = '<div class="empty compact">尚未找到有明確批改證據的錯題。AI 漏題時可按下方「手動補一題」。</div>';
      return;
    }
    results.innerHTML = `
      <div class="auto-detect-head"><strong>Gemini 找到 ${detected.length} 題可能錯題</strong><button id="addDetectedBtn" class="primary" type="button">☁️ 上傳勾選題目</button></div>
      ${detected.map((item, index) => `
        <label class="auto-detected-item">
          <input type="checkbox" data-detected-index="${index}" checked />
          <span><strong>第 ${escapeHtml(item.questionNumber || '?')} 題｜${escapeHtml(item.subject || '待確認')}</strong><br>${escapeHtml(item.question || '').slice(0,220)}<br><small>學生答案：${escapeHtml(item.studentAnswer || '待確認')}｜正確答案：${escapeHtml(item.correctAnswer || '待確認')}｜信心值 ${Math.round(Number(item.confidence)||0)}%</small></span>
        </label>`).join('')}`;
  }

  function loadWholePageImage(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async () => {
      pageImage = String(reader.result || '');
      storedPageImage = await compressForStorage(pageImage);
      detected = [];
      section.classList.remove('hidden');
      if (document.documentElement.classList.contains('capture-mode') && workspace && !window.__manualFallbackOpen) workspace.classList.add('hidden');
      results.innerHTML = '<div class="empty compact">照片已載入。按「AI 自動找錯題」開始分析。</div>';
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    reader.readAsDataURL(file);
  }

  input.addEventListener('change', event => loadWholePageImage(event.target.files?.[0]), true);

  button.addEventListener('click', async () => {
    if (!pageImage) return alert('請先拍攝或選擇整張考卷。');
    if (!endpoint) return alert('尚未設定 Gemini API 網址。');
    const original = button.textContent;
    button.disabled = true;
    button.textContent = '🤖 正在找錯題…';
    results.innerHTML = '<div class="empty compact">Gemini 正在檢查整張考卷，請稍候。</div>';
    try {
      const response = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'detectMistakes', image:pageImage}) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.detail || payload.error || `HTTP ${response.status}`);
      detected = Array.isArray(payload.mistakes) ? payload.mistakes : [];
      render();
    } catch (error) {
      console.error(error);
      results.innerHTML = `<div class="empty compact">自動找錯題失敗：${escapeHtml(error.message)}</div>`;
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });

  results.addEventListener('click', async event => {
    if (event.target.id !== 'addDetectedBtn') return;
    if (typeof window.openQuestionFromCrop !== 'function') return alert('錯題儲存功能尚未載入。');
    const selected = [...results.querySelectorAll('input[data-detected-index]:checked')].map(el => detected[Number(el.dataset.detectedIndex)]).filter(Boolean);
    if (!selected.length) return alert('請至少勾選一題。');

    const addButton = event.target;
    const original = addButton.textContent;
    addButton.disabled = true;
    addButton.textContent = `☁️ 上傳中 0/${selected.length}`;
    window.__batchCapture = true;
    try {
      for (let i = 0; i < selected.length; i++) {
        window.openQuestionFromCrop(draftFromDetected(selected[i]));
        await sleep(450);
        addButton.textContent = `☁️ 上傳中 ${i + 1}/${selected.length}`;
      }
      detected = [];
      results.innerHTML = `<div class="empty compact"><strong>✅ 已加入 ${selected.length} 題錯題</strong><br>題目原圖已一併保留；學生答案無法確認時會標示「待確認」。</div>`;
      if (workspace) workspace.classList.add('hidden');
      window.__manualFallbackOpen = false;
    } catch (error) {
      console.error(error);
      alert(`加入錯題失敗：${error.message}`);
      addButton.disabled = false;
      addButton.textContent = original;
    } finally {
      window.__batchCapture = false;
    }
  });
})();