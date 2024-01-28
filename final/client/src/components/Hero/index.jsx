import React from "react";
import "./index.scss";
import SliderImg from "../../images/banner_img.png";
import Container from "@mui/material/Container";

import { Carousel } from "antd";
const contentStyle = {
  margin: 0,
  color: "#fff",
  textAlign: "center",
  background: "#ECFDFF",
};

const Hero = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div style={{ backgroundColor: "#2fb0be" }}>
      <Container>
        <Carousel afterChange={onChange} autoplay speed={1000}>
          <div className="hero-container">
            <div className="left">
              <h2>
                Wood& <br /> Cloth Sofa
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur doloremque veritatis
              </p>
              <button>BUY NOW</button>
            </div>
            <div className="right">
              <img src={SliderImg} alt="" />
            </div>
          </div>
          <div className="hero-container">
            <div className="left">
              <h2>
                Wood& <br /> Cloth Sofa
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur doloremque veritatis, aliquam earum incidunt culpa
                suscipit quos dolor qui eos, dicta quia
              </p>
              <button>BUY NOW</button>
            </div>
            <div className="right">
              <img src={SliderImg} alt="" />
            </div>
          </div>
          <div className="hero-container">
            <div className="left">
              <h2>
                Wood& <br /> Cloth Sofa
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur doloremque veritatis, aliquam earum incidunt culpa
                suscipit quos dolor qui eos, dicta quia
              </p>
              <button>BUY NOW</button>
            </div>
            <div className="right">
              <img src={SliderImg} alt="" />
            </div>
          </div>
          <div className="hero-container">
            <div className="left">
              <h2>
                Wood& <br /> Cloth Sofa
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur doloremque veritatis, aliquam earum incidunt culpa
                suscipit quos dolor qui eos, dicta quia
              </p>
              <button>BUY NOW</button>
            </div>
            <div className="right">
              <img src={SliderImg} alt="" />
            </div>
          </div>
        </Carousel>
      </Container>
    </div>
  );
};

export default Hero;
