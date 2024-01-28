import React from "react";
import "./index.scss";
import Container from "@mui/material/Container";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <Container>
      <div className="footer-container">
        <div className="center">
          <div className="center-item">
            <h3>Top Product</h3>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
          </div>
          <div className="center-item">
            <h3>Top Product</h3>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
          </div>
          <div className="center-item">
            <h3>Top Product</h3>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
          </div>
          <div className="center-item">
            <h3>Top Product</h3>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
          </div>
          <div className="center-item">
            <h3>Top Product</h3>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
            <p>Managed Website</p>
          </div>
        </div>
        <div className="bootom">
          <p>
            Copyright ©2024 All rights reserved | This template is made with ❤
            by Colorlib
          </p>
          <div className="icons">
            <FaFacebook size={20} />
            <FaFacebook size={20} />
            <FaFacebook size={20} />
            <FaFacebook size={20} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
