import React, { useEffect } from "react";
import { Menu, Avatar, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { isUserAuthenticated, getUserInfo, removeToken } from '../audit/AuthUtils';

const MainMenu = () => {
  const navigate = useNavigate();
  const isAuthenticated = isUserAuthenticated();
  const userInfo = getUserInfo();
  
  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  // Додайте перевірку isAuthenticated для рендерингу меню тільки для авторизованих користувачів
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="catalog">
        <Link to="/">Catalog</Link>
      </Menu.Item>
      <Menu.Item key="create">
        <Link to="/create-category">Create</Link>
      </Menu.Item>
      <Menu.Item key="email" style={{ marginLeft: 'auto' }}>
        {userInfo && userInfo.email}
      </Menu.Item>
      <Menu.Item key="avatar">
        {userInfo && userInfo.image && (
          <Avatar src={`http://rozetka.com/upload/300_${userInfo.image}`} alt="User Avatar" />
        )}
      </Menu.Item>
      <Menu.Item key="logout">
        <Button type="primary" onClick={handleLogout}>
          <Link to="/login">Logout</Link>
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default MainMenu;