/* eslint-disable react/prop-types */
import { Modal, Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUser, getAllUsers } from "../api/index.js";
import Swal from "sweetalert2";

const EditProfileModal = ({ visible, onCancel, setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const allUsers = await getAllUsers();
        const storedUserId = JSON.parse(localStorage.getItem("user"));
        const foundUser = allUsers.find((user) => user.id == storedUserId);
        setCurrentUser(foundUser);

        setInitialValues({
          username: foundUser.username,
          fullName: foundUser.fullName,
          email: foundUser.email,
          bio: foundUser.bio,
          profilePicture: foundUser.profilePicture,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .test("unique-username", "Username is already in use", async (value) => {
        const users = await getAllUsers();
        return !users.find(
          (user) => user.username === value && value !== currentUser.username
        );
      }),
    fullName: Yup.string(),
    email: Yup.string()
      .email("Invalid email")
      .test("unique-email", "Email is already in use", async (value) => {
        const users = await getAllUsers();
        return !users.find(
          (user) => user.email === value && value !== currentUser.email
        );
      }),
    bio: Yup.string().max(150, "Bio must be at most 150 characters"),
    profilePicture: Yup.string().url("Invalid URL"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await updateUser(currentUser.id, values);
      setCurrentUser({ ...currentUser, ...values });
      setLoading(false);
      onCancel();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
    }
    setUpdate((update) => !update);
    setSubmitting(false);
  };

  return (
    <Modal
      title="Edit Profile"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onFinish={handleSubmit}>
              <Form.Item label="Username">
                <Field as={Input} type="text" name="username" />
                <ErrorMessage name="username" component="div" />
              </Form.Item>
              <Form.Item label="Full Name">
                <Field as={Input} type="text" name="fullName" />
                <ErrorMessage name="fullName" component="div" />
              </Form.Item>
              <Form.Item label="Email">
                <Field as={Input} type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </Form.Item>
              <Form.Item label="Bio">
                <Field as={Input.TextArea} name="bio" rows={4} />
                <ErrorMessage name="bio" component="div" />
              </Form.Item>
              <Form.Item label="Profile Picture URL">
                <Field as={Input} type="text" name="profilePicture" />
                <ErrorMessage name="profilePicture" component="div" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={isSubmitting}
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default EditProfileModal;
