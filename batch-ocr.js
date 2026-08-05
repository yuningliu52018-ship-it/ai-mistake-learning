(() => {
  const toolbar = document.querySelector('.scan-actions');
  const detectedList = document.getElementById('detectedList');
  if (!toolbar || !detectedList) return;

  const button = document.createElement('button');
  button.id = 'batchOcrBtn';
  button.type = 'button';
  button.textContent = '🔎 全部 OCR';
  toolbar.appendChild(button);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function waitForFinish(index, timeoutMs = 120000) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
      const cards = detectedList.querySelectorAll('.detected-item');
      const card = cards[index];
      if (!card) return;
      const status = card.querySelector('.ocr-status')?.textContent || '';
      const ocrButton = card.querySelector('button[data-action="ocr"]');
      if (!ocrButton?.disabled && !status.includes('辨識中')) return;
      await wait(400);
    }
    throw new Error(`第 ${index + 1} 個框 OCR 逾時`);
  }

  button.addEventListener('click', async () => {
    const cards = [...detectedList.querySelectorAll('.detected-item')];
    if (!cards.length) {
      alert('請先框選至少一道錯題。');
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;

    try {
      for (let index = 0; index < cards.length; index += 1) {
        const currentCards = detectedList.querySelectorAll('.detected-item');
        const card = currentCards[index];
        if (!card) continue;

        const textarea = card.querySelector('.detected-ocr');
        if (textarea?.value.trim()) continue;

        const ocrButton = card.querySelector('button[data-action="ocr"]');
        if (!ocrButton || ocrButton.disabled) continue;

        button.textContent = `🔎 OCR ${index + 1}/${cards.length}`;
        ocrButton.click();
        await waitForFinish(index);
      }
      button.textContent = '✅ OCR 完成';
      await wait(900);
    } catch (error) {
      console.error(error);
      alert('批次 OCR 中途停止，已完成的題目仍會保留。');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();