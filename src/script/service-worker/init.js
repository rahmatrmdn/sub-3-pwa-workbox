import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate, CacheFirst, CacheOnly} from 'workbox-strategies';
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
    new StaleWhileRevalidate({
        cacheName: 'pages'
    })
);

registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

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

registerRoute(
    new RegExp('/v2/'),
    new CacheOnly()
);