import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BasketContext } from '../services/BasketContex';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './navbar.css';

const { Header } = Layout;

const Navbar = () => {
  const { basket } = useContext(BasketContext);

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: 'white', fontSize: '20px' }}>Zamir App</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/basket">
            <ShoppingCartOutlined style={{ fontSize: '18px', marginRight: '5px' }} />
            Basket ({basket.length})
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
