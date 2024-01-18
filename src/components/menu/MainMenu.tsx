import { Menu, Avatar, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../audit/AuthUtils";
import { useDispatch } from 'react-redux';
import { AuthReducerActionType } from '../Auth/AuthReducer';

const MainMenu = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: AuthReducerActionType.LOGOUT_USER });
    navigate("/login");
  };

  // Перевірка наявності інформації про користувача
  const isUserAuthenticated = !!userInfo;

  return (
    <Menu mode="horizontal" theme="dark">
      {isUserAuthenticated ? (
        <>
          <Menu.Item key="catalog">
            <Link to="/">Catalog</Link>
          </Menu.Item>
          <Menu.Item key="product">
            <Link to="/products">Product</Link>
          </Menu.Item>
          <Menu.Item key="create">
            <Link to="/create-category">Create</Link>
          </Menu.Item>
          <Menu.Item key="email" style={{ marginLeft: "auto" }}>
            {userInfo.email}
          </Menu.Item>
          <Menu.Item key="avatar">
            {userInfo.image && (
              <Avatar
                src={`http://rozetka.com/upload/300_${userInfo.image}`}
                alt="User Avatar"
              />
            )}
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="primary" onClick={handleLogout}>
              <Link to="/login">Logout</Link>
            </Button>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" style={{ marginLeft: "auto" }}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MainMenu;
