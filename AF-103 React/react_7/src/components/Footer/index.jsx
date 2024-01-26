import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12158.994003742937!2d49.8154458!3d40.3701006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dc397d94dc3%3A0x617bc46b47244c00!2sAzerbaijan%20Technical%20University!5e0!3m2!1str!2saz!4v1700585692477!5m2!1str!2saz"
        width="100%"
        height="480"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="footer-container">
        <div className="icons">
          <div className="icon">
            <FontAwesomeIcon
              icon={faFacebook}
              style={{ color: "#fff", fontSize: "26px" }}
            />
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "#fff", fontSize: "26px" }}
            />
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faGithub}
              style={{ color: "#fff", fontSize: "26px" }}
            />
          </div>
        </div>
        <p>Copyright © Your Website 2023</p>
      </div>
    </>
  );
};

export default Footer;
