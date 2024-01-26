import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';
import axios from 'axios';
import { BasketContext } from '../services/BasketContex';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { addItemToBasket } = useContext(BasketContext);

  useEffect(() => {
    axios.get('https://6565fafaeb8bb4b70ef2b8f9.mockapi.io/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const openNotification = (productName) => {
    notification.success({
      message: 'Added to Basket',
      description: `${productName} added to basket successfully!`,
      duration: 1,
    });
  };

  const handleAddToBasket = (record) => {
    addItemToBasket(record);
    openNotification(record.name);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [
        ...new Set(categories.map(item => item.name)) 
      ].map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.name === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
      filters: [
        ...new Set(categories.map(item => item.description))
      ].map(description => ({ text: description, value: description })),
      onFilter: (value, record) => record.description === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type='primary' onClick={() => handleAddToBasket(record)}>Add to Basket</Button>
      ),
    },
  ];
  
  

  return (
    <div>
      <h1 style={{textAlign:'center',margin:'20px 0'}}>Categories</h1>
      <Table rowKey={"id"}  dataSource={categories} columns={columns} />
    </div>
  );
};

export default Categories;
