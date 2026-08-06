(() => {
  const endpoint = window.AI_MISTAKE_CONFIG?.visionEndpoint;
  const detectedList = document.getElementById('detectedList');
  if (!detectedList) return;

  function setStatus(card, text, kind = '') {
    let status = card.querySelector('.vision-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'vision-status';
      const actions = card.querySelector('.detected-actions');
      actions?.before(status);
    }
    status.textContent = text;
    status.dataset.kind = kind;
  }

  function formatQuestion(result) {
    const lines = [];
    if (result.question) lines.push(result.question.trim());
    const options = result.options || {};
    for (const key of ['A', 'B', 'C', 'D']) {
      if (options[key]) lines.push(`(${key}) ${String(options[key]).trim()}`);
    }
    return lines.join('\n');
  }

  async function runVision(button) {
    const card = button.closest('.detected-item');
    if (!card) return;
    if (!endpoint) {
      alert('尚未設定 Vision API 網址，請檢查 config.js。');
      return;
    }

    const image = card.querySelector('img')?.src;
    const subject = card.querySelector('.detected-subject')?.value || '未知';
    const ocrText = card.querySelector('.detected-ocr')?.value || '';
    const numberInput = card.querySelector('.detected-number');
    const textArea = card.querySelector('.detected-ocr');

    if (!image?.startsWith('data:image/')) {
      alert('找不到框選圖片，請重新框選後再試。');
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = '🤖 Gemini 辨識中…';
    setStatus(card, 'Gemini 正在閱讀題目圖片，通常需要數秒。', 'running');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, subject, ocrText })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.detail || payload.error || `HTTP ${response.status}`);

      const result = payload.result || {};
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
      const notes = result.notes ? `｜${result.notes}` : '';
      setStatus(card, `Gemini 辨識完成${confidence}${notes}`, 'done');
    } catch (error) {
      console.error('Gemini Vision error', error);
      setStatus(card, `Gemini 辨識失敗：${error.message}`, 'error');
      alert(`Gemini 辨識失敗：${error.message}`);
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
      button.textContent = '🤖 Gemini Vision';
      const addButton = actions.querySelector('[data-action="add"]');
      actions.insertBefore(button, addButton || null);
    });
  }

  detectedList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="vision"]');
    if (button) runVision(button);
  });

  const observer = new MutationObserver(enhanceCards);
  observer.observe(detectedList, { childList: true, subtree: true });
  enhanceCards();
})();