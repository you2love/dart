// Dart 学习网站 - 交互式 JavaScript

// 状态管理
const state = {
  currentSection: 'overview',
  theme: 'light',
  progress: 0,
  sections: ['overview', 'type-system', 'async-programming', 'oop', 'null-safety', 'functional', 'patterns', 'comparison']
};

// DOM 元素
const elements = {
  navLinks: document.querySelectorAll('.nav-link'),
  sections: document.querySelectorAll('.section'),
  themeToggle: document.getElementById('themeToggle'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  tocToggle: document.getElementById('tocToggle'),
  tocContent: document.getElementById('tocContent'),
  tocList: document.getElementById('tocList'),
  mobileMenuToggle: document.getElementById('mobileMenuToggle')
};

// 初始化
function init() {
  loadTheme();
  loadProgress();
  setupEventListeners();
  generateToc();
  updateNavigation();
  highlightCurrentSection();
}

// 事件监听器设置
function setupEventListeners() {
  // 导航链接点击
  elements.navLinks.forEach(link => {
    link.addEventListener('click', handleNavigationClick);
  });

  // 主题切换
  elements.themeToggle.addEventListener('click', toggleTheme);

  // TOG 切换
  elements.tocToggle.addEventListener('click', toggleToc);

  // 移动端菜单切换
  if (elements.mobileMenuToggle) {
    elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  // 滚动监听
  window.addEventListener('scroll', handleScroll);

  // 键盘快捷键
  document.addEventListener('keydown', handleKeyboard);

  // 窗口大小改变
  window.addEventListener('resize', handleResize);

  // 复制按钮
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', handleCopyCode);
  });
}

// 导航处理
function handleNavigationClick(e) {
  e.preventDefault();
  const sectionId = e.currentTarget.getAttribute('data-section');
  navigateToSection(sectionId);
}

function navigateToSection(sectionId) {
  // 更新状态
  state.currentSection = sectionId;
  
  // 更新导航样式
  updateNavigation();
  
  // 切换部分
  elements.sections.forEach(section => {
    section.classList.remove('active');
    if (section.id === sectionId) {
      section.classList.add('active');
    }
  });
  
  // 更新进度
  updateProgress();
  
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // 更新 URL hash
  history.pushState(null, '', `#${sectionId}`);
  
  // 保存进度
  saveProgress();
}

function updateNavigation() {
  elements.navLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section');
    if (sectionId === state.currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 主题切换
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme();
  saveTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const icon = elements.themeToggle.querySelector('.theme-icon');
  icon.textContent = state.theme === 'light' ? '🌙' : '☀️';
}

function loadTheme() {
  const savedTheme = localStorage.getItem('dart-tutorial-theme');
  if (savedTheme) {
    state.theme = savedTheme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    state.theme = 'dark';
  }
  applyTheme();
}

function saveTheme() {
  localStorage.setItem('dart-tutorial-theme', state.theme);
}

// 进度管理
function updateProgress() {
  const currentIndex = state.sections.indexOf(state.currentSection);
  state.progress = Math.round(((currentIndex + 1) / state.sections.length) * 100);
  
  elements.progressFill.style.width = `${state.progress}%`;
  elements.progressText.textContent = `${state.progress}% 完成`;
}

function loadProgress() {
  const savedProgress = localStorage.getItem('dart-tutorial-progress');
  if (savedProgress) {
    state.currentSection = savedProgress;
  }
}

function saveProgress() {
  localStorage.setItem('dart-tutorial-progress', state.currentSection);
}

// 目录生成
function generateToc() {
  const tocItems = state.sections.map(sectionId => {
    const section = document.getElementById(sectionId);
    const title = section.querySelector('.section-title').textContent;
    return `
      <li>
        <a href="#${sectionId}" data-section="${sectionId}">${title}</a>
      </li>
    `;
  }).join('');
  
  elements.tocList.innerHTML = tocItems;
  
  // TOC 链接点击
  elements.tocList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      navigateToSection(sectionId);
      toggleToc();
    });
  });
}

function toggleToc() {
  elements.tocContent.classList.toggle('show');
}

// 移动端菜单切换
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
  
  const isOpen = sidebar.classList.contains('open');
  elements.mobileMenuToggle.setAttribute('aria-expanded', isOpen);
  elements.mobileMenuToggle.querySelector('.menu-icon').textContent = isOpen ? '✕' : '☰';
}

// 滚动处理
function handleScroll() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  // 高亮当前可见的部分
  highlightCurrentSection();
}

function highlightCurrentSection() {
  const scrollPosition = window.scrollY + 100;
  
  elements.sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      state.currentSection = section.id;
      updateNavigation();
      updateToc();
    }
  });
}

function updateToc() {
  elements.tocList.querySelectorAll('a').forEach(link => {
    const sectionId = link.getAttribute('data-section');
    if (sectionId === state.currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 键盘快捷键
function handleKeyboard(e) {
  // Esc 关闭 TOC
  if (e.key === 'Escape') {
    elements.tocContent.classList.remove('show');
  }
  
  // 左右箭头导航
  if (e.key === 'ArrowRight') {
    const currentIndex = state.sections.indexOf(state.currentSection);
    if (currentIndex < state.sections.length - 1) {
      navigateToSection(state.sections[currentIndex + 1]);
    }
  }
  
  if (e.key === 'ArrowLeft') {
    const currentIndex = state.sections.indexOf(state.currentSection);
    if (currentIndex > 0) {
      navigateToSection(state.sections[currentIndex - 1]);
    }
  }
  
  // T 切换主题
  if (e.key === 't' || e.key === 'T') {
    toggleTheme();
  }
}

// 窗口大小改变
function handleResize() {
  // 移动端处理
  if (window.innerWidth <= 1024) {
    elements.tocContent.classList.remove('show');
  } else {
    // 窗口变大时关闭移动端菜单
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('open');
    if (elements.mobileMenuToggle) {
      elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
      elements.mobileMenuToggle.querySelector('.menu-icon').textContent = '☰';
    }
  }
}

// 复制代码
function handleCopyCode(e) {
  const codeBlock = e.target.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const btn = e.target;
    const originalText = btn.textContent;
    btn.textContent = '已复制!';
    btn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = 'var(--primary-color)';
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制');
  });
}

// 复制功能（全局）
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '已复制!';
    btn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = 'var(--primary-color)';
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制');
  });
}

// 工具函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 页面可见性变化
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    highlightCurrentSection();
  }
});

// 点击外部关闭 TOC
document.addEventListener('click', (e) => {
  if (!elements.tocContent.contains(e.target) && !elements.tocToggle.contains(e.target)) {
    elements.tocContent.classList.remove('show');
  }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 20;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// 添加动画观察器
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // 观察所有卡片
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
}

// 性能优化：使用 requestAnimationFrame
let ticking = false;
function optimizedScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  init();
  setupIntersectionObserver();
  
  // 处理 URL hash
  const hash = window.location.hash.slice(1);
  if (hash && state.sections.includes(hash)) {
    navigateToSection(hash);
  }
});

// 导出函数供全局使用
window.copyCode = copyCode;
window.navigateToSection = navigateToSection;
window.toggleTheme = toggleTheme;