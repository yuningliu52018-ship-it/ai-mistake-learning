(() => {
  const input = document.getElementById('artifactInput');
  const status = document.getElementById('artifactImportStatus');
  const list = document.getElementById('learningModuleList');
  if (!input || !status || !list) return;

  let modules = [];
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function api(action, data = {}) {
    if (!AI_ENDPOINT) throw new Error('尚未設定雲端 API 網址');
    const response = await fetch(AI_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action, syncKey, ...data})});
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || payload.error || `HTTP ${response.status}`);
    return payload;
  }

  function renderModules() {
    if (!modules.length) {
      list.innerHTML = '<div class="empty compact">尚未匯入互動學習單元。</div>';
      return;
    }
    list.innerHTML = modules.map(module => `
      <article class="module-card">
        <span class="module-subject">${esc(module.subject || '未分類')}</span>
        <h3>${esc(module.title || '未命名學習單元')}</h3>
        <p>${esc(module.summary || '')}</p>
        <small>${Number(module.questionCount) || 0} 題已納入錯題資料庫</small>
        <div class="module-actions">
          <button class="primary" data-open-module="${esc(module.id)}">開啟互動頁</button>
          <button data-delete-module="${esc(module.id)}">刪除單元</button>
        </div>
      </article>`).join('');
  }

  async function loadModules() {
    if (!syncKey) { status.textContent = '匯入前請先設定跨裝置同步碼。'; renderModules(); return; }
    try {
      const payload = await api('modulePull');
      modules = payload.modules || [];
      status.textContent = `已載入 ${modules.length} 個互動學習單元。`;
      renderModules();
    } catch (error) {
      status.textContent = `學習單元載入失敗：${error.message}`;
    }
  }

  function openModule(module) {
    const dialog = document.createElement('dialog');
    dialog.className = 'module-viewer';
    dialog.innerHTML = `<div class="dialog-head"><strong>${esc(module.title)}</strong><button type="button" aria-label="關閉">×</button></div><iframe title="${esc(module.title)}" sandbox="allow-scripts allow-forms allow-modals" referrerpolicy="no-referrer"></iframe>`;
    document.body.appendChild(dialog);
    dialog.querySelector('iframe').srcdoc = module.html;
    dialog.querySelector('button').onclick = () => dialog.close();
    dialog.addEventListener('close', () => dialog.remove(), {once:true});
    dialog.showModal();
  }

  function toQuestion(item, module, index) {
    const now = new Date().toISOString();
    const options = item.options || {};
    const optionText = ['A','B','C','D'].filter(k => options[k]).map(k => `(${k}) ${options[k]}`).join('\n');
    return normalizeQuestion({
      id: crypto.randomUUID(), subject:item.subject || module.subject || '未分類', chapter:item.chapter || '', number:item.number || item.questionNumber || `匯入${index + 1}`,
      status:'待複習', questionType:item.questionType || '互動單元匯入', difficulty:Number(item.difficulty) || 3,
      question:[item.question || '待補題目', optionText].filter(Boolean).join('\n'), correctAnswer:item.correctAnswer || '待確認', myAnswer:item.myAnswer || item.studentAnswer || '',
      mistake:item.mistake || '由 Gemini 互動頁批次匯入，請複習後補充錯誤原因。', concept:item.concept || '', knowledge:item.knowledge || '', explanation:item.explanation || '',
      tags:['互動單元', module.subject || '未分類', module.title, ...(item.tags || [])], image:'', sourceModuleId:module.id, sourceModuleTitle:module.title, createdAt:now, updatedAt:now
    });
  }

  input.addEventListener('change', async () => {
    const files = [...input.files];
    if (!files.length) return;
    if (!syncKey) { input.value = ''; return alert('請先按頁面上方「設定同步」並輸入至少 8 個字元的同步碼。'); }
    input.disabled = true;
    let imported = 0, importedQuestions = 0;
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        status.innerHTML = `<div class="module-progress">正在解析 ${i + 1}/${files.length}：${esc(file.name)}</div>`;
        const html = await file.text();
        if (html.length > 500000) throw new Error(`${file.name} 超過 500 KB，請先移除內嵌大型圖片。`);
        const parsed = await api('importArtifact', {fileName:file.name, html});
        const now = new Date().toISOString();
        const module = {id:crypto.randomUUID(), title:parsed.module?.title || file.name, subject:parsed.module?.subject || '未分類', summary:parsed.module?.summary || '', html, questionCount:(parsed.questions || []).length, createdAt:now, updatedAt:now};
        await api('modulePush', {module});
        const additions = (parsed.questions || []).map((q, index) => toQuestion(q, module, index));
        for (let start = 0; start < additions.length; start += 10) await api('syncPush', {questions:additions.slice(start, start + 10)});
        questions = [...additions, ...questions];
        saveQuestions({sync:false});
        modules.unshift(module);
        imported++; importedQuestions += additions.length;
      }
      render(); renderModules();
      status.textContent = `完成：已匯入 ${imported} 個互動單元與 ${importedQuestions} 題。`;
    } catch (error) {
      status.textContent = `匯入中止：${error.message}`;
      alert(`互動頁匯入失敗：${error.message}`);
    } finally { input.disabled = false; input.value = ''; }
  });

  list.addEventListener('click', async event => {
    const openId = event.target.dataset?.openModule;
    if (openId) return openModule(modules.find(x => x.id === openId));
    const deleteId = event.target.dataset?.deleteModule;
    if (!deleteId || !confirm('確定刪除這個互動單元嗎？已匯入的個別題目仍會保留。')) return;
    try { await api('moduleDelete', {id:deleteId, deletedAt:new Date().toISOString()}); modules = modules.filter(x => x.id !== deleteId); renderModules(); }
    catch (error) { alert(`刪除失敗：${error.message}`); }
  });

  window.addEventListener('focus', () => { if (syncKey && !modules.length) loadModules(); });
  loadModules();
})();
