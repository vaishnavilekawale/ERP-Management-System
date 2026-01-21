@echo off
echo ========================================
echo ERP Management System - Setup
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm start
echo.
echo Frontend URL: http://localhost:3000
echo Backend URL: http://localhost:5000
echo.
echo Default Credentials:
echo   Email: admin@example.com
echo   Password: password
echo.
pause
