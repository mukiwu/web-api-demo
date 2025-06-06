self.addEventListener('install', event => {
  console.log('Service Worker 安裝中...');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker 已啟用');
});

self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    data: data.data
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(
    clients.openWindow(url)
  );
});
