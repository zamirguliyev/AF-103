import "./App.css";
import Products from "./components/Products";
import { useState, useEffect } from "react";
import { getAllData, postUser } from "./request.js";
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';


function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAllData().then((res) => {
      setData(res);
    });
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };


  const handleRegister = async (userData) => {
    try {
      const newUser = await postUser(userData);
      setUser(newUser);
    } catch (error) {
      alert('Try again');
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <Products data={data} isAdmin={user.isAdmin} setData={setData} />
          <Logout handleLogout={handleLogout} />
        </div>
      ) : (
        <div>
          <Login handleLogin={handleLogin} />
          <Register handleRegister={handleRegister} />
        </div>
      )}
    </div>
  );
}

export default App;
