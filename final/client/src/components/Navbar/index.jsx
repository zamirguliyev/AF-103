import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.scss";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Container from "@mui/material/Container";

import Logo from "../../images/logo.png";

const Navbar = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const basket = useSelector((state) => state.basket.items);

  return (
    <Container>
      <div className="navbar-container">
        <div className="hamburger">
          <RxHamburgerMenu size={25} />
        </div>
        <div className="logo">
          <Link to={"/"}>
            {" "}
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Shop</li>
            <li>Pages</li>
            <li>Blog</li>
            <li>
              <Link to={"/add"}>Add</Link>
            </li>
          </ul>
        </div>
        <div className="icons">
          <CiSearch size={25} />
          <Link to={"/wishlist"}>
            {" "}
            <FaRegHeart size={20} />
            <span>({wishlist.length})</span>
          </Link>
          <Link to={"/basket"}>
            <FaShoppingCart size={20} />
            <span>({basket.length})</span>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
