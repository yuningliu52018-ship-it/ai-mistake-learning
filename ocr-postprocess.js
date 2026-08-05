(() => {
  const recognize = window.Tesseract?.recognize?.bind(window.Tesseract);
  if (!recognize) return;

  const normalizeCommon = (text) => String(text || '')
    .replace(/\r/g, '')
    .replace(/[﹒·•]/g, '．')
    .replace(/[（﹙]/g, '(')
    .replace(/[）﹚]/g, ')')
    .replace(/[Ａ]/g, 'A').replace(/[Ｂ]/g, 'B').replace(/[Ｃ]/g, 'C').replace(/[Ｄ]/g, 'D')
    .replace(/[＠]/g, '@')
    .replace(/[|｜丨]/g, 'I')
    .replace(/[“”]/g, '「').replace(/[‘’]/g, '』')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  function plausibleQuestionNumber(value) {
    const number = Number(value);
    return Number.isInteger(number) && number >= 1 && number <= 60;
  }

  function numberFromWords(data) {
    const words = Array.isArray(data?.words) ? data.words : [];
    if (!words.length) return '';
    const pageWidth = Math.max(...words.map(word => word?.bbox?.x1 || 0), 1);
    const pageHeight = Math.max(...words.map(word => word?.bbox?.y1 || 0), 1);

    const candidates = words.map(word => {
      const raw = String(word.text || '').trim();
      const match = raw.match(/^(?:第\s*)?[（(]?\s*(\d{1,2})\s*(?:題|[.．、:：)）])$/);
      if (!match || !plausibleQuestionNumber(match[1])) return null;
      const box = word.bbox || {};
      const x = (box.x0 || 0) / pageWidth;
      const y = (box.y0 || 0) / pageHeight;
      const confidence = Number(word.confidence || 0);
      if (x > 0.28 || y > 0.22 || confidence < 60) return null;
      return { number: match[1], score: confidence - x * 60 - y * 45 };
    }).filter(Boolean).sort((a, b) => b.score - a.score);

    return candidates[0]?.number || '';
  }

  function numberFromText(text) {
    const firstLine = normalizeCommon(text).split('\n').find(Boolean) || '';
    const patterns = [
      /^\s*第\s*(\d{1,2})\s*題(?:\s|$)/,
      /^\s*[（(]?\s*(\d{1,2})\s*(?:[.．、:：)）])\s+/
    ];
    for (const pattern of patterns) {
      const match = firstLine.match(pattern);
      if (match && plausibleQuestionNumber(match[1])) return match[1];
    }
    return '';
  }

  function tidyOptions(text) {
    let output = normalizeCommon(text);
    output = output
      .replace(/(?:^|\s)[©◎○]\s*\(?A\)?/gi, '\n(A)')
      .replace(/(?:^|\s)\(?A\)?\s*(?=[^\n])/g, '\n(A) ')
      .replace(/(?:^|\s)\(?B\)?\s*(?=[^\n])/g, '\n(B) ')
      .replace(/(?:^|\s)\(?C\)?\s*(?=[^\n])/g, '\n(C) ')
      .replace(/(?:^|\s)\(?D\)?\s*(?=[^\n])/g, '\n(D) ')
      .replace(/\n{3,}/g, '\n\n');

    return output.split('\n').map(line => line.trim()).filter(Boolean).join('\n');
  }

  function removeObviousNoise(text) {
    return text
      .replace(/\b(?:FromEED|SKRTER|HCRRD|irs)\b/gi, '')
      .replace(/(?:公司\s*){3,}/g, '公司')
      .replace(/([，。！？；：])\1+/g, '$1')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  window.Tesseract.recognize = async (image, languages, options = {}) => {
    const result = await recognize(image, languages, options);
    if (!result?.data) return result;

    const cleaned = removeObviousNoise(tidyOptions(result.data.text || ''));
    const number = numberFromWords(result.data) || numberFromText(cleaned);

    result.data.text = cleaned;
    result.data.questionNumber = number;
    result.data.questionNumberReliable = Boolean(number);
    return result;
  };

  document.addEventListener('input', event => {
    if (!event.target.classList?.contains('detected-ocr')) return;
    const index = event.target.dataset.index;
    const input = document.querySelector(`.detected-number[data-index="${index}"]`);
    if (!input || input.value.trim()) return;
    const number = numberFromText(event.target.value);
    if (number) {
      input.value = number;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
})();