function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

// 配置 Nunjucks 的模板路徑
const env = nunjucks.configure('templates', { autoescape: true });

// 添加 groupBy 過濾器
env.addFilter('groupBy', function (array, key) {
  const result = {};
  array.forEach(item => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  });
  return result;
});

// 動態載入導航數據和模板
async function loadNavigationData() {
  try {
    console.log('開始載入導航數據...');

    // 並行載入導航數據和圖標數據
    const [navigationResponse, iconsResponse] = await Promise.all([
      fetch('data/navigation.json'),
      fetch('data/icons.json')
    ]);

    console.log('數據載入完成:', navigationResponse.status, iconsResponse.status);

    if (!navigationResponse.ok || !iconsResponse.ok) {
      throw new Error('Failed to load navigation data');
    }

    const navigationData = await navigationResponse.json();
    const iconsData = await iconsResponse.json();

    console.log('解析的數據:', navigationData, iconsData);

    // 將數據傳遞給 nunjucks 模板
    const templateData = {
      navigation: navigationData.navigation,
      categories: navigationData.categories,
      icons: iconsData
    };

    console.log('模板數據:', templateData);

    // 渲染側邊欄
    const renderedHTML = env.render('sidebar.html', templateData);
    console.log('渲染的HTML:', renderedHTML);

    document.getElementById('sidebar').innerHTML = renderedHTML;

    // 設置移動端菜單功能
    setupMobileMenu();

    // 設置當前頁面的導航項目為活動狀態
    setActiveNavigationItem();

    console.log('導航載入完成');

  } catch (error) {
    console.error('Error loading navigation data:', error);
    // 如果載入失敗，顯示錯誤信息
    document.getElementById('sidebar').innerHTML = `
      <div class="bg-white shadow-lg min-h-screen p-6">
        <div class="text-red-600 text-center">
          <p>載入導航失敗</p>
          <p class="text-sm text-gray-500">錯誤: ${error.message}</p>
          <p class="text-sm text-gray-500">請檢查網絡連接</p>
        </div>
      </div>
    `;
  }
}

// 設置移動端菜單功能
function setupMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const menu = document.querySelector('.menu');

  if (navToggle && menu) {
    navToggle.addEventListener('change', function () {
      if (this.checked) {
        menu.classList.remove('hidden');
        menu.classList.add('block');
      } else {
        menu.classList.add('hidden');
        menu.classList.remove('block');
      }
    });
  }
}

// 設置當前頁面的導航項目為活動狀態
function setActiveNavigationItem() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkUrl = link.getAttribute('href');
    if (linkUrl === currentFile) {
      link.classList.add('active');
    }
  });
}

// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function () {
  console.log('頁面載入完成，開始載入導航...');
  loadNavigationData();
});
