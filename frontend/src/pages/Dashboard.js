import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ShoppingCartOutlined, ShopOutlined, UserOutlined, FileOutlined } from '@ant-design/icons';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Products"
              value={1250}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Suppliers"
              value={85}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Customers"
              value={342}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Invoices"
              value={528}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
