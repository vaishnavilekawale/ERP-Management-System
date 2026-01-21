@echo off
REM ════════════════════════════════════════════════════════════════════════════
REM   ERP Management System - Direct ZIP Download
REM   एक click से पूरा project को "erp.zip" में download करो
REM ════════════════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════════════════════════════════
echo                    🎉 ERP Project - ZIP Creator 🎉
echo ════════════════════════════════════════════════════════════════════════════
echo.

REM Set source folder
set "SOURCE=C:\ERP-Management-System"

REM Check if source exists
if not exist "%SOURCE%" (
    echo ❌ ERROR: Source folder not found!
    echo Location: %SOURCE%
    echo.
    pause
    exit /b 1
)

echo ✅ Source found successfully
echo.

REM Set output location - Desktop
set "DESKTOP=%USERPROFILE%\Desktop"
set "OUTPUT=%DESKTOP%\erp.zip"

echo 📍 ZIP File will be created at:
echo    %OUTPUT%
echo.

REM Check if already exists
if exist "%OUTPUT%" (
    echo ⚠️  FILE ALREADY EXISTS!
    set /p "CONFIRM=Overwrite? (Y/N): "
    if /i not "!CONFIRM!"=="Y" (
        echo ❌ Cancelled!
        echo.
        pause
        exit /b 1
    )
    echo Deleting existing file...
    del "%OUTPUT%" >nul 2>&1
)

echo.
echo 🔄 Creating ZIP file... Please wait...
echo.

REM Create ZIP using PowerShell
powershell -nologo -noprofile -command ^
    try { ^
        Add-Type -AssemblyName System.IO.Compression.FileSystem; ^
        [System.IO.Compression.ZipFile]::CreateFromDirectory('%SOURCE%', '%OUTPUT%'); ^
        Write-Host '^✅ SUCCESS!'; ^
    } ^
    catch { ^
        Write-Host '^❌ ERROR: ' $_.Exception.Message; ^
        exit 1; ^
    }

if errorlevel 1 (
    echo.
    echo ❌ ERROR: Failed to create ZIP!
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

echo 📦 File Details:
echo    Name:     erp.zip
echo    Location: Desktop
echo    Path:     %OUTPUT%
echo    Size:     !SIZE! bytes
echo.

echo 🎯 What to do now:
echo    1. Desktop पर "erp.zip" ढूंढो
echo    2. किसी को भी भेज सकते हो
echo    3. Download कर सकते हो
echo    4. Share कर सकते हो
echo.

REM Ask to open Desktop
set /p "OPEN=Desktop खोलना है? (Y/N): "
if /i "!OPEN!"=="Y" (
    explorer "%DESKTOP%"
)

echo.
echo ✅ Done!
echo.
pause
