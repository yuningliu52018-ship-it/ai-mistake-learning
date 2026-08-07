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
          alert('已上傳到雲端待整理區，請到桌機閱讀與編輯。');
        }, 150);
      }, 0);
    };
  }

  const heading = document.querySelector('.scan-card .section-head > div');
  if (heading) {
    heading.insertAdjacentHTML('beforeend', '<p class="capture-note">手機只負責拍攝與上傳；完整閱讀、修改、類題與複習請在桌機操作。</p>');
  }
})();
