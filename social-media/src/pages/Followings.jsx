/* eslint-disable react/prop-types */
import { Modal, Button, Table } from "antd";
import { getAllUsers, updateUser } from "../api/index.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Followings = ({ onCancel, visible }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const storedUserId = JSON.parse(localStorage.getItem("user"));
        const found = allUsers.find((user) => user.id === storedUserId);
        setCurrentUser(found);

        const followingIds = found.followings;
        const updatedFollowings = allUsers.filter((user) =>
          followingIds.includes(user.id)
        );

        setFollowings(updatedFollowings);
        setFoundUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [currentUser]);

  const handleUnfollow = async (userId) => {
    try {
      const userToUnfollow = followings.find((user) => user.id === userId);
      if (!userToUnfollow) return;

      const updatedFollowings = followings.filter((user) => user.id !== userId);
      setFollowings(updatedFollowings);

      let updatedFollowersForUserToUnfollow = userToUnfollow.followers.filter(
        (follower) => follower !== currentUser.id && follower !== null
      );

      if (updatedFollowersForUserToUnfollow === null) {
        updatedFollowersForUserToUnfollow = [];
      }

      userToUnfollow.followers = updatedFollowersForUserToUnfollow;

      const followedUser = foundUsers.find((user) => user.id === userId);
      const updatedFollowersForFollowedUser = followedUser.followers.filter(
        (follower) => follower.id !== currentUser.id
      );
      followedUser.followers = updatedFollowersForFollowedUser;

      const updatedCurrentUser = {
        ...currentUser,
        followings: updatedFollowings.map((user) => user.id),
      };
      setCurrentUser(updatedCurrentUser);

      await updateUser(currentUser.id, {
        followings: updatedFollowings.map((user) => user.id),
      });

      await updateUser(userToUnfollow.id, {
        followers: updatedFollowersForUserToUnfollow.map(
          (follower) => follower.id
        ),
      });

      console.log(`Unfollowed user with ID: ${userId}`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

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
        <Button onClick={() => handleUnfollow(record.id)}>Unfollow</Button>
      ),
    },
  ];

  return (
    <Modal
      title="Followings"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <Table dataSource={followings} columns={columns} rowKey="id" />
    </Modal>
  );
};

export default Followings;
