import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux'
import {AuthReducerActionType} from "./AuthReducer.tsx";
import { ILogin, ILoginResult, IUser } from './type.ts';;

const LoginPage = () => {
  //const navigate = useNavigate();
  //Хук, який викликає ACTION в глобальному REDUX - він попадає в усіх РЕДЮСЕРАХ
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage] = useState<string>("");
  //Відправка форми на сервер

  const onFinish = async (values: ILogin) => {
    try {
      const resp = await axios.post<ILoginResult>("http://rozetka.com/api/login", values);
      const { token } = resp.data;
      const user = jwtDecode(token) as IUser;
      localStorage.setItem('token', token);
      dispatch({
        type: AuthReducerActionType.LOGIN_USER,
        payload: {
          email: user.email,
          image: user.image,
        } as IUser,
      });
      console.log(1);
      navigate("/");
    } catch (ex) {
      console.error('Помилка при реєстрації!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Логін</h2>
      <Form
        name="loginForm"
        onFinish={onFinish}
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

    </div>
  );
};

export default LoginPage;