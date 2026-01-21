import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Common.css';

function GRN() {
  const [grns, setGRNs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingGRN, setEditingGRN] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchGRNs();
  }, []);

  const fetchGRNs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/grn');
      setGRNs(response.data);
    } catch (error) {
      message.error('Failed to fetch GRNs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGRN = () => {
    setEditingGRN(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditGRN = (grn) => {
    setEditingGRN(grn);
    form.setFieldsValue(grn);
    setIsModalVisible(true);
  };

  const handleDeleteGRN = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/grn/${id}`);
      message.success('GRN deleted successfully');
      fetchGRNs();
    } catch (error) {
      message.error('Failed to delete GRN');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingGRN) {
        await axios.put(`http://localhost:5000/api/grn/${editingGRN._id}`, values);
        message.success('GRN updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/grn', values);
        message.success('GRN added successfully');
      }
      setIsModalVisible(false);
      fetchGRNs();
    } catch (error) {
      message.error('Failed to save GRN');
    }
  };

  const columns = [
    { title: 'GRN Number', dataIndex: 'grnNumber', key: 'grnNumber' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'GRN Date', dataIndex: 'grnDate', key: 'grnDate' },
    { title: 'Received By', dataIndex: 'receivedBy', key: 'receivedBy' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditGRN(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteGRN(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Goods Receipt Notes (GRN)</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddGRN}>
          Add GRN
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={grns}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingGRN ? 'Edit GRN' : 'Add GRN'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="grnNumber" rules={[{ required: true }]}>
            <Input placeholder="GRN Number" />
          </Form.Item>
          <Form.Item name="status">
            <Input placeholder="Status" />
          </Form.Item>
          <Form.Item name="grnDate">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="receivedBy">
            <Input placeholder="Received By" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default GRN;
