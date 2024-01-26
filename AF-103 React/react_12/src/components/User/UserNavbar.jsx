import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/userReducer";

const UserNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to="/">Products</Link>
      </Menu.Item>

      {isLoggedIn ? (
        <>
          <Menu.Item key="2">
            <Link to="/basket">Basket</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="4">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default UserNavbar;
