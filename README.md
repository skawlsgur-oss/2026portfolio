# 🚀 2026 Nam Jin-hyeok AI Web & App Portfolio (`2026portfolio`)

25세 대학생 및 IT/AI 관심 학생층을 위한 **남진혁 개발자의 AI 포트폴리오 웹사이트 프로젝트**입니다.  
최신 **Glassmorphism & Neon Glow UI** 디자인 시스템을 기반으로 제작되었으며, 별도의 백엔드 설치 없이 관리자 암호 인증을 통해 웹상에서 직접 자기소개를 수정할 수 있습니다.

---

## 📁 프로젝트 폴더 구조 (Project Architecture)

```
2026portfolio/
├── 📄 index.html                  # 메인 포트폴리오 웹 애플리케이션 진입점
├── 📄 components_demo.html        # UI 컴포넌트 스토리북 데모 모음 페이지
├── 📄 prd.md                      # 제품 요구사항 정의서 (Product Requirement Document)
├── 📄 design.md                   # UI/UX 디자인 시스템 가이드라인
├── 📄 README.md                   # 프로젝트 전체 안내 문서
│
├── 📁 assets/                     # 정적 미디어 리소스
│   └── 📁 images/
│       └── 📄 portfolio_ui_mockup.png  # 포트폴리오 UI 디자인 시안 이미지
│
├── 📁 css/                        # 모듈화된 CSS 컴포넌트
│   ├── 📄 variables.css           # 글로벌 CSS 디자인 토큰 및 변수 (Color, Font, Shadow)
│   ├── 📄 global.css              # 공통 리셋, 버튼 시스템, 글래스모피즘 카드 유틸리티
│   ├── 📄 header.css              # 상단 고정 글래스모피즘 네비게이션 헤더
│   ├── 📄 hero.css                # 메인 히어로 섹션 & 네온 백그라운드 글로우
│   ├── 📄 about.css               # 자기소개 프로필 카드 & 인라인 편집 폼
│   ├── 📄 projects.css            # 카테고리 필터 탭 & 3열 프로젝트 카드 그리드
│   ├── 📄 tech.css                # 기술 스택 & AI Focus 뱃지 카테고리
│   ├── 📄 modal.css               # 관리자 PIN 비밀번호 인증 오버레이 모달
│   └── 📄 footer.css              # 하단 카피라이트 & 소셜/메일 링크
│
├── 📁 js/                         # 독립형 JavaScript 기능 모듈
│   ├── 📄 admin.js                # 비밀번호(PIN) 모달 인증 & LocalStorage 실시간 편집
│   ├── 📄 projects.js             # AI 웹/앱 동적 카드 렌더링 & 필터링 로직
│   └── 📄 app.js                  # 스크롤 헤더 인터랙션 & 앱 진입점
│
└── 📁 tests/                      # 검증 스크립트 모음
    ├── 📄 verify_portfolio.ps1    # PowerShell 기반 레이아웃/구조 자동 검증 스크립트
    └── 📄 verify_portfolio.js     # Node.js 기반 검증 스크립트
```

---

## ✨ 핵심 제공 기능

1. **AI 트렌디 & 글로우 다크 디자인:**
   - Deep Obsidian (`#0B0F17`) 배경과 Neon Cyan (`#06B6D4`) & Electric Violet (`#8B5CF6`) 그래디언트
   - 20px Radius 반투명 글래스모피즘(`backdrop-filter: blur(16px)`) 입체감 적용
2. **관리자 직접 편집 기능 (Admin Edit Mode):**
   - 헤더 `🔐 Admin Edit` 버튼 클릭 ➔ 4자리 PIN 입력 (기본값: `1234`) ➔ 자기소개 및 관심분야 실시간 수정 ➔ **브라우저 LocalStorage 자동 저장**
3. **작업물 페이지 (Featured Projects):**
   - 전체 / AI 웹 / AI 앱 카테고리 필터 지원
   - 프로젝트 카드별 시연 그래픽, 기술 스택 태그, **`🚀 데모 체험하기`** & **`🐙 GitHub`** 연결 링크
4. **완벽한 컴포넌트 모듈화:**
   - 모든 CSS/JS 코드가 영역별로 단일 책임 원칙에 맞게 파일로 분리되어 높은 재사용성 제공

---

## 🔗 실행 및 확인 방법

1. **포트폴리오 메인 사이트:**  
   [index.html 바로가기](file:///C:/Users/user/.gemini\antigravity-ide\scratch\2026portfolio\index.html)
2. **컴포넌트 데모 스토리북:**  
   [components_demo.html 바로가기](file:///C:/Users/user/.gemini\antigravity-ide\scratch\2026portfolio\components_demo.html)
3. **요구사항 정의서 (PRD):**  
   [prd.md 바로가기](file:///C:/Users/user/.gemini\antigravity-ide\scratch\2026portfolio\prd.md)
4. **디자인 시스템 문서:**  
   [design.md 바로가기](file:///C:/Users/user/.gemini\antigravity-ide\scratch\2026portfolio\design.md)
