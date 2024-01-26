import React from 'react';
import { Table, Button,notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket } from '../../store/reducers/basketReducer';
import { updateQuantity } from '../../store/reducers/basketReducer';

const Basket = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state) => state.basket.items);

  const groupedBasketItems = basketItems.reduce((acc, item) => {
    const existingItem = acc.find(groupedItem => groupedItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; 
      existingItem.quantity -= item.quantity; 
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const handleDecrease = (record) => {
    if (record.quantity > 1) {
      dispatch(updateQuantity({ ...record, quantity: record.quantity - 1 }));
    } else {
      dispatch(removeFromBasket(record));
    }
  };
  
  const handleIncrease = (record) => {
    dispatch(updateQuantity({ ...record, quantity: record.quantity + 1 }));
  };
  

  const handleRemove = (record) => {
    dispatch(removeFromBasket(record));
    openNotification('success', 'Deleting Successful', 'You delete item!');
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleDecrease(record)}>-</Button>
          <Button onClick={() => handleIncrease(record)}>+</Button>
          <Button onClick={() => handleRemove(record)}>Remove</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Basket</h1>
      <Table dataSource={groupedBasketItems} columns={columns} />
    </div>
  );
};

export default Basket;
