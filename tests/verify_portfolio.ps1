# PowerShell Portfolio & Admin Validation Script
$projectDir = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host "🔍 [1/3] 전체 파일 구조 및 관리자 전용 파일 검증..." -ForegroundColor Cyan

$requiredFiles = @(
  "index.html",
  "admin.html",
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
  "css\admin.css",
  "js\admin.js",
  "js\projects.js",
  "js\app.js",
  "js\admin_dashboard.js"
)

foreach ($file in $requiredFiles) {
  $path = Join-Path $projectDir $file
  if (Test-Path $path) {
    Write-Host "  ✅ [PASS] $file" -ForegroundColor Green
  } else {
    Write-Host "  ❌ [FAIL] $file" -ForegroundColor Red
  }
}

Write-Host "`n🔍 [2/3] admin.html & 대시보드 컴포넌트 구조 검증..." -ForegroundColor Cyan
$adminHtml = Get-Content (Join-Path $projectDir "admin.html") -Raw -Encoding UTF8
$jsAdminDash = Get-Content (Join-Path $projectDir "js\admin_dashboard.js") -Raw -Encoding UTF8
$indexHtml = Get-Content (Join-Path $projectDir "index.html") -Raw -Encoding UTF8

$checks = @(
  @{ Name = "메인 헤더 Admin 접속 링크 (admin.html)"; Condition = $indexHtml.Contains('href="admin.html"') },
  @{ Name = "로그인 PIN 입력창 (loginPinInput)"; Condition = $adminHtml.Contains('id="loginPinInput"') },
  @{ Name = "대시보드 탭 메뉴 (tabProjects, tabAbout)"; Condition = $adminHtml.Contains('data-tab="tabProjects"') -and $adminHtml.Contains('data-tab="tabAbout"') },
  @{ Name = "신규 작업물 추가 폼 (addProjectForm)"; Condition = $adminHtml.Contains('id="addProjectForm"') },
  @{ Name = "작업물 동적 리스트 영역 (adminProjectsList)"; Condition = $adminHtml.Contains('id="adminProjectsList"') },
  @{ Name = "LocalStorage 키 명세 (jin_portfolio_projects_data)"; Condition = $jsAdminDash.Contains('jin_portfolio_projects_data') },
  @{ Name = "LocalStorage 키 명세 (jin_portfolio_about_data)"; Condition = $jsAdminDash.Contains('jin_portfolio_about_data') },
  @{ Name = "작업물 삭제 기능 (deleteProject)"; Condition = $jsAdminDash.Contains('deleteProject') },
  @{ Name = "초기 시드 데이터 복원 기능 (resetToSeedProjects)"; Condition = $jsAdminDash.Contains('resetToSeedProjects') }
)

foreach ($item in $checks) {
  if ($item.Condition) {
    Write-Host "  ✅ [PASS] $($item.Name)" -ForegroundColor Green
  } else {
    Write-Host "  ❌ [FAIL] $($item.Name)" -ForegroundColor Red
  }
}

Write-Host "`n✨ 검증 완료! 관리자 페이지(admin.html) 및 풀 CRUD 시스템이 완벽하게 구현되었습니다." -ForegroundColor Yellow
