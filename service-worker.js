const CACHE_NAME = 'static-cache'
const urlsToCache = ['/', './', 'index.html', 'style.css']
self.addEventListener('install', event => {
  self.skipWaiting() // Do I need dis?
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})
