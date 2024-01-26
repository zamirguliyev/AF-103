import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getAllUsers } from '../../services/api.js'; 

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        const filteredUsers = usersData.filter(user => !user.isAdmin);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

 

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'isAdmin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (text) => (text ? 'Admin' : 'User'),
    },
  
  ];

  return <Table dataSource={users} columns={columns} />;
};

export default AdminUserList;
