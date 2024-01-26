/* eslint-disable react/prop-types */
import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { updateUser, getAllUsers } from "../api/index.js";
import { useSelector } from "react-redux";

const ChangePasswordModal = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const globalUser = useSelector((state) => state.user.userId);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password is too short")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/,
        "Password should contain at least 8 characters, one uppercase, one lowercase, and one number"
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm New Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const allUsers = await getAllUsers();
      const storedUserId = JSON.parse(localStorage.getItem("user"));
      const foundUser = allUsers.find((user) => user.id === storedUserId);

      const currentUserId = foundUser.id;

      if (foundUser.password !== values.currentPassword) {
        console.error("Current password is incorrect!");
        setLoading(false);
        setSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Current password is incorrect!",
        });
        return;
      }

      await updateUser(currentUserId, { password: values.newPassword });

      foundUser.password = values.newPassword;

      console.log("Password updated successfully!");
      setLoading(false);
      onCancel();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password updated successfully!",
      });

      resetForm();
    } catch (error) {
      console.error("Error updating password:", error);
      setLoading(false);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      title="Change Password"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onFinish={handleSubmit}>
            <Form.Item label="Current Password">
              <Field as={Input} type="password" name="currentPassword" />
              <ErrorMessage name="currentPassword" component="div" />
            </Form.Item>
            <Form.Item label="New Password">
              <Field as={Input} type="password" name="newPassword" />
              <ErrorMessage name="newPassword" component="div" />
            </Form.Item>
            <Form.Item label="Confirm New Password">
              <Field as={Input} type="password" name="confirmNewPassword" />
              <ErrorMessage name="confirmNewPassword" component="div" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={isSubmitting}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangePasswordModal;
