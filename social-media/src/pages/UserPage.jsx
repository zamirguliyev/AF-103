import { useState, useEffect } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import EditProfileModal from "./EditProfileModal";
import Followers from "./Followers";
import Followings from "./Followings";
import { Button, Avatar } from "antd";
import { getAllUsers } from "../api/index.js";
import { Link } from "react-router-dom";
import Requests from "./Requests.jsx";

const UserPage = () => {
  let [update, setUpdate] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [followersModal, setFollowersModal] = useState(false);
  const [followingsModal, setFollowingsModal] = useState(false);
  const [requests, setRequests] = useState(false);

  // const handleCancelFollowers = ()=> {
  //   setFollowersModal(false)
  // }
  // const handleCancelFollowings = ()=> {
  //   setFollowingsModal(false)
  // }

  const handleCancelChangePassword = () => {
    setChangePasswordModalVisible(false);
  };

  const handleCancelEditProfile = () => {
    setEditProfileModalVisible(false);
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const allUsers = await getAllUsers();
        const storedUserId = JSON.parse(localStorage.getItem("user"));
        const foundUser = allUsers.find((user) => user.id == storedUserId);
        if (foundUser) {
          setCurrentUser(foundUser);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [update,currentUser]);
  return (
    <div style={{ textAlign: "center", minHeight: "90vh", padding: "20px" }}>
      {currentUser && (
        <>
          <Avatar
            src={currentUser.profilePicture}
            size={200}
            style={{ borderRadius: "50%", margin: "20px auto" }}
          />
          <h2 style={{ marginBottom: "5px" }}>
            {currentUser.isPublic
              ? `${currentUser.fullName} 🔑`
              : `${currentUser.fullName} 🔒`}
          </h2>
          <p style={{ margin: "5px 0" }}>{currentUser.username}</p>
          <p style={{ maxWidth: "300px", margin: "0 auto" }}>{currentUser.bio}</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", margin: "10px 0" }}>
            {currentUser && (
              <>
                <Button>
                  <Link to="/post">Posts: {currentUser.posts.length}</Link>
                </Button>
                <Button onClick={() => setFollowersModal(true)}>
                  Followers: {currentUser.followers.length}
                </Button>
                <Button onClick={() => setFollowingsModal(true)}>
                  Followings: {currentUser.followings.length}
                </Button>
                {!currentUser.isPublic && (
                  <Button onClick={() => setRequests(true)}>
                    Requests: {currentUser.requests.length}
                  </Button>
                )}
              </>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
            <Button onClick={() => setChangePasswordModalVisible(true)}>
              Change Password 🔑
            </Button>
            <Button type="primary" onClick={() => setEditProfileModalVisible(true)}>
              Edit Profile ✏
            </Button>
          </div>
          <div>
            <ChangePasswordModal
              visible={changePasswordModalVisible}
              onCancel={handleCancelChangePassword}
            />
            <EditProfileModal
              visible={editProfileModalVisible}
              onCancel={handleCancelEditProfile}
              setUpdate={setUpdate}
            />
            <Followers
              onCancel={() => setFollowersModal(false)}
              visible={followersModal}
            />
            <Followings
              onCancel={() => setFollowingsModal(false)}
              visible={followingsModal}
            />
            <Requests
              onCancel={() => setRequests(false)}
              visible={requests}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
