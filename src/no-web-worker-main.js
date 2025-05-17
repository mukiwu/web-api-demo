// main-no-worker.js

function processChunk(chunk, index) {
  console.log(`主執行緒開始處理 Chunk ${index}，資料筆數：${chunk.length}`);
  let sum = 0;
  for (let i = 0; i < chunk.length; i++) {
    sum += chunk[i];
  }
  console.log(`主執行緒完成 Chunk ${index} 的處理，結果：${sum}`);
  return sum;
}

function processLargeData(data) {
  console.log(`主執行緒開始處理大型資料，共 ${data.length} 筆`);
  console.time('no-worker');
  const chunkSize = Math.ceil(data.length / 4);
  const results = [];

  for (let i = 0; i < 4; i++) {
    const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
    const result = processChunk(chunk, i);
    results[i] = result;
  }

  const total = results.reduce((sum, val) => sum + val, 0);
  console.log(`所有子任務完成，總合計：${total}`);
  console.timeEnd('no-worker');
}

// 產生 100 萬筆隨機數字（模擬大量數據處理）
const largeData = Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 100));
processLargeData(largeData);
