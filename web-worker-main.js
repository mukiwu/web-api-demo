// 建立 Worker 實例
const worker = new Worker('web-worker-chunk.js');

// 記錄每個子任務結果
const results = [];
let receivedCount = 0;

// 接收來自 Worker 的訊息
worker.onmessage = function (event) {
  const { result, index } = event.data;
  console.log(`Worker 回傳 Chunk ${index} 的結果：${result}`);
  results[index] = result;
  receivedCount++;

  // 當所有子任務完成，合併結果
  if (receivedCount === 4) {
    const total = results.reduce((sum, val) => sum + val, 0);
    console.log(`所有子任務完成，總合計：${total}`);
    console.timeEnd('worker');
  }
};

// 拆分複雜的任務並發送給 Worker
function processLargeData(data) {
  console.time('worker');
  const chunkSize = Math.ceil(data.length / 4);
  for (let i = 0; i < 4; i++) {
    const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
    console.log(`發送 Chunk ${i}，資料筆數：${chunk.length}`);
    worker.postMessage({ chunk, index: i });
  }
}

// 產生 100 萬筆隨機數字（模擬大量數據處理）
const largeData = Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 100));
console.log(`準備處理大型資料，共 ${largeData.length} 筆`);
processLargeData(largeData);
