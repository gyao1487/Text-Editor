const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//precache all assets listend in WB MANIFEST file and configures cache-first strategy for them
precacheAndRoute(self.__WB_MANIFEST);

//Create "CacheFirst" instance named "page-cache"
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    //Cache responsees with status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    //Automatically delete cache after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

//"warms up" the 'pageCache' strategy by pre-caching the following urls using CacheFirst
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset caching
registerRoute(
  ({request}) => ['style','script','worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0,200],
      })
    ]
  })
);

//Fallback to offline page for navigation requests when there is no network
registerRoute(
  ({request}) => request.mode ==='navigate'
  
  })
)
