import React, { useContext } from 'react';
import { Table, Button, notification } from 'antd';
import { BasketContext } from '../services/BasketContex';

const Basket = () => {
  const {
    basket,
    removeItemFromBasket,
    increaseQuantity,
    decreaseQuantity,
    clearBasket,
  } = useContext(BasketContext);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      duration: 1,
    });
  };

  const handleIncreaseQuantity = (id, name) => {
    increaseQuantity(id);
    openNotification('success', 'Quantity Increased', `${name} quantity increased successfully.`);
  };

  const handleDecreaseQuantity = (id, quantity, name) => {
    if (quantity === 1) {
      removeItemFromBasket(id);
      openNotification('warning', 'Item Removed', `${name} removed from basket.`);
    } else {
      decreaseQuantity(id);
      openNotification('success', 'Quantity Decreased', `${name} quantity decreased successfully.`);
    }
  };

  const handleRemoveItem = (id, name) => {
    removeItemFromBasket(id);
    openNotification('error', 'Item Removed', `${name} removed from basket.`);
  };

//   const handleClearBasket = () => {
//     basket.forEach(item => {
//       handleRemoveItem(item.id, item.name);
//     });
//     clearBasket();
//     openNotification('info', 'Basket Cleared', 'All items removed from basket.');
//   };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button type='primary' onClick={() => handleIncreaseQuantity(record.id, record.name)}>+</Button>
          <Button type='primary' onClick={() => handleDecreaseQuantity(record.id, record.quantity, record.name)}>-</Button>
          <Button type="primary" danger onClick={() => handleRemoveItem(record.id, record.name)}>Remove</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{textAlign:'center',margin:'20px 0'}}>Basket</h1>
      {/* <Button onClick={() => handleClearBasket()}>Clear Basket</Button> */}
      <Table rowKey={'id'} dataSource={basket} columns={columns} />
    </div>
  );
};

export default Basket;
