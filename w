<body class="bg-gray-100 text-gray-800">
  <div class="flex min-h-screen">
    <aside id="sidebar" class="w-64 bg-white border-r border-gray-200 p-6 hidden md:block"></aside>
    <main class="flex-1 p-8 md:p-12">
      <div class="bg-white shadow-md rounded-lg p-8">
      <article class="uk-article">
                <div uk-alert>
                  <p>完整文章：<a href="https://muki.tw/geolocation-api-track-location/">用 Geolocation API 取得與追蹤使用者地理位置</a></p>
                  <p>請先點選「開始追蹤」並允許瀏覽器取得你的地理位置。</p>
                </div>
                <div id="map" class="uk-background-muted"></div>
                <div id="status" class="uk-margin-small-top uk-margin-small-bottom"></div>
                <div>
                  <button class="uk-button uk-button-default" onclick="startTracking()">開始追蹤</button>
                  <button class="uk-button uk-button-default" onclick="stopTracking()">停止追蹤</button>
                  <button class="uk-button uk-button-default" onclick="simulateMovement()">模擬移動</button>
                </div>
              </article>
      </div>
    </main>
    <!-- 移動端菜單切換按鈕 -->
    <button onclick="toggleMobileMenu()" class="fixed top-4 right-4 md:hidden bg-blue-500 text-white p-2 rounded z-50">
      菜單
    </button>
    <!-- 移動端側邊欄 -->
    <div id="mobile-menu" class="fixed inset-0 bg-white z-40 hidden"></div>
  </div>
</body>