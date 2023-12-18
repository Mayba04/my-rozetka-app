import React from 'react';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
        <Menu mode="horizontal" theme="dark">
        <Menu.Item key="catalog">
          Catalog
        </Menu.Item>
        <Menu.Item key="create">
          Create
        </Menu.Item>
        <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
          <Button className="login-button">Login</Button>
        </Menu.Item>
        <Menu.Item key="signup">
          <Button className="signup-button">Sign-up</Button>
        </Menu.Item>
      </Menu>
      );
    };

export default MainMenu;