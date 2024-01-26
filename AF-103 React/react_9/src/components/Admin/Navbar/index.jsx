import { Menu } from 'antd';
const { Item } = Menu;
import { Link } from "react-router-dom"

const AdminNavbar = () => {
  return (
    <Menu mode="horizontal" style={{ margin: '10px 30px' }}>
      <Item key="main-navbar" style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>ADMIN NAVBAR</h3>
      </Item>
      <Item key="site">
        <Link to='/'>Site</Link>
      </Item>
      <Item key="dashboard">
        <Link to='/admin'>Dashboard</Link>
      </Item>
      <Item key="products">
        <Link to='/admin/products'>Products</Link>
      </Item>
      <Item key="suppliers">
        <Link to='/admin/suppliers'>Suppliers</Link>
      </Item>
    </Menu>
  );
};

export default AdminNavbar;

