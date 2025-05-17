// 註冊 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(registration => {
      console.log('Service Worker 註冊成功:', registration);
    })
    .catch(error => {
      console.error('Service Worker 註冊失敗:', error);
    });
}
