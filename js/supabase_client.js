/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - Supabase 클라이언트 연동 모듈 (supabase_client.js)
   서버리스 엔드포인트(/api/config)를 통해 동적으로 키를 수신하여 보안 초기화
   ========================================================================== */

let supabaseClient = null;

async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.warn('⚠️ Supabase JS SDK가 로드되지 않았습니다. LocalStorage로 폴백합니다.');
    return null;
  }

  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      const config = await response.json();
      if (config.supabaseUrl && config.supabaseAnonKey) {
        supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
        console.log('⚡ Supabase Client Successfully Initialized via Server Config!');
        if (window.supabaseHelper) {
          window.supabaseHelper.client = supabaseClient;
        }
        return supabaseClient;
      }
    }
  } catch (err) {
    console.warn('⚠️ Supabase Config Fetch Fallback (LocalStorage 사용):', err.message);
  }

  return null;
}

// 비동기 초기화 시도
getSupabaseClient();

window.supabaseHelper = {
  client: null,

  /* ==========================================
     [ 1. 자기소개 (about_me) DB 연동 ]
     ========================================== */
  async fetchAboutMe() {
    const client = await getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client
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
    const client = await getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client
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
    const client = await getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client
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
    const client = await getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client
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
    const client = await getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client
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
