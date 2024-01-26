import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import './index.scss'

const Navbar = () => {

    const wishlist = useSelector((state) => state.wishlist.items);
    const basket = useSelector((state) => state.basket.items);

    return (
        <div className="navbar-container">
            <div className="logo">Salam</div>
            
            <div className="links">
                <ul>
                    <li><Link to={'/wishlist'}>Wishlist</Link><span>{wishlist.length}</span> </li>
                    <li><Link to={'/basket'}>Basket</Link><span>{basket.length}</span> </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
