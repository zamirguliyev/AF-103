import React from 'react';
import { Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../services/api';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/userReducer';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      const allUsers = await getAllUsers(); 
      const user = allUsers.find(user => user.username === values.username && user.password === values.password);
      
      if (user) {
        dispatch(login());
        if (user.isAdmin) {
          navigate('/admin');
        } else {
          console.log('Login successful as a regular user');
          navigate('/'); 
        }
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
