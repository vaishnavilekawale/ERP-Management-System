import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserOutlined,
  FileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import '../../styles/Layout.css';

const { Header, Sider, Content } = Layout;

function LayoutComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/dashboard' },
    { key: '2', icon: <ShoppingCartOutlined />, label: 'Products', path: '/products' },
    { key: '3', icon: <ShopOutlined />, label: 'Suppliers', path: '/suppliers' },
    { key: '4', icon: <UserOutlined />, label: 'Customers', path: '/customers' },
    { key: '5', icon: <FileOutlined />, label: 'Purchase Orders', path: '/purchase-orders' },
    { key: '6', icon: <FileOutlined />, label: 'Sales Orders', path: '/sales-orders' },
    { key: '7', icon: <FileOutlined />, label: 'Invoices', path: '/invoices' },
    { key: '8', icon: <FileOutlined />, label: 'GRN', path: '/grn' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="dark">
        <div className="logo" style={{ padding: '16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          ERP System
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems.map((item) => ({
            ...item,
            onClick: () => navigate(item.path),
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ margin: 0 }}>ERP Management System</h2>
          <button onClick={handleLogout} style={{ border: 'none', cursor: 'pointer', fontSize: '16px' }}>
            <LogoutOutlined /> Logout
          </button>
        </Header>
        <Content style={{ margin: '24px 16px', padding: '24px', background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutComponent;
