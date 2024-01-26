import "./index.scss";
import { Button } from "antd";
import { addToBasket, removeFromBasket } from "../../service/reducers";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

const Basket = () => {
  const dispatch = useDispatch();
  let data = JSON.parse(localStorage.getItem("basket"));
  console.log(data);

  const handleDeleteToBasket = () => {
    dispatch(removeFromBasket(data));
  };
  const handleAddToBasket = () => {
    dispatch(addToBasket(data));
  };
  const basket = useSelector((state) => state.basket.items);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Basket Page</title>
      </Helmet>
      <h2 style={{ textAlign: "center" }}>Basket Page</h2>
      {basket.map((item, id) => {
        return (
          <div key={id} className="basket-container">
            <div className="basket-item">
              <img src={item.img} alt="" />
              <h3>Title: {item.title}</h3>
              <h4>Price: ${item.price}</h4>
              <p>Quantity: {item.quantity}</p>
              <div style={{ display: "flex", gap: "20px" }}>
                <Button type="primary" onClick={handleAddToBasket}>
                  +
                </Button>
                <Button type="primary" danger onClick={handleDeleteToBasket}>
                  -
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Basket;
