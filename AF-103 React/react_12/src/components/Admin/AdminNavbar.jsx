import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/userReducer';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/admin/products">Products</Link>
      </Menu.Item>
      
      <Menu.Item key="2">
        <Link to="/admin/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/admin/products/add">Add</Link>
      </Menu.Item>
       <Menu.Item key="4">
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </Menu.Item>
    </Menu>
  );
};

export default AdminNavbar;
