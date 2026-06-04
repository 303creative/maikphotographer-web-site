@echo off
cd /d "%~dp0"

if exist ".git\index.lock" del /f ".git\index.lock"
if exist ".git\HEAD.lock" del /f ".git\HEAD.lock"

git add -A
git commit -m "update: cambios desde Claude Cowork"
git push origin main

echo.
echo Push completado. Vercel desplegara en 1 minuto.
pause
