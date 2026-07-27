# 🎨 [Design Guide] 2026 Nam Jin-hyeok AI Portfolio Design System

> **문서 버전:** v1.0  
> **작성일자:** 2026년 7월 27일  
> **디자인 컨셉:** AI 트렌디 & 글로우 (AI Trendy & Glow)  
> **타겟 사용자:** 25세 대학생 및 IT/AI에 관심이 많은 취업준비생  
> **문서 목적:** 퍼블리싱 및 프론트엔드 개발 시 즉시 적용 가능한 UI/UX 디자인 시스템 토큰 및 가이드 제공  

---

## 1. 디자인 키워드 & 미학 (Design Keywords)

- **`AI Futuristic Glow`**: 깊은 다크 모드 위로 빛나는 네온 글로우(Glow) 효과로 최신 AI 서비스 감성 전달
- **`Glassmorphism`**: 은은하게 반투명한 유리 느낌의 카드 레이어로 입체감 형성
- **`Student-Friendly Micro-Interaction`**: 25세 타겟에 맞춘 경쾌하고 세련된 호버 애니메이션 및 직관적인 뷰

---

## 2. 컬러 시스템 (Color Palette & CSS Variables)

프론트엔드 개발 시 `:root`에 바로 복사하여 사용할 수 있는 CSS 변수 구조입니다.

```css
:root {
  /* [ Background Layers ] */
  --bg-dark-base: #0B0F17;        /* 전체 메인 배경 (Deep Obsidian) */
  --bg-dark-surface: #111827;     /* 섹션 및 메인 컨테이너 배경 */
  --bg-glass-card: rgba(17, 24, 39, 0.65); /* 반투명 글래스모피즘 카드 배경 */
  --bg-glass-hover: rgba(31, 41, 55, 0.85); /* 카드 호버 시 배경 */

  /* [ Accent & Glow Colors ] */
  --accent-cyan: #06B6D4;         /* 포인트 메인 컬러 (Neon Cyan) */
  --accent-violet: #8B5CF6;       /* 포인트 서브 컬러 (Electric Violet) */
  --accent-pink: #EC4899;         /* 하이라이트/포인트 (Cyber Pink) */

  /* [ Neon Gradients ] */
  --grad-primary: linear-gradient(135deg, #06B6D4 0%, #8B5CF6 50%, #EC4899 100%);
  --grad-surface: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
  --grad-glow: radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 70%);

  /* [ Text & Content Colors ] */
  --text-main: #F9FAFB;           /* 주 텍스트 (Pure White Contrast) */
  --text-sub: #9CA3AF;            /* 서브 설명 텍스트 (Silver Gray) */
  --text-muted: #6B7280;          /* 비활성/캡션 텍스트 */
  --text-accent: #38BDF8;         /* 강조 키워드 텍스트 */

  /* [ Borders & Glass Effect ] */
  --border-glass: rgba(255, 255, 255, 0.12);
  --border-glass-hover: rgba(6, 182, 212, 0.4);
  --backdrop-blur: blur(16px) saturate(180%);

  /* [ Shadows & Glow Radius ] */
  --shadow-card: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --shadow-neon-cyan: 0 0 20px rgba(6, 182, 212, 0.4);
  --shadow-neon-purple: 0 0 20px rgba(139, 92, 246, 0.4);
}
```

---

## 3. 타이포그래피 가이드 (Typography System)

- **폰트 패밀리:** 
  - 영문/숫자: `'Outfit'`, `'Inter'`, sans-serif (Google Fonts)
  - 한글: `'Pretendard'`, `-apple-system`, `'BlinkMacSystemFont'`, sans-serif

### 3.1 폰트 스케일 (Type Scale Table)

| 구분 | Font Size (rem/px) | Line Height | Font Weight | 적용 위치 |
| :--- | :--- | :--- | :--- | :--- |
| **Display (H1)** | 3.25rem (52px) | 1.2 | 800 (ExtraBold) | 메인 히어로 메인 타이틀 |
| **Heading 1 (H2)**| 2.25rem (36px) | 1.3 | 700 (Bold) | 각 섹션 타이틀 (About, Projects) |
| **Heading 2 (H3)**| 1.5rem (24px) | 1.4 | 600 (SemiBold) | 프로젝트 카드 제목, 모달 타이틀 |
| **Heading 3 (H4)**| 1.25rem (20px) | 1.4 | 600 (SemiBold) | 서브 섹션 제목, 소제목 |
| **Body Large** | 1.125rem (18px) | 1.6 | 400 / 500 | 히어로 서브문구, 자기소개 대표 텍스트 |
| **Body Medium** | 1.0rem (16px) | 1.6 | 400 (Regular) | 프로젝트 한 줄 설명, 본문 내용 |
| **Caption / Badge**| 0.875rem (14px) | 1.5 | 500 (Medium) | 기술 태그 뱃지, 입력 폼 라벨, 캡션 |

---

## 4. 컴포넌트 단위 디자인 사양 (Component Specifications)

### 4.1 버튼 (Button System)

모든 버튼은 마우스 호버 시 **글로우(Glow) 빛번짐 효과**와 함께 2px 위로 상승하는 애니메이션이 적용됩니다.

```css
/* 기본 버튼 공통 스타일 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### 버튼 규격표 (Button Size Specs)
| 버튼 종류 | Height | Padding (Horizontal) | Font Size | Border Radius | 비고 / 사용 위치 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Large (CTA)** | 52px | 28px | 1.125rem (18px) | 14px | 메인 히어로 `작업물 둘러보기` |
| **Medium (Standard)**| 44px | 20px | 1.0rem (16px) | 12px | 데모 체험하기, GitHub 링크 |
| **Small (Compact)** | 36px | 14px | 0.875rem (14px)| 8px | 관리자 편집 토글, 모달 취소 버튼 |

#### 버튼 스타일 타입 (Button Variants)
- **Primary Glow Button (네온 메인 버튼):**
  - Background: `var(--grad-primary)`
  - Text: `#FFFFFF`
  - Hover: `box-shadow: var(--shadow-neon-cyan); transform: translateY(-2px);`
- **Secondary Glass Button (글래스 서브 버튼):**
  - Background: `rgba(255, 255, 255, 0.08)`
  - Border: `1px solid var(--border-glass)`
  - Text: `var(--text-main)`
  - Hover: `border-color: var(--accent-cyan); background: rgba(6, 182, 212, 0.15);`

---

### 4.2 글래스모피즘 카드 UI (Project & About Cards)

프로젝트 카드 및 자기소개 카드에 사용되는 핵심 Visual Spec입니다.

```css
.glass-card {
  background: var(--bg-glass-card);
  backdrop-filter: var(--backdrop-blur);
  -webkit-backdrop-filter: var(--backdrop-blur);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow-card);
  transition: all 0.35s ease;
}

.glass-card:hover {
  border-color: var(--border-glass-hover);
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(6, 182, 212, 0.15);
}
```

---

### 4.3 기술 스택 태그 & 뱃지 (Tech Stack Badges)

- **Height:** 28px
- **Padding:** 4px 12px
- **Border Radius:** 9999px (Pill Shape)
- **Style:** 
  - Background: `rgba(6, 182, 212, 0.1)`
  - Border: `1px solid rgba(6, 182, 212, 0.3)`
  - Text Color: `#38BDF8`
  - Font Size: `13px` (Font Weight 500)

---

### 4.4 관리자 인증 모달 (Admin Password Modal Spec)

- **Backdrop Overlay:** `rgba(11, 15, 23, 0.8)` + `backdrop-filter: blur(8px)`
- **Modal Box Width:** Max `420px` (반응형 90%)
- **Border Radius:** `24px`
- **Background:** `var(--bg-dark-surface)` with `1px solid var(--border-glass)`
- **PIN Input Box:**
  - Width/Height: `48px` x `52px` (4자리 PIN 숫자 입력)
  - Text Align: Center (Font Size: 24px, Bold)
  - Border Focus Color: `var(--accent-cyan)` with Neon Cyan Box-Shadow

---

## 5. 레이아웃 & 그리드 시스템 (Layout & Grid)

### 5.1 8-Point Grid Standard
모든 마진(Margin)과 패딩(Padding)은 8px의 배수를 사용합니다.
- `8px` / `16px` / `24px` / `32px` / `48px` / `64px` / `96px`

### 5.2 반응형 브레이크포인트 (Responsive Breakpoints)

```css
/* Mobile First Base Styles */
.container {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}

/* Tablet (>= 640px) */
@media (min-width: 640px) {
  .container { max-width: 600px; padding-left: 24px; padding-right: 24px; }
  .project-grid { grid-template-columns: repeat(1, 1fr); }
}

/* Laptop/Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .container { max-width: 1140px; }
  .project-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
}

/* Wide Screens (>= 1280px) */
@media (min-width: 1280px) {
  .container { max-width: 1200px; }
  .project-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 6. 모션 & 마이크로 인터랙션 (Motion & Animations)

### 6.1 네온 그래디언트 글머리 효과 (Glowing Text Animation)

```css
.text-gradient {
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 6.2 모달 및 카드 등장 키프레임 (Fade In Up Keyframes)

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

---

## 7. 가이드 요약 (Design Summary Checklist)

- [x] **컬러:** Deep Dark (`#0B0F17`) 베이스 + Neon Cyan/Violet 그래디언트
- [x] **폰트:** 영문 `Outfit` + 한글 `Pretendard` 가독성 시스템
- [x] **버튼:** 3가지 규격 (Large: 52px, Medium: 44px, Small: 36px) 및 Hover Glowing
- [x] **카드 UI:** 20px Radius Glassmorphism 반투명 시각 효과
- [x] **모달:** 네온 입력 폼 & 블러 오버레이 팝업 사양
