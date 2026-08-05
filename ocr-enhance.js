(() => {
  const originalRecognize = window.Tesseract?.recognize?.bind(window.Tesseract);

  async function preprocessImage(source) {
    const image = new Image();
    image.src = source;
    await image.decode();

    const scale = Math.min(2.2, Math.max(1.35, 1800 / Math.max(image.naturalWidth, image.naturalHeight)));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      sum += gray;
    }
    const average = sum / (data.length / 4);
    const threshold = Math.max(145, Math.min(205, average * 0.88));

    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const contrasted = Math.max(0, Math.min(255, (gray - 128) * 1.45 + 128));
      const value = contrasted > threshold ? 255 : 0;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  if (originalRecognize) {
    window.Tesseract.recognize = async (image, languages, options = {}) => {
      try {
        const processed = typeof image === 'string' && image.startsWith('data:image/')
          ? await preprocessImage(image)
          : image;
        return await originalRecognize(processed, languages, {
          ...options,
          preserve_interword_spaces: '1'
        });
      } catch (error) {
        console.warn('OCR 前處理失敗，改用原圖辨識。', error);
        return originalRecognize(image, languages, options);
      }
    };
  }

  function normalizeDigits(text) {
    return text
      .replace(/[OoＯ○]/g, '0')
      .replace(/[Il丨｜]/g, '1')
      .replace(/[Zz]/g, '2')
      .replace(/[Ss]/g, '5')
      .replace(/[Bb]/g, '8');
  }

  function extractNumber(text) {
    const firstLines = normalizeDigits(text)
      .split(/\n/)
      .slice(0, 4)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    const patterns = [
      /(?:第\s*)?(\d{1,3})\s*(?:題|[\.．、:：\)）])/,
      /^[\(（]?\s*(\d{1,3})\s*[\)）\.．、]/,
      /(?:^|\s)(\d{1,3})\s+(?=[\u4e00-\u9fffA-Za-z])/,
      /[【\[]\s*(\d{1,3})\s*[】\]]/
    ];

    for (const pattern of patterns) {
      const match = firstLines.match(pattern);
      if (match) {
        const value = Number(match[1]);
        if (value >= 1 && value <= 100) return String(value);
      }
    }
    return '';
  }

  function fillMissingQuestionNumbers(root = document) {
    root.querySelectorAll('.detected-ocr').forEach((textarea) => {
      const index = textarea.dataset.index;
      const numberInput = root.querySelector(`.detected-number[data-index="${index}"]`);
      if (!numberInput || numberInput.value.trim()) return;
      const number = extractNumber(textarea.value || '');
      if (number) {
        numberInput.value = number;
        numberInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  document.addEventListener('input', (event) => {
    if (event.target.classList?.contains('detected-ocr')) fillMissingQuestionNumbers();
  });

  const observer = new MutationObserver(() => fillMissingQuestionNumbers());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();