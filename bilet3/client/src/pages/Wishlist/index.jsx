import './index.scss'
import {Button} from 'antd'
import { removeFromWishlist } from '../../service/reducers';
import { useSelector, useDispatch } from "react-redux";


const Wishlist = () => {
  const dispatch = useDispatch();
  let data = JSON.parse(localStorage.getItem('wishlist'))
  console.log(data)

  const handleDeleteToWishlist = () => {
    dispatch(removeFromWishlist(data));
  };
  const wishlist = useSelector((state) => state.wishlist.items);

  return (
    <>
      {wishlist.map((item,id) => {
      return(
        <div key={id} className="basket-container">
        <h2>Wishlist Page</h2>
        <div className="basket-item">
        <img src={item.img} alt=""/>
        <h3>Title: {item.title}</h3>
        <h4>Price: ${item.price}</h4>
        <Button type='primary' danger onClick={handleDeleteToWishlist}>Delete Wishlist</Button>
        </div>
        </div>
      )
      })}
    </>
  )
}

export default Wishlist