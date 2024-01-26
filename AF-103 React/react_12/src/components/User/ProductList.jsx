import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../../store/reducers/basketReducer';
import {  getAllProducts } from '../../services/api.js';

const ProductList = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToBasket = (product) => {
    if (!isLoggedIn) {
      message.error('Please log in to add items to your basket.');
      return;
    }
  
    dispatch(addToBasket({ ...product, quantity: 1 }));
    console.log('Added to basket:', product);
    message.success('Added to basket');
  };
  

  return (
    <div>
      <h1>Products</h1>
      <Table
        dataSource={products}
        columns={[
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
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <>
                <Button type="primary">
                  <Link to={`/product/${record.id}`}>Detail</Link>
                </Button>
                <Button type="default" onClick={() => handleAddToBasket(record)}>
                  Add to Basket
                </Button>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProductList;
