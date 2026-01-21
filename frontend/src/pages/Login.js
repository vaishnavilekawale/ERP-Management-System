import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/slices/authSlice';
import '../styles/Auth.css';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', values);
      const { token, user } = response.data;
      
      dispatch(setToken(token));
      dispatch(setUser(user));
      
      message.success('Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error(error.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="ERP Management System - Login">
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
