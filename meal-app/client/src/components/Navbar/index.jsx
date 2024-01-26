import "./index.scss";
import { FaPhoneAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-nav">
        <div className="logo">
          <h2>
            {" "}
            Pulse<span style={{ color: "orange" }}>.</span>
          </h2>
        </div>

        <div className="links">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to="/welcome">About Us</Link></li>
            <li>Restaurant</li>
            <li>News</li>
            <li>Contact</li>
            <li><Link to={'/add'}>Add</Link></li>
          </ul>
        </div>

        <div className="reserve">
          <span style={{ color: "orange" }}>Reservations</span>
          <FaPhoneAlt />
          652-345 3222 11
        </div>
      </div>
      <div className="navbar-main">
     <div className="text">
     <h1>Food and more. By Chef Francis Smith<span style={{color:'orange'}}> .</span></h1>
      <br/>
      <span style={{marginLeft:'72%',fontSize:'16px'}}>By Chef Francis Smith</span></div>
      </div>
    </div>
  );
};

export default Navbar;
