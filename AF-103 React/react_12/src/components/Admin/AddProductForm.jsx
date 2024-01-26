import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postProduct } from '../../services/api.js';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter the name'),
    description: Yup.string().required('Please enter the description'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await postProduct(values);
        resetForm();
        navigate('/admin/products');
        showSuccessNotification(); 
      } catch (error) {
        console.error('Error adding product:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const showSuccessNotification = () => {
    notification.success({
      message: 'Success',
      description: 'Product has been successfully added!',
      duration: 1, 
    });
  };

  return (
    <Form layout="vertical" onFinish={formik.handleSubmit}>
      <Form.Item label="Name" name="name" validateStatus={formik.errors.name ? 'error' : ''} help={formik.errors.name}>
        <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        validateStatus={formik.errors.description ? 'error' : ''}
        help={formik.errors.description}
      >
        <Input.TextArea name="description" value={formik.values.description} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={formik.isSubmitting}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
