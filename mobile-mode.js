(() => {
  const isCaptureMode = window.matchMedia('(max-width: 760px)').matches;
  document.documentElement.classList.toggle('capture-mode', isCaptureMode);
  if (!isCaptureMode) return;

  const workspace = document.getElementById('scanWorkspace');
  const manualButton = document.getElementById('manualFallbackBtn');

  function hideManualWorkspace() {
    if (!workspace) return;
    workspace.classList.add('hidden');
    if (manualButton) manualButton.textContent = '＋ AI 漏題？手動補一題';
  }

  function toggleManualWorkspace() {
    if (!workspace) return;
    const willShow = workspace.classList.contains('hidden');
    workspace.classList.toggle('hidden', !willShow);
    if (manualButton) manualButton.textContent = willShow ? '收起手動補題' : '＋ AI 漏題？手動補一題';
    if (willShow) workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  manualButton?.addEventListener('click', toggleManualWorkspace);

  // scan.js 載入照片後會顯示手動畫框區；手機版立即收起，僅在使用者主動要求時展開。
  const observer = workspace ? new MutationObserver(() => {
    if (!window.__manualFallbackOpen && !workspace.classList.contains('hidden')) hideManualWorkspace();
  }) : null;
  observer?.observe(workspace, { attributes: true, attributeFilter: ['class'] });

  manualButton?.addEventListener('click', () => {
    window.__manualFallbackOpen = workspace ? !workspace.classList.contains('hidden') : false;
  });

  const originalOpenFromCrop = window.openQuestionFromCrop;
  if (typeof originalOpenFromCrop === 'function') {
    window.openQuestionFromCrop = (draft) => {
      originalOpenFromCrop(draft);
      window.setTimeout(() => {
        const form = document.getElementById('questionForm');
        if (!form) return;
        form.requestSubmit();
        if (!window.__batchCapture) {
          window.setTimeout(() => alert('已上傳錯題。桌機同步後即可閱讀與編輯。'), 120);
        }
      }, 0);
    };
  }

  const heading = document.querySelector('.scan-card .section-head > div');
  if (heading && !heading.querySelector('.capture-note')) {
    heading.insertAdjacentHTML('beforeend', '<p class="capture-note">手機只負責拍照、AI 辨識與上傳；完整閱讀、修改、類題與複習請在桌機操作。</p>');
  }

  hideManualWorkspace();
})();