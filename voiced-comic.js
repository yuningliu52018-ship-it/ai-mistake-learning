/* Google online Japanese audio, matching japanese-ai-learning/js/lesson.js.
 * No device-voice fallback, recording, or audio export. */
(() => {
  'use strict';
  const PANELS = [
    { title: '筆記抄不完', crop: '8 102 1010 287', alt: '第1格：同學在教室裡來不及抄完筆記。', first: 0 },
    { title: '委婉地請求', crop: '8 399 1010 319', alt: '第2格：同學請林同學讓她看筆記。', first: 1 },
    { title: '答應與道謝', crop: '8 726 1010 302', alt: '第3格：林同學借出筆記，另一位同學道謝。', first: 2 },
    { title: '換個情境試試', crop: '8 1038 1010 399', alt: '第4格：旅行時，請別人幫忙拍照的補充例句。', first: 4 }
  ];
  const CUES = [
    { panel: 0, text: '', subtitle: '糟了，筆記抄不完……', translation: '先看看兩位同學，再按播放，聽她怎麼開口。', speaker: '情境開場 · 無日文台詞' },
    { panel: 1, text: 'りんさん、ノートを見せてもらえませんか。', subtitle: '林さん、ノートを見せてもらえませんか。', translation: '林同學，可以讓我看一下筆記嗎？', speaker: '同學 · 禮貌請求' },
    { panel: 2, text: 'どうぞ。', subtitle: 'どうぞ。', translation: '請用。', speaker: '林同學 · 答應' },
    { panel: 2, text: 'ありがとうございます。', subtitle: 'ありがとうございます。', translation: '謝謝你。', speaker: '同學 · 道謝' },
    { panel: 3, text: '写真を撮ってもらえませんか。', subtitle: '写真を撮ってもらえませんか。', translation: '可以幫我拍照嗎？', speaker: '活用例句 · 補充' }
  ];
  const ACTIVE = new Set(['starting', 'speaking', 'gap']);
  class ComicPlayer {
    constructor({ Audio, onChange = () => {}, clock = globalThis }) {
      this.Audio = Audio; this.audio = null; this.detachAudio = null;
      this.onChange = onChange; this.clock = clock;
      this.index = 0; this.state = 'idle'; this.rate = 0.95; this.practice = false;
      this.message = ''; this.diagnostic = ''; this.seconds = 0; this.generation = 0;
      this.timer = null; this.ticker = null; this.single = false;
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
      if (!Number.isInteger(index) || !CUES[index]) return;
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
      if (this.index === 0) this.index = 1;
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
        this.state = 'speaking'; this.message = '正在播放 Google 日語'; this.emit();
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
          if (this.index === CUES.length - 1) { this.state = 'ended'; this.message = '四句都練完了！可以重頭再聽一次。'; this.emit(); }
          else { ++this.index; this.state = 'idle'; this.play(); }
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
      this.state = 'starting'; this.message = '正在載入 Google 日語語音…'; this.emit();
      this.timer = this.clock.setTimeout(() => {
        if (live()) this.fail('Google 語音載入逾時。請確認網路後按「重試播放」。已停在本句，不會改用裝置聲音。');
      }, 8000);
      try {
        audio.preload = 'auto';
        // This is the same URL and Japanese voice method used by the original site.
        audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(CUES[this.index].text)}`;
        audio.playbackRate = this.rate;
        audio.preservesPitch = true;
        // Call play() directly in the click handler, not after fetch/canplay awaits.
        const pending = audio.play();
        if (pending && typeof pending.catch === 'function') pending.catch(failed);
      } catch (error) { failed(error); }
    }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { ComicPlayer, CUES, PANELS };
  if (typeof document === 'undefined') return;
  const byId = id => document.getElementById(id);
  let imageReady = false;
  const audioSupported = typeof window.Audio === 'function';
  const player = new ComicPlayer({ Audio: window.Audio, onChange: render });
  function render() {
    const cue = CUES[player.index], panel = PANELS[cue.panel], active = ACTIVE.has(player.state);
    byId('panel-label').textContent = `第 ${cue.panel + 1} 格 / 4 · ${panel.title}`;
    byId('panel-image').setAttribute('viewBox', panel.crop);
    byId('panel-image').setAttribute('aria-label', panel.alt);
    byId('scene-badge').textContent = cue.panel === 3 ? '補充例句' : cue.panel === 0 ? '情境' : '日語對話';
    byId('speaker').textContent = cue.speaker;
    byId('subtitle').textContent = cue.subtitle;
    byId('subtitle').lang = cue.text ? 'ja' : 'zh-Hant';
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
    if (!status) status = !imageReady ? '正在載入漫畫…' : !audioSupported ? '這個瀏覽器不支援音訊，可閱讀台詞或改用 Safari／Chrome。' : player.index === 0 ? '準備好了。按「播放」，從第 2 格開始聽。' : '已選好這一句。按「播放」開始。';
    if (player.state === 'speaking') status = `Google 日語 · 正在朗讀第 ${player.index} / 4 句`;
    if (player.state === 'gap' && player.practice) status = '換你說 · 試著把剛才的一句說出來。';
    byId('practice-countdown').textContent = player.state === 'gap' && player.practice ? `還有 ${player.seconds} 秒` : '';
    byId('practice-countdown').hidden = !(player.state === 'gap' && player.practice);
    const statusNode = byId('playback-status');
    // Avoid announcing the same status repeatedly on countdown timer ticks.
    if (statusNode.textContent !== status) statusNode.textContent = status;
    statusNode.dataset.state = player.state;
    byId('audio-error-detail').textContent = player.diagnostic ? `瀏覽器回報：${player.diagnostic}` : '';
    byId('audio-error-detail').hidden = !player.diagnostic;
    byId('play').disabled = !ready || active;
    byId('play').textContent = player.state === 'paused' ? '▶ 繼續' : player.state === 'error' ? '▶ 重試播放' : player.state === 'ended' ? '▶ 再播放一次' : '▶ 播放';
    byId('pause').disabled = !active;
    byId('stop').disabled = player.index === 0 && !active;
    byId('replay').disabled = !ready;
    byId('repeat').disabled = !ready || player.index === 0;
  }
  byId('play').addEventListener('click', () => player.play());
  byId('pause').addEventListener('click', () => player.pause());
  byId('stop').addEventListener('click', () => player.stop());
  byId('replay').addEventListener('click', () => player.play({ restart: true }));
  byId('repeat').addEventListener('click', () => player.play({ single: true }));
  byId('speed').addEventListener('change', event => player.configure({ rate: Number(event.target.value) }));
  byId('mode').addEventListener('change', event => player.configure({ practice: event.target.value === 'practice' }));
  document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', () => player.select(PANELS[Number(button.dataset.panel)].first)));
  document.querySelectorAll('[data-cue]').forEach(button => button.addEventListener('click', () => {
    player.select(Number(button.dataset.cue));
    byId('player').scrollIntoView({ block: 'start', behavior: 'instant' });
    byId('play').focus({ preventScroll: true });
  }));
  window.addEventListener('pagehide', () => player.stop());
  window.addEventListener('popstate', () => player.stop());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) player.pause('頁面已切到背景，朗讀已暫停。回來後按「繼續」。');
  });
  const picture = new Image();
  picture.onload = () => { imageReady = true; byId('image-error').hidden = true; render(); };
  picture.onerror = () => { imageReady = false; byId('image-error').hidden = false; player.fail('漫畫圖片無法載入。請連線後重新整理。'); };
  picture.src = 'assets/japanese-comics/l1-01-polite-request.webp';
  render();
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js?v=5.2.2').catch(console.error));
})();
