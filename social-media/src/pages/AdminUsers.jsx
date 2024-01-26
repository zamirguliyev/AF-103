import { Table, Button, Space, message } from 'antd';
import { getAllUsers, deleteUser } from '../api/index.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const filteredUsers = allUsers.filter(user => !user.isAdmin); 
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      
      setUsers(users.filter(user => user.id !== userId));
      
      message.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user!');
    }
  };

  const columns = [
    {
      title: 'Profile Picture',
      dataIndex: 'profilePicture',
      key: 'profilePicture',
      render: (text) => <img src={text} alt="Profile" style={{ width: '50px',height:50, borderRadius: '50%' }} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link to={`/user/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
          <Button>Ban</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>All Users</h2>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 500, y: 300 }}
        align="center"
      />
    </div>
  );
};

export default AdminUsers;
