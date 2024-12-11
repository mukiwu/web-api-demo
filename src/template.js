function toggleMobileMenu() {
const mobileMenu = document.getElementById('mobile-menu');
mobileMenu.classList.toggle('hidden');
}

// 配置 Nunjucks 的模板路徑
nunjucks.configure('templates', { autoescape: true });

// 動態載入模板
// document.getElementById('header').innerHTML = nunjucks.render('header.html');
// document.getElementById('footer').innerHTML = nunjucks.render('footer.html');
document.getElementById('sidebar').innerHTML = nunjucks.render('sidebar.html');
