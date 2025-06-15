self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('podcast-app-v1').then(cache => cache.addAll([
      '/',
      '/index.html',
      '/manifest.json',
      // Add more static assets if needed
    ]))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.text() : 'New podcast episode!';
  event.waitUntil(
    self.registration.showNotification('Podcast Streaming', {
      body: data,
      icon: '/favicon.ico',
    })
  );
});
