import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Products.css';

function Products() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, values);
        message.success('Product updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/products', values);
        message.success('Product added successfully');
      }
      setIsModalVisible(false);
      fetchProducts();
    } catch (error) {
      message.error('Failed to save product');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item name="sku" rules={[{ required: true }]}>
            <Input placeholder="SKU" />
          </Form.Item>
          <Form.Item name="category">
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item name="price" rules={[{ required: true }]}>
            <Input type="number" placeholder="Price" />
          </Form.Item>
          <Form.Item name="quantity">
            <Input type="number" placeholder="Quantity" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Products;
