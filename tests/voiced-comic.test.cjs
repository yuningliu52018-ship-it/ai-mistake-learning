const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ComicPlayer, CUES, PANELS } = require('../voiced-comic.js');
function setup({ voices = true, supports = true } = {}) {
  let now = 0, id = 0;
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
  const spoken = [];
  let cancels = 0, resumes = 0;
  const synth = { paused: false, cancel() { ++cancels; }, resume() { ++resumes; this.paused = false; }, speak(u) { spoken.push(u); } };
  const voice = { lang: 'ja-JP', voiceURI: 'Japanese', name: 'Japanese' };
  const player = new ComicPlayer({ synth: supports ? synth : undefined, Utterance: class { constructor(text) { this.text = text; } }, getVoice: () => voices ? voice : null, clock });
  return { player, synth, tick, spoken, voice, get cancels() { return cancels; }, get resumes() { return resumes; }, tasks,
    start() { spoken.at(-1).onstart(); }, end() { spoken.at(-1).onend(); } };
}
test('exact Japanese, Chinese surname pronunciation, reply order, four image panels', () => {
  assert.deepEqual(CUES.slice(1).map(c => c.text), ['りんさん、ノートを見せてもらえませんか。','どうぞ。','ありがとうございます。','写真を撮ってもらえませんか。']);
  assert.equal(CUES[1].subtitle, '林さん、ノートを見せてもらえませんか。');
  assert.equal(PANELS.length, 4); assert.equal(CUES[0].text, '');
  assert.equal(CUES[2].panel, CUES[3].panel);
});
test('no autoplay; first click starts Japanese synchronously after the silent opening', () => {
  const h = setup(); h.tick(10000); assert.equal(h.spoken.length, 0);
  h.player.play(); assert.equal(h.spoken.length, 1); assert.equal(h.player.index, 1);
  assert.equal(h.player.state, 'starting'); assert.equal(h.spoken[0].lang, 'ja-JP');
  assert.equal(h.spoken[0].voice, h.voice); assert.equal(h.spoken[0].rate, .95);
});
test('only a started and completed utterance advances; full ordered run ends', () => {
  const h = setup(); h.player.play();
  for (let i = 1; i <= 4; i++) {
    assert.equal(h.player.index, i); h.start(); assert.equal(h.player.state, 'speaking');
    h.tick(900); h.end(); assert.equal(h.player.state, 'gap'); h.tick(650);
  }
  assert.equal(h.player.state, 'ended'); assert.equal(h.spoken.length, 4);
  h.tick(60000); assert.equal(h.spoken.length, 4);
});
test('a premature end is an error, never success or advancement', () => {
  const h = setup(); h.player.play(); h.end(); assert.equal(h.player.state, 'error');
  h.tick(60000); assert.equal(h.player.index, 1); assert.equal(h.spoken.length, 1);
});
test('duplicate play and duplicate completion cannot overlap or skip', () => {
  const h = setup(); h.player.play(); h.player.play(); assert.equal(h.spoken.length, 1);
  const u = h.spoken[0]; h.start(); h.end(); u.onend(); u.onstart(); h.player.play(); h.tick(650);
  assert.equal(h.spoken.length, 2); assert.equal(h.player.index, 2);
});
test('pause cancels immediately; resume repeats current sentence, stale errors ignored', () => {
  const h = setup(); h.player.play(); const old = h.spoken[0]; h.start(); h.player.pause();
  assert.equal(h.player.state, 'paused'); old.onerror({error:'interrupted'}); old.onend();
  h.tick(60000); assert.equal(h.player.index, 1); assert.equal(h.player.state, 'paused');
  h.player.play(); assert.equal(h.spoken.length, 2); assert.equal(h.spoken[1].text, old.text);
  old.onstart(); old.onend(); assert.equal(h.player.state, 'starting');
});
test('stopping while starting, speaking or waiting cancels all callbacks and resets', () => {
  for (const phase of ['starting','speaking','gap']) {
    const h = setup(); h.player.play(); const old = h.spoken[0];
    if (phase !== 'starting') h.start(); if (phase === 'gap') h.end();
    h.player.stop(); old.onend(); old.onerror({error:'canceled'}); h.tick(60000);
    assert.equal(h.player.index, 0); assert.equal(h.player.state, 'idle'); assert.equal(h.spoken.length, 1); assert.equal(h.tasks.size, 0);
  }
});
test('practice waits and counts down after every sentence, including the last', () => {
  const h = setup(); h.player.configure({practice:true,rate:.82}); h.player.select(4); h.player.play();
  assert.equal(h.spoken[0].rate, .82); h.start(); h.tick(4000); h.end();
  assert.equal(h.player.state, 'gap'); assert.equal(h.player.seconds, 5); h.tick(4000);
  assert.equal(h.player.state, 'gap'); assert.equal(h.player.seconds, 1); h.tick(800);
  assert.equal(h.player.state, 'ended'); assert.equal(h.tasks.size, 0);
});
test('practice pause, settings changes, and voice changes do not silently restart', () => {
  const h = setup(); h.player.configure({practice:true}); h.player.play(); h.start(); h.end();
  h.player.configure({rate:.82}); h.tick(60000); assert.equal(h.player.state, 'paused'); assert.equal(h.spoken.length, 1);
  h.player.play(); assert.equal(h.spoken[1].rate,.82);
});
test('selecting a panel or a sentence stops playback; replay cancels and starts fresh', () => {
  const h = setup(); h.player.play(); const old = h.spoken[0]; h.start(); h.player.select(4);
  old.onend(); h.tick(60000); assert.equal(h.player.index,4); assert.equal(h.player.state,'idle');
  h.player.play({restart:true}); assert.equal(h.player.index,1); assert.equal(h.spoken.length,2);
  h.start(); h.player.play({restart:true}); assert.equal(h.spoken.length,3);
});
test('single-sentence replay does not auto advance', () => {
  const h = setup(); h.player.select(3); h.player.play({single:true}); h.start(); h.end(); h.tick(60000);
  assert.equal(h.player.index,3); assert.equal(h.player.state,'paused'); assert.equal(h.spoken.length,1);
});
test('no native API, no Japanese voice, or non-Japanese voice produces honest errors', () => {
  for (const args of [{supports:false},{voices:false}]) {
    const h = setup(args); h.player.play(); assert.equal(h.player.state,'error'); assert.equal(h.spoken.length,0);
  }
  const h = setup(); h.player.getVoice = () => ({lang:'en-US'}); h.player.play(); assert.equal(h.player.state,'error'); assert.equal(h.spoken.length,0);
});
test('autoplay block and service failures keep the cue and allow a gesture retry', () => {
  for (const error of ['not-allowed','network','synthesis-failed','voice-unavailable']) {
    const h = setup(); h.player.play(); h.spoken[0].onerror({error}); h.tick(60000);
    assert.equal(h.player.state,'error'); assert.equal(h.player.index,1); assert.equal(h.spoken.length,1);
    h.player.play(); assert.equal(h.spoken.length,2); h.start(); assert.equal(h.player.state,'speaking');
  }
});
test('startup and completion timeouts fail safely without advancing', () => {
  const h=setup(); h.player.play(); h.tick(8000); assert.equal(h.player.state,'error');
  h.player.play(); h.start(); h.tick(45000); assert.equal(h.player.state,'error'); assert.equal(h.player.index,1);
});
test('an engine left paused is resumed before the next gesture playback', () => {
  const h=setup(); h.synth.paused=true; h.player.play(); assert.equal(h.resumes,1); assert.equal(h.spoken.length,1);
});
test('all required controls and one discoverable gallery entry exist; no external TTS', () => {
  const root=path.resolve(__dirname,'..'); const html=fs.readFileSync(path.join(root,'voiced-comic.html'),'utf8');
  for (const id of ['play','pause','stop','replay','repeat','voice','speed','mode','refresh-voices','playback-status']) assert.match(html,new RegExp(`id="${id}"`));
  assert.match(html,/字幕|中文姓氏/); assert.match(html,/不會錄音/); assert.match(html,/無日文台詞/);
  const gallery=fs.readFileSync(path.join(root,'japanese-comics.html'),'utf8');
  assert.equal((gallery.match(/class="comic-card"/g)||[]).length,29);
  assert.equal((gallery.match(/class="voice-entry"/g)||[]).length,1);
  const js=fs.readFileSync(path.join(root,'voiced-comic.js'),'utf8');
  assert.doesNotMatch(js,/translate_tts|new Audio|localStorage|getUserMedia/);
  assert.match(js,/pagehide/); assert.match(js,/visibilitychange/); assert.match(js,/popstate/);
});

test('repeat current after completed run keeps the last sentence', () => {
 const h=setup(); h.player.select(4); h.player.play(); h.start(); h.end(); h.tick(650);
 assert.equal(h.player.state,'ended'); h.player.play({single:true});
 assert.equal(h.player.index,4); assert.equal(h.spoken.at(-1).text,'写真を撮ってもらえませんか。');
});
