self.postMessage('[Worker] 工作器已載入');

self.onmessage = function (event) {
  const task = event.data;
  // 使用 postMessage 發送日誌
  self.postMessage(`[Worker 日誌] 收到任務: ${task}`);

  try {
    // 模擬處理任務的延遲
    const startTime = Date.now();
    self.postMessage(`[Worker 日誌] 開始處理任務: ${task}`);

    // 模擬計算密集型操作
    let result = 0;
    for (let i = 0; i < 1500000000; i++) {
      result += Math.sqrt(i);
    }

    const processingTime = Date.now() - startTime;
    self.postMessage(`[Worker 日誌] 任務 ${task} 完成，耗時: ${processingTime}ms`);

    // 回傳結果給主執行緒 (正常的業務資料)
    self.postMessage({
      type: 'result',
      task: task,
      time: processingTime,
      result: result.toFixed(2)
    });
  } catch (error) {
    // 錯誤處理
    self.postMessage(`[Worker 錯誤] 處理任務 ${task} 時發生錯誤: ${error.message}`);
  }
};
