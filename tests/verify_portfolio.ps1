# PowerShell Portfolio & Admin & Supabase Validation Script
$projectDir = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host "🔍 [1/3] 전체 파일 구조 및 Supabase 데이터베이스 파일 검증..." -ForegroundColor Cyan

$requiredFiles = @(
  "index.html",
  "admin.html",
  "components_demo.html",
  "supabase_schema.sql",
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
  "js\admin_dashboard.js",
  "js\supabase_client.js"
)

foreach ($file in $requiredFiles) {
  $path = Join-Path $projectDir $file
  if (Test-Path $path) {
    Write-Host "  ✅ [PASS] $file" -ForegroundColor Green
  } else {
    Write-Host "  ❌ [FAIL] $file" -ForegroundColor Red
  }
}

Write-Host "`n🔍 [2/3] Supabase 연동 코드 및 API 키 설정 검증..." -ForegroundColor Cyan
$sbClient = Get-Content (Join-Path $projectDir "js\supabase_client.js") -Raw -Encoding UTF8
$sqlSchema = Get-Content (Join-Path $projectDir "supabase_schema.sql") -Raw -Encoding UTF8
$indexHtml = Get-Content (Join-Path $projectDir "index.html") -Raw -Encoding UTF8
$adminHtml = Get-Content (Join-Path $projectDir "admin.html") -Raw -Encoding UTF8

$checks = @(
  @{ Name = "Supabase URL 설정 (dlwhnthulpxxfyeulrbw.supabase.co)"; Condition = $sbClient.Contains('https://dlwhnthulpxxfyeulrbw.supabase.co') },
  @{ Name = "Supabase API Key 설정 (sb_publishable_Zk90bj_...)"; Condition = $sbClient.Contains('sb_publishable_Zk90bj_VU5WvQL0ubJRQWQ_TPSi5KHT') },
  @{ Name = "index.html Supabase JS SDK 로드"; Condition = $indexHtml.Contains('supabase-js') -and $indexHtml.Contains('supabase_client.js') },
  @{ Name = "admin.html Supabase JS SDK 로드"; Condition = $adminHtml.Contains('supabase-js') -and $adminHtml.Contains('supabase_client.js') },
  @{ Name = "SQL 스키마 about_me 테이블 정의"; Condition = $sqlSchema.Contains('CREATE TABLE IF NOT EXISTS public.about_me') },
  @{ Name = "SQL 스키마 projects 테이블 정의"; Condition = $sqlSchema.Contains('CREATE TABLE IF NOT EXISTS public.projects') },
  @{ Name = "SQL 스키마 RLS 정책 설정"; Condition = $sqlSchema.Contains('ROW LEVEL SECURITY') }
)

foreach ($item in $checks) {
  if ($item.Condition) {
    Write-Host "  ✅ [PASS] $($item.Name)" -ForegroundColor Green
  } else {
    Write-Host "  ❌ [FAIL] $($item.Name)" -ForegroundColor Red
  }
}

Write-Host "`n✨ 검증 완료! Supabase 데이터베이스 연동 코드 및 SQL 테이블 스크립트가 준비되었습니다." -ForegroundColor Yellow
