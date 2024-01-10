import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated } from '../audit/AuthUtils';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (values: any) => {
    try {
      const response = await axios.post('http://rozetka.com/api/login', {
        email: values.email,
        password: values.password,
      });

      const decoded = jwtDecode(response.data.token);
      console.log(decoded);
      localStorage.setItem('token', response.data.token);
      
      navigate('/');
    } catch (error) {
      setError('Неправильний email або пароль');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Логін</h2>
      <Form
        name="loginForm"
        onFinish={handleLogin}
        initialValues={{ remember: true }}
        style={{ textAlign: 'center' }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Введіть свій email!' },
            { type: 'email', message: 'Введіть правильний email!' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введіть свій пароль!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Увійти
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/sign-up">
            <Button className="signup-button">Sign-up</Button>
          </Link>
        </Form.Item>
      </Form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;