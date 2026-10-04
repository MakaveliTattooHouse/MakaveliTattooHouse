const CACHE_NAME = 'makaveli-tattoo-v4.5'; 

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './services.html',
    './offline.html',
    './css/global.css',
    './css/login.css',
    './css/services.css',
    './js/login.js',
    './js/services.js',
    './js/whatsapp.js',
    './js/tour.js', // The new guided tour script
    './assets/images/barber.webp',
    './assets/images/logo.webp'
];

// 1. Install Event: Cache critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching all assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting()) // Forces the waiting service worker to become the active service worker
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Takes control of all open pages immediately
    );
});

// 3. Fetch Event
self.addEventListener('fetch', (event) => {
    // Strategy A: Network-First for HTML Navigation
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match(event.request).then((cachedResponse) => {
                        // Return cached page if available, OTHERWISE return the offline.html fallback
                        return cachedResponse || caches.match('./offline.html');
                    });
                })
        );
        return;
    }

  // Strategy B: Stale-While-Revalidate for Static Assets (CSS, JS, Images)
event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
            // 1. Verify the response is valid before attempting to cache
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return networkResponse;
            }

            // 2. Clone the response synchronously BEFORE passing it to the async cache operation
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
                // 3. Put the cloned response into the cache
                cache.put(event.request, responseToCache);
            });

            return networkResponse;
        }).catch(() => {
            // 4. Fallback gracefully to the cached response if the network fails (offline)
            return cachedResponse;
        });

        // 5. Return the cached response immediately if it exists, otherwise wait for the fetch
        return cachedResponse || fetchPromise;
    })
);
