import React from "react";
import "./index.scss";
import Container from "@mui/material/Container";

const Subcription = () => {
  return (
    <div className="sub-container">
      <Container>
        <div className="sub">
          <p>Join Our NewsLetters</p>
          <h3>Subscribe to get Updated with new offers</h3>
          <div className="form">
            <input type="text" placeholder="Enter Email Address" />
            <button>Subcribe Now</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Subcription;
