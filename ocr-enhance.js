(() => {
  const originalRecognize = window.Tesseract?.recognize?.bind(window.Tesseract);

  async function loadImage(source) {
    const image = new Image();
    image.src = source;
    await image.decode();
    return image;
  }

  async function preprocessImage(source, mode = 'text') {
    const image = await loadImage(source);
    const target = mode === 'number' ? 1100 : 1800;
    const scale = Math.min(mode === 'number' ? 4 : 2.2, Math.max(mode === 'number' ? 2.2 : 1.35, target / Math.max(image.naturalWidth, image.naturalHeight)));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    const average = sum / (data.length / 4);
    const threshold = Math.max(135, Math.min(215, average * (mode === 'number' ? 0.94 : 0.88)));

    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const contrast = mode === 'number' ? 1.7 : 1.45;
      const contrasted = Math.max(0, Math.min(255, (gray - 128) * contrast + 128));
      const value = contrasted > threshold ? 255 : 0;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  async function cropNumberArea(source) {
    const image = await loadImage(source);
    const canvas = document.createElement('canvas');
    const cropWidth = Math.max(80, Math.round(image.naturalWidth * 0.38));
    const cropHeight = Math.max(60, Math.round(image.naturalHeight * 0.32));
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    canvas.getContext('2d').drawImage(image, 0, 0, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    return canvas.toDataURL('image/png');
  }

  function normalizeDigits(text) {
    return String(text || '')
      .replace(/[OoＯ○]/g, '0')
      .replace(/[Il丨｜]/g, '1')
      .replace(/[Zz]/g, '2')
      .replace(/[Ss]/g, '5')
      .replace(/[Bb]/g, '8');
  }

  function extractNumber(text) {
    const cleaned = normalizeDigits(text).replace(/\s+/g, ' ').trim();
    const patterns = [
      /(?:第\s*)?(\d{1,3})\s*(?:題|[\.．、:：\)）])/, 
      /^[\(（]?\s*(\d{1,3})\s*[\)）\.．、]?/, 
      /(?:^|\s)(\d{1,3})(?=\s|$)/
    ];
    for (const pattern of patterns) {
      const match = cleaned.match(pattern);
      if (match) {
        const value = Number(match[1]);
        if (value >= 1 && value <= 100) return String(value);
      }
    }
    return '';
  }

  if (originalRecognize) {
    window.Tesseract.recognize = async (image, languages, options = {}) => {
      try {
        const isDataImage = typeof image === 'string' && image.startsWith('data:image/');
        if (!isDataImage) return originalRecognize(image, languages, options);

        const [processedText, numberArea] = await Promise.all([
          preprocessImage(image, 'text'),
          cropNumberArea(image).then(area => preprocessImage(area, 'number'))
        ]);

        const textResult = await originalRecognize(processedText, languages, {
          ...options,
          preserve_interword_spaces: '1'
        });

        let number = extractNumber(textResult?.data?.text || '');
        if (!number) {
          const numberResult = await originalRecognize(numberArea, 'eng', {
            tessedit_pageseg_mode: '7',
            tessedit_char_whitelist: '0123456789.()、'
          });
          number = extractNumber(numberResult?.data?.text || '');
        }

        if (number && textResult?.data) {
          const currentText = String(textResult.data.text || '').trim();
          if (!extractNumber(currentText)) textResult.data.text = `${number}. ${currentText}`.trim();
        }
        return textResult;
      } catch (error) {
        console.warn('雙階段 OCR 失敗，改用原圖辨識。', error);
        return originalRecognize(image, languages, options);
      }
    };
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

  document.addEventListener('input', event => {
    if (event.target.classList?.contains('detected-ocr')) fillMissingQuestionNumbers();
  });

  const observer = new MutationObserver(() => fillMissingQuestionNumbers());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();