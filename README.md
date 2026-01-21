# MERN Stack ERP Management System

Complete Enterprise Resource Planning (ERP) system built with MERN Stack (MongoDB, Express, React, Node.js).

## Features

✅ **User Management** - Authentication, Authorization, Role-based access
✅ **Product Management** - Add, Edit, Delete products with inventory tracking
✅ **Supplier Management** - Manage supplier information and contact details
✅ **Customer Management** - Customer database with payment terms
✅ **Purchase Orders** - Create and manage purchase orders from suppliers
✅ **Sales Orders** - Create and manage sales orders to customers
✅ **Invoices** - Generate and track invoices (both purchase and sales)
✅ **GRN (Goods Receipt Notes)** - Track received goods and update inventory
✅ **Real-time Updates** - Redux state management for real-time UI updates
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **BCrypt** - Password encryption

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Ant Design** - UI components
- **Axios** - HTTP client

## Project Structure

```
ERP-Management-System/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # Redux store & slices
│   │   ├── services/    # API services
│   │   ├── styles/      # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/          # Static files
│   └── package.json
├── docker-compose.yml   # Docker configuration
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd ERP-Management-System
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update MongoDB URI in .env
# MONGODB_URI=mongodb://localhost:27017/erp_db
# PORT=5000
# JWT_SECRET=your_secret_key

# Start backend server
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users
- `PUT /api/auth/users/:id` - Update user
- `DELETE /api/auth/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get supplier by ID
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Purchase Orders
- `GET /api/purchase-orders` - Get all purchase orders
- `GET /api/purchase-orders/:id` - Get purchase order by ID
- `POST /api/purchase-orders` - Create purchase order
- `PUT /api/purchase-orders/:id` - Update purchase order
- `DELETE /api/purchase-orders/:id` - Delete purchase order

### Sales Orders
- `GET /api/sales-orders` - Get all sales orders
- `GET /api/sales-orders/:id` - Get sales order by ID
- `POST /api/sales-orders` - Create sales order
- `PUT /api/sales-orders/:id` - Update sales order
- `DELETE /api/sales-orders/:id` - Delete sales order

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get invoice by ID
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### GRN (Goods Receipt Notes)
- `GET /api/grn` - Get all GRNs
- `GET /api/grn/:id` - Get GRN by ID
- `POST /api/grn` - Create GRN
- `PUT /api/grn/:id` - Update GRN
- `DELETE /api/grn/:id` - Delete GRN

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (encrypted),
  role: String (admin/user/manager),
  isActive: Boolean,
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,
  description: String,
  sku: String (unique),
  category: String,
  price: Number,
  quantity: Number,
  reorderLevel: Number,
  supplier: ObjectId (ref: Supplier),
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Supplier
```javascript
{
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  contactPerson: String,
  paymentTerms: String,
  taxId: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Customer
```javascript
{
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  contactPerson: String,
  creditLimit: Number,
  paymentTerms: String,
  taxId: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Docker Deployment

### Using Docker Compose

```bash
# Build and start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

### Build Docker Images

```bash
# Backend
docker build -t erp-backend:latest ./backend

# Frontend
docker build -t erp-frontend:latest ./frontend
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/erp_db
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:5000
```

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@erpsystem.com or open an issue on GitHub.

## Future Enhancements

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Multi-language support
- [ ] Two-factor authentication
- [ ] Advanced analytics and dashboards
- [ ] Inventory forecasting
- [ ] Mobile app (React Native)
- [ ] GraphQL API
- [ ] Machine learning for demand prediction
