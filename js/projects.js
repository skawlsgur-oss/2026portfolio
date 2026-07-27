/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - 작업물 프로젝트 관리 (projects.js)
   AI 웹/앱 데이터베이스 관리, 태그 필터링, 동적 카드 렌더링 모듈
   ========================================================================== */

// 1. 프로젝트 시드 데이터 (Nam Jin-hyeok AI Projects Database)
const PROJECTS_DATA = [
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
  },
  {
    id: 'p4',
    title: '스마트 음성 서머리 & 요약 노트',
    category: 'app',
    desc: '강의나 회의 음성을 Whisper API로 텍스트화하고 핵심 항목을 요약하여 마인드맵으로 시각화해 주는 웹앱입니다.',
    icon: '🎙️',
    tags: ['#WhisperAPI', '#SpeechToText', '#NodeJS'],
    demoUrl: 'https://demo.jin-hyeok.ai/voice-summary',
    githubUrl: 'https://github.com/namjinhyeok/ai-voice-summarizer'
  },
  {
    id: 'p5',
    title: '실시간 AI 트렌드 리서치 대시보드',
    category: 'web',
    desc: '전 세계 최신 AI 뉴스, 논문, 오픈소스 프로젝트 트렌드를 실시간 수집하여 커뮤니티에 공유하는 대시보드입니다.',
    icon: '📊',
    tags: ['#WebScraping', '#Python', '#ChartJS', '#AI-Trend'],
    demoUrl: 'https://demo.jin-hyeok.ai/trend-dashboard',
    githubUrl: 'https://github.com/namjinhyeok/ai-trend-tracker'
  }
];

class ProjectsManager {
  constructor() {
    this.projects = this.loadProjectsLocal();
    this.activeFilter = 'all';

    this.initElements();
    this.bindEvents();
    this.renderProjects();
    this.initSupabaseData();
  }

  /* [ Supabase 및 LocalStorage 연동 데이터 초기화 ] */
  async initSupabaseData() {
    // 1. 자기소개 Supabase 동기화
    if (window.supabaseHelper) {
      const sbAbout = await window.supabaseHelper.fetchAboutMe();
      if (sbAbout) {
        this.renderAboutSection(sbAbout);
      } else {
        this.loadAboutLocal();
      }

      // 2. 프로젝트 Supabase 동기화
      const sbProjects = await window.supabaseHelper.fetchProjects();
      if (sbProjects && sbProjects.length > 0) {
        this.projects = sbProjects;
        localStorage.setItem('jin_portfolio_projects_data', JSON.stringify(sbProjects));
        this.renderProjects();
      }
    } else {
      this.loadAboutLocal();
    }
  }

  loadProjectsLocal() {
    const savedProjects = localStorage.getItem('jin_portfolio_projects_data');
    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch (e) {
        console.error('LocalStorage Projects 파싱 실패:', e);
      }
    }
    return PROJECTS_DATA;
  }

  loadAboutLocal() {
    const savedAbout = localStorage.getItem('jin_portfolio_about_data');
    if (savedAbout) {
      try {
        const data = JSON.parse(savedAbout);
        this.renderAboutSection(data);
      } catch (e) {
        console.error('LocalStorage About 파싱 실패:', e);
      }
    }
  }

  renderAboutSection(data) {
    const bioElem = document.getElementById('aboutDisplayBio');
    const fieldElem = document.getElementById('aboutDisplayField');
    if (bioElem && data.bio) bioElem.textContent = data.bio;
    if (fieldElem && data.field) fieldElem.textContent = data.field;
  }

  /* [ 1. DOM 엘리먼트 초기화 ] */
  initElements() {
    this.gridContainer = document.getElementById('projectsGrid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
  }

  /* [ 2. 이벤트 리스너 바인딩 ] */
  bindEvents() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter');
        this.setFilter(filter, e.target);
      });
    });
  }

  /* [ 3. 필터 변경 처리 ] */
  setFilter(filter, targetButton) {
    this.activeFilter = filter;

    // 버튼 활성화 클래스 전환
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    targetButton.classList.add('active');

    // 카드 그리드 재렌더링
    this.renderProjects();
  }

  /* [ 4. 프로젝트 카드 동적 HTML 렌더링 ] */
  renderProjects() {
    if (!this.gridContainer) return;

    // 필터링 적용
    const filteredProjects = this.activeFilter === 'all'
      ? this.projects
      : this.projects.filter(p => p.category === this.activeFilter);

    if (filteredProjects.length === 0) {
      this.gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-sub); padding: 48px 0;">
          해당 카테고리의 프로젝트가 준비 중입니다.
        </div>
      `;
      return;
    }

    // HTML 템플릿 생성
    this.gridContainer.innerHTML = filteredProjects.map(project => `
      <div class="glass-card project-card animate-fade-in" data-id="${project.id}">
        <!-- 썸네일 그래픽 영역 -->
        <div class="project-thumb">
          <div class="project-thumb-overlay"></div>
          <div class="project-thumb-icon">${project.icon}</div>
        </div>

        <!-- 카드 본문 영역 -->
        <div class="project-body">
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.desc}</p>

          <!-- 핵심 액션 이동 버튼 (PRD 요구사항: 데모 + GitHub) -->
          <div class="project-actions">
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
              🚀 데모 체험하기
            </a>
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
              🐙 GitHub
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// 글로벌 인스턴스 생성
window.projectsManager = new ProjectsManager();
