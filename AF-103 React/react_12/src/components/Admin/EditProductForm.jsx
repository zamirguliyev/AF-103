import React from 'react';
import { Form, Input, Modal } from 'antd';

const EditProductForm = ({ visible, onCancel, onOk, form, product }) => {
  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} initialValues={{ ...product }}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductForm;
