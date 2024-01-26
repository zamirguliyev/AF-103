import { useState, useEffect } from 'react';
import { getAllUsers, getUser, updateUser } from '../api';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const Feed = () => {
  const [followingPosts, setFollowingPosts] = useState([]);
  const storedUserId = JSON.parse(localStorage.getItem('user'));
  const [followingUsers, setFollowingUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      try {
        if (!storedUserId) {
          return;
        }

        const user = await getUser(storedUserId);

        if (!user || !user.followings || user.followings.length === 0) {
          return;
        }

        setCurrentUser(user);

        const allUsers = await getAllUsers();
        const followingUsers = allUsers.filter((u) => user.followings.includes(u.id));
        setFollowingUsers(followingUsers);

        let posts = [];
        followingUsers.forEach((u) => {
          posts = [...posts, ...u.posts.map((p) => ({ ...p, user: u }))];
        });

        posts.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

        setFollowingPosts(posts);
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    fetchFollowingPosts();
  }, [storedUserId]);

  const handleLikePost = async (postId, updatedLikes) => {
    try {  
      const updatedPosts = followingPosts.map((p) => {
        if (p.id === postId) {
          return { ...p, likes: updatedLikes };
        }
        return p;
      });
  
      setFollowingPosts(updatedPosts);
  
      const postOwner = followingUsers.find((u) => u.posts.some((p) => p.id === postId));
  
      if (postOwner) {
        const updatedPostOwner = {
          ...postOwner,
          posts: postOwner.posts.map((p) => {
            if (p.id === postId) {
              return { ...p, likes: updatedLikes };
            }
            return p;
          }),
        };
  
        await updateUser(postOwner.id, updatedPostOwner);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Following Posts</h2>
      {followingPosts.map((post) => (
        <div key={post.id} style={{ marginBottom: '16px' }}>
          <Card>
            <Link
              to={`/user/${post.user.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                maxWidth: '500px',
                margin: 'auto',
                marginBottom: '10px',
              }}
            >
              <img
                src={post.user.profilePicture}
                alt="Profile"
                style={{ width: 40, height: 40, borderRadius: '50%' ,objectFit:'cover'}}
              />
              <span style={{ fontSize: '20px' }}>{post.user.username}</span>
            </Link>
            <PostCard key={post.id} post={post} onLike={handleLikePost} currentUser={currentUser} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Feed;
