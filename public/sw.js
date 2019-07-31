importScripts('/src/js/idb.js');
// importScripts('/src/js/utility.js');

var CACHE_STATIC_NAME = 'static-v37';
var CACHE_DYNAMIC_NAME = 'dynamic-v10';

var STATIC_FILES = [
    '/',
    // '/auth',
    // '/myAccount',
    // '/rts/:id',
    '/index.html',
    '/login.html',
    '/movieInfo.html',
    '/myAccount.html',
    '/offline.html',
    '/signup.html',
    '/src/js/app.js',
    '/src/js/idb.js',
    '/src/js/feed.js',
    '/src/js/promise.js',
    '/src/js/fetch.js',
    '/src/js/filters.js',
    '/src/js/utility_idb.js',
    '/src/js/material.min.js',
    '/src/js/login.js',
    '/src/js/myAccount.js',
    '/src/js/signup.js',
    '/src/css/app.css',
    '/src/css/feed.css',
    '/src/css/navbar.css',
    '/src/css/filters.css',
    '/manifest.json',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
];
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
      caches.open(CACHE_STATIC_NAME)
        .then(function (cache) {
          console.log('[Service Worker] Precaching App Shell');
          cache.addAll(STATIC_FILES);
        })
    )
  });

  self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
      caches.keys()
        .then(function (keyList) {
          return Promise.all(keyList.map(function (key) {
            if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
              console.log('[Service Worker] Removing old cache.', key);
              return caches.delete(key);
            }
          }));
        })
    );
    return self.clients.claim();
  });

  function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
      console.log('matched ', string);
      cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
      cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
  }

  // self.addEventListener('fetch',event => {
  //   console.log(event.request.url);
    
  //   event.respondWith(
  //     caches.match(event.request)
  //       .then(function (response) {
  //         if (response) {
  //           return response;
  //         } else {
  //           return fetch(event.request)
  //             .then(function (res) {
  //               return caches.open(CACHE_DYNAMIC_NAME)
  //                 .then(function (cache) {
  //                   // trimCache(CACHE_DYNAMIC_NAME, 3);
  //                   cache.put(event.request.url, res.clone());
  //                   return res;
  //                 })
  //             })
  //             .catch(function (err) {
  //               return caches.open(CACHE_STATIC_NAME)
  //                 .then(function (cache) {
  //                   if (event.request.headers.get('accept').includes('text/html')) {
  //                     return cache.match('/offline.html');
  //                   }
  //                 });
  //             });
  //         }
  //       })
  //   );
    
  // })

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
              return fetch(event.request)
              .then(function(res) {
                return caches.open('dynamic')
                  .then(function(cache) {
                    // if((event.request.url.indexOf('image') === -1) && (event.request.url.indexOf('cloudfunctions') === -1) && 
                    // (event.request.url.indexOf('themoviedb') === -1)) {
                    //   cache.put(event.request.url, res.clone());
                      
                    // }
                    if(event.request.url.indexOf('materialicons') > -1) {
                      cache.put(event.request.url, res.clone());
                    }
                    return res;
                  })
              });
            
          }
        })
    );
  });