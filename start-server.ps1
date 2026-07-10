# ═══════════════════════════════════════════════════════════════
#  خادم محلي بسيط لتشغيل المنصة (يقرأ ملفات data/*.json مباشرة)
#  التشغيل: انقر مرّتين على start-server.bat  أو شغّل هذا الملف بـ PowerShell
#  ثم افتح المتصفح على:  http://localhost:8000
#  للإيقاف: اضغط Ctrl+C في هذه النافذة
# ═══════════════════════════════════════════════════════════════
$port = 8000
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8";
  ".js"="application/javascript; charset=utf-8"; ".json"="application/json; charset=utf-8";
  ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".svg"="image/svg+xml";
  ".ico"="image/x-icon"; ".woff"="font/woff"; ".woff2"="font/woff2"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
  $listener.Start()
} catch {
  Write-Host "تعذّر بدء الخادم على المنفذ $port. جرّب إغلاق أي برنامج يستخدمه أو غيّر المنفذ." -ForegroundColor Red
  Write-Host $_.Exception.Message
  Read-Host "اضغط Enter للخروج"
  exit 1
}

Write-Host "الخادم يعمل ✅  افتح المتصفح على:  http://localhost:$port" -ForegroundColor Green
Write-Host "للإيقاف اضغط Ctrl+C" -ForegroundColor Yellow
Start-Process "http://localhost:$port"

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ([string]::IsNullOrEmpty($rel)) { $rel = "index.html" }
    $path = Join-Path $root $rel
    if (Test-Path $path -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ct = $mime[$ext]; if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ctx.Response.ContentType = $ct
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - الملف غير موجود: $rel")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.OutputStream.Close()
  } catch {
    # تجاهل أخطاء الاتصال العابرة
  }
}
