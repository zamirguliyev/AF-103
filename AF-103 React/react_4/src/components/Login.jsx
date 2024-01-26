import { useState } from 'react';
import { getAllUser } from '../request.js'; 

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const users = await getAllUser();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        handleLogin(user);
      } else {
        alert('False email && password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Try again');
    }
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      {!showLoginForm ? (
        <button onClick={toggleLoginForm}>Login</button>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
