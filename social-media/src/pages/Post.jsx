import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Input,
  message,
  Row,
  Col,
  Card,
  Typography,
  Modal,
} from "antd";
import { updateUser, getAllUsers } from "../api/index.js";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const { Text } = Typography;

const Post = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsersPosts, setAllUsersPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    imageURL: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersData = await getAllUsers();
        const storedUserId = JSON.parse(localStorage.getItem("user"));
        const foundUser = allUsersData.find((user) => user.id === storedUserId);

        if (foundUser) {
          setCurrentUser(foundUser);
          setAllUsersPosts(foundUser.posts);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  const validationSchema = Yup.object().shape({
    title: Yup.string(),
    imageURL: Yup.string()
      .url("Please enter a valid URL")
      .required("Image URL is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const allUsers = await getAllUsers();
      const storedUserId = JSON.parse(localStorage.getItem("user"));
      const foundUser = allUsers.find((user) => user.id === storedUserId);

      if (foundUser) {
        const newPost = {
          id: uuidv4(),
          title: values.title,
          imageURL: values.imageURL,
          likes: [],
          comments: [],
          createDate: new Date().toLocaleString(),
        };

        const updatedUser = {
          ...foundUser,
          posts: [...foundUser.posts, newPost],
        };

        await updateUser(updatedUser.id, updatedUser);
        setCurrentUser(updatedUser);

        message.success("Post created successfully");
        resetForm();
      } else {
        console.error("Current user not found");
        message.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error posting:", error);
      message.error("Failed to create post");
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = allUsersPosts.find((post) => post.id === postId);
    if (postToEdit) {
      setInitialValues({
        title: postToEdit.title,
        imageURL: postToEdit.imageURL,
      });
      setEditPostId(postId);
      setIsModalVisible(true);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const updatedPosts = allUsersPosts.filter((post) => post.id !== postId);
      setAllUsersPosts(updatedPosts);

      const storedUserId = JSON.parse(localStorage.getItem("user"));
      const allUsers = await getAllUsers();
      const foundUser = allUsers.find((user) => user.id === storedUserId);

      if (foundUser) {
        const updatedUser = {
          ...foundUser,
          posts: updatedPosts,
        };
        await updateUser(updatedUser.id, updatedUser);
        setCurrentUser(updatedUser);
      }

      message.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("Failed to delete post");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditPostId(null);
    setInitialValues({ title: "", imageURL: "" });
  };

  const handleModalSubmit = async (values, { resetForm }) => {
    try {
      const updatedPosts = allUsersPosts.map((post) => {
        if (post.id === editPostId) {
          return {
            ...post,
            title: values.title,
            imageURL: values.imageURL,
          };
        }
        return post;
      });

      setAllUsersPosts(updatedPosts);

      const storedUserId = JSON.parse(localStorage.getItem("user"));
      const allUsers = await getAllUsers();
      const foundUser = allUsers.find((user) => user.id === storedUserId);

      if (foundUser) {
        const updatedUser = {
          ...foundUser,
          posts: updatedPosts,
        };
        await updateUser(updatedUser.id, updatedUser);
        setCurrentUser(updatedUser);
      }

      message.success("Post updated successfully");
      resetForm();
      setIsModalVisible(false);
      setEditPostId(null);
      setInitialValues({ title: "", imageURL: "" });
    } catch (error) {
      console.error("Error updating post:", error);
      message.error("Failed to update post");
    }
  };

  return (
    <Row gutter={[16, 16]} style={{ margin: "20px 0", display:'flex',alignItems:'center',justifyContent:'center' }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <h2>Create a New Post</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="title">Title</label>
              <Field as={Input} name="title" />
              <ErrorMessage
                name="title"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="imageURL">Image URL</label>
              <Field as={Input} name="imageURL" />
              <ErrorMessage
                name="imageURL"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form>
        </Formik>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Row gutter={[16, 16]}>
          {allUsersPosts.map((post) => (
            <Col key={post.id} xs={24} sm={24} md={12} lg={8} xl={6} style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'20px 40px'}}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="post"
                    src={post.imageURL}
                    style={{ width: "100%", height: 200 ,objectFit:'cover'}}
                  />
                }
                actions={[
                  <Button key="edit" onClick={() => handleEdit(post.id)}>
                    Edit
                  </Button>,
                  <Button key="delete" onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>,
                ]}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Text strong>{post.title}</Text>
                    <p style={{ fontSize: "10px" }}>{post.createDate}</p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
          {currentUser && currentUser.posts.length === 0 && (
            <Col xs={24} style={{ textAlign: "center" }}>
              <p>No posts found for the current user</p>
            </Col>
          )}
        </Row>
      </Col>
      <Modal
        title="Edit Post"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              document.getElementById("modal-submit-button").click()
            }
          >
            Save
          </Button>,
        ]}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleModalSubmit}
        >
          <Form>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="title">Title</label>
              <Field as={Input} name="title" />
              <ErrorMessage
                name="title"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="imageURL">Image URL</label>
              <Field as={Input} name="imageURL" />
              <ErrorMessage
                name="imageURL"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <button id="modal-submit-button" type="submit" hidden />
          </Form>
        </Formik>
      </Modal>
    </Row>
  );
  
};

export default Post;
