self.addEventListener('fetch', function fetcher (event) {
  console.log('hallo');
  var request = event.request;
  // check if request
  if (request.url.indexOf('assets.contentful.com') > -1) {
    // contentful asset detected
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // return from cache, otherwise fetch from network
        return response || fetch(request);
      })
    );
  }
  // otherwise: ignore event
});
