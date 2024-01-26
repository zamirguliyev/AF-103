import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../services/api';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleRegister = async (values) => {
    try {
      await postUser({ username: values.username, password: values.password });
      openNotification('success', 'Registration Successful', 'You have successfully registered!');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      openNotification('error', 'Registration Failed', 'Registration failed. Please try again.');
    }
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleRegister(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <Form onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            help={touched.username && errors.username}
            validateStatus={touched.username && errors.username ? 'error' : ''}
          >
            <Input value={values.username} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            help={touched.password && errors.password}
            validateStatus={touched.password && errors.password ? 'error' : ''}
          >
            <Input.Password value={values.password} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            help={touched.confirmPassword && errors.confirmPassword}
            validateStatus={
              touched.confirmPassword && errors.confirmPassword ? 'error' : ''
            }
          >
            <Input.Password
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
