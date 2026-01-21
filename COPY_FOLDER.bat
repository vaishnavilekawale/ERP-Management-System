@echo off
REM ════════════════════════════════════════════════════════════════════════════
REM   ERP Management System - Folder Copy Script
REM   यह script पूरे folder को अलग location पर अलग नाम से copy करेगा
REM ════════════════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

echo ════════════════════════════════════════════════════════════════════════════
echo     ERP Management System - Folder Copy Helper
echo ════════════════════════════════════════════════════════════════════════════
echo.

REM Set source folder
set "SOURCE=C:\ERP-Management-System"

REM Check if source exists
if not exist "%SOURCE%" (
    echo ❌ ERROR: Source folder not found at %SOURCE%
    echo.
    pause
    exit /b 1
)

echo Source Folder: %SOURCE%
echo.

REM Ask user for new folder name
set /p "NEW_NAME=नया folder का नाम दो (Default: ERP-System-Copy): "
if "!NEW_NAME!"=="" set "NEW_NAME=ERP-System-Copy"

echo.
echo नया folder नाम: !NEW_NAME!
echo.

REM Ask user for destination
echo ये location चुनो:
echo   1. Desktop
echo   2. Documents
echo   3. Downloads
echo   4. Custom location
echo.

set /p "CHOICE=अपनी choice दो (1-4): "

if "!CHOICE!"=="1" (
    set "DEST=%USERPROFILE%\Desktop\!NEW_NAME!"
) else if "!CHOICE!"=="2" (
    set "DEST=%USERPROFILE%\Documents\!NEW_NAME!"
) else if "!CHOICE!"=="3" (
    set "DEST=%USERPROFILE%\Downloads\!NEW_NAME!"
) else if "!CHOICE!"=="4" (
    set /p "DEST=पूरा path दो (जहाँ folder save करना है): "
    set "DEST=!DEST!\!NEW_NAME!"
) else (
    echo ❌ Invalid choice!
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════════════════════════
echo Source:      %SOURCE%
echo Destination: !DEST!
echo ════════════════════════════════════════════════════════════════════════════
echo.

REM Check if destination already exists
if exist "!DEST!" (
    echo ⚠️  WARNING: Destination already exists!
    set /p "CONFIRM=क्या overwrite करना है? (Y/N): "
    if /i "!CONFIRM!"=="Y" (
        echo Deleting existing folder...
        rmdir /s /q "!DEST!" >nul 2>&1
    ) else (
        echo ❌ Cancelled!
        pause
        exit /b 1
    )
)

echo.
echo 📋 Copying files... यह कुछ समय ले सकता है...
echo.

REM Copy the folder
xcopy "%SOURCE%" "!DEST!" /E /I /Y >nul 2>&1

if errorlevel 1 (
    echo ❌ ERROR: Copy failed!
    pause
    exit /b 1
)

echo ✅ Copy successful!
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo ✅ आपका folder यहाँ save हो गया:
echo.
echo    !DEST!
echo.
echo ════════════════════════════════════════════════════════════════════════════
echo.
echo 🚀 Next Steps:
echo   1. उस folder को खोलो
echo   2. setup.bat चलाओ
echo   3. Backend और Frontend शुरू करो
echo   4. Enjoy! 🎉
echo.
pause
