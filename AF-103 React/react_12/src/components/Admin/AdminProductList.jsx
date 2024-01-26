import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { getAllProducts, deleteProduct, updateProduct } from '../../services/api.js';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

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

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      notification.success({
        message: 'Product Deleted',
        description: `Product ID ${id} has been deleted.`,
        duration: 1, 
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      notification.error({
        message: 'Delete Error',
        description: 'An error occurred while deleting the product.',
        duration: 1, 
      });
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
    });
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedProduct = { ...selectedProduct, ...values };
      await updateProduct(selectedProduct.id, updatedProduct);
      setModalVisible(false);
      notification.success({
        message: 'Product Updated',
        description: `Product ID ${selectedProduct.id} has been updated.`,
        duration: 1,
      });
      fetchProducts(); 
    } catch (error) {
      console.error('Error updating product:', error);
      notification.error({
        message: 'Update Error',
        description: 'An error occurred while updating the product.',
        duration: 1,
      });
    }
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={products} columns={columns} />
      <Modal
        title="Edit Product"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={handleUpdate}
      >
        <Form form={form}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminProductList;
