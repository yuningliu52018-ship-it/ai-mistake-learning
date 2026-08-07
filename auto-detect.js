(() => {
  const input = document.getElementById('paperInput');
  const endpoint = window.AI_MISTAKE_CONFIG?.visionEndpoint;
  const section = document.getElementById('autoDetectPanel');
  const button = document.getElementById('autoDetectBtn');
  const results = document.getElementById('autoDetectResults');
  const workspace = document.getElementById('scanWorkspace');
  if (!input || !section || !button || !results) return;

  let pages = [];
  let analyzing = false;

  const escapeHtml = (value = '') => String(value).replace(/[&<>'\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'})[c]);
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

  function draftFromDetected(item, page) {
    const hasStudentAnswer = Boolean(String(item.studentAnswer || '').trim());
    return {
      image: page.storedImage,
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
      tags: [`批次拍攝第${page.pageNo}頁`, '整張考卷自動辨識', 'Gemini 自動找錯題', '保留原題圖片', ...(item.tags || [])]
    };
  }

  function totalDetected() {
    return pages.reduce((sum, page) => sum + (page.detected?.length || 0), 0);
  }

  function pageStatus(page) {
    if (page.status === 'analyzing') return '🤖 分析中…';
    if (page.status === 'done') return `✅ 找到 ${page.detected.length} 題`;
    if (page.status === 'error') return '⚠️ 分析失敗';
    return '等待分析';
  }

  function render() {
    if (!pages.length) {
      results.innerHTML = '<div class="empty compact">尚未加入考卷。可連續拍多張，最後再一次分析。</div>';
      button.disabled = true;
      button.textContent = '🤖 AI 批次找錯題';
      return;
    }

    const finished = pages.filter(p => p.status === 'done' || p.status === 'error').length;
    const found = totalDetected();
    button.disabled = analyzing;
    button.textContent = analyzing ? `🤖 分析中 ${finished}/${pages.length}` : `🤖 AI 批次找錯題（${pages.length} 張）`;

    const queue = `
      <div class="batch-summary">
        <strong>📚 已拍 ${pages.length} 張考卷</strong>
        <span>${analyzing ? `分析進度 ${finished}/${pages.length}` : found ? `目前找到 ${found} 題可能錯題` : '拍完後再一次分析'}</span>
        <button id="clearBatchBtn" type="button" ${analyzing ? 'disabled' : ''}>清除這批</button>
      </div>
      <div class="batch-pages">
        ${pages.map((page, index) => `
          <div class="batch-page ${escapeHtml(page.status)}">
            <img src="${page.storedImage || page.image}" alt="第 ${page.pageNo} 頁" />
            <div><strong>第 ${page.pageNo} 頁</strong><small>${escapeHtml(page.name || `第 ${page.pageNo} 張`)}</small><span>${pageStatus(page)}</span>${page.error ? `<small class="batch-error">${escapeHtml(page.error)}</small>` : ''}</div>
            <button type="button" data-remove-page="${index}" ${analyzing ? 'disabled' : ''}>刪除</button>
          </div>`).join('')}
      </div>`;

    const detectedHtml = pages.map((page, pageIndex) => {
      if (page.status !== 'done' || !page.detected.length) return '';
      return `
        <section class="batch-result-page">
          <h3>第 ${page.pageNo} 頁｜找到 ${page.detected.length} 題</h3>
          ${page.detected.map((item, itemIndex) => `
            <label class="auto-detected-item">
              <input type="checkbox" data-page-index="${pageIndex}" data-item-index="${itemIndex}" checked />
              <span><strong>第 ${escapeHtml(item.questionNumber || '?')} 題｜${escapeHtml(item.subject || '待確認')}</strong><br>${escapeHtml(item.question || '').slice(0,220)}<br><small>學生答案：${escapeHtml(item.studentAnswer || '待確認')}｜正確答案：${escapeHtml(item.correctAnswer || '待確認')}｜信心值 ${Math.round(Number(item.confidence)||0)}%</small></span>
            </label>`).join('')}
        </section>`;
    }).join('');

    const failedCount = pages.filter(p => p.status === 'error').length;
    const footer = found ? `
      <div class="batch-actions">
        <strong>共找到 ${found} 題可能錯題</strong>
        <button id="addDetectedBtn" class="primary" type="button">☁️ 一次上傳勾選題目</button>
      </div>` : (!analyzing && finished === pages.length ? `<div class="empty compact">這批沒有找到明確錯題。${failedCount ? `有 ${failedCount} 頁分析失敗，可再按一次「AI 批次找錯題」重試失敗頁。` : ''}</div>` : '');

    results.innerHTML = queue + detectedHtml + footer;
  }

  async function addFiles(fileList) {
    const files = [...(fileList || [])].filter(file => file?.type?.startsWith('image/'));
    if (!files.length) return;
    for (const file of files) {
      const image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const storedImage = await compressForStorage(image);
      pages.push({
        id: crypto.randomUUID(),
        pageNo: pages.length + 1,
        name: file.name || `第 ${pages.length + 1} 張`,
        image,
        storedImage,
        detected: [],
        status: 'pending',
        error: ''
      });
    }
    section.classList.remove('hidden');
    if (document.documentElement.classList.contains('capture-mode') && workspace && !window.__manualFallbackOpen) workspace.classList.add('hidden');
    render();
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // 允許 iPhone 再次按「繼續拍」加入下一張，即使檔名相同也會觸發 change。
    input.value = '';
  }

  input.addEventListener('change', event => addFiles(event.target.files), true);

  button.addEventListener('click', async () => {
    if (!pages.length) return alert('請先拍攝或選擇至少一張考卷。');
    if (!endpoint) return alert('尚未設定 Gemini API 網址。');
    if (analyzing) return;
    analyzing = true;
    // 已成功頁保留結果，只重跑尚未分析或失敗頁。
    const targets = pages.filter(page => page.status !== 'done');
    for (const page of targets) {
      page.status = 'analyzing';
      page.error = '';
      render();
      try {
        const response = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'detectMistakes', image:page.image}) });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.detail || payload.error || `HTTP ${response.status}`);
        page.detected = Array.isArray(payload.mistakes) ? payload.mistakes : [];
        page.status = 'done';
      } catch (error) {
        console.error(error);
        page.status = 'error';
        page.error = error.message || '未知錯誤';
      }
      render();
      await sleep(120);
    }
    analyzing = false;
    render();
  });

  results.addEventListener('click', async event => {
    const removeIndex = event.target.dataset?.removePage;
    if (removeIndex !== undefined) {
      if (analyzing) return;
      pages.splice(Number(removeIndex), 1);
      pages.forEach((page, index) => page.pageNo = index + 1);
      render();
      return;
    }

    if (event.target.id === 'clearBatchBtn') {
      if (analyzing) return;
      if (!confirm('確定清除這一批已拍的考卷嗎？')) return;
      pages = [];
      render();
      return;
    }

    if (event.target.id !== 'addDetectedBtn') return;
    if (typeof window.openQuestionFromCrop !== 'function') return alert('錯題儲存功能尚未載入。');
    const selected = [...results.querySelectorAll('input[data-page-index][data-item-index]:checked')]
      .map(el => {
        const page = pages[Number(el.dataset.pageIndex)];
        const item = page?.detected?.[Number(el.dataset.itemIndex)];
        return page && item ? { page, item } : null;
      }).filter(Boolean);
    if (!selected.length) return alert('請至少勾選一題。');

    const addButton = event.target;
    addButton.disabled = true;
    window.__batchCapture = true;
    try {
      for (let i = 0; i < selected.length; i++) {
        addButton.textContent = `☁️ 上傳中 ${i + 1}/${selected.length}`;
        window.openQuestionFromCrop(draftFromDetected(selected[i].item, selected[i].page));
        await sleep(500);
      }
      const count = selected.length;
      pages = [];
      results.innerHTML = `<div class="empty compact"><strong>✅ 已加入 ${count} 題錯題</strong><br>整批考卷已完成；每題都保留原本所在頁面的考卷圖片。</div>`;
      button.disabled = true;
      button.textContent = '🤖 AI 批次找錯題';
      if (workspace) workspace.classList.add('hidden');
      window.__manualFallbackOpen = false;
    } catch (error) {
      console.error(error);
      alert(`加入錯題失敗：${error.message}`);
      addButton.disabled = false;
      addButton.textContent = '☁️ 一次上傳勾選題目';
    } finally {
      window.__batchCapture = false;
    }
  });

  render();
})();