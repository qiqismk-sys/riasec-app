const CACHE_NAME = 'app-offline-v1';
// Daftarkan semua file yang ingin bisa dibuka saat offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './Gambar logo-logo resmi.png'
];

// 1. Install Service Worker dan simpan aset ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Ambil aset dari cache jika sedang offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Jika ada di cache, gunakan cache. Jika tidak, ambil dari internet.
      return cachedResponse || fetch(event.request);
    })
  );
});