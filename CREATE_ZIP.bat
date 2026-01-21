@echo off
REM ════════════════════════════════════════════════════════════════════════════
REM   ERP Management System - ZIP Creator Script
REM   पूरे folder को ZIP में convert करेगा
REM ════════════════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

echo ════════════════════════════════════════════════════════════════════════════
echo     ERP Management System - ZIP Creator
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

echo ✅ Source Folder Found: %SOURCE%
echo.

REM Set output location
set "OUTPUT=%USERPROFILE%\Desktop\ERP-Management-System.zip"

REM Check if already exists
if exist "%OUTPUT%" (
    echo ⚠️  ZIP file पहले से exist करती है!
    set /p "CONFIRM=क्या overwrite करना है? (Y/N): "
    if /i not "!CONFIRM!"=="Y" (
        echo ❌ Cancelled!
        pause
        exit /b 1
    )
    del "%OUTPUT%" >nul 2>&1
)

echo.
echo 📋 Creating ZIP file...
echo Location: %OUTPUT%
echo.
echo यह कुछ समय ले सकता है... 🔄
echo.

REM Create ZIP using PowerShell
powershell -nologo -noprofile -command ^
    try { ^
        Add-Type -AssemblyName System.IO.Compression.FileSystem; ^
        [System.IO.Compression.ZipFile]::CreateFromDirectory('%SOURCE%', '%OUTPUT%'); ^
        Write-Host '^✅ SUCCESS! ZIP बन गई!'; ^
    } ^
    catch { ^
        Write-Host '^❌ ERROR: ' $_.Exception.Message; ^
        exit 1; ^
    }

if errorlevel 1 (
    echo.
    echo ❌ ERROR: ZIP बनाने में problem!
    echo.
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════════════════════════
echo ✅ ZIP FILE CREATED SUCCESSFULLY!
echo ════════════════════════════════════════════════════════════════════════════
echo.

REM Get file size
for %%A in ("%OUTPUT%") do (
    set "SIZE=%%~zA"
)

echo 📦 ZIP File Details:
echo   Name:     ERP-Management-System.zip
echo   Location: %OUTPUT%
echo   Size:     !SIZE! bytes
echo.

echo 🎯 Ab आप यह ZIP file को:
echo   • Email कर सकते हो
echo   • Google Drive पर upload कर सकते हो
echo   • OneDrive में save कर सकते हो
echo   • किसी को भी share कर सकते हो
echo   • USB drive में copy कर सकते हो
echo.

echo ════════════════════════════════════════════════════════════════════════════
echo ✅ ZIP Desktop पर save हो गई!
echo.

REM Ask to open folder
set /p "OPEN=क्या Desktop खोलना है? (Y/N): "
if /i "!OPEN!"=="Y" (
    explorer "%USERPROFILE%\Desktop"
)

echo.
pause
