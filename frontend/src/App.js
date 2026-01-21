import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Common/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Customers from './pages/Customers';
import PurchaseOrders from './pages/PurchaseOrders';
import SalesOrders from './pages/SalesOrders';
import Invoices from './pages/Invoices';
import GRN from './pages/GRN';
import './styles/App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="customers" element={<Customers />} />
            <Route path="purchase-orders" element={<PurchaseOrders />} />
            <Route path="sales-orders" element={<SalesOrders />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="grn" element={<GRN />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
