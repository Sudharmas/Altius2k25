#!/bin/bash

# Altius 2k25 Setup Script
# This script helps verify your development environment and install dependencies

echo "================================"
echo "Altius 2k25 Setup Verification"
echo "================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Java
echo "Checking Java installation..."
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}')
    echo -e "${GREEN}✓ Java found: $JAVA_VERSION${NC}"
    
    # Check Java version >= 17
    JAVA_MAJOR=$(echo $JAVA_VERSION | cut -d. -f1)
    if [ "$JAVA_MAJOR" -ge 17 ]; then
        echo -e "${GREEN}✓ Java version is 17 or higher${NC}"
    else
        echo -e "${RED}✗ Java version should be 17 or higher${NC}"
        echo -e "${YELLOW}  Please install Java 17 or higher${NC}"
    fi
else
    echo -e "${RED}✗ Java not found${NC}"
    echo -e "${YELLOW}  Please install Java 17 or higher${NC}"
fi
echo ""

# Check Maven
echo "Checking Maven installation..."
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn -version | head -n 1)
    echo -e "${GREEN}✓ Maven found: $MVN_VERSION${NC}"
else
    echo -e "${RED}✗ Maven not found${NC}"
    echo -e "${YELLOW}  Please install Apache Maven 3.8 or higher${NC}"
fi
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js found: $NODE_VERSION${NC}"
    
    # Check Node version >= 18
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo -e "${GREEN}✓ Node.js version is 18 or higher${NC}"
    else
        echo -e "${RED}✗ Node.js version should be 18 or higher${NC}"
        echo -e "${YELLOW}  Please install Node.js 18 or higher${NC}"
    fi
else
    echo -e "${RED}✗ Node.js not found${NC}"
    echo -e "${YELLOW}  Please install Node.js 18 or higher${NC}"
fi
echo ""

# Check npm
echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm found: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    echo -e "${YELLOW}  npm should be installed with Node.js${NC}"
fi
echo ""

# Ask if user wants to install dependencies
echo "================================"
read -p "Do you want to install backend dependencies? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Installing backend dependencies..."
    cd backend
    mvn clean install -DskipTests
    cd ..
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
fi
echo ""

read -p "Do you want to install frontend dependencies? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
fi
echo ""

# Check database configuration
echo "================================"
echo "Database Configuration Checklist"
echo "================================"
echo ""
echo "Before running the application, ensure you have:"
echo "1. Created a MongoDB Atlas account and cluster"
echo "2. Created a Neon PostgreSQL account and database"
echo "3. Updated backend/src/main/resources/application.properties with:"
echo "   - MongoDB connection string"
echo "   - PostgreSQL connection details"
echo ""
echo "For detailed instructions, see README.md"
echo ""

# Check if directories exist
echo "================================"
echo "Asset Directories"
echo "================================"
echo ""

if [ -d "posters" ]; then
    POSTER_COUNT=$(find posters -type f -name "*.jpg" 2>/dev/null | wc -l)
    echo -e "Posters directory: ${GREEN}✓ exists${NC} ($POSTER_COUNT files)"
else
    echo -e "Posters directory: ${YELLOW}⚠ missing${NC}"
fi

if [ -d "rulebooks" ]; then
    RULEBOOK_COUNT=$(find rulebooks -type f -name "*.pdf" 2>/dev/null | wc -l)
    echo -e "Rulebooks directory: ${GREEN}✓ exists${NC} ($RULEBOOK_COUNT files)"
else
    echo -e "Rulebooks directory: ${YELLOW}⚠ missing${NC}"
fi

if [ -d "department_photos" ]; then
    DEPT_COUNT=$(find department_photos -type f -name "*.jpg" 2>/dev/null | wc -l)
    echo -e "Department photos directory: ${GREEN}✓ exists${NC} ($DEPT_COUNT files)"
else
    echo -e "Department photos directory: ${YELLOW}⚠ missing${NC}"
fi

echo ""
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Configure your database connections in application.properties"
echo "2. Add sample data to MongoDB (see SAMPLE_DATA.md)"
echo "3. Add event posters, rulebooks, and department photos"
echo "4. Start the backend: cd backend && mvn spring-boot:run"
echo "5. Start the frontend: cd frontend && npm start"
echo ""
echo "For more details, see README.md and GUIDE.md"
echo ""
