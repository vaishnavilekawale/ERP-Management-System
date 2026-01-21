import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Common.css';

function Suppliers() {
  const [suppliers, setSuppliers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingSupplier, setEditingSupplier] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      message.error('Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    form.setFieldsValue(supplier);
    setIsModalVisible(true);
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      message.success('Supplier deleted successfully');
      fetchSuppliers();
    } catch (error) {
      message.error('Failed to delete supplier');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingSupplier) {
        await axios.put(`http://localhost:5000/api/suppliers/${editingSupplier._id}`, values);
        message.success('Supplier updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/suppliers', values);
        message.success('Supplier added successfully');
      }
      setIsModalVisible(false);
      fetchSuppliers();
    } catch (error) {
      message.error('Failed to save supplier');
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
            onClick={() => handleEditSupplier(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteSupplier(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Suppliers</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSupplier}>
          Add Supplier
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={suppliers}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingSupplier ? 'Edit Supplier' : 'Add Supplier'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Supplier Name" />
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

export default Suppliers;
