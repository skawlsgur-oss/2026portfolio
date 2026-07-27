/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - 관리자 대시보드 로직 (admin_dashboard.js)
   PIN 로그인 인증, 탭 전환, 자기소개 편집 & 작업물 풀 CRUD 처리 모듈
   ========================================================================== */

// 1. 초기 시드 데이터 (복원/초기화용)
const DEFAULT_SEED_PROJECTS = [
  {
    id: 'p1',
    title: 'AI스케치 해석기',
    category: 'web',
    desc: '사용자가 그린 스케치 그림을 Vision AI가 해석하여 정교한 디지털 아트워크와 창의적인 묘사로 변환해 주는 AI 서비스입니다.',
    icon: '✏️',
    tags: ['#VisionAI', '#OpenAI', '#React', '#FastAPI'],
    demoUrl: 'https://ai.studio/apps/e6c079d3-b36e-4442-9be6-6cad19224489?fullscreenApplet=true',
    githubUrl: 'https://github.com/namjinhyeok/ai-sketch-interpreter'
  },
  {
    id: 'p2',
    title: '지능형 타로 & 운세 상담 AI 앱',
    category: 'app',
    desc: '학생 및 청년층의 고민을 공감형 대화 알고리즘 기반으로 타로 카드 풀이와 일일 운세를 제공하는 모바일 웹/앱입니다.',
    icon: '🔮',
    tags: ['#PromptEng', '#Claude3.5', '#PWA', '#VanillaJS'],
    demoUrl: 'https://demo.jin-hyeok.ai/tarot',
    githubUrl: 'https://github.com/namjinhyeok/ai-tarot-counselor'
  },
  {
    id: 'p3',
    title: 'AI 프롬프트 어시스턴트 툴킷',
    category: 'web',
    desc: '원하는 AI 모델별 최적의 프롬프트를 자동으로 조향하고 성능 결과를 실시간 비교해 주는 개발자/기획자용 웹 툴입니다.',
    icon: '🤖',
    tags: ['#LLM', '#OpenAI', '#VectorDB', '#Tailwind'],
    demoUrl: 'https://demo.jin-hyeok.ai/prompt-toolkit',
    githubUrl: 'https://github.com/namjinhyeok/ai-prompt-assistant'
  }
];

class AdminDashboard {
  constructor() {
    this.correctPin = '1234';
    this.aboutStorageKey = 'jin_portfolio_about_data';
    this.projectsStorageKey = 'jin_portfolio_projects_data';
    this.authStorageKey = 'jin_admin_auth';

    this.initElements();
    this.bindEvents();
    this.checkAuthentication();
  }

  /* [ 1. DOM 엘리먼트 초기화 ] */
  initElements() {
    // 인증 전용 엘리먼트
    this.loginWrapper = document.getElementById('loginWrapper');
    this.dashboardWrapper = document.getElementById('dashboardWrapper');
    this.loginPinInput = document.getElementById('loginPinInput');
    this.loginBtn = document.getElementById('loginBtn');
    this.loginErrorMsg = document.getElementById('loginErrorMsg');
    this.logoutBtn = document.getElementById('logoutBtn');

    // 탭 메뉴 엘리먼트
    this.tabBtns = document.querySelectorAll('.tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');

    // About Me 폼 엘리먼트
    this.adminName = document.getElementById('adminName');
    this.adminRole = document.getElementById('adminRole');
    this.adminField = document.getElementById('adminField');
    this.adminBio = document.getElementById('adminBio');
    this.saveAboutBtn = document.getElementById('saveAboutBtn');

    // Projects CRUD 엘리먼트
    this.addProjectForm = document.getElementById('addProjectForm');
    this.pTitle = document.getElementById('pTitle');
    this.pCategory = document.getElementById('pCategory');
    this.pIcon = document.getElementById('pIcon');
    this.pTags = document.getElementById('pTags');
    this.pDemoUrl = document.getElementById('pDemoUrl');
    this.pGithubUrl = document.getElementById('pGithubUrl');
    this.pDesc = document.getElementById('pDesc');

    this.adminProjectsList = document.getElementById('adminProjectsList');
    this.resetProjectsBtn = document.getElementById('resetProjectsBtn');
  }

  /* [ 2. 이벤트 바인딩 ] */
  bindEvents() {
    // 로그인 이벤트
    if (this.loginBtn) {
      this.loginBtn.addEventListener('click', () => this.handleLogin());
    }
    if (this.loginPinInput) {
      this.loginPinInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') this.handleLogin();
      });
    }
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    // 탭 전환 이벤트
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        this.switchTab(tabId, btn);
      });
    });

    // About Me 저장
    if (this.saveAboutBtn) {
      this.saveAboutBtn.addEventListener('click', () => this.saveAboutData());
    }

    // 작업물 추가 폼 제출
    if (this.addProjectForm) {
      this.addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddProject();
      });
    }

    // 초기화 버튼
    if (this.resetProjectsBtn) {
      this.resetProjectsBtn.addEventListener('click', () => this.resetToSeedProjects());
    }
  }

  /* [ 3. 인증 처리 ] */
  checkAuthentication() {
    const isAuth = sessionStorage.getItem(this.authStorageKey) === 'true';
    if (isAuth) {
      this.showDashboard();
    } else {
      this.showLoginForm();
    }
  }

  handleLogin() {
    const pin = this.loginPinInput.value.trim();
    if (pin === this.correctPin) {
      sessionStorage.setItem(this.authStorageKey, 'true');
      this.loginErrorMsg.style.display = 'none';
      this.showDashboard();
    } else {
      this.loginErrorMsg.textContent = '비밀번호가 올바르지 않습니다. (기본 PIN: 1234)';
      this.loginErrorMsg.style.display = 'block';
      this.loginPinInput.value = '';
      this.loginPinInput.focus();
    }
  }

  handleLogout() {
    sessionStorage.removeItem(this.authStorageKey);
    this.showLoginForm();
  }

  showLoginForm() {
    this.loginWrapper.style.display = 'flex';
    this.dashboardWrapper.classList.remove('active');
    if (this.loginPinInput) {
      this.loginPinInput.value = '';
      this.loginPinInput.focus();
    }
  }

  showDashboard() {
    this.loginWrapper.style.display = 'none';
    this.dashboardWrapper.classList.add('active');

    // 대시보드 데이터 바인딩
    this.loadAboutData();
    this.renderProjectsList();
  }

  /* [ 4. 탭 전환 처리 ] */
  switchTab(tabId, clickedBtn) {
    this.tabBtns.forEach(b => b.classList.remove('active'));
    this.tabContents.forEach(c => c.classList.remove('active'));

    clickedBtn.classList.add('active');
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  }

  async loadAboutData() {
    // 1. Supabase에서 읽기 시도
    if (window.supabaseHelper) {
      const sbAbout = await window.supabaseHelper.fetchAboutMe();
      if (sbAbout) {
        if (sbAbout.name) this.adminName.value = sbAbout.name;
        if (sbAbout.role) this.adminRole.value = sbAbout.role;
        if (sbAbout.field) this.adminField.value = sbAbout.field;
        if (sbAbout.bio) this.adminBio.value = sbAbout.bio;
        return;
      }
    }

    // 2. LocalStorage 폴백
    const savedData = localStorage.getItem(this.aboutStorageKey);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.name) this.adminName.value = data.name;
        if (data.role) this.adminRole.value = data.role;
        if (data.field) this.adminField.value = data.field;
        if (data.bio) this.adminBio.value = data.bio;
      } catch (e) {
        console.error('About 데이터 파싱 오류:', e);
      }
    }
  }

  async saveAboutData() {
    const dataToSave = {
      name: this.adminName.value.trim() || '남진혁',
      role: this.adminRole.value.trim() || 'AI Web/App Developer',
      field: this.adminField.value.trim() || 'AI 트렌드 리서치 & 생성형 AI 웹앱 개발',
      bio: this.adminBio.value.trim()
    };

    // Supabase 및 LocalStorage 동시 저장
    if (window.supabaseHelper) {
      await window.supabaseHelper.saveAboutMe(dataToSave);
    } else {
      localStorage.setItem(this.aboutStorageKey, JSON.stringify(dataToSave));
    }
    alert('✅ 자기소개 정보가 Supabase DB 및 LocalStorage에 성공적으로 저장되었습니다!');
  }

  /* [ 6. Projects 풀 CRUD 처리 ] */
  getStoredProjects() {
    const savedProjects = localStorage.getItem(this.projectsStorageKey);
    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch (e) {
        console.error('Projects 파싱 오류:', e);
      }
    }
    return DEFAULT_SEED_PROJECTS;
  }

  async fetchProjectsForAdmin() {
    if (window.supabaseHelper) {
      const sbProjects = await window.supabaseHelper.fetchProjects();
      if (sbProjects && sbProjects.length > 0) {
        localStorage.setItem(this.projectsStorageKey, JSON.stringify(sbProjects));
        return sbProjects;
      }
    }
    return this.getStoredProjects();
  }

  saveProjects(projectsArray) {
    localStorage.setItem(this.projectsStorageKey, JSON.stringify(projectsArray));
    this.renderProjectsList();
  }

  async handleAddProject() {
    const tagsArray = this.pTags.value.split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.startsWith('#') ? t : `#${t}`);

    const newProject = {
      id: 'p_' + Date.now(),
      title: this.pTitle.value.trim(),
      category: this.pCategory.value,
      icon: this.pIcon.value.trim() || '🚀',
      tags: tagsArray.length > 0 ? tagsArray : ['#AI', '#Web'],
      demoUrl: this.pDemoUrl.value.trim(),
      githubUrl: this.pGithubUrl.value.trim() || '#',
      desc: this.pDesc.value.trim()
    };

    const currentProjects = this.getStoredProjects();
    currentProjects.unshift(newProject);
    this.saveProjects(currentProjects);

    // Supabase DB 저장 연동
    if (window.supabaseHelper) {
      await window.supabaseHelper.saveProject(newProject);
    }

    // 폼 초기화
    this.addProjectForm.reset();
    alert('✨ 신규 작업물이 Supabase DB 및 LocalStorage에 추가되었습니다!');
  }

  async deleteProject(projectId) {
    if (confirm('정말로 이 작업물을 삭제하시겠습니까?')) {
      const currentProjects = this.getStoredProjects();
      const updatedProjects = currentProjects.filter(p => p.id !== projectId);
      this.saveProjects(updatedProjects);

      if (window.supabaseHelper) {
        await window.supabaseHelper.deleteProject(projectId);
      }
    }
  }

  async resetToSeedProjects() {
    if (confirm('모든 작업물 데이터를 초기 샘플 데이터로 복원하시겠습니까? 추가한 내용이 초기화됩니다.')) {
      localStorage.removeItem(this.projectsStorageKey);

      if (window.supabaseHelper) {
        for (const seedP of DEFAULT_SEED_PROJECTS) {
          await window.supabaseHelper.saveProject(seedP);
        }
      }

      this.renderProjectsList();
      alert('🔄 작업물 데이터가 기본 샘플 데이터로 초기화되었습니다.');
    }
  }

  renderProjectsList() {
    if (!this.adminProjectsList) return;

    const projects = this.getStoredProjects();

    if (projects.length === 0) {
      this.adminProjectsList.innerHTML = `
        <div style="text-align: center; color: var(--text-sub); padding: 32px;">
          등록된 작업물이 없습니다. 상단 폼에서 신규 작업물을 등록해 보세요!
        </div>
      `;
      return;
    }

    this.adminProjectsList.innerHTML = projects.map(p => `
      <div class="glass-card admin-project-item">
        <div class="admin-project-info">
          <div class="admin-project-icon">${p.icon}</div>
          <div class="admin-project-details">
            <h4>${p.title} <span class="badge ${p.category === 'app' ? 'badge-pink' : ''}">${p.category.toUpperCase()}</span></h4>
            <p>${p.desc}</p>
            <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
              ${p.tags.map(t => `<span class="badge" style="font-size: 0.75rem; height: 22px;">${t}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="admin-project-actions">
          <a href="${p.demoUrl}" target="_blank" class="btn btn-sm btn-outline" title="데모 보기">🚀 데모</a>
          <button class="btn btn-sm btn-outline" style="color: var(--accent-pink); border-color: rgba(236, 72, 153, 0.3);" onclick="window.adminDashboard.deleteProject('${p.id}')">
            🗑️ 삭제
          </button>
        </div>
      </div>
    `).join('');
  }
}

// 글로벌 인스턴스 할당
window.adminDashboard = new AdminDashboard();
