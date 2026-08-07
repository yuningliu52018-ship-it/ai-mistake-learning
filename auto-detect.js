(() => {
  const input = document.getElementById('paperInput');
  const endpoint = window.AI_MISTAKE_CONFIG?.visionEndpoint;
  const section = document.getElementById('autoDetectPanel');
  const button = document.getElementById('autoDetectBtn');
  const results = document.getElementById('autoDetectResults');
  if (!input || !section || !button || !results) return;

  let pageImage = '';
  let detected = [];

  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c]);

  function formatQuestion(item) {
    const lines = [item.question || ''];
    for (const key of ['A','B','C','D']) if (item.options?.[key]) lines.push(`(${key}) ${item.options[key]}`);
    return lines.filter(Boolean).join('\n');
  }

  function render() {
    if (!detected.length) {
      results.innerHTML = '<div class="empty compact">尚未找到明確錯題。可改用手動畫框分析。</div>';
      return;
    }
    results.innerHTML = `
      <div class="auto-detect-head"><strong>Gemini 找到 ${detected.length} 題可能錯題</strong><button id="addDetectedBtn" class="primary" type="button">加入勾選題目</button></div>
      ${detected.map((item, index) => `
        <label class="auto-detected-item">
          <input type="checkbox" data-detected-index="${index}" checked />
          <span><strong>第 ${escapeHtml(item.questionNumber || '?')} 題｜${escapeHtml(item.subject || '待確認')}</strong><br>${escapeHtml(item.question || '').slice(0,180)}<br><small>學生答案：${escapeHtml(item.studentAnswer || '不清楚')}｜正確答案：${escapeHtml(item.correctAnswer || '待確認')}｜信心值 ${Math.round(Number(item.confidence)||0)}%</small></span>
        </label>`).join('')}`;
  }

  function loadWholePageImage(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      pageImage = String(reader.result || '');
      detected = [];
      section.classList.remove('hidden');
      results.innerHTML = '<div class="empty compact">照片已載入。按「AI 自動找錯題」，Gemini 會檢查紅筆批改與作答記號。</div>';
    };
    reader.readAsDataURL(file);
  }

  // 使用 capture 階段先取得檔案，避免 scan.js 清空 input 後讀不到照片。
  input.addEventListener('change', (event) => {
    loadWholePageImage(event.target.files?.[0]);
  }, true);

  button.addEventListener('click', async () => {
    if (!pageImage) return alert('請先拍攝或選擇整張考卷。');
    if (!endpoint) return alert('尚未設定 Gemini API 網址。');
    const original = button.textContent;
    button.disabled = true;
    button.textContent = '🤖 正在找錯題…';
    results.innerHTML = '<div class="empty compact">Gemini 正在檢查整張考卷，請稍候。</div>';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({action:'detectMistakes', image:pageImage})
      });
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

  results.addEventListener('click', (event) => {
    if (event.target.id !== 'addDetectedBtn') return;
    if (typeof window.openQuestionFromCrop !== 'function') return alert('錯題表單尚未載入。');
    const selected = [...results.querySelectorAll('input[data-detected-index]:checked')].map(el => detected[Number(el.dataset.detectedIndex)]).filter(Boolean);
    if (!selected.length) return alert('請至少勾選一題。');
    const addOne = (item) => window.openQuestionFromCrop({
      image: '', subject:item.subject || '自然', chapter:item.chapter || '', number:item.questionNumber || '',
      questionType:item.questionType || '', difficulty:item.difficulty || 3,
      question:formatQuestion(item), correctAnswer:item.correctAnswer || '待確認', myAnswer:item.studentAnswer || '',
      mistake:item.mistake || 'Gemini 依批改記號推測為錯題，請在桌機確認。', concept:item.concept || '待整理',
      knowledge:item.knowledge || '待分類', explanation:item.explanation || '待完成詳細解析。',
      tags:['整張考卷自動辨識','Gemini 自動找錯題',...(item.tags || [])]
    });
    if (document.documentElement.classList.contains('capture-mode')) {
      selected.forEach((item, i) => setTimeout(() => addOne(item), i * 250));
    } else {
      addOne(selected[0]);
      if (selected.length > 1) alert(`已先開啟第 1 題供確認；其餘 ${selected.length-1} 題請稍後逐題加入。`);
    }
  });
})();
