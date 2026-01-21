#!/bin/bash

echo "🚀 Starting ERP Management System..."

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

echo "✅ Dependencies installed successfully!"
echo ""
echo "📋 To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "🌐 Frontend URL: http://localhost:3000"
echo "🔌 Backend URL: http://localhost:5000"
echo ""
echo "Default login credentials:"
echo "Email: admin@example.com"
echo "Password: password"
