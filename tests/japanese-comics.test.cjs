const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'japanese-comics.html'), 'utf8');

test('gallery has exactly five L1, four L2, six L3, seven L4, six L5 and one separate supplement', () => {
  assert.equal((html.match(/data-lesson="l1"/g) || []).length, 5);
  assert.equal((html.match(/data-lesson="l2"/g) || []).length, 4);
  assert.equal((html.match(/data-lesson="supplement"/g) || []).length, 1);
  assert.equal((html.match(/data-lesson="l3"/g) || []).length, 6);
  assert.equal((html.match(/data-lesson="l4"/g) || []).length, 7);
  assert.equal((html.match(/data-lesson="l5"/g) || []).length, 6);
  assert.match(html, /原句與補充例句分開標示/);
  assert.match(html, /原例句來自第3課/);
  assert.doesNotMatch(html, /onenote:|sharepoint\.com|1drv\.ms/i);
});

test('every comic has a full WebP and thumbnail', () => {
  for (const [, id] of html.matchAll(/data-comic="([^"]+)"/g)) {
    for (const extension of ['.webp', '-thumb.webp']) {
      assert.ok(fs.statSync(path.join(root, 'assets/japanese-comics', id + extension)).size > 0);
    }
  }
});

test('homepage links gallery without changing existing app scripts', () => {
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(home, /href="japanese-comics.html"/);
  for (const id of ['addBtn', 'artifactImportButton', 'paperInput', 'questionList', 'questionDialog']) {
    assert.match(home, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(html, /src="(?:app|mobile-mode|config)\.js/);
});

function worker() {
  const listeners = {};
  const entries = new Map();
  const origin = 'https://example.test';
  const base = origin + '/ai-mistake-learning/';
  const key = input => new URL(typeof input === 'string' ? input : input.url, base).href;
  const cache = {
    match: async request => entries.get(key(request))?.clone(),
    put: async (request, response) => entries.set(key(request), response.clone()),
    addAll: async () => {}
  };
  let online = true;
  const context = {
    URL, Response, console,
    self: { location: { origin, href: base + 'service-worker.js' }, addEventListener: (name, listener) => { listeners[name] = listener; }, skipWaiting() {}, clients: { claim: async () => {} } },
    caches: { open: async () => cache, keys: async () => [], delete: async () => true },
    fetch: async request => {
      if (!online) throw new Error('offline');
      return new Response(request.url.includes('missing') ? 'missing' : request.url.includes('japanese-comics.html') ? 'gallery' : 'home', { status: request.url.includes('missing') ? 404 : 200 });
    }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8'), context);
  return {
    entries, offline: () => { online = false; },
    fetch: async (relative, mode = 'navigate') => {
      let response;
      listeners.fetch({ request: { url: new URL(relative, base).href, mode, method: 'GET' }, respondWith: value => { response = value; } });
      return response ? await response : null;
    }
  };
}

test('service worker caches homepage and gallery independently, ignoring filter queries', async () => {
  const sw = worker();
  assert.equal(await (await sw.fetch('./')).text(), 'home');
  assert.equal(await (await sw.fetch('japanese-comics.html?lesson=l2')).text(), 'gallery');
  sw.offline();
  assert.equal(await (await sw.fetch('index.html')).text(), 'home');
  assert.equal(await (await sw.fetch('./')).text(), 'home');
  assert.equal(await (await sw.fetch('japanese-comics.html?lesson=l1')).text(), 'gallery');
  assert.equal((await sw.fetch('uncached.html')).status, 503);
});

test('service worker shares full-image cache keys and does not cache cross-origin or unsuccessful responses', async () => {
  const sw = worker();
  assert.equal(await sw.fetch('https://elsewhere.test/image.webp', 'cors'), null);
  assert.equal((await sw.fetch('missing.html')).status, 404);
  assert.equal(sw.entries.size, 0);
  await sw.fetch('assets/japanese-comics/l1-01-polite-request.webp', 'cors');
  sw.offline();
  assert.equal((await sw.fetch('assets/japanese-comics/l1-01-polite-request.webp', 'navigate')).status, 200);
  assert.equal(sw.entries.size, 1);
});


test('all 75 cards share the first comic layout, with audio links outside the image link', () => {
  const css=fs.readFileSync(path.join(root,'japanese-comics.css'),'utf8');
  assert.match(css,/\.comic-card\{display:flex;flex-direction:column\}/);
  assert.match(css,/\.comic-card \.comic-open\{height:auto;flex:1 0 auto\}/);
  assert.doesNotMatch(css,/data-comic="l1-01-polite-request"/);
  const cards=[...html.matchAll(/<article class="comic-card"[^>]*data-comic="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)];
  assert.equal(cards.length,75);
  for(const [,id,card] of cards){
    assert.equal((card.match(/class="voice-entry"/g)||[]).length,1,id);
    assert.match(card,new RegExp('<\\/a>\\s*<a class="voice-entry" href="voiced-comic.html\\?comic='+id+'"'));
  }
  assert.match(html,/japanese-comics\.css\?v=5\.6/);
  assert.match(fs.readFileSync(path.join(root,'service-worker.js'),'utf8'),/japanese-comics\.css\?v=5\.6/);
});
