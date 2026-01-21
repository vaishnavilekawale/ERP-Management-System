# Quick Start Guide

## 📋 Prerequisites

Before starting, make sure you have:
- Node.js (v14 or higher) - Download from https://nodejs.org/
- MongoDB - Download from https://www.mongodb.com/try/download/community
- Visual Studio Code (recommended)

## 🚀 Quick Start (5 minutes)

### Step 1: Run Setup Script

**For Windows:**
```bash
setup.bat
```

**For Mac/Linux:**
```bash
bash setup.sh
chmod +x setup.sh
./setup.sh
```

This will install all dependencies for both backend and frontend.

### Step 2: Start MongoDB

```bash
# Windows (if installed as service)
net start MongoDB

# Or run mongod directly
mongod
```

### Step 3: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### Step 4: Start Frontend Server

Open a new terminal:
```bash
cd frontend
npm start
```

The frontend will automatically open at `http://localhost:3000`

## 🔐 First Time Login

After starting the application:

1. **Open browser:** http://localhost:3000
2. **Register new account** or use test credentials
3. **Dashboard will appear** with statistics

## 📂 Project Structure

```
ERP-Management-System/
├── backend/           # Node.js Express Server
│   ├── models/        # MongoDB Schemas
│   ├── controllers/   # Business Logic
│   ├── routes/        # API Endpoints
│   └── server.js      # Main Server
├── frontend/          # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── styles/
│   └── public/
└── docker-compose.yml # Docker Setup
```

## 🎯 Key Features

- ✅ User Management & Authentication
- ✅ Product Inventory Management
- ✅ Supplier & Customer Management
- ✅ Purchase & Sales Orders
- ✅ Invoice Generation
- ✅ Goods Receipt Notes (GRN)
- ✅ Real-time Updates with Redux
- ✅ Responsive Design

## 🌐 API Documentation

All API endpoints are available at: `http://localhost:5000/api/`

### Example API Calls

**Get All Products:**
```bash
curl http://localhost:5000/api/products
```

**Create Product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "sku": "SKU-001",
    "price": 100,
    "quantity": 50
  }'
```

## 🐳 Docker Deployment

```bash
# Build and start with Docker
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Backend (5000)
lsof -i :5000
kill -9 <PID>

# Frontend (3000)
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues or questions:
1. Check the [README.md](./README.md)
2. Review [API Documentation](./backend/README.md)
3. Contact: support@erpsystem.com

## 📚 Next Steps

After setup:
1. Explore the Dashboard
2. Add sample products
3. Create purchase/sales orders
4. Generate invoices
5. Track inventory with GRN

Happy coding! 🚀
