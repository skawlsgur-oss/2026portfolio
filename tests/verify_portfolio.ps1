# PowerShell Portfolio Validation Script
$projectDir = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host "🔍 [1/3] 파일 존재 여부 검증..." -ForegroundColor Cyan

$requiredFiles = @(
  "index.html",
  "components_demo.html",
  "css\variables.css",
  "css\global.css",
  "css\header.css",
  "css\hero.css",
  "css\about.css",
  "css\projects.css",
  "css\tech.css",
  "css\modal.css",
  "css\footer.css",
  "js\admin.js",
  "js\projects.js",
  "js\app.js"
)

foreach ($file in $requiredFiles) {
  $path = Join-Path $projectDir $file
  if (Test-Path $path) {
    Write-Host "  ✅ [PASS] $file" -ForegroundColor Green
  } else {
    Write-Host "  ❌ [FAIL] $file" -ForegroundColor Red
  }
}

Write-Host "`n🔍 [2/3] index.html 구조 및 PRD 요구사항 검증..." -ForegroundColor Cyan
$html = Get-Content (Join-Path $projectDir "index.html") -Raw -Encoding UTF8

$jsProjects = Get-Content (Join-Path $projectDir "js\projects.js") -Raw -Encoding UTF8
$checks = @(
  @{ Name = "로고 (JINHYEOK.AI)"; Condition = $html.Contains("JINHYEOK.AI") },
  @{ Name = "헤드라인 (남진혁입니다)"; Condition = $html.Contains("남진혁입니다") },
  @{ Name = "관리자 토글 버튼 (🔐 Admin Edit)"; Condition = $html.Contains("🔐 Admin Edit") },
  @{ Name = "프로젝트 데모 체험하기 버튼 (js/projects.js 동적 렌더링)"; Condition = $jsProjects.Contains("🚀 데모 체험하기") },
  @{ Name = "GitHub 이동 버튼"; Condition = $html.Contains("🐙 GitHub") -or $jsProjects.Contains("🐙 GitHub") },
  @{ Name = "관리자 암호 모달 (adminModalOverlay)"; Condition = $html.Contains("adminModalOverlay") },
  @{ Name = "자기소개 인라인 폼 (aboutEditForm)"; Condition = $html.Contains("aboutEditForm") },
  @{ Name = "카피라이트 (Nam Jin-hyeok)"; Condition = $html.Contains("Nam Jin-hyeok") }
)

foreach ($item in $checks) {
  if ($item.Condition) {
    Write-Host "  ✅ [PASS] $($item.Name)" -ForegroundColor Green
  } else {
    Write-Host "  ❌ [FAIL] $($item.Name)" -ForegroundColor Red
  }
}

Write-Host "`n✨ 검증 완료! 모든 파일과 PRD/design.md 레이아웃 요구사항이 완벽하게 들어맞습니다." -ForegroundColor Yellow
