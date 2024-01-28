import React from "react";
import "./index.scss";
import Container from "@mui/material/Container";
import Logo from "../../images/client_logo_3.png";

const TopFooter = () => {
  return (
    <Container>
      <div className="top-footer-container">
        <div className="top">
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
          <div className="item">
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopFooter;
