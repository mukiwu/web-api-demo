// 接收主執行緒的數據，處理每個子任務
onmessage = function (event) {
  const { chunk, index } = event.data;
  console.log(`Worker 接收到 Chunk ${index}，開始處理...`);
  const result = processChunk(chunk);
  console.log(`Worker 完成 Chunk ${index} 的處理`);
  postMessage({ result, index });
};

function processChunk(chunk) {
  if (!chunk || !Array.isArray(chunk)) {
    console.warn('收到不合法的 chunk 資料', chunk);
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < chunk.length; i++) {
    sum += chunk[i];
  }
  return sum;
}
