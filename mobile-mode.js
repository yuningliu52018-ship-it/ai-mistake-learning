(() => {
  const isCaptureMode = window.matchMedia('(max-width: 760px)').matches;
  document.documentElement.classList.toggle('capture-mode', isCaptureMode);
  if (!isCaptureMode) return;

  const originalOpenFromCrop = window.openQuestionFromCrop;
  if (typeof originalOpenFromCrop === 'function') {
    window.openQuestionFromCrop = (draft) => {
      originalOpenFromCrop(draft);
      window.setTimeout(() => {
        const form = document.getElementById('questionForm');
        if (!form) return;
        form.requestSubmit();
        window.setTimeout(() => {
          alert('已加入待同步區。確認上方顯示「☁️ 已同步」後，就能在桌機看到並編輯。');
        }, 150);
      }, 0);
    };
  }

  const heading = document.querySelector('.scan-card .section-head > div');
  if (heading) {
    heading.insertAdjacentHTML('beforeend', '<p class="capture-note">手機只負責拍攝與上傳；完整閱讀、修改、類題與複習請在桌機操作。</p>');
  }
})();
