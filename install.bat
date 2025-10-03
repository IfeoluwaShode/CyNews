@echo off
echo Installing CYNews dependencies...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not available. Please ensure Node.js is properly installed.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.
echo npm version:
npm --version
echo.

echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
echo.
echo To start the development server, run:
echo   npm start
echo.
echo Don't forget to set up your NewsAPI key in a .env file:
echo   REACT_APP_NEWS_API_KEY=your_api_key_here
echo.
pause
