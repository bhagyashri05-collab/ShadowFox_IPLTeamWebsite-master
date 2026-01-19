@echo off
echo ========================================
echo    CSK UNIVERSE - FRONTEND ONLY
echo    Whistle Podu!
echo ========================================
echo.

echo [1/2] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/2] Starting Frontend Server...
cd frontend
echo Installing frontend dependencies...
npm install
echo.
echo Starting frontend server...
npm start
echo.
echo Frontend server starting on http://localhost:3000
echo.
echo ========================================
echo    CSK Universe Frontend is running...
echo ========================================
echo.
echo Visit http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
