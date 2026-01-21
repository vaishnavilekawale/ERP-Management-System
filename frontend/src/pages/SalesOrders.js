import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Common.css';

function SalesOrders() {
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
      const response = await axios.get('http://localhost:5000/api/sales-orders');
      setOrders(response.data);
    } catch (error) {
      message.error('Failed to fetch sales orders');
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
      await axios.delete(`http://localhost:5000/api/sales-orders/${id}`);
      message.success('Sales order deleted successfully');
      fetchOrders();
    } catch (error) {
      message.error('Failed to delete sales order');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingOrder) {
        await axios.put(`http://localhost:5000/api/sales-orders/${editingOrder._id}`, values);
        message.success('Sales order updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/sales-orders', values);
        message.success('Sales order added successfully');
      }
      setIsModalVisible(false);
      fetchOrders();
    } catch (error) {
      message.error('Failed to save sales order');
    }
  };

  const columns = [
    { title: 'SO Number', dataIndex: 'soNumber', key: 'soNumber' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Grand Total', dataIndex: 'grandTotal', key: 'grandTotal' },
    { title: 'SO Date', dataIndex: 'soDate', key: 'soDate' },
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
        <h1>Sales Orders</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddOrder}>
          Add Sales Order
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
        title={editingOrder ? 'Edit Sales Order' : 'Add Sales Order'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="soNumber" rules={[{ required: true }]}>
            <Input placeholder="SO Number" />
          </Form.Item>
          <Form.Item name="status">
            <Input placeholder="Status" />
          </Form.Item>
          <Form.Item name="grandTotal">
            <Input type="number" placeholder="Grand Total" />
          </Form.Item>
          <Form.Item name="soDate">
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

export default SalesOrders;
