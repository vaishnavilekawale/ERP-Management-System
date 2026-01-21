import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Common.css';

function Customers() {
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingCustomer, setEditingCustomer] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      message.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      message.success('Customer deleted successfully');
      fetchCustomers();
    } catch (error) {
      message.error('Failed to delete customer');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingCustomer) {
        await axios.put(`http://localhost:5000/api/customers/${editingCustomer._id}`, values);
        message.success('Customer updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/customers', values);
        message.success('Customer added successfully');
      }
      setIsModalVisible(false);
      fetchCustomers();
    } catch (error) {
      message.error('Failed to save customer');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCustomer(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCustomer(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Customers</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={customers}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Customer Name" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="phone">
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item name="address">
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item name="city">
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item name="state">
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item name="zipCode">
            <Input placeholder="Zip Code" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Customers;
