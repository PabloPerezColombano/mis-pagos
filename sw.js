const CACHE = "mis-pagos-v1";
const ASSETS = ["/mis-pagos/", "/mis-pagos/index.html", "/mis-pagos/manifest.json", "/mis-pagos/icon-192.png", "/mis-pagos/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match("/mis-pagos/")))
  );
});
