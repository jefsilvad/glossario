const CACHE_NAME = 'glossario-pdv-v1';
const ASSETS = [
  './',
  './index.html',
  './glossario.html',
  './materiais.html',
  './css/style.css',
  './manifest.webmanifest'
  // se quiser, adicione icons, imagens etc.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match('./index.html')
        )
      );
    })
  );
});
