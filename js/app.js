/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - 메인 애플리케이션 진입점 (app.js)
   스크롤 내비게이션, 모바일 토글 메뉴, 앱 초기화 모듈
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // [ 1. 스크롤 위치에 따른 헤더 배경 고도화 ]
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(11, 15, 23, 0.92)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.background = 'rgba(11, 15, 23, 0.75)';
      header.style.boxShadow = 'none';
    }
  });

  // [ 2. 네비게이션 부드러운 스크롤 (Smooth Scroll) ]
  const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = 72;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // [ 3. 콘솔 웰컴 브랜딩 로그 ]
  console.log(
    '%c🚀 2026 Nam Jin-hyeok AI Portfolio Loaded!',
    'color: #06B6D4; font-size: 14px; font-weight: bold;'
  );
});
