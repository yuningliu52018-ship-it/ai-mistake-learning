const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ComicPlayer, CUES, PANELS } = require('../voiced-comic.js');
function setup({ supports = true, constructorThrows = false, playThrows = false, legacy = false } = {}) {
  let now = 0, id = 0, constructs = 0;
  const tasks = new Map();
  const clock = {
    Date: { now: () => now },
    setTimeout(fn, delay) { tasks.set(++id, { fn, at: now + delay }); return id; },
    clearTimeout(key) { tasks.delete(key); },
    setInterval(fn, delay) { tasks.set(++id, { fn, at: now + delay, interval: delay }); return id; },
    clearInterval(key) { tasks.delete(key); }
  };
  function tick(ms) {
    const end = now + ms;
    while (true) {
      const next = [...tasks].filter(([, t]) => t.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      const [key, job] = next; now = job.at;
      if (job.interval) job.at += job.interval; else tasks.delete(key);
      job.fn();
    }
    now = end;
  }
  const played = [];
  class Audio {
    constructor() { ++constructs; if (constructorThrows) throw Error('no audio'); this.listeners = new Map(); this.src = ''; this.pauses = 0; this.loads = 0; }
    addEventListener(type, fn) { this.listeners.set(type, fn); }
    removeEventListener(type, fn) { if (this.listeners.get(type) === fn) this.listeners.delete(type); }
    removeAttribute(name) { if (name === 'src') this.src = ''; }
    pause() { ++this.pauses; this.listeners.get('error')?.({}); }
    load() { ++this.loads; this.listeners.get('error')?.({}); }
    play() {
      const session = { src: this.src, rate: this.playbackRate, callbacks: Object.fromEntries(this.listeners), audio: this };
      played.push(session);
      if (playThrows) throw Object.assign(Error('blocked'), { name: 'NotAllowedError' });
      if (!legacy) return { catch(fn) { session.reject = fn; } };
    }
  }
  const player = new ComicPlayer({ Audio: supports ? Audio : undefined, clock });
  return { player, tick, played, tasks, get constructs() { return constructs; },
    start() { played.at(-1).callbacks.playing(); }, end() { played.at(-1).callbacks.ended(); },
    error() { played.at(-1).callbacks.error({}); } };
}
test('exact Japanese, Chinese surname pronunciation, reply order, four image panels', () => {
  assert.deepEqual(CUES.slice(1).map(c => c.text), ['りんさん、ノートを見せてもらえませんか。','どうぞ。','ありがとうございます。','写真を撮ってもらえませんか。']);
  assert.equal(CUES[1].subtitle, '林さん、ノートを見せてもらえませんか。');
  assert.equal(PANELS.length, 4); assert.equal(CUES[0].text, '');
  assert.equal(CUES[2].panel, CUES[3].panel);
});
test('no autoplay or request before click; first click synchronously uses original Google source', () => {
  const h = setup(); h.tick(10000); assert.equal(h.played.length, 0); assert.equal(h.constructs, 0);
  h.player.play(); assert.equal(h.played.length, 1); assert.equal(h.player.index, 1);
  assert.equal(h.player.state, 'starting');
  const url = new URL(h.played[0].src);
  assert.equal(url.origin + url.pathname, 'https://translate.google.com/translate_tts');
  assert.equal(url.searchParams.get('ie'), 'UTF-8'); assert.equal(url.searchParams.get('tl'), 'ja');
  assert.equal(url.searchParams.get('client'), 'tw-ob'); assert.equal(url.searchParams.get('q'), CUES[1].text);
  assert.equal(h.played[0].rate, .95);
});
test('only playing then ended advances; full ordered run ends using the same Audio element', () => {
  const h = setup(); h.player.play();
  for (let i = 1; i <= 4; i++) {
    assert.equal(h.player.index, i); h.start(); assert.equal(h.player.state, 'speaking');
    h.tick(900); h.end(); assert.equal(h.player.state, 'gap'); h.tick(650);
  }
  assert.equal(h.player.state, 'ended'); assert.equal(h.played.length, 4); assert.equal(h.constructs, 1);
  assert.deepEqual(h.played.map(p => new URL(p.src).searchParams.get('q')), CUES.slice(1).map(c => c.text));
  h.tick(60000); assert.equal(h.played.length, 4);
});
test('premature ended is an error, never success or advancement', () => {
  const h = setup(); h.player.play(); h.end(); assert.equal(h.player.state, 'error');
  h.tick(60000); assert.equal(h.player.index, 1); assert.equal(h.played.length, 1);
});
test('duplicate play, playing and ended cannot overlap, reset watchdog or skip', () => {
  const h = setup(); h.player.play(); h.player.play(); assert.equal(h.played.length, 1);
  const old = h.played[0]; h.start(); h.tick(1000); h.start(); assert.equal(h.tasks.size, 1);
  h.end(); old.callbacks.ended(); old.callbacks.playing(); h.player.play(); h.tick(650);
  assert.equal(h.played.length, 2); assert.equal(h.player.index, 2);
});
test('pause cancels immediately and removes source; resume repeats current sentence, stale events ignored', () => {
  const h = setup(); h.player.play(); const old = h.played[0]; h.start(); h.player.pause();
  assert.equal(h.player.state, 'paused'); assert.equal(old.audio.src, ''); assert.equal(old.audio.listeners.size, 0);
  old.callbacks.error({}); old.callbacks.ended(); old.reject({name:'AbortError'});
  h.tick(60000); assert.equal(h.player.index, 1); assert.equal(h.player.state, 'paused');
  h.player.play(); assert.equal(h.played.length, 2); assert.equal(h.played[1].src, old.src);
  old.callbacks.playing(); old.callbacks.ended(); old.callbacks.loadedmetadata(); old.reject({name:'NotAllowedError'});
  assert.equal(h.player.state, 'starting'); assert.equal(h.constructs, 1);
});
test('stop while starting, speaking or waiting cancels timers, source and callbacks', () => {
  for (const phase of ['starting','speaking','gap']) {
    const h = setup(); h.player.play(); const old = h.played[0];
    if (phase !== 'starting') h.start(); if (phase === 'gap') h.end();
    h.player.stop(); old.callbacks.ended(); old.callbacks.error({}); old.reject({name:'AbortError'}); h.tick(60000);
    assert.equal(h.player.index, 0); assert.equal(h.player.state, 'idle'); assert.equal(h.played.length, 1); assert.equal(h.tasks.size, 0);
    assert.equal(old.audio.src, ''); assert.equal(old.audio.listeners.size, 0); assert.ok(old.audio.pauses > 0); assert.ok(old.audio.loads > 0);
  }
});
test('practice waits and counts down after every sentence, including the last', () => {
  const h = setup(); h.player.configure({practice:true,rate:.82}); h.player.select(4); h.player.play();
  assert.equal(h.played[0].rate, .82); h.start(); h.tick(4000); h.end();
  assert.equal(h.player.state, 'gap'); assert.equal(h.player.seconds, 5); h.tick(4000);
  assert.equal(h.player.state, 'gap'); assert.equal(h.player.seconds, 1); h.tick(800);
  assert.equal(h.player.state, 'ended'); assert.equal(h.tasks.size, 0);
});
test('practice duration minimum and maximum remain bounded', () => {
  for (const [speechMs,gapMs] of [[100,2500],[20000,12000]]) {
    const h=setup(); h.player.configure({practice:true}); h.player.play(); h.start(); h.tick(speechMs); h.end();
    h.tick(gapMs-1); assert.equal(h.player.index,1); h.tick(1); assert.equal(h.player.index,2);
  }
});
test('settings changes pause without auto restart; slow rate is restored after metadata', () => {
  const h = setup(); h.player.configure({practice:true}); h.player.play(); h.start(); h.end();
  h.player.configure({rate:.82}); h.tick(60000); assert.equal(h.player.state, 'paused'); assert.equal(h.played.length, 1);
  h.player.play(); assert.equal(h.played[1].rate,.82);
  h.player.audio.playbackRate = 1; h.played[1].callbacks.loadedmetadata(); assert.equal(h.player.audio.playbackRate,.82);
  assert.equal(h.player.audio.preservesPitch,true);
});
test('selecting panel or sentence stops audio; restart cancels and starts fresh', () => {
  const h = setup(); h.player.play(); const old = h.played[0]; h.start(); h.player.select(4);
  old.callbacks.ended(); h.tick(60000); assert.equal(h.player.index,4); assert.equal(h.player.state,'idle');
  h.player.play({restart:true}); assert.equal(h.player.index,1); assert.equal(h.played.length,2);
  h.start(); h.player.play({restart:true}); assert.equal(h.played.length,3); assert.equal(h.constructs,1);
});
test('single-sentence repeat does not auto advance', () => {
  const h = setup(); h.player.select(3); h.player.play({single:true}); h.start(); h.end(); h.tick(60000);
  assert.equal(h.player.index,3); assert.equal(h.player.state,'paused'); assert.equal(h.played.length,1);
});
test('no Audio API or failed constructor produces an honest error with no pending timers', () => {
  for (const args of [{supports:false},{constructorThrows:true}]) {
    const h = setup(args); h.player.play(); assert.equal(h.player.state,'error'); assert.equal(h.played.length,0); assert.equal(h.tasks.size,0);
  }
});
test('media error and rejected play keep the cue, never use device voices, and permit a gesture retry', () => {
  for (const name of ['NotAllowedError','NotSupportedError','AbortError','NetworkError','media-error']) {
    const h = setup(); h.player.play(); if (name === 'media-error') h.error(); else h.played[0].reject({name}); h.tick(60000);
    assert.equal(h.player.state,'error'); assert.equal(h.player.index,1); assert.equal(h.played.length,1); assert.equal(h.tasks.size,0);
    assert.match(h.player.message,/Google/);
    if (name === 'NotAllowedError') assert.match(h.player.message,/尚未允許/); else assert.match(h.player.message,/不會改用裝置聲音/);
    h.player.play(); assert.equal(h.played.length,2); h.start(); assert.equal(h.player.state,'speaking');
  }
});
test('blocked automatic next cue stays on that cue and can be explicitly retried', () => {
  const h=setup(); h.player.play(); h.start(); h.end(); h.tick(650);
  h.played[1].reject({name:'NotAllowedError'}); h.tick(60000); assert.equal(h.player.index,2); assert.equal(h.player.state,'error');
  h.player.play(); assert.equal(new URL(h.played[2].src).searchParams.get('q'),'どうぞ。');
});
test('startup and completion timeouts stop without advancing or retaining listeners', () => {
  const h=setup(); h.player.play(); h.tick(8000); assert.equal(h.player.state,'error'); assert.match(h.player.message,/載入逾時/);
  assert.equal(h.player.audio.listeners.size,0); assert.equal(h.player.audio.src,'');
  h.player.play(); h.start(); h.tick(45000); assert.equal(h.player.state,'error'); assert.equal(h.player.index,1); assert.equal(h.tasks.size,0);
});
test('synchronous play exception is handled; legacy play without promise still works', () => {
  const h=setup({playThrows:true}); h.player.play(); assert.equal(h.player.state,'error'); assert.equal(h.tasks.size,0);
  const legacy=setup({legacy:true}); legacy.player.play(); legacy.start(); legacy.end(); legacy.tick(650); assert.equal(legacy.player.index,2);
});
test('failed second cue cannot skip or start a device voice', () => {
  const h=setup(); h.player.play(); h.start(); h.end(); h.tick(650); h.error(); h.tick(60000);
  assert.equal(h.player.index,2); assert.equal(h.played.length,2); assert.equal(h.player.state,'error');
});
test('repeat after completed run keeps the last sentence; explicit restart begins again', () => {
  const h=setup(); h.player.select(4); h.player.play(); h.start(); h.end(); h.tick(650);
  assert.equal(h.player.state,'ended'); h.player.play({single:true});
  assert.equal(h.player.index,4); assert.equal(new URL(h.played.at(-1).src).searchParams.get('q'),'写真を撮ってもらえませんか。');
  h.start(); h.end(); h.player.play({restart:true}); assert.equal(h.player.index,1);
});
test('Google-only UI and controls; gallery stays at 29 with one voiced entry; cache versions match', () => {
  const root=path.resolve(__dirname,'..'); const read=file=>fs.readFileSync(path.join(root,file),'utf8');
  const html=read('voiced-comic.html');
  for (const id of ['play','pause','stop','replay','repeat','voice-source','speed','mode','playback-status']) assert.match(html,new RegExp(`id="${id}"`));
  assert.match(html,/<meta name="referrer" content="no-referrer">/); assert.match(html,/Google 線上日語/); assert.match(html,/不會切換成裝置聲音/); assert.match(html,/台詞傳給 Google/);
  assert.match(html,/中文姓氏/); assert.match(html,/不會錄音/); assert.match(html,/無日文台詞/);
  const gallery=read('japanese-comics.html');
  assert.equal((gallery.match(/class="comic-card"/g)||[]).length,29);
  assert.equal((gallery.match(/class="voice-entry"/g)||[]).length,1);
  const js=read('voiced-comic.js');
  assert.match(js,/translate_tts\?ie=UTF-8&tl=ja&client=tw-ob&q=/);
  assert.doesNotMatch(js,/speechSynthesis|SpeechSynthesisUtterance|localStorage|getUserMedia|fetch\(/);
  assert.match(js,/pagehide/); assert.match(js,/visibilitychange/); assert.match(js,/popstate/);
  for (const asset of ['voiced-comic.js?v=1.2','voiced-comic.css?v=1.1']) { assert.ok(html.includes(asset)); assert.ok(read('service-worker.js').includes(asset)); }
  assert.match(read('service-worker.js'),/ai-mistake-learning-v5\.2\.3/);
  assert.match(js,/service-worker\.js\?v=5\.2\.2/);
});

test('duplicate playing cannot extend watchdog; plain play after ended begins again', () => {
  const h=setup(); h.player.play(); h.start(); h.tick(44000); h.start(); h.tick(1000);
  assert.equal(h.player.state,'error'); assert.equal(h.player.index,1);
  h.player.select(4); h.player.play(); h.start(); h.end(); h.tick(650);
  assert.equal(h.player.state,'ended'); h.player.play(); assert.equal(h.player.index,1);
});

test('browser media diagnostic survives cleanup and is cleared for next attempt', () => {
  const h=setup(); h.player.play(); h.player.audio.error={code:4,message:'Unsupported source'}; h.error();
  assert.match(h.player.diagnostic,/MediaError 4.*Unsupported source/);
  h.player.play(); assert.equal(h.player.diagnostic,''); h.error(); h.player.stop(); assert.equal(h.player.diagnostic,'');
});
