importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js',
)

self.addEventListener('install', event => {
  self.skipWaiting() // Do I need dis?
})

if (workbox) {
  // workbox.setConfig({ debug: false })
  workbox.routing.registerRoute(
    /.*\.html/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'html-cache',
    })
  )

  workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'css-cache',
    })
  )

  workbox.routing.registerRoute(
    /.*\.js/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'js-cache',
    })
  )

  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  )

  workbox.routing.registerRoute(
    /.*\.(?:mp3)/,
    workbox.strategies.cacheFirst({
      cacheName: 'audio-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  )
}
