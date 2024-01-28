import React, { useEffect, useState } from "react";
import "./index.scss";
import Container from "@mui/material/Container";
let API_URL = "http://localhost:3000/api/final";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { Button } from "antd";
import {
  addToBasket,
  addToWishlist,
  removeFromWishlist,
} from "../../service/reducers/index";

const Awesome = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [data]);

  const isItemInWishlist = wishlist.some((item) => item.id === data.id);

  const handleWishlistClick = (data) => {
    if (isItemInWishlist) {
      dispatch(removeFromWishlist(data));
      window.alert("Deleted Wishlist");
    } else {
      dispatch(addToWishlist(data));
      window.alert("Added Wishlist");
    }

    const updatedWishlist = isItemInWishlist
      ? wishlist.filter((item) => item.id !== data.id)
      : [...wishlist, data];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToBasket = (data) => {
    dispatch(addToBasket(data));
    window.alert("Added Basket");
  };

  return (
    <Container>
      <div className="awesome-container">
        <div className="top">
          <h2>Awesome</h2>
          <h3>Shop</h3>
        </div>

        <div className="post-container">
          {data.map((post) => (
            <div className="cont">
              <div key={post._id} className="post-item">
                <img src={post.img} alt={post.title} />
                <h3>
                  <Link className="title" to={`/product/${post._id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p>${post.price}</p>
                <div className="buttons">
                  <Button onClick={() => handleAddToBasket(post)}>
                    Add Basket
                  </Button>
                  <div onClick={() => handleWishlistClick(post)}>
                    {isItemInWishlist ? (
                      <FaHeart size={30} />
                    ) : (
                      <CiHeart size={30} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Awesome;
