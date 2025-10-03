@echo off
echo Starting CYNews...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Error: Dependencies not installed. Please run install.bat first.
    pause
    exit /b 1
)

echo Starting the development server...
echo The application will open in your default browser at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm start
