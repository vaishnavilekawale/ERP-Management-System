import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Common.css';

function PurchaseOrders() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingOrder, setEditingOrder] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/purchase-orders');
      setOrders(response.data);
    } catch (error) {
      message.error('Failed to fetch purchase orders');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setIsModalVisible(true);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/purchase-orders/${id}`);
      message.success('Purchase order deleted successfully');
      fetchOrders();
    } catch (error) {
      message.error('Failed to delete purchase order');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingOrder) {
        await axios.put(`http://localhost:5000/api/purchase-orders/${editingOrder._id}`, values);
        message.success('Purchase order updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/purchase-orders', values);
        message.success('Purchase order added successfully');
      }
      setIsModalVisible(false);
      fetchOrders();
    } catch (error) {
      message.error('Failed to save purchase order');
    }
  };

  const columns = [
    { title: 'PO Number', dataIndex: 'poNumber', key: 'poNumber' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'PO Date', dataIndex: 'poDate', key: 'poDate' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditOrder(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteOrder(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Purchase Orders</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddOrder}>
          Add Purchase Order
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingOrder ? 'Edit Purchase Order' : 'Add Purchase Order'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="poNumber" rules={[{ required: true }]}>
            <Input placeholder="PO Number" />
          </Form.Item>
          <Form.Item name="status">
            <Input placeholder="Status" />
          </Form.Item>
          <Form.Item name="totalAmount">
            <Input type="number" placeholder="Total Amount" />
          </Form.Item>
          <Form.Item name="poDate">
            <Input type="date" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default PurchaseOrders;
