const CACHE_NAME = 'ai-mistake-learning-v5.9.1';
const APP_SHELL = [
  './','./index.html','./styles.css?v=3.6','./manifest.webmanifest?v=5.9.1','./app-icon.svg','./eva-theme.css?v=5.9.1','./assets/eva-reading-corner.svg',
  './comics-entry.css?v=1','./japanese-comics.html','./japanese-comics.css?v=5.6','./japanese-comics.js?v=6.150', './voiced-comic.html', './voiced-comic.css?v=2.4', './voiced-comic.js?v=3.150', './voiced-comics-data.js?v=2.150', './comic-language-variants.js?v=2.150'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Image links use the same cache entry as images opened inside the viewer.
  if (request.mode === 'navigate' && !url.pathname.includes('/assets/japanese-comics/')) {
    // Keep each page under its own key. Gallery visits must never replace the homepage.
    const scope = new URL('./', self.location.href);
    const home = url.pathname === scope.pathname || url.pathname === `${scope.pathname}index.html`;
    const key = home ? new URL('index.html', scope).href : `${url.origin}${url.pathname}`;
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(key, response.clone());
        return response;
      } catch {
        return (await cache.match(key)) || new Response('目前離線，這個頁面尚未儲存。請連線後再試一次。', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  })());
});
