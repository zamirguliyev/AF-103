import './index.scss'
import {Button} from 'antd'
import { removeFromBasket } from '../../service/reducers';
import { useSelector, useDispatch } from "react-redux";


const Basket = () => {
  const dispatch = useDispatch();
  let data = JSON.parse(localStorage.getItem('basket'))
  console.log(data)

  const handleDeleteToBasket = () => {
    dispatch(removeFromBasket(data));
  };
  const basket = useSelector((state) => state.basket.items);

  return (
    <>
      {basket.map((item,id) => {
      return(
        <div key={id} className="basket-container">
        <h2>Basket Page</h2>
        <div className="basket-item">
        <img src={item.img} alt=""/>
        <h3>Title: {item.title}</h3>
        <h4>Price: ${item.price}</h4>
        <p>Quantity: {item.quantity}</p>
        <Button type='primary' danger onClick={handleDeleteToBasket}>Delete</Button>
        </div>
        </div>
      )
      })}
    </>
  )
}

export default Basket