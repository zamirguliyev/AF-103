/* eslint-disable react/prop-types */
import { Modal, Button, Table } from "antd";
import { getAllUsers, updateUser } from "../api/index.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Requests = ({ onCancel, visible }) => {
  const [requests, setRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const storedUserId = JSON.parse(localStorage.getItem("user"));
        const allUsers = await getAllUsers();
        const currentUser = allUsers.find((user) => user.id == storedUserId);
        if (
          currentUser &&
          currentUser.requests &&
          currentUser.requests.length > 0
        ) {
          const filteredUsers = allUsers.filter((user) =>
            currentUser.requests.some((request) => request.id === user.id)
          );

          const updatedRequests = filteredUsers.map((user) => ({
            id: user.id,
            username: user.username,
            profilePicture: user.profilePicture,
          }));

          setCurrentUser(currentUser);
          setRequests(updatedRequests);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const acceptRequest = async (id) => {
    try {
      if (!currentUser || !requests) {
        console.error("Current user or requests not found");
        return;
      }

      const allUsers = await getAllUsers();
      const updatedCurrentUser = { ...currentUser };
      const acceptedUserIndex = requests.findIndex((user) => user.id === id);

      if (acceptedUserIndex === -1) {
        console.error("Accepted user not found in requests");
        return;
      }

      updatedCurrentUser.requests = updatedCurrentUser.requests.filter(
        (request) => request.id !== id
      );

      const updatedAcceptedUser = allUsers.find((user) => user.id === id);

      if (!updatedAcceptedUser) {
        console.error("Accepted user not found");
        return;
      }

      const isAlreadyFollowing = (updatedCurrentUser.followings || []).some(
        (followingId) => followingId === id
      );

      if (!isAlreadyFollowing) {
        updatedCurrentUser.followers.push(id);
      }

      const isAlreadyFollower = (updatedAcceptedUser.followers || []).some(
        (followerId) => followerId === updatedCurrentUser.id
      );

      if (!isAlreadyFollower) {
        updatedAcceptedUser.followings.push(updatedCurrentUser.id);
      }

      await updateUser(updatedCurrentUser.id, {
        requests: updatedCurrentUser.requests,
        followers: updatedCurrentUser.followers,
      });

      await updateUser(updatedAcceptedUser.id, {
        followings: updatedAcceptedUser.followings,
      });

      const updatedRequests = requests.filter((user) => user.id !== id);
      setRequests(updatedRequests);
      setCurrentUser(updatedCurrentUser);

      console.log(`Accepted request with ID: ${id}`);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      const updatedCurrentUser = { ...currentUser };

      updatedCurrentUser.requests = updatedCurrentUser.requests.filter(
        (request) => request.id !== id
      );

      await updateUser(currentUser.id, {
        requests: updatedCurrentUser.requests,
      });

      setRequests(requests.filter((user) => user.id !== id));
      setCurrentUser(updatedCurrentUser);

      console.log(`Rejected request with ID: ${id}`);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const columns = [
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (text) => (
        <img
          src={text}
          alt="Profile"
          style={{ width: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link to={`/user/${record.id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <>
          <Button onClick={() => acceptRequest(id)}>Accept</Button>
          <Button onClick={() => rejectRequest(id)}>Reject</Button>
        </>
      ),
    },
  ];

  return (
    <Modal
      title="Requests"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <Table dataSource={requests} columns={columns} rowKey="id" />
    </Modal>
  );
};

export default Requests;
