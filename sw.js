// self.addEventListener('install', function(e) {
//  e.waitUntil(
//    caches.open('video-store').then(function(cache) {
//      return cache.addAll([
//        '',
//        'index.html',
//        'index.js',
//        'style.css',
//        'images/fox1.jpg',
//        'images/fox2.jpg',
//        'images/fox3.jpg',
//        'images/fox4.jpg'
//      ]);
//    })
//  );
// });
self.importScripts('data/games.js');


var gamesImages = [];
for(var i=0; i<games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});


self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
