/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled, MessageOutlined } from "@ant-design/icons";
import { Card, Space, Modal, Input, Button } from "antd";
import { getUser, updateUser } from "../api/index.js";

const { Meta } = Card;

const PostCard = ({ post, onLike }) => {
  const currentUserId = JSON.parse(localStorage.getItem("user"));
  const [liked, setLiked] = useState(post.likes.includes(currentUserId));
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser(currentUserId);
        setCurrentUsername(user.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUserId]);

  const handleLike = async () => {
    const updatedLikes = liked ? post.likes.filter(id => id !== currentUserId) : [...post.likes, currentUserId];
    setLiked(!liked);
    onLike(post.id, updatedLikes);

    const updatedPost = { ...post, likes: updatedLikes };
    await updateUser(post.id, updatedPost);
  };

  const handleOpenCommentModal = () => {
    setCommentModalVisible(true);
  };

  const handleAddComment = async () => {
    try {
      const newComment = {
        userId: currentUserId,
        username: currentUsername,
        comment: commentInput,
      };
      setComments([...comments, newComment]);
      setCommentInput("");
  
      const updatedPost = { ...post, comments: [...post.comments, newComment] };
  
      await updateUser(post.id, updatedPost); 
    } catch (error) {
      console.error("Comment error", error);
      
    }
  };


  return (
    <Card
      style={{ width: "100%", maxWidth: "500px", margin: "auto" }}
      cover={<img alt="post" src={post.imageURL} style={{ width: "100%",objectFit:'contain' }} />}
    >
      <Meta
        title={`${post.title}`}
        description={
          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <span>{post.createDate}</span>
            <Space
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {liked ? (
                <HeartFilled
                  onClick={handleLike}
                  style={{ fontSize: 20, color: "red" }}
                />
              ) : (
                <HeartOutlined
                  onClick={handleLike}
                  style={{ fontSize: 20 }}
                />
              )}
              <span>{post.likes.length}</span>
              <MessageOutlined
                onClick={handleOpenCommentModal}
                style={{ fontSize: 20 }}
              />
              <span>{comments.length}</span>
            </Space>
          </div>
        }
      />
      <Modal
        title="Comments"
        visible={commentModalVisible}
        onCancel={() => setCommentModalVisible(false)}
        footer={[
          <Input
            key="comment-input"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />,
          <Button key="comment-button" onClick={handleAddComment}>
            Add Comment
          </Button>,
        ]}
      >
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.username}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </Modal>
    </Card>
  );
};

export default PostCard;
