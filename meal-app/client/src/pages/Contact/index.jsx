import { GiMeatCleaver } from "react-icons/gi";
import "./index.scss";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="form">
        <GiMeatCleaver size={40} />
        <div className="title">
          <span></span>
          <h2 style={{ fontSize: "48px" }}>Contact us</h2>
          <span></span>
        </div>
        <div style={{display:'flex',gap:20}}>
            <input className="input" type="text" placeholder="Name" />
            <input className="input" type="email" placeholder="E-mail" />
        </div>
        <textarea name="desc" id="desc" placeholder="Message" cols="85" rows="10"></textarea>
        <br />
        <button>Send Message</button>
      </div>
      <div className="top">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d97321.00314710215!2d49.826560874157714!3d40.33610434195451!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dc397d94dc3%3A0x617bc46b47244c00!2sAzerbaijan%20Technical%20University!5e0!3m2!1str!2saz!4v1705430817110!5m2!1str!2saz"
          width="100%"
          height={"300px"}
        ></iframe>
      </div>
      <div className="bottom">
        <p>
          Copyright ©2024 All rights reserved | This template is made with 💖 by
          Colorlib
        </p>
      </div>
    </div>
  );
};

export default Contact;
