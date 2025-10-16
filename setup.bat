@echo off
REM Altius 2k25 Setup Script for Windows
REM This script helps verify your development environment and install dependencies

echo ================================
echo Altius 2k25 Setup Verification
echo ================================
echo.

REM Check Java
echo Checking Java installation...
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Java found
    java -version 2>&1 | findstr /R "version"
) else (
    echo [ERROR] Java not found
    echo Please install Java 17 or higher
)
echo.

REM Check Maven
echo Checking Maven installation...
mvn -version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Maven found
    mvn -version 2>&1 | findstr /R "Apache Maven"
) else (
    echo [ERROR] Maven not found
    echo Please install Apache Maven 3.8 or higher
)
echo.

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js found
    node --version
) else (
    echo [ERROR] Node.js not found
    echo Please install Node.js 18 or higher
)
echo.

REM Check npm
echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] npm found
    npm --version
) else (
    echo [ERROR] npm not found
    echo npm should be installed with Node.js
)
echo.

REM Ask to install backend dependencies
echo ================================
set /p backend="Do you want to install backend dependencies? (y/n): "
if /i "%backend%"=="y" (
    echo Installing backend dependencies...
    cd backend
    call mvn clean install -DskipTests
    cd ..
    echo [OK] Backend dependencies installed
)
echo.

REM Ask to install frontend dependencies
set /p frontend="Do you want to install frontend dependencies? (y/n): "
if /i "%frontend%"=="y" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo [OK] Frontend dependencies installed
)
echo.

REM Database configuration reminder
echo ================================
echo Database Configuration Checklist
echo ================================
echo.
echo Before running the application, ensure you have:
echo 1. Created a MongoDB Atlas account and cluster
echo 2. Created a Neon PostgreSQL account and database
echo 3. Updated backend\src\main\resources\application.properties with:
echo    - MongoDB connection string
echo    - PostgreSQL connection details
echo.
echo For detailed instructions, see README.md
echo.

REM Check asset directories
echo ================================
echo Asset Directories
echo ================================
echo.

if exist "posters" (
    echo [OK] Posters directory exists
) else (
    echo [WARNING] Posters directory missing
)

if exist "rulebooks" (
    echo [OK] Rulebooks directory exists
) else (
    echo [WARNING] Rulebooks directory missing
)

if exist "department_photos" (
    echo [OK] Department photos directory exists
) else (
    echo [WARNING] Department photos directory missing
)

echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Configure your database connections in application.properties
echo 2. Add sample data to MongoDB (see SAMPLE_DATA.md)
echo 3. Add event posters, rulebooks, and department photos
echo 4. Start the backend: cd backend ^&^& mvn spring-boot:run
echo 5. Start the frontend: cd frontend ^&^& npm start
echo.
echo For more details, see README.md and GUIDE.md
echo.

pause
