'use strict';
// Runs unchanged in the staged j6-reference/tests folder and in repository tests/.
// node --test tests/j6-appendix.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(process.env.J6_APPENDIX_ROOT || path.join(__dirname, '..'));
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const html = read('j6-appendix.html');
const css = read('j6-appendix.css');
const code = read('j6-appendix.js');
const dataCode = read('j6-appendix-data.js');
const dataContext = {};
vm.runInNewContext(dataCode, dataContext);
const data = JSON.parse(JSON.stringify(dataContext.J6_APPENDIX));
const expectedKeys = ['displayJP', 'spokenJP', 'tc', 'displayEN', 'spokenEN', 'tcEN', 'sourceKind', 'sourceLabel'];
const decode = s => s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const sections = [...html.matchAll(/<details\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/details>/g)];
const renderedRows = [...html.matchAll(/<li class="study-row" data-row="(\d+)">([\s\S]*?)<\/li>/g)];

function page(options = {}) {
  const timers = new Map(), audio = [], requests = [];
  let timerID = 0;
  class Element {
    constructor(attrs = {}) {
      this.attrs = { ...attrs }; this.dataset = {}; this.listeners = {}; this.textContent = '';
      const classes = new Set();
      this.classList = { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c) };
    }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    getAttribute(k) { return this.attrs[k] ?? null; }
    addEventListener(k, f) { (this.listeners[k] ||= []).push(f); }
    fire(k, event = {}) { for (const f of this.listeners[k] || []) f({ target: this, currentTarget: this, ...event }); }
  }
  const rows = data.map(() => { const row = new Element(); row.status = new Element(); row.querySelector = s => s === '.row-status' ? row.status : null; return row; });
  const buttons = [...html.matchAll(/<button\b[^>]*data-play="(\d+)"[^>]*data-language="([^"]+)"[^>]*>/g)].map(([, i, language]) => {
    const b = new Element({ 'aria-pressed': 'false' }); b.dataset = { play: i, language }; b.closest = () => rows[Number(i)]; return b;
  });
  const details = sections.map(([, id, content]) => {
    const d = new Element({ id }); d.open = false;
    const indexes = [...content.matchAll(/class="study-row" data-row="(\d+)"/g)].map(m => Number(m[1]));
    d.contains = row => indexes.some(i => rows[i] === row); return d;
  });
  const ids = { stop: new Element(), speed: new Element(), expand: new Element({ 'aria-expanded': 'false' }) };
  ids.speed.value = '1';
  const document = new Element(); document.hidden = false;
  document.querySelectorAll = s => s === '[data-play]' ? buttons : s === 'details' ? details : [];
  document.getElementById = id => ids[id];
  const window = new Element();
  class MockAudio {
    constructor() { this.src = ''; this.paused = false; this.removed = []; this.pauseCalls = 0; this.loadCalls = 0; audio.push(this); }
    play() { requests.push(this.src); if (options.throwOnPlay) throw new Error('blocked'); return { catch: f => { this.reject = f; } }; }
    pause() { this.paused = true; this.pauseCalls++; }
    removeAttribute(name) { this.removed.push(name); if (name === 'src') this.src = ''; }
    load() { this.loadCalls++; }
  }
  const context = { document, window, Audio: MockAudio, J6_APPENDIX: options.data || data,
    setTimeout: (f, ms) => { const id = ++timerID; timers.set(id, { f, ms }); return id; },
    clearTimeout: id => timers.delete(id) };
  // A fallback provider, recorder, fetch, or Web Speech call must fail the test.
  for (const name of ['speechSynthesis', 'SpeechSynthesisUtterance', 'MediaRecorder', 'fetch', 'XMLHttpRequest']) {
    Object.defineProperty(context, name, { get() { throw new Error(`Forbidden ${name}`); } });
  }
  vm.runInNewContext(code, context);
  return { rows, buttons, details, ids, document, window, audio, requests, timers,
    button: (i = 0, language = 'ja') => buttons.find(b => b.dataset.play === String(i) && b.dataset.language === language),
    tick(ms) { const task = [...timers.entries()].find(([, t]) => t.ms === ms); assert.ok(task, `Expected ${ms}ms timer`); timers.delete(task[0]); task[1].f(); } };
}
function stopped(p, a = p.audio.at(-1)) {
  assert.equal(p.timers.size, 0);
  if (a) { assert.equal(a.paused, true); assert.equal(a.src, ''); assert.equal(a.loadCalls, 1); assert.equal(a.onplaying, null); assert.equal(a.onended, null); assert.equal(a.onerror, null); }
  assert.ok(p.buttons.every(b => b.getAttribute('aria-pressed') === 'false'));
}

test('12 sections, 76 bilingual cue pairs, 152 explicit play controls, accessible statuses and links', () => {
  assert.equal(sections.length, 12); assert.equal(data.length, 76); assert.equal(renderedRows.length, 76);
  assert.deepEqual(renderedRows.map(m => Number(m[1])), Array.from({ length: 76 }, (_, i) => i));
  assert.equal((html.match(/data-play=/g) || []).length, 152);
  assert.equal((html.match(/class="row-status" role="status" aria-live="polite"/g) || []).length, 76);
  assert.match(html, /name="viewport" content="width=device-width,initial-scale=1"/);
  assert.match(html, /name="referrer" content="no-referrer"/);
  assert.match(html, /id="expand"[^>]*aria-controls="tables"/);
  assert.equal((html.match(/href="japanese-comics\.html\?lesson=j6"/g) || []).length, 2);
  assert.equal((html.match(/<script[^>]+ defer>/g) || []).length, 2);
  assert.doesNotMatch(html, /<audio|\bautoplay\b|rel="(?:preload|prefetch|preconnect)"/i);
});

test('public content preserves foreign displays, Chinese explanations and source labels without exposing private fields', () => {
  assert.doesNotMatch(html + dataCode + code, /libfile_|file_000|\/workspace\/|sourceFile|sourceBlock|sourceInventory|oneNotePage|sharepoint\.com|1drv\.ms/i);
  for (let i = 0; i < data.length; i++) {
    const row = data[i]; assert.deepEqual(Object.keys(row), expectedKeys);
    for (const k of expectedKeys) assert.equal(typeof row[k], 'string');
    assert.ok(row.sourceLabel); assert.ok(row.spokenJP.trim()); assert.ok(row.spokenEN.trim());
    assert.ok(row.spokenJP.length < 200 && row.spokenEN.length < 200);
    assert.doesNotMatch(row.spokenJP, /[\u3400-\u9fff]/, 'Japanese uses reviewed kana reading');
    assert.doesNotMatch(row.spokenEN, /[\u3040-\u30ff\u3400-\u9fff]/, 'English payload contains no Chinese or Japanese');
    const rendered = decode(renderedRows[i][2]);
    for (const text of [row.displayJP, row.displayEN, row.tc, row.tcEN || row.tc, row.sourceLabel]) assert.ok(rendered.includes(text), `row ${i}: ${text}`);
    assert.match(rendered, /class="foreign" lang="ja"/); assert.match(rendered, /class="foreign english" lang="en"/);
  }
  assert.match(html, /中文規則不朗讀、不錄音/); assert.match(html, /英文為情境改編/);
  assert.doesNotMatch(code, /speechSynthesis|SpeechSynthesisUtterance|MediaRecorder|getUserMedia/);
});

test('loading, expanding and changing speed never create audio or request a voice', () => {
  const p = page(); p.ids.expand.fire('click'); p.ids.speed.value = '0.8'; p.ids.speed.fire('change');
  assert.equal(p.audio.length, 0); assert.equal(p.requests.length, 0); assert.equal(p.timers.size, 0);
  assert.ok(p.details.every(d => d.open)); assert.equal(p.ids.expand.getAttribute('aria-expanded'), 'true');
});

test('all 152 play buttons request only the exact reviewed cue and matching Google ja/en voice', () => {
  for (let i = 0; i < data.length; i++) for (const language of ['ja', 'en']) {
    const p = page(); p.button(i, language).fire('click');
    assert.equal(p.requests.length, 1); assert.equal(p.audio[0].preload, 'none');
    const u = new URL(p.requests[0]);
    assert.equal(u.origin, 'https://translate.google.com'); assert.equal(u.pathname, '/translate_tts');
    assert.equal(u.searchParams.get('tl'), language); assert.equal(u.searchParams.get('client'), 'tw-ob');
    assert.equal(u.searchParams.get('ie'), 'UTF-8');
    assert.equal(u.searchParams.get('q'), data[i][language === 'ja' ? 'spokenJP' : 'spokenEN']);
    p.ids.stop.fire('click'); stopped(p);
  }
});

test('invalid languages, invalid indices, absent rows and blank cues fail closed', () => {
  for (const invalid of ['zh', 'zh-TW', '', 'EN', 'fr']) {
    const p = page(); p.button().dataset.language = invalid; p.button(0, invalid).fire('click'); assert.equal(p.requests.length, 0);
  }
  for (const invalid of ['-1', '0.5', 'NaN', '999']) {
    const p = page(), b = p.button(); b.dataset.play = invalid; b.fire('click'); assert.equal(p.requests.length, 0);
  }
  const p = page({ data: [{ ...data[0], spokenJP: '' }] }); p.button().fire('click'); assert.equal(p.requests.length, 0);
});

test('repeated clicks stop and detach old audio, clear stale row status and keep only one timeout', () => {
  const p = page(); p.button().fire('click'); const first = p.audio[0]; first.onplaying();
  assert.match(p.rows[0].status.textContent, /日語朗讀中/);
  p.button(1, 'en').fire('click');
  assert.equal(first.paused, true); assert.equal(first.src, ''); assert.equal(first.onended, null);
  assert.equal(p.rows[0].status.textContent, '已停止。'); assert.equal(p.button().getAttribute('aria-pressed'), 'false');
  assert.equal(p.button(1, 'en').getAttribute('aria-pressed'), 'true'); assert.equal(p.timers.size, 1);
  for (let i = 0; i < 10; i++) p.button(1, 'en').fire('click');
  assert.ok(p.audio.slice(0, -1).every(a => a.paused && !a.src)); assert.equal(p.timers.size, 1);
  assert.equal(p.buttons.filter(b => b.getAttribute('aria-pressed') === 'true').length, 1);
});

test('stale completion, playing, error, timeout and rejected play promise cannot affect newer audio', () => {
  const p = page(); p.button().fire('click');
  const a = p.audio[0], stale = [a.onended, a.onplaying, a.onerror, a.reject, [...p.timers.values()][0].f];
  p.button(1, 'en').fire('click'); const current = p.audio.at(-1); current.onplaying();
  for (const event of stale) event();
  assert.equal(current.paused, false); assert.equal(p.timers.size, 1); assert.equal(p.requests.length, 2);
  assert.equal(p.rows[1].status.textContent, 'Google 英語朗讀中。');
  assert.equal(p.button(1, 'en').getAttribute('aria-pressed'), 'true');
});

test('ended marks completion and never advances or autoplays another cue', () => {
  const p = page(); p.button().fire('click'); p.audio[0].onplaying(); p.audio[0].onended();
  stopped(p); assert.equal(p.rows[0].status.textContent, '朗讀完畢。'); assert.equal(p.requests.length, 1);
});

test('stop is safe while idle, loading, playing and after an already completed stop', () => {
  for (const playing of [false, true]) {
    const p = page(); p.ids.stop.fire('click'); assert.equal(p.audio.length, 0);
    p.button().fire('click'); if (playing) p.audio[0].onplaying(); p.ids.stop.fire('click'); stopped(p);
    assert.equal(p.rows[0].status.textContent, '已停止。'); p.ids.stop.fire('click'); stopped(p);
  }
});

test('collapsing the active section stops; collapsing another section leaves playback alone', () => {
  const p = page(); p.button().fire('click'); p.details[1].fire('toggle');
  assert.equal(p.audio[0].paused, false); p.details[0].fire('toggle'); stopped(p);
  assert.equal(p.rows[0].status.textContent, '已停止。');
});

test('collapse-all stops playback and updates the expanded label; opening never autoplays', () => {
  const p = page(); p.ids.expand.fire('click'); assert.equal(p.ids.expand.textContent, '收合全部');
  p.button().fire('click'); p.ids.expand.fire('click'); stopped(p);
  assert.ok(p.details.every(d => !d.open)); assert.equal(p.ids.expand.getAttribute('aria-expanded'), 'false');
  assert.equal(p.ids.expand.textContent, '展開全部'); p.ids.expand.fire('click'); assert.equal(p.requests.length, 1);
});

test('backgrounding stops and return requires another explicit play click', () => {
  const p = page(); p.button().fire('click'); p.document.hidden = true; p.document.fire('visibilitychange'); stopped(p);
  assert.match(p.rows[0].status.textContent, /回來後請重新按朗讀/);
  p.document.hidden = false; p.document.fire('visibilitychange'); assert.equal(p.requests.length, 1);
  p.button().fire('click'); assert.equal(p.requests.length, 2);
});

test('pagehide stops, clears status and ignores events after a back-forward cache restore', () => {
  const p = page(); p.button().fire('click'); p.audio[0].onplaying(); const stale = p.audio[0].onended;
  p.window.fire('pagehide'); stopped(p); assert.equal(p.rows[0].status.textContent, '已停止。');
  p.window.fire('pageshow'); stale(); assert.equal(p.requests.length, 1); assert.equal(p.rows[0].status.textContent, '已停止。');
});

for (const trigger of ['network', 'rejection', 'load timeout', 'play timeout', 'throw']) test(`${trigger} stops with retry guidance and never changes provider`, () => {
  const p = page({ throwOnPlay: trigger === 'throw' }); p.button().fire('click'); const a = p.audio[0];
  if (trigger === 'network') a.onerror();
  if (trigger === 'rejection') a.reject(new Error('blocked'));
  if (trigger === 'load timeout') p.tick(12000);
  if (trigger === 'play timeout') { a.onplaying(); p.tick(45000); }
  stopped(p); assert.equal(p.requests.length, 1);
  assert.equal(p.rows[0].status.classList.contains('error'), true);
  assert.match(p.rows[0].status.textContent, /Google 語音未能播放/); assert.match(p.rows[0].status.textContent, /不會改用裝置聲音/);
  p.button().fire('click'); assert.equal(p.requests.length, 2);
  if (trigger !== 'throw') assert.equal(p.rows[0].status.classList.contains('error'), false);
});

test('playback speed is honored before play and can change without creating another request', () => {
  const p = page(); p.ids.speed.value = '0.8'; p.ids.speed.fire('change'); p.button().fire('click');
  assert.equal(p.audio[0].playbackRate, 0.8); p.audio[0].onplaying();
  p.ids.speed.value = '1.15'; p.ids.speed.fire('change'); assert.equal(p.audio[0].playbackRate, 1.15);
  assert.equal(p.requests.length, 1); p.ids.stop.fire('click');
  p.button(1).fire('click'); assert.equal(p.audio.at(-1).playbackRate, 1.15);
});

test('mobile CSS wraps text and controls, retains 44px targets and ships a 320/390px public QA fixture', () => {
  assert.match(css, /box-sizing:border-box/); assert.match(css, /overflow-wrap:anywhere/);
  assert.match(css, /\.toolbar\{[^}]*flex-wrap:wrap/); assert.match(css, /\.row-actions\{[^}]*flex-wrap:wrap/);
  assert.match(css, /@media\(max-width:500px\)/); assert.match(css, /min-height:44px/);
  assert.match(css, /:focus-visible/);
  const fixture = fs.readFileSync(path.join(__dirname, 'j6-appendix-responsive.html'), 'utf8');
  assert.match(fixture, /data-width="320"/); assert.match(fixture, /data-width="390"/);
  assert.match(fixture, /\.\.\/j6-appendix\.html/); assert.match(fixture, /scrollWidth/);
});
