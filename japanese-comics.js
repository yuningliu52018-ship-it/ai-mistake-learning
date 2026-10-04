(() => {
  'use strict';
  const cards = [...document.querySelectorAll('[data-comic]')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const dialog = document.getElementById('comic-viewer');
  const stage = document.getElementById('viewer-stage');
  const picture = document.getElementById('viewer-image');
  const zoom = document.getElementById('viewer-zoom');
  const close = document.getElementById('viewer-close');
  const previous = document.getElementById('viewer-prev');
  const next = document.getElementById('viewer-next');
  const knownFilters = new Set(filters.map(button => button.dataset.filter));
  let visible = cards;
  let selected = null;
  let selectedLanguage = 'ja';
  const variants = globalThis.COMIC_LANGUAGE_VARIANTS || {};
  let trigger = null;
  let closing = false;

  function resetZoom() {
    stage.classList.remove('zoomed');
    zoom.setAttribute('aria-pressed', 'false');
    zoom.textContent = '放大細看';
    stage.scrollTo(0, 0);
  }

  function renderSelection(card) {
    const language = new URL(location.href).searchParams.get('lang') === 'en' && variants[card.dataset.comic]?.en ? 'en' : 'ja';
    const variant = variants[card.dataset.comic]?.[language];
    const changed = selected !== card.dataset.comic || language !== selectedLanguage;
    selectedLanguage = language;
    const languageQuery = language === 'en' ? '&lang=en' : '';
    selected = card.dataset.comic;
    document.getElementById('viewer-voice').hidden = false;
    document.getElementById('viewer-voice').href = `voiced-comic.html?comic=${encodeURIComponent(selected)}${languageQuery}`;
    document.getElementById('viewer-title').textContent = variant?.title || card.querySelector('h2').textContent;
    document.getElementById('viewer-label').textContent = card.querySelector('.lesson-label').textContent;
    const index = visible.indexOf(card);
    document.getElementById('viewer-position').textContent = `${index + 1} / ${visible.length}`;
    previous.disabled = index <= 0;
    next.disabled = index >= visible.length - 1;
    document.getElementById('viewer-original').href = variant?.image || card.querySelector('a').href;
    document.getElementById('viewer-language-switch').hidden = !variants[selected]?.en;
    document.getElementById('viewer-language-ja').setAttribute('aria-pressed', String(language === 'ja'));
    document.getElementById('viewer-language-en').setAttribute('aria-pressed', String(language === 'en'));
    document.getElementById('viewer-language-note').textContent = variant ? `${variant.grammar}：${variant.caption}` : `${card.querySelector('.grammar').textContent}：${card.querySelector('.card-description').textContent}${variants[selected]?.en ? '｜兩版都有中文解說。' : '｜含中文解說。'}`;
    if (changed) {
      document.getElementById('viewer-error').hidden = true;
      picture.hidden = false;
      picture.alt = variant ? `英文情境改編：${variant.title}，${variant.grammar}四格漫畫，含中文翻譯。` : card.querySelector('img').alt;
      picture.src = variant?.image || `assets/japanese-comics/${selected}.webp`;
      resetZoom();
    }
    if (!dialog.open) {
      document.body.classList.add('viewer-open');
      dialog.showModal();
      close.focus();
    }
  }

  function syncLocation() {
    closing = false;
    const url = new URL(location.href);
    const filter = knownFilters.has(url.searchParams.get('lesson')) ? url.searchParams.get('lesson') : 'all';
    visible = cards.filter(card => filter === 'all' || card.dataset.lesson === filter);
    cards.forEach(card => { card.hidden = !visible.includes(card); });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    const label = { all: '全部', l1: '第1課', l2: '第2課', l3: '第3課', l4: '第4課', l5: '第5課', supplement: '跨課補充', j1: '初級複習 J1', j2: '初級複習 J2', j3: '初級複習 J3' }[filter];
    document.getElementById('result-count').textContent = `顯示${label} ${visible.length} 張`;
    const id = url.hash.startsWith('#comic=') ? url.hash.slice(7) : '';
    const card = visible.find(item => item.dataset.comic === id);
    if (card) {
      renderSelection(card);
    } else {
      selected = null; selectedLanguage = 'ja';
      if (dialog.open) dialog.close();
      document.body.classList.remove('viewer-open');
      resetZoom();
      if (trigger?.isConnected && !trigger.closest('[hidden]')) trigger.focus({ preventScroll: true });
      trigger = null;
    }
  }

  function openCard(card, element) {
    if (dialog.open) return;
    trigger = element;
    const url = new URL(location.href);
    url.hash = `comic=${card.dataset.comic}`;
    url.searchParams.delete('lang');
    history.pushState({ comicViewer: true, viewerDepth: 1 }, '', url);
    syncLocation();
  }

  function closeViewer() {
    if (!dialog.open || closing) return;
    closing = true;
    if (history.state?.comicViewer) {
      if ((history.state.viewerDepth || 1) > 1) history.go(-history.state.viewerDepth); else history.back();
    } else {
      const url = new URL(location.href);
      url.hash = '';
      url.searchParams.delete('lang');
      history.replaceState(null, '', url);
      syncLocation();
    }
  }

  function step(direction) {
    const index = visible.findIndex(card => card.dataset.comic === selected);
    const card = visible[index + direction];
    if (!card) return;
    const url = new URL(location.href);
    url.hash = `comic=${card.dataset.comic}`;
    if (selectedLanguage === 'en' && variants[card.dataset.comic]?.en) url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(history.state, '', url);
    renderSelection(card);
  }

  cards.forEach(card => card.querySelector('[data-open]').addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openCard(card, event.currentTarget);
  }));
  filters.forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const url = new URL(location.href);
    if (button.dataset.filter === 'all') url.searchParams.delete('lesson');
    else url.searchParams.set('lesson', button.dataset.filter);
    url.hash = '';
    url.searchParams.delete('lang');
    history.pushState(null, '', url);
    syncLocation();
  }));
  for (const language of ['ja', 'en']) document.getElementById(`viewer-language-${language}`).addEventListener('click', () => {
    if (!selected || language === selectedLanguage || !variants[selected]?.en) return;
    const url = new URL(location.href);
    if (language === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    const state = history.state?.comicViewer ? { ...history.state, viewerDepth: (history.state.viewerDepth || 1) + 1 } : null;
    history.pushState(state, '', url);
    syncLocation();
  });
  close.addEventListener('click', closeViewer);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeViewer(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeViewer(); });
  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  zoom.addEventListener('click', () => {
    const enlarged = stage.classList.toggle('zoomed');
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.textContent = enlarged ? '符合畫面' : '放大細看';
    stage.scrollTo(0, 0);
  });
  dialog.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    // In the enlarged image, arrow keys retain their native scrolling behavior.
    if (event.target === stage && stage.classList.contains('zoomed')) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
  });
  picture.addEventListener('error', () => { picture.hidden = true; document.getElementById('viewer-error').hidden = false; });
  picture.addEventListener('load', () => { picture.hidden = false; document.getElementById('viewer-error').hidden = true; });
  window.addEventListener('popstate', syncLocation);
  window.addEventListener('hashchange', syncLocation);
  syncLocation();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js?v=5.8.75').catch(console.error));
  }
})();
