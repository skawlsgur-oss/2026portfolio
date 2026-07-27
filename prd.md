# 🚀 [PRD] 2026 남진혁 AI 포트폴리오 웹사이트 제품 요구사항 정의서

> **문서 버전:** v1.2 (Supabase Cloud DB 연동)  
> **작성일자:** 2026년 7월 27일  
> **기획자:** 남진혁 (AI 트렌드 및 웹앱 개발자)  
> **대상 읽는 이:** 초보 개발자, 기획자, 디자이너, 협업 파트너  

---

## 1. 프로젝트 개요 (Overview)

### 1.1 프로젝트명
- **2026 Nam Jin-hyeok AI Web/App Portfolio & Admin System (`2026portfolio`)**

### 1.2 프로젝트 한 줄 요약
- **25세 대학생/취준생 층을 타겟**으로, 남진혁 개발자가 연구하고 제작한 **AI 트렌드 기반의 웹사이트 및 모바일 앱 프로젝트를 한눈에 확인하고 즉시 체험(라이브 데모/GitHub)**할 수 있는 인터랙티브 포트폴리오 웹사이트이며, **독립된 관리자 페이지(`admin.html`)를 통해 자기소개 및 작업물을 Supabase 클라우드 데이터베이스에 실시간 반영**하는 풀스택 호환 정적 시스템입니다.

### 1.3 프로젝트 배경 및 목적
- **산발적인 작업물 통합:** 제작한 여러 AI 웹앱과 서비스가 개별 링크로 흩어져 있어 접근성이 떨어지는 문제 해결
- **학생 타겟 커뮤니케이션:** 25세 전후의 학생들이 흥미를 느끼고 쉽게 체험해볼 수 있도록 직관적이고 감각적인 디자인 제공
- **Supabase Cloud DB 연동:** 관리자 페이지(`admin.html`)에서 수정한 자기소개 및 작업물(Projects) 데이터를 **Supabase 클라우드 데이터베이스(`about_me`, `projects` 테이블)**와 `localStorage`에 영구 보존하여 모든 방문자에게 최신 데이터를 제공함

---

## 2. 타겟 사용자 분석 (Target Audience & Persona)

### 2.1 주요 대상 (Primary Audience)
- **평균 연령:** 25세 (대학생, 취업준비생, AI/IT 기술에 관심이 많은 또래 청년층)
- **특성:** 
  - 텍스트 위주의 길고 지루한 포트폴리오보다 시각적이고 직관적인 웹사이트 선호
  - AI 트렌드 및 최신 모바일/웹 기술에 호기심이 높음
  - 즉시 체험 가능한 '라이브 데모 링크'나 'GitHub 코드 링크'를 중요하게 생각함

### 2.2 타겟 페르소나 (Persona)
- **이름:** 이민우 (25세, 컴퓨터공학/디자인전공 대학 4학년)
- **니즈:** "요즘 또래 개발자들은 어떤 AI 기술로 앱을 만들고 있을까? 나도 직접 들어가서 체험해보고 싶다."
- **행동 패턴:** 
  1. 포트폴리오 사이트에 접속하자마자 화려하고 감각적인 AI 디자인에 몰입됨.
  2. 자기소개와 관심 분야를 읽고 남진혁 개발자의 역량을 파악함.
  3. [작업물 페이지]에서 관심 있는 AI 웹앱 카드의 **'데모 체험하기'** 또는 **'GitHub'** 버튼을 클릭해 경험함.

---

## 3. 디자인 컨셉 & UX/UI 방향성 (Design System)

### 3.1 디자인 테마: `AI 트렌디 & 글로우 (AI Trendy & Glow)`
- **컬러 팔레트:**
  - Background: Deep Dark (`#0B0F17`, `#111827`)
  - Accent Colors: Neon Cyan (`#06B6D4`), Electric Violet (`#8B5CF6`), Cyber Pink (`#EC4899`)
  - Text: High Contrast White (`#F9FAFB`), Muted Silver (`#9CA3AF`)
- **Visual Effects:**
  - **글래스모피즘 (Glassmorphism):** 은은하게 비치는 반투명 유리 느낌의 카드 UI
  - **네온 그래디언트 (Neon Gradient):** AI 최신 트렌드를 느끼게 하는 부드러운 빛 번짐 효과
  - **마이크로 애니메이션:** 카드 호버 시 살짝 떠오르는 마이크로 인터랙션

### 3.2 UX 가이드라인
- **메인 포트폴리오(`index.html`) & 관리자 대시보드(`admin.html`) 디자인 일관성 유지**
- **모바일 퍼스트 반응형:** 스마트폰, 타블렛, PC 등 모든 기기 화면에 맞춤형 레이아웃 제공
- **비기너 친화적 표현:** 어려운 개발 전문 용어 옆에는 이해하기 쉬운 한 줄 설명을 첨부

---

## 4. 정보 구조 (Information Architecture, IA)

```
2026portfolio
├── 1. index.html (메인 사용자 포트폴리오 사이트)
│   ├── Header Navigation (메뉴 & '🔐 Admin' 접속 버튼)
│   ├── Hero Section (메인 타이틀 & CTA)
│   ├── About Me Section (자기소개 및 관심 분야 - Supabase 실시간 동기화)
│   ├── Projects Section (동적 AI 작업물 카테고리 필터 카드 & 라이브/GitHub 링크)
│   ├── Tech Stack & AI Focus (기술 스택)
│   └── Footer (소셜 링크 & 카피라이트)
│
├── 2. admin.html (독립 관리자 대시보드 시스템)
│   ├── [인증 뷰] 관리자 로그인 폼 (비밀번호 PIN verification: 1234)
│   └── [대시보드 뷰] 관리자 메인 컨트롤 타워
│       ├── Header (로그아웃 버튼 & '🚀 메인으로 이동' 버튼)
│       ├── Tab 1: 자기소개 (About Me) 수정 폼 (Supabase + LocalStorage 저장)
│       └── Tab 2: 작업물 (Projects) 풀 CRUD 관리자 (Supabase + LocalStorage 저장)
│
└── 3. supabase_schema.sql (Supabase DDL 데이터베이스 생성 스크립트)
```

---

## 5. 상세 기능 요구사항 (Feature Specifications)

### 5.1 [섹션 1] 네비게이션 헤더 (Header & Nav)
- **로고:** `JINHYEOK.AI` (네온 그래디언트 로고)
- **메뉴 링크:** About / Projects / Tech Stack / Contact
- **관리자 전용 이동 버튼:** 우측 상단 `🔐 Admin` 버튼 배치 (클릭 시 `admin.html`로 이동)

### 5.2 [섹션 2] 메인 히어로 (Hero Section)
- **헤드라인:** "AI로 상상을 현실로 만드는 개발자, 남진혁입니다."
- **서브헤드:** "최신 AI 트렌드를 반영한 웹앱과 유용한 서비스를 만듭니다."
- **CTA 버튼:** `작업물 둘러보기 (Projects)` / `GitHub 방문하기`

### 5.3 [섹션 3] 자기소개란 (About Me Section)
- **기본 정보:** 이름 (남진혁), 관심 분야 (AI 트렌드, 생성형 AI 웹앱), 할 수 있는 것 (웹/앱 개발, AI API 연동)
- **자기소개 텍스트:** AI 기술을 쉽게 서비스로 녹여내는 개발 방향성 공유
- **Supabase 동적 로드:** `about_me` 테이블 데이터 최우선 반영 (없을 시 `localStorage` 및 기본값 사용)

### 5.4 [섹션 4] 작업물 페이지 (Projects Section)
- **프로젝트 카드 구성 요소:**
  - **이모지/아이콘 & 썸네일:** AI 웹앱 시연 그래픽
  - **프로젝트 제목 & 한 줄 설명:** (예: "AI스케치 해석기", "지능형 타로/운세 웹앱")
  - **사용 기술 태그 (Badges):** `#VisionAI`, `#OpenAI`, `#React`, `#FastAPI` 등
  - **핵심 이동 버튼 (Action Buttons):**
    - 🚀 **`데모 체험하기 (Live Demo)`**: 해당 웹/앱으로 바로 이동하는 클릭 가능 링크 (예: AI Studio 앱 주소)
    - 🐙 **`GitHub 코드보기`**: 개발 소스코드 저장소로 바로 이동
- **Supabase 동적 CRUD 렌더링:** `projects` 테이블 데이터를 모든 방문자 화면에 즉시 수신/표시

### 5.5 [섹션 5] 기술 스택 & 관심 분야 (Skills & Interests)
- **관심 분야 (Interests):** AI 트렌드 리서치, LLM 파인튜닝, 프롬프트 엔지니어링, 웹앱 서비스 구축
- **기술 스택 (Tech Stack):** Frontend (HTML/CSS/JS, React), AI/Backend (OpenAI API, Claude, Python, Supabase)

### 5.6 [섹션 6] 푸터 (Footer)
- **카피라이트:** `© 2026 Nam Jin-hyeok. All rights reserved.`
- **연락처 & 링크:** 이메일, GitHub 주소, 블로그/SNS

### 5.7 [섹션 7] 관리자 전용 대시보드 페이지 (`admin.html`)

#### 5.7.1 로그인 & 인증 처리 (Authentication)
- **로그인 화면:** `admin.html` 첫 접속 시 4자리 PIN 비밀번호(기본값: `1234`) 입력창 표시
- **세션 유지:** 인증 성공 시 `sessionStorage`에 로그인 상태 저장 (`jin_admin_authenticated = true`)
- **로그아웃:** 대시보드 상단 `🚪 Logout` 버튼으로 즉시 인증 해제 및 로그인 화면으로 복귀

#### 5.7.2 자기소개 (About Me) 편집 탭
- **입력 항목:** 이름, 직함, 관심 분야 한 줄 요약, 자기소개 본문 텍스트 (Textarea)
- **Supabase 저장 기능:** `💾 자기소개 저장` 클릭 시 `about_me` 테이블 upsert 및 `localStorage` 동시 보존

#### 5.7.3 작업물 (Projects) 풀 CRUD 대시보드 탭
- **1. [Create] 신규 작업물 등록 폼:**
  - 제목 (예: "AI스케치 해석기"), 카테고리(`web`/`app`), 한 줄 설명, 아이콘 이모지, 태그, 데모 접속 URL, GitHub URL
  - 제출 시 Supabase `projects` 테이블 `INSERT`/`UPSERT` 및 `localStorage` 동기화
- **2. [Read/Update] 기존 작업물 리스트 & 수정:**
  - 등록된 작업물 목록을 글래스모피즘 카드로 나열 및 실시간 인라인 수정
- **3. [Delete] 작업물 삭제:**
  - `🗑️ 삭제` 버튼 클릭 시 확인 팝업 후 Supabase DB & `localStorage`에서 삭제
- **4. [Reset] 기본 시드 데이터 복원:**
  - `🔄 기본 데이터로 초기화` 버튼 제공하여 초기 시드 프로젝트 데이터로 복원

---

## 6. 데이터 흐름 및 클라우드 DB 사양 (Data Architecture)

```mermaid
graph TD
    A[방문자 메인 페이지 index.html] --> B{Supabase Cloud DB 연결}
    B -- 성공 --> C[about_me & projects 테이블 데이터 실시간 조회 및 렌더링]
    B -- 실패/오류 --> D[LocalStorage 및 시드 데이터 폴백]
    
    E[관리자 페이지 admin.html] --> F{PIN 1234 인증}
    F -- 성공 --> G[관리자 대시보드]
    G --> H[자기소개 및 신규/수정/삭제 작업물 입력]
    H --> I[Supabase Cloud DB & LocalStorage 동시 저장]
    I --> B
```

### 6.1 Supabase 클라우드 데이터베이스 설정 (v1.2 추가)
- **Supabase URL:** `https://dlwhnthulpxxfyeulrbw.supabase.co`
- **Publishable API Key:** `sb_publishable_Zk90bj_VU5WvQL0ubJRQWQ_TPSi5KHT`
- **테이블 구조:**
  1. `about_me` (id, name, role, field, bio, updated_at)
  2. `projects` (id, title, category, desc_text, icon, tags, demo_url, github_url, created_at)
- **안전 장치:** Supabase 연동 실패 시 브라우저 `localStorage`로 자동 전환되는 이중 데이터 보존(Fallback) 제공

---

## 7. 기술 스택 및 개발 구조 (Tech Stack & Architecture)

| 구분 | 기술 / 도구 | 선정 이유 |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Vanilla CSS3, Modern JavaScript (ES6+) | 가볍고 빠른 로딩, 백엔드 서버 없는 정적 파일 구동 |
| **Database** | **Supabase Cloud DB** (PostgreSQL) | 서버 구축 없이 클라우드 DB에 작업물 및 자기소개 데이터 보존 |
| **Admin System** | `admin.html`, `js/admin_dashboard.js` | 독립 대시보드 레이아웃과 풀 CRUD 작업물 관리 기능 제공 |
| **Style Concept**| Glassmorphism, CSS Custom Variables (`design.md`) | 메인 포트폴리오와 완벽히 통일된 다크 네온 어드민 UI |
| **Data Backup**| Browser `localStorage` API | 네트워크 단절 시에도 포트폴리오 데이터 100% 정상 작동 |
| **Deployment** | Vercel / GitHub Pages | 정적 파일 호스팅 및 글로벌 CDN 무료 배포 |

---

## 8. 단계별 개발 로드맵 (Development Roadmap)

### 1단계: 프론트엔드 퍼블리싱 & 기본 포트폴리오 (v1.0 - 완료)
- [x] PRD 기획 및 요구사항 정의 (`prd.md`)
- [x] 메인 포트폴리오 사이트 (`index.html`) 및 디자인 시스템 (`design.md`) 구축
- [x] 컴포넌트 스토리북 데모 (`components_demo.html`) 제작
- [x] GitHub 저장소 푸시 (`https://github.com/skawlsgur-oss/2026portfolio.git`)

### 2단계: 독립 관리자 페이지 및 풀 CRUD 구현 (v1.1 - 완료)
- [x] PRD v1.1 관리자 페이지 기능 요구사항 명세 작성
- [x] 관리자 전용 스타일 시트 `css/admin.css` 제작
- [x] 관리자 페이지 `admin.html` (로그인 뷰 + 대시보드 뷰) 개발
- [x] 관리자 JS 대시보드 로직 `js/admin_dashboard.js` (로그인, 자기소개 편집, 작업물 CRUD) 작성

### 3단계: Supabase 클라우드 데이터베이스 연동 (v1.2 - 완료)
- [x] PRD v1.2 Supabase 연동 명세 작성 (`prd.md`)
- [x] Supabase DDL SQL 생성 스크립트 `supabase_schema.sql` 작성
- [x] Supabase 클라이언트 SDK 헬퍼 모듈 `js/supabase_client.js` 제작
- [x] 방문자 메인 페이지(`index.html`) 및 관리자 대시보드(`admin.html`) Supabase DB 연동
- [x] 전체 자동화 검증 테스트 및 GitHub 최신 코드 커밋/푸시 완료

---

## 9. 성공 측정 지표 (Success Metrics)

1. **접근 편의성:** 메인 화면 접속 후 3초 이내에 작업물 데모 링크를 찾아 클릭할 수 있는가?
2. **데이터 지속성:** 관리자가 `admin.html`에서 작업물을 추가하면 Supabase DB에 저장되어 모든 방문자에게 실시간 노출되는가?
3. **안정성:** Supabase 네트워크 장애 시에도 `localStorage`를 통해 웹사이트가 중단 없이 가동되는가?
