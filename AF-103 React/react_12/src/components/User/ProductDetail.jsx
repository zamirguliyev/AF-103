import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByID } from '../../services/api.js'
const ProductDetail = () => {
  const { id } = useParams(); 

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const productData = await getProductByID(id); 
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default ProductDetail;
