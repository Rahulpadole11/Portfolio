#!/bin/bash

# Portfolio App Quick Start Script
# Run this from the project root directory

echo "🚀 Starting Portfolio Application Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo -e "${GREEN}✓ Node.js found:${NC} $(node --version)"
echo ""

# Frontend Setup
echo -e "${YELLOW}📦 Setting up Frontend...${NC}"
cd myPortfolio-main
npm install

# Create .env files if they don't exist
if [ ! -f .env.development ]; then
    cat > .env.development << 'EOF'
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
VITE_APP_ENV=development
VITE_ENABLE_LOGGING=true
VITE_ENABLE_REDUX_DEVTOOLS=true
EOF
    echo -e "${GREEN}✓ Created .env.development${NC}"
fi

cd ..

# Backend Setup
echo ""
echo -e "${YELLOW}📦 Setting up Backend...${NC}"
cd backend
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=your-email@gmail.com
FRONTEND_URL=http://localhost:5173
EOF
    echo -e "${GREEN}✓ Created .env (IMPORTANT: Update with your credentials!)${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Update backend/.env with MongoDB URI and Gmail credentials"
echo "2. Run: npm start (in backend directory)"
echo "3. Run: npm run dev (in myPortfolio-main directory)"
echo "4. Open: http://localhost:5173"
echo ""
echo -e "${YELLOW}🔐 Admin Login:${NC} Password is 'admin123' (click logo to open panel)"
echo ""
