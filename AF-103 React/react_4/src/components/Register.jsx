import { useState } from 'react';

const Register = ({ handleRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRegister({ name, email, password, isAdmin });
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };  

  return (
    <div>
    {!showRegisterForm ? (<button onClick={handleRegisterClick}>Register</button>) : (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>
            Admin?
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      </div>
    )}
  </div>
  );
};

export default Register;
