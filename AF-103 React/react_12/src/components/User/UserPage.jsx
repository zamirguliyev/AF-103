import React from 'react';
import { useSelector } from 'react-redux';
import { Descriptions } from 'antd';

const UserPage = () => {
  const userDetails = useSelector((state) => state.user.userDetails);

  if (!userDetails) {
    return <div>User details not available</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Username">{userDetails.username}</Descriptions.Item>
        <Descriptions.Item label="Password">{userDetails.password}</Descriptions.Item>
        <Descriptions.Item label="Is Admin">{userDetails.isAdmin ? 'Yes' : 'No'}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
