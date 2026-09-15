@echo off
echo =======================================================
echo  KREGGSJS AUTONOMOUS DAILY REEL RUNNER
echo =======================================================
cd /d "%~dp0"
node daily_reel_runner.js
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Reel runner encountered an issue.
    exit /b %ERRORLEVEL%
)
echo [SUCCESS] Reel rendered and published to Instagram & Facebook!
