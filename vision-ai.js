(() => {
  const endpoint = window.AI_MISTAKE_CONFIG?.visionEndpoint;
  const detectedList = document.getElementById('detectedList');
  if (!detectedList) return;

  function setStatus(card, text, kind = '') {
    let status = card.querySelector('.vision-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'vision-status';
      card.querySelector('.detected-actions')?.before(status);
    }
    status.textContent = text;
    status.dataset.kind = kind;
  }

  function formatQuestion(result) {
    const lines = [];
    if (result.question) lines.push(result.question.trim());
    const options = result.options || {};
    for (const key of ['A', 'B', 'C', 'D']) if (options[key]) lines.push(`(${key}) ${String(options[key]).trim()}`);
    return lines.join('\n');
  }

  function normalizeTags(tags) {
    return Array.isArray(tags) ? tags.filter(Boolean).map(String) : [];
  }

  function buildFormData(card, result) {
    return {
      image: card.querySelector('img')?.src || '',
      subject: card.querySelector('.detected-subject')?.value || '未知',
      chapter: result.chapter || '',
      number: result.questionNumber || card.querySelector('.detected-number')?.value || '',
      question: formatQuestion(result) || card.querySelector('.detected-ocr')?.value || '',
      correctAnswer: result.correctAnswer || '待確認',
      myAnswer: result.studentAnswer || '',
      mistake: result.mistake || '尚待分析錯誤原因。',
      concept: result.concept || '待整理',
      knowledge: result.knowledge || '待分類',
      explanation: result.explanation || '待完成詳細解答。',
      tags: ['考卷匯入', 'Gemini 已分析', ...normalizeTags(result.tags)]
    };
  }

  async function runVision(button) {
    const card = button.closest('.detected-item');
    if (!card) return;
    if (!endpoint) return alert('尚未設定 Vision API 網址，請檢查 config.js。');

    const image = card.querySelector('img')?.src;
    const subject = card.querySelector('.detected-subject')?.value || '未知';
    const ocrText = card.querySelector('.detected-ocr')?.value || '';
    const numberInput = card.querySelector('.detected-number');
    const textArea = card.querySelector('.detected-ocr');
    if (!image?.startsWith('data:image/')) return alert('找不到框選圖片，請重新框選後再試。');

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = '🤖 Gemini 分析中…';
    setStatus(card, 'Gemini 正在辨識題目並產生完整錯題解析，通常需要數秒。', 'running');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, subject, ocrText })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.detail || payload.error || `HTTP ${response.status}`);

      const result = payload.result || {};
      card.dataset.visionResult = JSON.stringify(result);
      if (numberInput && result.questionNumber) {
        numberInput.value = result.questionNumber;
        numberInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const formatted = formatQuestion(result);
      if (textArea && formatted) {
        textArea.value = formatted;
        textArea.dispatchEvent(new Event('input', { bubbles: true }));
      }

      const confidence = Number.isFinite(Number(result.confidence)) ? `｜信心值 ${Math.round(Number(result.confidence))}%` : '';
      const answer = result.correctAnswer ? `｜答案 ${result.correctAnswer}` : '';
      setStatus(card, `Gemini 完整分析完成${confidence}${answer}｜按「加入錯題資料庫」可自動帶入全部欄位。`, 'done');
    } catch (error) {
      console.error('Gemini Vision error', error);
      setStatus(card, `Gemini 分析失敗：${error.message}`, 'error');
      alert(`Gemini 分析失敗：${error.message}`);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }

  function enhanceCards() {
    detectedList.querySelectorAll('.detected-item').forEach((card) => {
      const actions = card.querySelector('.detected-actions');
      if (!actions || actions.querySelector('[data-action="vision"]')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.action = 'vision';
      button.className = 'vision-btn';
      button.textContent = '🤖 Gemini 完整分析';
      actions.insertBefore(button, actions.querySelector('[data-action="add"]') || null);
    });
  }

  detectedList.addEventListener('click', (event) => {
    const visionButton = event.target.closest('[data-action="vision"]');
    if (visionButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      runVision(visionButton);
      return;
    }

    const addButton = event.target.closest('[data-action="add"]');
    if (!addButton) return;
    const card = addButton.closest('.detected-item');
    if (!card?.dataset.visionResult) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (typeof window.openQuestionFromCrop !== 'function') return alert('錯題表單尚未載入，請重新整理後再試。');
    try {
      const result = JSON.parse(card.dataset.visionResult);
      window.openQuestionFromCrop(buildFormData(card, result));
    } catch (error) {
      console.error(error);
      alert('Gemini 分析結果讀取失敗，請重新分析。');
    }
  }, true);

  const observer = new MutationObserver(enhanceCards);
  observer.observe(detectedList, { childList: true, subtree: true });
  enhanceCards();
})();
