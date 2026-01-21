import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Common.css';

function Invoices() {
  const [invoices, setInvoices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingInvoice, setEditingInvoice] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      message.error('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleAddInvoice = () => {
    setEditingInvoice(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    form.setFieldsValue(invoice);
    setIsModalVisible(true);
  };

  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      message.success('Invoice deleted successfully');
      fetchInvoices();
    } catch (error) {
      message.error('Failed to delete invoice');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingInvoice) {
        await axios.put(`http://localhost:5000/api/invoices/${editingInvoice._id}`, values);
        message.success('Invoice updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/invoices', values);
        message.success('Invoice added successfully');
      }
      setIsModalVisible(false);
      fetchInvoices();
    } catch (error) {
      message.error('Failed to save invoice');
    }
  };

  const columns = [
    { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Invoice Date', dataIndex: 'invoiceDate', key: 'invoiceDate' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditInvoice(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteInvoice(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Invoices</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddInvoice}>
          Add Invoice
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={invoices}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingInvoice ? 'Edit Invoice' : 'Add Invoice'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="invoiceNumber" rules={[{ required: true }]}>
            <Input placeholder="Invoice Number" />
          </Form.Item>
          <Form.Item name="status">
            <Input placeholder="Status" />
          </Form.Item>
          <Form.Item name="totalAmount">
            <Input type="number" placeholder="Total Amount" />
          </Form.Item>
          <Form.Item name="invoiceDate">
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

export default Invoices;
