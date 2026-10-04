/* Google online Japanese / English audio, matching japanese-ai-learning/js/lesson.js.
 * No device-voice fallback, recording, or audio export. */
(() => {
  'use strict';
  const COMICS = typeof module !== 'undefined' && module.exports ? require('./voiced-comics-data.js') : globalThis.VOICED_COMICS;
  const VARIANTS = typeof module !== 'undefined' && module.exports ? require('./comic-language-variants.js') : globalThis.COMIC_LANGUAGE_VARIANTS;
  const resolveComic = (base, language) => VARIANTS?.[base.id]?.[language] ? { ...base, ...VARIANTS[base.id][language] } : base;
  const DEFAULT = COMICS[0];
  const CUES = DEFAULT.cues, PANELS = DEFAULT.panels;
  const ACTIVE = new Set(['starting', 'speaking', 'gap']);
  class ComicPlayer {
    constructor({ Audio, comic = DEFAULT, onChange = () => {}, clock = globalThis }) {
      this.comic = comic; this.cues = comic.cues; this.panels = comic.panels;
      this.Audio = Audio; this.audio = null; this.detachAudio = null;
      this.onChange = onChange; this.clock = clock;
      this.index = 0; this.state = 'idle'; this.rate = 0.95; this.practice = false;
      this.message = ''; this.diagnostic = ''; this.seconds = 0; this.generation = 0;
      this.timer = null; this.ticker = null; this.single = false;
    }
    get language() { return this.comic.language === 'en' ? 'en' : 'ja'; }
    get languageName() { return this.language === 'en' ? '英語' : '日語'; }
    setComic(comic) {
      this.cancel(); this.comic = comic; this.cues = comic.cues; this.panels = comic.panels;
      this.index = 0; this.state = 'idle'; this.message = ''; this.diagnostic = ''; this.seconds = 0; this.single = false;
      this.emit();
    }
    emit() { this.onChange(this); }
    now() { return this.clock.Date ? this.clock.Date.now() : Date.now(); }
    clearTimers() {
      this.clock.clearTimeout(this.timer); this.clock.clearInterval(this.ticker);
      this.timer = null; this.ticker = null;
    }
    cancel() {
      // Invalidate callbacks and detach listeners BEFORE aborting pending media.
      ++this.generation; this.clearTimers();
      this.detachAudio?.(); this.detachAudio = null;
      if (this.audio) {
        try { this.audio.pause(); } catch { /* Keep cleanup independent. */ }
        try { this.audio.removeAttribute('src'); this.audio.load(); } catch { /* Retry can still replace src. */ }
      }
    }
    fail(message) { this.cancel(); this.state = 'error'; this.message = message; this.emit(); }
    select(index) {
      if (!Number.isInteger(index) || !this.cues[index]) return;
      this.cancel(); this.index = index; this.state = 'idle'; this.message = ''; this.diagnostic = ''; this.emit();
    }
    stop() { this.select(0); }
    pause(message = '已暫停。按「繼續」會從本句重播。') {
      if (!ACTIVE.has(this.state)) return;
      this.cancel(); this.state = 'paused'; this.message = message; this.emit();
    }
    configure({ rate = this.rate, practice = this.practice } = {}) {
      this.pause('設定已更新。按「繼續」用新設定重播本句。');
      this.rate = rate; this.practice = practice; this.emit();
    }
    play({ restart = false, single = false } = {}) {
      if (ACTIVE.has(this.state) && !restart && !single) return;
      this.cancel(); this.single = single; this.diagnostic = '';
      if (restart || (this.state === 'ended' && !single)) this.index = 0;
      if (!this.cues[this.index].text) {
        const next = this.cues.findIndex((cue, index) => index >= this.index && cue.text);
        this.index = next >= 0 ? next : this.cues.findIndex(cue => cue.text);
      }
      if (this.index < 0) { this.index = 0; this.fail('這張漫畫沒有可朗讀的台詞。'); return; }
      if (typeof this.Audio !== 'function') {
        this.fail('這個瀏覽器不支援音訊播放。請用 Safari 或 Chrome 開啟此頁。'); return;
      }
      try {
        // Reuse the element unlocked by the first tap for subsequent iOS cues.
        if (!this.audio) this.audio = new this.Audio();
      } catch {
        this.fail('Google 音訊播放器無法啟動。請用 Safari 或 Chrome 開啟此頁。'); return;
      }
      const audio = this.audio;
      const generation = this.generation;
      const live = () => generation === this.generation;
      let started = false, finished = false, began = 0;
      const failed = error => {
        if (!live() || finished) return;
        finished = true;
        // Keep browser-provided media diagnostics visible for troubleshooting.
        this.diagnostic = [error?.name, audio.error?.code ? `MediaError ${audio.error.code}` : '', audio.error?.message || error?.message].filter(Boolean).join(' · ').slice(0, 400);
        this.fail(error?.name === 'NotAllowedError'
          ? '瀏覽器尚未允許 Google 語音播放。請按「重試播放」啟動本句；若仍無法播放，請用 Safari／Chrome 開啟。'
          : 'Google 語音載入失敗。請確認網路後按「重試播放」。已停在本句，不會改用裝置聲音。');
      };
      const onMeta = () => { if (live() && !finished) audio.playbackRate = this.rate; };
      const onPlaying = () => {
        if (!live() || finished || started) return;
        started = true; began = this.now(); this.clearTimers();
        this.state = 'speaking'; this.message = `正在播放 Google ${this.languageName}`; this.emit();
        this.timer = this.clock.setTimeout(() => {
          if (live()) this.fail('Google 語音播放中斷或等待過久。請確認網路後按「重試播放」。不會改用裝置聲音。');
        }, 45000);
      };
      const onEnded = () => {
        if (!live() || finished) return;
        finished = true;
        if (!started) { this.fail('Google 語音沒有成功開始。請按「重試播放」。已停在本句，不會改用裝置聲音。'); return; }
        this.clearTimers(); this.detachAudio?.(); this.detachAudio = null;
        if (this.single) { this.state = 'paused'; this.message = '本句播放完畢。可再聽一次，或按「繼續」接著練。'; this.emit(); return; }
        const duration = this.practice ? Math.min(12000, Math.max(2500, this.now() - began + 800)) : 650;
        this.state = 'gap'; this.seconds = Math.ceil(duration / 1000);
        this.message = this.practice ? '換你說' : '準備下一句'; this.emit();
        const deadline = this.now() + duration;
        if (this.practice) this.ticker = this.clock.setInterval(() => {
          if (!live()) return;
          this.seconds = Math.max(1, Math.ceil((deadline - this.now()) / 1000)); this.emit();
        }, 250);
        this.timer = this.clock.setTimeout(() => {
          if (!live()) return;
          this.clearTimers();
          const next = this.cues.findIndex((cue, index) => index > this.index && cue.text);
          if (next < 0) { this.state = 'ended'; this.message = `${this.cues.filter(cue => cue.text).length} 句都練完了！可以重頭再聽一次。`; this.emit(); }
          else { this.index = next; this.state = 'idle'; this.play(); }
        }, duration);
      };
      this.detachAudio = () => {
        audio.removeEventListener('loadedmetadata', onMeta);
        audio.removeEventListener('playing', onPlaying);
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', failed);
      };
      audio.addEventListener('loadedmetadata', onMeta);
      audio.addEventListener('playing', onPlaying);
      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', failed);
      this.state = 'starting'; this.message = `正在載入 Google ${this.languageName}語音…`; this.emit();
      this.timer = this.clock.setTimeout(() => {
        if (live()) this.fail('Google 語音載入逾時。請確認網路後按「重試播放」。已停在本句，不會改用裝置聲音。');
      }, 8000);
      try {
        audio.preload = 'auto';
        // Only the selected variant language changes; retain the original Google source.
        audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${this.language}&client=tw-ob&q=${encodeURIComponent(this.cues[this.index].text)}`;
        audio.playbackRate = this.rate;
        audio.preservesPitch = true;
        // Call play() directly in the click handler, not after fetch/canplay awaits.
        const pending = audio.play();
        if (pending && typeof pending.catch === 'function') pending.catch(failed);
      } catch (error) { failed(error); }
    }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { ComicPlayer, CUES, PANELS, COMICS, VARIANTS, resolveComic };
  if (typeof document === 'undefined') return;
  const byId = id => document.getElementById(id);
  const requested = new URLSearchParams(location.search).get('comic') || DEFAULT.id;
  const baseComic = COMICS.find(item => item.id === requested);
  let comic = baseComic && resolveComic(baseComic, new URLSearchParams(location.search).get('lang'));
  if (!comic) {
    byId('page-title').textContent = '找不到這張有聲漫畫';
    byId('intro-copy').textContent = '請返回日文文法漫畫，選擇想練習的一張。';
    for (const id of ['comic-navigation', 'player', 'script-section', 'grammar-note']) byId(id).hidden = true;
    byId('edition').hidden = true; byId('grammar').hidden = true;
    byId('full-comic').href = 'japanese-comics.html';
    byId('full-image').hidden = true;
    return;
  }
  let cues = comic.cues, panels = comic.panels;
  let spoken = cues.map((cue, index) => cue.text ? index : -1).filter(index => index >= 0);
  const imageElement = byId('panel-image').querySelector('image');
  const position = COMICS.indexOf(baseComic);
  COMICS.forEach(item => {
    const option = document.createElement('option'); option.value = item.id;
    option.textContent = `${item.label} · ${item.title}`; option.selected = item === baseComic;
    byId('comic-select').append(option);
  });
  for (const [id, offset] of [['previous-comic', -1], ['next-comic', 1]]) {
    const destination = COMICS[position + offset];
    byId(id).hidden = !destination;
    if (destination) byId(id).href = `voiced-comic.html?comic=${destination.id}`;
  }
  byId('comic-position').textContent = `${position + 1} / ${COMICS.length}`;
  const make = (tag, className, text) => { const element = document.createElement(tag); if (className) element.className = className; if (text) element.textContent = text; return element; };
  let imageReady = false;
  const audioSupported = typeof window.Audio === 'function';
  const player = new ComicPlayer({ Audio: window.Audio, comic, onChange: render });
  function render() {
    const cue = cues[player.index], panel = panels[cue.panel], active = ACTIVE.has(player.state);
    byId('panel-label').textContent = `第 ${cue.panel + 1} 格 / ${panels.length} · ${panel.title}`;
    byId('panel-image').setAttribute('viewBox', panel.crop);
    byId('panel-image').setAttribute('aria-label', panel.alt);
    const crop = panel.crop.split(' ').map(Number);
    byId('scene-frame').style.aspectRatio = `${crop[2]} / ${crop[3]}`;
    byId('scene-badge').textContent = panel.label || (cue.text ? `${player.languageName}台詞` : '情境／圖解');
    byId('speaker').textContent = cue.speaker;
    byId('subtitle').textContent = cue.subtitle;
    byId('subtitle').lang = cue.text ? player.language : 'zh-Hant';
    byId('translation').textContent = cue.translation;
    document.querySelectorAll('[data-panel]').forEach(button => {
      if (Number(button.dataset.panel) === cue.panel) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-cue]').forEach(button => {
      if (Number(button.dataset.cue) === player.index) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    const ready = imageReady && audioSupported;
    let status = player.message;
    if (!status) status = !imageReady ? '正在載入漫畫…' : !audioSupported ? '這個瀏覽器不支援音訊，可閱讀台詞或改用 Safari／Chrome。' : cue.text ? '已選好這一句。按「播放」開始。' : '此格是情境／圖解。按「播放」會從接下來的台詞開始；若沒有下一句，從第一句開始。';
    if (player.state === 'speaking') status = `Google ${player.languageName} · 正在朗讀第 ${spoken.indexOf(player.index) + 1} / ${spoken.length} 句`;
    if (player.state === 'gap' && player.practice) status = '換你說 · 試著把剛才的一句說出來。';
    byId('practice-countdown').textContent = player.state === 'gap' && player.practice ? `還有 ${player.seconds} 秒` : '';
    byId('practice-countdown').hidden = !(player.state === 'gap' && player.practice);
    const statusNode = byId('playback-status');
    if (statusNode.textContent !== status) statusNode.textContent = status;
    statusNode.dataset.state = player.state;
    byId('audio-error-detail').textContent = player.diagnostic ? `瀏覽器回報：${player.diagnostic}` : '';
    byId('audio-error-detail').hidden = !player.diagnostic;
    byId('play').disabled = !ready || active;
    byId('play').textContent = player.state === 'paused' ? '▶ 繼續' : player.state === 'error' ? '▶ 重試播放' : player.state === 'ended' ? '▶ 再播放一次' : '▶ 播放';
    byId('pause').disabled = !active;
    byId('stop').disabled = player.index === 0 && player.state === 'idle';
    byId('replay').disabled = !ready;
    byId('repeat').disabled = !ready || !cue.text;
  }
  byId('play').addEventListener('click', () => player.play());
  byId('pause').addEventListener('click', () => player.pause());
  byId('stop').addEventListener('click', () => player.stop());
  byId('replay').addEventListener('click', () => player.play({ restart: true }));
  byId('repeat').addEventListener('click', () => player.play({ single: true }));
  byId('speed').addEventListener('change', event => player.configure({ rate: Number(event.target.value) }));
  byId('mode').addEventListener('change', event => player.configure({ practice: event.target.value === 'practice' }));
  byId('comic-select').addEventListener('change', event => {
    const id = event.target.value;
    const languageQuery = player.language === 'en' && VARIANTS?.[id]?.en ? '&lang=en' : '';
    player.stop(); location.href = `voiced-comic.html?comic=${encodeURIComponent(id)}${languageQuery}`;
  });
  document.querySelectorAll('a').forEach(link => link.addEventListener('click', () => player.stop()));
  window.addEventListener('pagehide', () => player.stop());
  window.addEventListener('popstate', syncLanguage);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) player.pause('頁面已切到背景，朗讀已暫停。回來後按「繼續」。');
  });
  let imageGeneration = 0;
  function syncLanguage() {
    comic = resolveComic(baseComic, new URLSearchParams(location.search).get('lang'));
    cues = comic.cues; panels = comic.panels;
    spoken = cues.map((cue, index) => cue.text ? index : -1).filter(index => index >= 0);
    imageReady = false;
    player.setComic(comic);
    const languageQuery = player.language === 'en' ? '&lang=en' : '';
    for (const [id, offset] of [['previous-comic', -1], ['next-comic', 1]]) {
      const destination = COMICS[position + offset];
      if (destination) byId(id).href = `voiced-comic.html?comic=${destination.id}${player.language === 'en' && VARIANTS?.[destination.id]?.en ? '&lang=en' : ''}`;
    }
    document.title = `${comic.title}・有聲漫畫｜Eva的資料庫`;
    byId('page-title').textContent = comic.title;
    byId('edition').textContent = `${comic.label} · 有聲漫畫`;
    byId('grammar').textContent = comic.grammar;
    byId('intro-copy').textContent = comic.caption;
    byId('back-gallery').href = `japanese-comics.html?lesson=${comic.lesson}`;
    byId('full-comic').href = `japanese-comics.html?lesson=${comic.lesson}${languageQuery}#comic=${comic.id}`;
    byId('full-image').href = comic.image;
    byId('grammar-summary').textContent = comic.grammar;
    byId('grammar-explanation').textContent = comic.caption;
    byId('provenance').textContent = comic.provenance;
    byId('reading-notes').textContent = comic.readingNote || '台詞依原圖排列；原句、補充例句與對話的標示沿用原漫畫。';
    byId('script-title').textContent = `把這 ${spoken.length} 句，說順一點。`;
    imageElement.setAttribute('href', comic.image);
    imageElement.setAttribute('width', comic.width); imageElement.setAttribute('height', comic.height);

    byId('grammar').lang = player.language; byId('grammar-summary').lang = player.language;
    byId('language-switch').hidden = !VARIANTS?.[baseComic.id]?.en;
    byId('language-ja').setAttribute('aria-pressed', String(player.language === 'ja'));
    byId('language-en').setAttribute('aria-pressed', String(player.language === 'en'));
    byId('edition').textContent = `${comic.label} · ${player.language === 'en' ? '英文版' : '日文版'} · 有聲漫畫`;
    byId('player').setAttribute('aria-label', `${player.languageName}有聲漫畫播放器`);
    byId('voice-source').textContent = `Google 線上${player.languageName}`;
    byId('voice-heading').textContent = `Google ${player.languageName} AI 合成朗讀 · 手動開始`;
    byId('panel-nav').replaceChildren(); byId('script-list').replaceChildren();
    panels.forEach((panel, index) => {
      const button = make('button', '', ''); button.type = 'button'; button.dataset.panel = index;
      button.setAttribute('aria-label', `第 ${index + 1} 格：${panel.title}`);
      button.append(make('span', '', String(index + 1).padStart(2, '0')), document.createTextNode((panel.label || `第${index + 1}格`).replace('OneNote ', '').replace('補充對話', '對話').replace('補充例句', '活用')));
      byId('panel-nav').append(button);
    });
    spoken.forEach((index, number) => {
      const cue = cues[index], item = make('li'), button = make('button'); button.type = 'button'; button.dataset.cue = index;
      const content = make('span'), japanese = make('span', 'line-ja', cue.subtitle); japanese.lang = comic.language || 'ja';
      content.append(japanese, make('span', 'line-zh', cue.translation));
      button.append(make('span', 'line-number', String(number + 1).padStart(2, '0')), content, make('span', 'line-role', `第${cue.panel + 1}格`));
      item.append(button); byId('script-list').append(item);
    });
    document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', () => player.select(panels[Number(button.dataset.panel)].first)));
    document.querySelectorAll('[data-cue]').forEach(button => button.addEventListener('click', () => {
      player.select(Number(button.dataset.cue));
      byId('player').scrollIntoView({ block: 'start', behavior: 'instant' });
      byId('play').focus({ preventScroll: true });
    }));

    const generation = ++imageGeneration;
    const picture = new Image();
    picture.onload = () => { if (generation !== imageGeneration) return; imageReady = true; byId('image-error').hidden = true; render(); };
    picture.onerror = () => { if (generation !== imageGeneration) return; imageReady = false; byId('image-error').hidden = false; player.fail('漫畫圖片無法載入。請連線後重新整理。'); };
    byId('image-error').hidden = true;
    picture.src = comic.image;
    render();
  }
  for (const language of ['ja', 'en']) byId(`language-${language}`).addEventListener('click', () => {
    if (player.language === language || !VARIANTS?.[baseComic.id]?.[language] && language !== 'ja') return;
    const url = new URL(location.href);
    if (language === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    history.pushState(null, '', url);
    syncLanguage();
  });
  syncLanguage();
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js?v=5.6.15').catch(console.error));
})();
