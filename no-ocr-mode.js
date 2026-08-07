(() => {
  function cleanOcrUi(root = document) {
    root.querySelectorAll('[data-action="ocr"], #batchOcrBtn, .batch-ocr-btn, .ocr-status').forEach((element) => element.remove());

    root.querySelectorAll('.detected-item label').forEach((label) => {
      const textarea = label.querySelector('.detected-ocr');
      if (!textarea) return;
      const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.textContent = 'Gemini 題目文字';
      textarea.placeholder = '按「Gemini 智慧分析」後會自動填入，可在桌機人工校正';
    });
  }

  const observer = new MutationObserver(() => cleanOcrUi());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  cleanOcrUi();
})();
