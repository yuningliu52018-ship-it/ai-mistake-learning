const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const home = read('index.html');
test('Eva identity is consistent across home, gallery, and installed app', () => {
 assert.match(home, /<h1>Eva的資料庫<\/h1>/);
 assert.match(home, /<title>Eva的資料庫/);
 assert.match(read('japanese-comics.html'), /<title>日文文法漫畫｜Eva的資料庫<\/title>/);
 assert.equal(JSON.parse(read('manifest.webmanifest')).name, 'Eva的資料庫');
 assert.doesNotMatch(home, /116 會考 AI 學習系統|v3\.6 Model Fallback/);
});
test('resource shortcuts target the comics-only homepage', () => {
 const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
 assert.equal(ids.length, new Set(ids).size);
 for (const [, id] of home.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id);
 for (const id of ['addBtn','artifactImportButton','paperInput','questionList','questionDialog']) assert.ok(!ids.includes(id), id);
 assert.match(home, /href="japanese-comics.html"/);
 assert.doesNotMatch(home, /src="(?:app|scan|config|auto-detect|import-modules)\.js/);
});
test('all local homepage resources and service-worker shell entries exist', () => {
 for (const [, url] of home.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!url.startsWith('http')) assert.ok(fs.existsSync(path.join(root, url.split('?')[0])), url);
 }
 const sw = read('service-worker.js');
 for (const [, url] of sw.matchAll(/'\.\/([^']+)'/g)) assert.ok(fs.existsSync(path.join(root, url.split('?')[0])), url);
 assert.match(sw, /eva-theme\.css\?v=[\d.]+/);
 assert.match(sw, /assets\/eva-reading-corner\.svg/);
 assert.match(home, /service-worker\.js\?v=[\d.]+/);
 for (const file of ['japanese-comics.js','voiced-comic.js']) assert.match(read(file), /service-worker\.js\?v=[\d.]+/);
 assert.match(sw, /const CACHE_NAME = 'ai-mistake-learning-v[\d.]+'/);
});
test('presentation keeps capture behavior and reduced-motion accessibility', () => {
 assert.match(read('eva-theme.css'), /prefers-reduced-motion:reduce/);
 assert.match(read('eva-theme.css'), /focus-visible/);
 assert.match(read('mobile-mode.js'), /max-width: 760px/);
 assert.match(read('app.js'), /aiMistakeLearning\.questions\.v2/);
 assert.match(read('app.js'), /aiMistakeLearning\.syncKey\.v1/);
});

