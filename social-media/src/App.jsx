import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import AdminUsers from "./pages/AdminUsers";
import Feed from "./pages/Feed";
import Navbar from "./components/Navbar";
import { selectIsLoggedIn } from "./redux/slices/userSlice";
import MyFooter from "./components/Footer";
import Home from "./pages/Home";
import Post from "./pages/Post";
import UserDetail from "./pages/UserDetail";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Router>
      <Navbar showHome={!isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {isLoggedIn ? (
          <>
            <Route path="/feed" element={<Feed />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/post" element={<Post />} />
            <Route path="/users" element={<AdminUsers />} />
          </>
        ) : (
          <>
            <Route path="/feed" element={<Navigate to="/login" />} />
            <Route path="/admin" element={<Navigate to="/login" />} />
            <Route path="/users" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <MyFooter />
    </Router>
  );
}

export default App;
