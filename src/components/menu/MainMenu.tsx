import React from 'react';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
        <Menu mode="horizontal" theme="dark">
        <Menu.Item key="catalog">
          <Link to="">Catalog</Link>
        </Menu.Item>
        <Menu.Item key="create">
        <Link to="/create-category">Create</Link>
        </Menu.Item>
        <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
          <Button className="login-button">Login</Button>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link to="/sign-up">
            <Button className="signup-button">Sign-up</Button>
          </Link>
        </Menu.Item>
      </Menu>
      );
    };

export default MainMenu;