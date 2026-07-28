/* ==========================================================================
   2026portfolio 레이아웃 및 기능 검증 테스트 스크립트 (verify_portfolio.js)
   HTML 구조 및 JavaScript 기능 모듈의 파싱 및 논리 동작 상태를 검증합니다.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..', 'scratch', '2026portfolio');

console.log('🔍 [1/4] 파일 존재 여부 검증 시작...');

const requiredFiles = [
  'index.html',
  'components_demo.html',
  'css/variables.css',
  'css/global.css',
  'css/header.css',
  'css/hero.css',
  'css/about.css',
  'css/projects.css',
  'css/tech.css',
  'css/modal.css',
  'css/footer.css',
  'js/admin.js',
  'js/projects.js',
  'js/app.js'
];

let allExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(projectDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ [PASS] ${file}`);
  } else {
    console.error(`  ❌ [FAIL] ${file} (파일이 없음)`);
    allExist = false;
  }
});

console.log('\n🔍 [2/4] HTML 구조 필수 DOM ID 검증...');
const htmlContent = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');

const requiredIds = [
  'adminModalOverlay',
  'adminToggleBtn',
  'modalCancelBtn',
  'modalSubmitBtn',
  'modalErrorMsg',
  'aboutDisplayBio',
  'aboutDisplayField',
  'aboutEditForm',
  'inputBio',
  'inputField',
  'saveAboutBtn',
  'cancelEditBtn',
  'adminIndicator',
  'projectsGrid'
];

requiredIds.forEach(id => {
  if (htmlContent.includes(`id="${id}"`)) {
    console.log(`  ✅ [PASS] ID: #${id}`);
  } else {
    console.error(`  ❌ [FAIL] ID: #${id} 가 index.html에 포함되어 있지 않습니다.`);
  }
});

console.log('\n🔍 [3/4] JS 모듈 구문 오류(Syntax Error) 검증...');
const jsFiles = ['js/admin.js', 'js/projects.js', 'js/app.js'];

jsFiles.forEach(jsFile => {
  const code = fs.readFileSync(path.join(projectDir, jsFile), 'utf-8');
  try {
    new Function(code);
    console.log(`  ✅ [PASS] ${jsFile} 구문 이상 없음`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${jsFile} 구문 오류:`, err.message);
  }
});

console.log('\n🔍 [4/4] PRD 요구사항 구현 여부 체크...');
const prdChecks = [
  { name: '로고 (JINHYEOK.AI)', check: htmlContent.includes('JINHYEOK.AI') },
  { name: '헤드라인 ("AI를 활용하여 서비스를 만드는 AI커뮤니케이터")', check: htmlContent.includes('AI를 활용하여 서비스를 만드는 AI커뮤니케이터') },
  { name: '관리자 편집 토글 (🔐 Admin Edit)', check: htmlContent.includes('🔐 Admin Edit') },
  { name: '카피라이트 (Nam Jin-hyeok)', check: htmlContent.includes('Nam Jin-hyeok') },
  { name: '프로젝트 이동 버튼 (데모 체험하기 / GitHub)', check: htmlContent.includes('🚀 데모 체험하기') && htmlContent.includes('🐙 GitHub') }
];

prdChecks.forEach(item => {
  if (item.check) {
    console.log(`  ✅ [PASS] ${item.name}`);
  } else {
    console.error(`  ❌ [FAIL] ${item.name} 누락`);
  }
});

console.log('\n✨ 검증 완료!');
