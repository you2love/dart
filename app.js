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
  mobileMenuToggle: document.getElementById('mobileMenuToggle')
};

// 初始化
function init() {
  loadTheme();
  loadProgress();
  setupEventListeners();
  updateNavigation();
  setupCodeBlocks();
}

// 事件监听器设置
function setupEventListeners() {
  // 导航链接点击
  elements.navLinks.forEach(link => {
    link.addEventListener('click', handleNavigationClick);
  });

  // 主题切换
  elements.themeToggle.addEventListener('click', toggleTheme);

  // 移动端菜单切换
  if (elements.mobileMenuToggle) {
    elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  // 键盘快捷键
  document.addEventListener('keydown', handleKeyboard);

  // 复制按钮
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', handleCopyCode);
  });
}

// 设置代码块折叠功能
function setupCodeBlocks() {
  document.querySelectorAll('.code-block').forEach(codeBlock => {
    const header = codeBlock.querySelector('.code-header');
    if (!header) return;

    const actions = header.querySelector('.code-header-actions') || document.createElement('div');
    actions.className = 'code-header-actions';

    // 创建折叠按钮
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'collapse-btn';
    collapseBtn.innerHTML = '<span class="arrow">▼</span> 收起';
    collapseBtn.onclick = () => toggleCodeBlock(codeBlock, collapseBtn);

    // 如果还没有 actions 容器，先创建它
    if (!header.querySelector('.code-header-actions')) {
      header.appendChild(actions);
    }

    // 添加折叠按钮到 actions 容器
    actions.insertBefore(collapseBtn, actions.firstChild);

    // 添加展开提示
    const expandHint = document.createElement('div');
    expandHint.className = 'expand-hint';
    expandHint.textContent = '点击展开代码';
    expandHint.onclick = () => toggleCodeBlock(codeBlock, collapseBtn);
    codeBlock.appendChild(expandHint);
  });
}

// 切换代码块折叠状态
function toggleCodeBlock(codeBlock, collapseBtn) {
  const isCollapsed = codeBlock.classList.toggle('collapsed');
  collapseBtn.classList.toggle('collapsed', isCollapsed);
  collapseBtn.innerHTML = isCollapsed ? '<span class="arrow">▼</span> 展开' : '<span class="arrow">▼</span> 收起';
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

// 移动端菜单切换
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
  
  const isOpen = sidebar.classList.contains('open');
  elements.mobileMenuToggle.setAttribute('aria-expanded', isOpen);
  elements.mobileMenuToggle.querySelector('.menu-icon').textContent = isOpen ? '✕' : '☰';
}

// 键盘快捷键
function handleKeyboard(e) {
  // Esc 关闭移动端菜单
  if (e.key === 'Escape') {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('open')) {
      toggleMobileMenu();
    }
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
      btn.style.background = '';
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制');
  });
}

// 全局复制函数（HTML内联调用）
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '已复制!';
    btn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制');
  });
}

// 点击外部关闭移动端菜单
document.addEventListener('click', (e) => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.getElementById('mobileMenuToggle');
  
  if (sidebar.classList.contains('open') && 
      !sidebar.contains(e.target) && 
      !toggle.contains(e.target)) {
    toggleMobileMenu();
  }
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  init();
  
  // 处理 URL hash
  const hash = window.location.hash.slice(1);
  if (hash && state.sections.includes(hash)) {
    navigateToSection(hash);
  }
});

// 导出函数供全局使用
window.copyCode = copyCode;