import React from "react";
import "./index.scss";
import Container from "@mui/material/Container";

import Best from "../../images/product_2.png";

const BestSeller = () => {
  return (
    <Container>
      <div className="best-container">
        <div className="top">
          <h2>Best Seller</h2>
          <h3>Shop</h3>
        </div>

        <div className="best2-container">
          <div className="best-item">
            <img src={Best} alt="" />
            <h3>Qurartz Belt Watch</h3>
            <p>$150.00</p>
          </div>
          <div className="best-item">
            <img src={Best} alt="" />
            <h3>Qurartz Belt Watch</h3>
            <p>$150.00</p>
          </div>
          <div className="best-item">
            <img src={Best} alt="" />
            <h3>Qurartz Belt Watch</h3>
            <p>$150.00</p>
          </div>
          <div className="best-item">
            <img src={Best} alt="" />
            <h3>Qurartz Belt Watch</h3>
            <p>$150.00</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BestSeller;
