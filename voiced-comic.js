/* Native Web Speech playback. No downloaded audio, microphone, or external TTS endpoint. */
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
    constructor({ synth, Utterance, getVoice, onChange = () => {}, clock = globalThis }) {
      this.synth = synth; this.Utterance = Utterance; this.getVoice = getVoice;
      this.onChange = onChange; this.clock = clock;
      this.index = 0; this.state = 'idle'; this.rate = 0.95; this.practice = false;
      this.message = ''; this.seconds = 0; this.generation = 0;
      this.timer = null; this.ticker = null; this.utterance = null; this.single = false;
    }
    emit() { this.onChange(this); }
    now() { return this.clock.Date ? this.clock.Date.now() : Date.now(); }
    clearTimers() {
      this.clock.clearTimeout(this.timer); this.clock.clearInterval(this.ticker);
      this.timer = null; this.ticker = null;
    }
    cancel() {
      // Invalidate callbacks BEFORE cancel(), including synchronous browser errors.
      ++this.generation; this.clearTimers(); this.utterance = null;
      try { this.synth?.cancel(); } catch { /* Unsupported engine is handled by play(). */ }
    }
    fail(message) { this.cancel(); this.state = 'error'; this.message = message; this.emit(); }
    select(index) {
      if (!Number.isInteger(index) || !CUES[index]) return;
      this.cancel(); this.index = index; this.state = 'idle'; this.message = ''; this.emit();
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
      this.cancel(); this.single = single;
      if (restart || (this.state === 'ended' && !single)) this.index = 0;
      if (this.index === 0) this.index = 1;
      if (!this.synth || !this.Utterance) {
        this.fail('這個瀏覽器不支援朗讀。請用 Safari 或 Chrome 開啟此頁。'); return;
      }
      let voice;
      try { voice = this.getVoice(); } catch { /* Voice service may be unavailable. */ }
      if (!voice || !/^ja(?:[-_]|$)/i.test(voice.lang)) {
        this.fail('目前沒有可用的日語聲音。請加入裝置日語聲音，再按「重新偵測日語聲音」。'); return;
      }
      const generation = this.generation;
      const live = () => generation === this.generation;
      let started = false, finished = false, began = 0;
      const utterance = new this.Utterance(CUES[this.index].text);
      // Retain the utterance until completion; some browser engines need this reference.
      this.utterance = utterance;
      utterance.lang = 'ja-JP'; utterance.voice = voice; utterance.rate = this.rate;
      utterance.pitch = 1; utterance.volume = 1;
      this.state = 'starting'; this.message = '正在啟動日語朗讀…'; this.emit();
      this.timer = this.clock.setTimeout(() => {
        if (live()) this.fail('朗讀沒有啟動。請確認網路與音量，改選日語聲音，再按「重試播放」。');
      }, 8000);
      utterance.onstart = () => {
        if (!live() || finished || started) return;
        started = true; began = this.now(); this.clearTimers();
        this.state = 'speaking'; this.message = '正在朗讀'; this.emit();
        // Do not hang forever if an online device voice never reports completion.
        this.timer = this.clock.setTimeout(() => {
          if (live()) this.fail('朗讀中斷或等待過久。請確認網路，或改選另一個日語聲音後重試。');
        }, 45000);
      };
      utterance.onerror = event => {
        if (!live() || finished) return;
        finished = true;
        const blocked = event.error === 'not-allowed';
        this.fail(blocked ? '瀏覽器尚未允許播放。請再按一次「重試播放」，或用 Safari／Chrome 開啟。' : '這個聲音暫時無法播放。請確認網路，改選日語聲音，再按「重試播放」。');
      };
      utterance.onend = () => {
        if (!live() || finished) return;
        finished = true;
        if (!started) { this.fail('沒有收到朗讀開始訊號。請改選日語聲音，再按「重試播放」。'); return; }
        this.clearTimers(); this.utterance = null;
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
      try {
        // Call speak() synchronously from the initial click for mobile gesture rules.
        // Resume clears a paused engine left by browser lifecycle events.
        if (this.synth.paused) this.synth.resume();
        this.synth.speak(utterance);
      } catch { if (live()) this.fail('朗讀無法啟動。請換個日語聲音，或用 Safari／Chrome 開啟。'); }
    }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { ComicPlayer, CUES, PANELS };
  if (typeof document === 'undefined') return;
  const byId = id => document.getElementById(id);
  const synth = window.speechSynthesis;
  let voices = [], imageReady = false;
  const voiceSelect = byId('voice');
  const player = new ComicPlayer({ synth, Utterance: window.SpeechSynthesisUtterance,
    getVoice: () => voices.find(v => v.voiceURI === voiceSelect.value), onChange: render });
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
    const ready = imageReady && voices.length > 0 && !!synth && !!window.SpeechSynthesisUtterance;
    let status = player.message;
    if (!status) status = !imageReady ? '正在載入漫畫…' : !synth ? '這個瀏覽器不支援朗讀，可閱讀台詞或改用 Safari／Chrome。' : !voices.length ? '尚未找到日語聲音。可先看漫畫，或展開下方說明。' : player.index === 0 ? '準備好了。按「播放」，從第 2 格開始聽。' : '已選好這一句。按「播放」開始。';
    if (player.state === 'speaking') status = `正在朗讀第 ${player.index} / 4 句`;
    if (player.state === 'gap' && player.practice) status = '換你說 · 試著把剛才的一句說出來。';
    byId('practice-countdown').textContent = player.state === 'gap' && player.practice ? `還有 ${player.seconds} 秒` : '';
    byId('practice-countdown').hidden = !(player.state === 'gap' && player.practice);
    const statusNode = byId('playback-status');
    // Avoid announcing the same status repeatedly on countdown timer ticks.
    if (statusNode.textContent !== status) statusNode.textContent = status;
    statusNode.dataset.state = player.state;
    byId('play').disabled = !ready || active;
    byId('play').textContent = player.state === 'paused' ? '▶ 繼續' : player.state === 'error' ? '▶ 重試播放' : player.state === 'ended' ? '▶ 再播放一次' : '▶ 播放';
    byId('pause').disabled = !active;
    byId('stop').disabled = player.index === 0 && !active;
    byId('replay').disabled = !ready;
    byId('repeat').disabled = !ready || player.index === 0;
  }
  function refreshVoices() {
    const selected = voiceSelect.value;
    try { voices = synth ? synth.getVoices().filter(v => /^ja(?:[-_]|$)/i.test(v.lang)) : []; }
    catch { voices = []; }
    voiceSelect.replaceChildren();
    if (!voices.length) {
      const option = document.createElement('option'); option.value = ''; option.textContent = '尚未找到日語聲音'; voiceSelect.append(option);
    } else voices.forEach(voice => {
      const option = document.createElement('option'); option.value = voice.voiceURI;
      option.textContent = `${voice.name}${voice.localService ? '' : '（需網路）'}`; voiceSelect.append(option);
    });
    if (voices.some(v => v.voiceURI === selected)) voiceSelect.value = selected;
    if (selected && !voices.some(v => v.voiceURI === selected)) player.pause('原本的聲音已不可用。請選日語聲音，再按「繼續」。');
    voiceSelect.disabled = voices.length === 0;
    render();
  }
  byId('play').addEventListener('click', () => player.play());
  byId('pause').addEventListener('click', () => player.pause());
  byId('stop').addEventListener('click', () => player.stop());
  byId('replay').addEventListener('click', () => player.play({ restart: true }));
  byId('repeat').addEventListener('click', () => player.play({ single: true }));
  byId('speed').addEventListener('change', event => player.configure({ rate: Number(event.target.value) }));
  byId('mode').addEventListener('change', event => player.configure({ practice: event.target.value === 'practice' }));
  voiceSelect.addEventListener('change', () => player.pause('聲音已切換。按「繼續」重播本句。'));
  byId('refresh-voices').addEventListener('click', refreshVoices);
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
  if (synth?.addEventListener) synth.addEventListener('voiceschanged', refreshVoices);
  const picture = new Image();
  picture.onload = () => { imageReady = true; byId('image-error').hidden = true; render(); };
  picture.onerror = () => { imageReady = false; byId('image-error').hidden = false; player.fail('漫畫圖片無法載入。請連線後重新整理。'); };
  picture.src = 'assets/japanese-comics/l1-01-polite-request.webp';
  refreshVoices();
  // A few engines populate voices late without an event. Bounded retry, no autoplay.
  [500, 1500, 3000].forEach(delay => window.setTimeout(refreshVoices, delay));
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js?v=5.2.0').catch(console.error));
})();
