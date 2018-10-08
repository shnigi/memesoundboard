var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '/',
  './',
  'index.html',
  'style.css'
];
self.addEventListener('install', function(event) {
  self.skipWaiting(); // Do I need dis?
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
