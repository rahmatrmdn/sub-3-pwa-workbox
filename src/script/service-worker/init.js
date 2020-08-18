import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate, CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';
import {precacheAndRoute} from 'workbox-precaching';


const { assets } = global.serviceWorkerOption

const urlsToCache = assets.map(path => {
    return {
        url: path,
        revision: '1'
    }
})

precacheAndRoute(urlsToCache);

registerRoute(
    new RegExp('/pages/'),
    new StaleWhileRevalidate()
);

// Menyimpan cache dari CSS Google Fonts
registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Menyimpan cache untuk file font selama 1 tahun
registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

// console.log(urlsToCache);
//
// self.addEventListener("install", function (event) {
//     self.skipWaiting();
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });
//
// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName !== CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });
//
// self.addEventListener("fetch", function(event) {
//     const base_url = "https://api.football-data.org/v2/";
//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then(function(cache) {
//                 return fetch(event.request).then(function(response) {
//                     cache.put(event.request.url, response.clone());
//                     return response;
//                 })
//             })
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
//                 return response || fetch (event.request);
//             })
//         )
//     }
// });
//
// self.addEventListener('push', function(event) {
//     let body;
//     if (event.data) {
//         body = event.data.text();
//     } else {
//         body = 'Push message no payload';
//     }
//     const options = {
//         body: body,
//         icon: 'icon/icon-48.png',
//         vibrate: [100, 50, 100],
//         data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//         }
//     };
//
//     event.waitUntil(self.registration.showNotification('Push Notification', options));
// });