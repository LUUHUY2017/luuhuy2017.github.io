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
var appShellFiles = [
  '',
  'index.html',
  'app.js',
  'style.css',
  'fonts/graduate.eot',
  'fonts/graduate.ttf',
  'fonts/graduate.woff',
  'favicon.ico',
  'img/js13kgames.png',
  'img/bg.png',
  'icons/icon-32.png',
  'icons/icon-64.png',
  'icons/icon-96.png',
  'icons/icon-128.png',
  'icons/icon-168.png',
  'icons/icon-192.png',
  'icons/icon-256.png',
  'icons/icon-512.png'
];

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
