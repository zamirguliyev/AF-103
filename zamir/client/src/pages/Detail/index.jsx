import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  addToBasket,
  addToWishlist,
  removeFromWishlist,
} from "../../service/reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { Button } from "antd";
import "./index.scss";

let API_URL = "http://localhost:3000/api/biletthree";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id, dispatch]);

  const isItemInWishlist = wishlist.some((item) => item.id === data.id);

  const handleWishlistClick = () => {
    if (isItemInWishlist) {
      dispatch(removeFromWishlist(data));
    } else {
      dispatch(addToWishlist(data));
    }

    const updatedWishlist = isItemInWishlist
      ? wishlist.filter((item) => item.id !== data.id)
      : [...wishlist, data];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket(data));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Detail Page</title>
      </Helmet>
      <div className="detail-container">
        <img src={data.img} alt="" />
        <div className="main">
          <h2>Title: {data.title}</h2>
          <h3>Price: ${data.price}</h3>
          <h3>Meals: {data.meals}</h3>
          <h3>Categories {data.ctg}</h3>
          <div onClick={handleWishlistClick}>
            {isItemInWishlist ? <FaHeart size={40} /> : <CiHeart size={40} />}
          </div>
          <Button onClick={handleAddToBasket}>Add Basket</Button>
        </div>
      </div>
    </>
  );
};

export default Detail;
