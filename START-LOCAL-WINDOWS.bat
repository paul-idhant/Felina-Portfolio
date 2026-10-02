@echo off
setlocal
cd /d "%~dp0"

echo.
echo Installing the required development dependencies...
echo This includes Tailwind CSS, which Vite needs to start the portfolio.
echo.
call npm ci --include=dev
if errorlevel 1 (
  echo.
  echo Installation failed. Confirm that Node.js 20.19+ is installed, then try again.
  pause
  exit /b 1
)

echo.
echo Starting Felina's portfolio locally...
echo Open the URL shown below in your browser (usually http://localhost:5173).
echo Press Ctrl+C in this window when you want to stop the site.
echo.
call npm run dev
pause
