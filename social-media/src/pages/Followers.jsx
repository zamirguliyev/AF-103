/* eslint-disable react/prop-types */
import { Modal, Button, Table } from "antd";
import { getAllUsers, updateUser } from "../api/index.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Followers = ({ onCancel, visible }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const storedUserId = JSON.parse(localStorage.getItem("user"));
        const found = allUsers.find((user) => user.id == storedUserId);
        setCurrentUser(found);

        const followingIds = found.followers;
        const updatedFollowers = allUsers.filter((user) =>
          followingIds.includes(user.id)
        );

        setFollowers(updatedFollowers);
        setFoundUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [currentUser]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
       <Link to={`/user/${record.id}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.profilePicture}
            alt={text}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <span>{text}</span>
        </div>
       </Link>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleUnfollow(record.id)}>Remove</Button>
      ),
    },
  ];

  const handleUnfollow = async (userId) => {
    try {
      const userToUnfollow = followers.find((user) => user.id === userId);
      if (!userToUnfollow) return;
  
      const updatedFollowers = followers.filter((user) => user.id !== userId);
      setFollowers(updatedFollowers);
  
      const updatedCurrentUser = {
        ...currentUser,
        followers: currentUser.followers.filter((id) => id !== userId),
      };
      setCurrentUser(updatedCurrentUser);
  
      const followedUser = foundUsers.find((user) => user.id === userId);
      const updatedFollowersForFollowedUser = followedUser.followers.filter(
        (follower) => follower.id !== currentUser.id
      );
      followedUser.followers = updatedFollowersForFollowedUser;
  
      await updateUser(currentUser.id, {
        followers: updatedCurrentUser.followers,
      });
  
      await updateUser(userId, {
        followings: followedUser.followings.filter((id) => id !== currentUser.id),
      });
  
      console.log(`Unfollowed user with ID: ${userId}`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  

  return (
    <Modal
      title="Followers"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <Table dataSource={followers} columns={columns} rowKey="id" />
    </Modal>
  );
};

export default Followers;
