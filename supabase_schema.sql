-- ==========================================================================
-- 2026 Nam Jin-hyeok AI Portfolio - Supabase Database Schema (supabase_schema.sql)
-- Supabase SQL Editor에 복사하여 붙여넣고 [Run] 버튼을 누르면 테이블과 초기 데이터가 자동 생성됩니다.
-- ==========================================================================

-- 1. 기존 테이블 정리 (필요 시)
-- DROP TABLE IF EXISTS public.projects;
-- DROP TABLE IF EXISTS public.about_me;

-- 2. 자기소개 (about_me) 테이블 생성
CREATE TABLE IF NOT EXISTS public.about_me (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '남진혁',
    role TEXT NOT NULL DEFAULT 'AI Web/App Developer',
    field TEXT NOT NULL DEFAULT 'AI 트렌드 리서치 & 생성형 AI 웹앱 개발',
    bio TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 작업물 (projects) 테이블 생성
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('web', 'app')),
    desc_text TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT '🚀',
    tags TEXT[] NOT NULL DEFAULT '{}',
    demo_url TEXT NOT NULL,
    github_url TEXT NOT NULL DEFAULT '#',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Row Level Security (RLS) 읽기/쓰기 권한 전체 허용 설정
ALTER TABLE public.about_me ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read and write access on about_me" ON public.about_me;
CREATE POLICY "Allow public read and write access on about_me"
ON public.about_me FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write access on projects" ON public.projects;
CREATE POLICY "Allow public read and write access on projects"
ON public.projects FOR ALL USING (true) WITH CHECK (true);

-- 5. 초기 샘플 데이터 삽입 (Seed Data)
INSERT INTO public.about_me (id, name, role, field, bio)
VALUES (
    1,
    '남진혁',
    'AI Web/App Developer',
    'AI 트렌드 리서치 & 생성형 AI 웹앱 개발',
    '안녕하세요! AI 기술 트렌드를 연구하고 이를 누구나 손쉽게 활용할 수 있는 웹앱으로 만드는 개발자 남진혁입니다.

학생 및 또래 청년층이 일상에서 흥미롭게 사용할 수 있는 서비스(AI 스케치 해석기, 타로 상담 AI 등)를 주력으로 개발하고 있습니다.'
)
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name, role = EXCLUDED.role, field = EXCLUDED.field, bio = EXCLUDED.bio, updated_at = NOW();

INSERT INTO public.projects (id, title, category, desc_text, icon, tags, demo_url, github_url)
VALUES 
(
    'p1',
    'AI스케치 해석기',
    'web',
    '사용자가 그린 스케치 그림을 Vision AI가 해석하여 정교한 디지털 아트워크와 창의적인 묘사로 변환해 주는 AI 서비스입니다.',
    '✏️',
    ARRAY['#VisionAI', '#OpenAI', '#React', '#FastAPI'],
    'https://ai.studio/apps/e6c079d3-b36e-4442-9be6-6cad19224489?fullscreenApplet=true',
    'https://github.com/namjinhyeok/ai-sketch-interpreter'
),
(
    'p2',
    '지능형 타로 & 운세 상담 AI 앱',
    'app',
    '학생 및 청년층의 고민을 공감형 대화 알고리즘 기반으로 타로 카드 풀이와 일일 운세를 제공하는 모바일 웹/앱입니다.',
    '🔮',
    ARRAY['#PromptEng', '#Claude3.5', '#PWA', '#VanillaJS'],
    'https://demo.jin-hyeok.ai/tarot',
    'https://github.com/namjinhyeok/ai-tarot-counselor'
),
(
    'p3',
    'AI 프롬프트 어시스턴트 툴킷',
    'web',
    '원하는 AI 모델별 최적의 프롬프트를 자동으로 조향하고 성능 결과를 실시간 비교해 주는 개발자/기획자용 웹 툴입니다.',
    '🤖',
    ARRAY['#LLM', '#OpenAI', '#VectorDB', '#Tailwind'],
    'https://demo.jin-hyeok.ai/prompt-toolkit',
    'https://github.com/namjinhyeok/ai-prompt-assistant'
)
ON CONFLICT (id) DO NOTHING;
