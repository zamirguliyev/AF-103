import { Menu } from 'antd';
const { Item } = Menu;
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <Menu mode="horizontal" style={{ margin: '10px 30px' }}>
      <Item key="main-navbar" style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>MAIN NAVBAR</h3>
      </Item>
      <Item key="admin">
        <Link to="/admin">Admin</Link>
      </Item>
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>
      <Item key="about">
        <Link to="/about">About</Link>
      </Item>
      <Item key="contact">
        <Link to="/contact">Contact</Link>
      </Item>
    </Menu>
  );
};

export default UserNavbar;

