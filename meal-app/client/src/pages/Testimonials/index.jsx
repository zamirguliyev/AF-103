import { GiMeatCleaver } from "react-icons/gi";
import "./index.scss";

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <GiMeatCleaver size={70} />
      <div className="title">
        <span></span>
        <h2 style={{ fontSize: "48px" }}>Testimonials</h2>
        <span></span>
      </div>
      <div className="text">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo veniam
          ad, repudiandae exercitationem placeat aut nesciunt, odit numquam
          veritatis repellendus laborum. Molestias nesciunt aliquid obcaecati.
          Dolor obcaecati eligendi laudantium atque ut quaerat. Cum, soluta
          quibusdam? Impedit fugiat id laboriosam aspernatur!
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
