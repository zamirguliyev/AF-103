/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Input, Avatar, Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { getAllUsers, updateUser } from "../api/index.js";
import Swal from "sweetalert2";

const { Item } = Menu;

const Navbar = () => {
  const [current, setCurrent] = useState("home");
  const [searchValue, setSearchValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.user?.id);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userFollowStatus, setUserFollowStatus] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const allUsers = await getAllUsers();
        const users = allUsers.filter((user) =>
          user.username.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFoundUsers(users);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (isLoggedIn && userId && searchValue != "") {
      fetchUser();
    } else {
      setFoundUsers([]);
    }
  }, [isLoggedIn, userId, searchValue]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const storedUserId = JSON.parse(localStorage.getItem("user"));
        if (storedUserId) {
          const allUsers = await getAllUsers();
          const found = allUsers.find((user) => user.id === storedUserId);
          setCurrentUser(found);

          if (found) {
            setIsAdmin(found.isAdmin);
          }
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = async (value) => {
    try {
      const allUsers = await getAllUsers();
      const users = allUsers.filter((user) =>
        user.username.toLowerCase().trim().includes(value.toLowerCase().trim())
      );
      setFoundUsers(users);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const updateCurrentUser = async (currentUser, updatedUser) => {
    try {
      await updateUser(currentUser.id, updatedUser);
      console.log("Current user updated successfully");
    } catch (error) {
      console.error("Error updating current user:", error);
    }
  };

  const updateFollowedUser = async (followedUser, updatedFollowedUser) => {
    try {
      await updateUser(followedUser.id, updatedFollowedUser);
      console.log("Followed user updated successfully");
    } catch (error) {
      console.error("Error updating followed user:", error);
    }
  };

  const handleFollow = async (followedUserId, isPublic) => {
    try {
      const currentUserCopy = { ...currentUser };
      const followedUser = foundUsers.find((user) => user.id == followedUserId);

      const isAlreadyFollowing = currentUserCopy.followings.find(
        (id) => id == followedUserId
      );

      if (isPublic) {
        if (isAlreadyFollowing) {
          currentUserCopy.followings = currentUserCopy.followings.filter(
            (id) => id != followedUserId
          );
          followedUser.followers = followedUser.followers.filter(
            (id) => id != currentUser.id
          );
        } else {
          currentUserCopy.followings.push(followedUserId);
          followedUser.followers.push(currentUser.id);
          followedUser.requests = followedUser.requests.filter(
            (request) => request.id !== currentUser.id
          );
        }
      } else {
        const hasSentRequest = followedUser.requests.find(
          (request) => request.id == currentUser.id
        );

        if (hasSentRequest) {
          Swal.fire({
            icon: "warning",
            title: "Request Sent",
            text: "Your follow request has already been sent!",
            confirmButtonText: "OK",
          });
          return;
        }

        followedUser.requests.push({
          id: currentUser.id,
          username: currentUser.username,
        });

        Swal.fire({
          icon: "info",
          title: "Request Sent",
          text: "Your follow request has been sent!",
          confirmButtonText: "OK",
        });
      }

      await updateCurrentUser(currentUser, currentUserCopy);
      await updateFollowedUser(followedUser, followedUser);
    } catch (error) {
      console.error("Error handling follow:", error);
    }
  };

  const filteredUsers = foundUsers.filter(
    (user) => !user.isAdmin && user.id != currentUser.id
  );

  const menu = (
    <Menu
      style={{
        width: "300px",
        height: "200px",
        marginLeft: "-250px",
        marginTop: "10px",
        overflowY: "scroll",
      }}
    >
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <Item key={user.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link
                to={`/user/${user.id}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src={user.profilePicture}
                  size={50}
                  style={{ borderRadius: "50%" }}
                />
                <div
                  style={{ marginLeft: "10px", display: "flex", gap: "10px" }}
                >
                  <p>{user.username}</p>
                  <p>{user.isPublic ? "🔑" : "🔒"}</p>
                </div>
              </Link>

              <Button
                type="primary"
                onClick={() => handleFollow(user.id, user.isPublic)}
              >
                {userFollowStatus[user.id] || "Follow"}
              </Button>
            </div>
          </Item>
        ))
      ) : (
        <Item key="no-user">No users found</Item>
      )}
    </Menu>
  );

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {!isLoggedIn && (
        <Item key="home">
          <Link to="/">Home</Link>
        </Item>
      )}
      {isLoggedIn ? (
        <>
          {isAdmin ? (
            <>
              <Item key="users">
                <Link to="/users">Users</Link>
              </Item>
              <Item key="user">
                <Link to="/user">User</Link>
              </Item>
            </>
          ) : (
            <>
              <Item key="feed">
                <Link to="/feed">Feed</Link>
              </Item>
              <Item key="user">
                <Link to="/user">User</Link>
              </Item>
              <Item key="post">
                <Link to="/post">Post</Link>
              </Item>
            </>
          )}

          <Item key="logout" onClick={handleLogout}>
            Logout
          </Item>
          <Item key="search" style={{ width: 270, margin: "0 auto" }}>
            <Input
              style={{ marginRight: "5px", width: "200px" }}
              placeholder="Search username"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearch(e.target.value);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              visible={showDropdown && foundUsers.length > 0}
            >
              <Input
                style={{
                  visibility: "hidden",
                  width: "0",
                  padding: "0",
                  border: "none",
                }}
              />
            </Dropdown>
          </Item>
        </>
      ) : (
        <>
          <Item key="login">
            <Link to="/login">Login</Link>
          </Item>
          <Item key="register">
            <Link to="/register">Register</Link>
          </Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
