/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - Supabase 클라이언트 연동 모듈 (supabase_client.js)
   Supabase 클라이언트 초기화 및 비동기 데이터 베이스 API 헬퍼 메서드
   ========================================================================== */

const SUPABASE_URL = 'https://dlwhnthulpxxfyeulrbw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Zk90bj_VU5WvQL0ubJRQWQ_TPSi5KHT';

// 1. Supabase 클라이언트 인스턴스 생성
let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === 'function') {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('⚡ Supabase Client Successfully Initialized!');
} else {
  console.warn('⚠️ Supabase JS SDK가 로드되지 않았습니다. LocalStorage로 폴백합니다.');
}

window.supabaseHelper = {
  client: supabaseClient,

  /* ==========================================
     [ 1. 자기소개 (about_me) DB 연동 ]
     ========================================== */
  async fetchAboutMe() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('about_me')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase fetchAboutMe 실패 (Fallback 사용):', err.message);
      return null;
    }
  },

  async saveAboutMe(aboutData) {
    // 1. LocalStorage 동기화
    localStorage.setItem('jin_portfolio_about_data', JSON.stringify(aboutData));

    // 2. Supabase DB 저장
    if (!supabaseClient) return false;
    try {
      const { error } = await supabaseClient
        .from('about_me')
        .upsert({
          id: 1,
          name: aboutData.name || '남진혁',
          role: aboutData.role || 'AI Web/App Developer',
          field: aboutData.field || 'AI 트렌드 리서치 & 생성형 AI 웹앱 개발',
          bio: aboutData.bio,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      console.log('✅ Supabase about_me 저장 완료');
      return true;
    } catch (err) {
      console.error('Supabase saveAboutMe 에러:', err.message);
      return false;
    }
  },

  /* ==========================================
     [ 2. 작업물 (projects) DB 연동 ]
     ========================================== */
  async fetchProjects() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) return null;

      // DB 컬럼명을 프론트엔드 모델 구조에 맞춰 매핑
      return data.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        desc: p.desc_text,
        icon: p.icon,
        tags: p.tags || [],
        demoUrl: p.demo_url,
        githubUrl: p.github_url
      }));
    } catch (err) {
      console.warn('Supabase fetchProjects 실패 (Fallback 사용):', err.message);
      return null;
    }
  },

  async saveProject(project) {
    // 1. Supabase DB 저장
    if (!supabaseClient) return false;
    try {
      const { error } = await supabaseClient
        .from('projects')
        .upsert({
          id: project.id,
          title: project.title,
          category: project.category,
          desc_text: project.desc,
          icon: project.icon,
          tags: project.tags,
          demo_url: project.demoUrl,
          github_url: project.githubUrl
        });

      if (error) throw error;
      console.log('✅ Supabase project 저장 완료:', project.id);
      return true;
    } catch (err) {
      console.error('Supabase saveProject 에러:', err.message);
      return false;
    }
  },

  async deleteProject(projectId) {
    if (!supabaseClient) return false;
    try {
      const { error } = await supabaseClient
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      console.log('🗑️ Supabase project 삭제 완료:', projectId);
      return true;
    } catch (err) {
      console.error('Supabase deleteProject 에러:', err.message);
      return false;
    }
  }
};
