const CACHE_NAME = 'shyam-yantra-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/vite.svg'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Aggressive bypass for development/Vite internal modules
    if (
        event.request.url.includes('localhost') ||
        event.request.url.includes('127.0.0.1') ||
        event.request.url.includes('/@vite/') ||
        event.request.url.includes('/src/') ||
        event.request.url.includes('.tsx') ||
        event.request.url.includes('.ts') ||
        event.request.url.includes('hot-update')
    ) {
        return;
    }

    // Network First for HTML to avoid 404 on hashed assets
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match('/index.html'))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                // Return null if fetch fails to avoid promise rejection noise
                return null;
            });
        })
    );
});
