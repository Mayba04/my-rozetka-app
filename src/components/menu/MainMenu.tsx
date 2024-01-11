import { Menu, Avatar, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, removeToken } from "../audit/AuthUtils";

const MainMenu = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleLogout = () => {
    removeToken();
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
