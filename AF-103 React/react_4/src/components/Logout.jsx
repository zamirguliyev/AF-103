
const Logout = ({ handleLogout }) => {
  
  const handleLogoutClick = () => {
    handleLogout(); 
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Logout;
