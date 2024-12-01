document.getElementById('sidebar').innerHTML = `
  <div class="uk-visible@m" uk-sticky="offset: 40; bottom: #article;">
    <div><img src="https://muki.tw/logo.svg" alt="Muki" width="200"></div>
    <h2>可愛又迷人的 Web API</h2>
    <div>
      <div uk-scrollspy-nav="closest: a; scroll: true; offset: 40;">
        <ul class="uk-list">
          <li><a href="index.html">關於這裡</a></li>
          <li><a href="geo.html">用 Geolocation API 取得與追蹤使用者地理位置</a></li>
        </ul>
      </div>
    </div>
  </div>
`;
