import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../api/index.js";
import { Button, Row, Col, Card,  Avatar, Typography } from "antd";
const { Text } = Typography;

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);
  const [currentUserFollowingUsers, setCurrentUserFollowingUsers] = useState([]);
  const storedUserId = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchCurrentUserFollowings = async () => {
      try {
        const currentUserData = await getUser(storedUserId);
        if (currentUserData) {
          setCurrentUserFollowings(currentUserData.followings || []);
        }
      } catch (error) {
        console.error("Error fetching current user's followings:", error);
      }
    };

    fetchCurrentUserFollowings();
  }, [storedUserId]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const followingUserPromises = currentUserFollowings.map((followingId) => getUser(followingId));
        const followingUsers = await Promise.all(followingUserPromises);
        setCurrentUserFollowingUsers(followingUsers);
      } catch (error) {
        console.error("Error fetching following users:", error);
      }
    };

    fetchFollowingUsers();
  }, [currentUserFollowings]);


  return (
    <div>
      {user && (
        <Row justify="center">
          <Col span={16}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column', gap:'20px',margin:'20px 0'}}>
              <Avatar src={user.profilePicture} size={200} />
              <h2>
                {user.isPublic
                  ? user.fullName + " 🔑"
                  : user.fullName + " 🔒"}
              </h2>
              <p>{user.username}</p>
              <p>{user.bio}</p>
              <div>
                <Button>{user.posts.length} Posts</Button>
                <Button>{user.followers.length} Followers</Button>
                <Button>{user.followings.length} Followings</Button>
              </div>
              {(user.isPublic || currentUserFollowingUsers.some((followingUser) => followingUser.id === id)) && (
                <div style={{display:'flex', flexWrap:'wrap', gap:'20px', margin:'30px 0',justifyContent:'center', alignItems:'center'}}>
                  {user.posts.map((post) => (
                    <div key={post.id}>
                      <Card
                        hoverable
                        style={{ width: 200 }}
                        cover={<img alt="post" src={post.imageURL} style={{ width: "100%", height: 200 }} />}
                      >
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                          <div>
                            <Text strong>{post.title}</Text>
                            <p style={{ fontSize: "10px" }}>{post.createDate}</p>
                          </div>
                         
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
              {!user.isPublic && !currentUserFollowingUsers.some((followingUser) => followingUser.id === id) && (
                <p style={{textAlign:'center'}}>This is a private profile, and you dont follow this user.</p>
              )}
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserDetail;
