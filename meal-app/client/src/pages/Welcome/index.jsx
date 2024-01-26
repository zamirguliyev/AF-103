import "./index.scss";
import { GiMeatCleaver } from "react-icons/gi";
import Sign from '../../images/sign.png'

const Welcome = () => {
  return (
    <div className="welcome-container">
      <GiMeatCleaver size={70} />
      <div className="title">
        <span></span>
        <h2 style={{ fontSize: "48px" }}>Welcome</h2>
        <span></span>
      </div>
      <div className="items">
        <div className="card">
          <h3>2002</h3>
          <p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus
          rutrum dui fermentum eros hendrerit, id lobortis leo volutpat.</p>
        </div>
        <div className="card">
          <h3>2002</h3>
          <p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus
          rutrum dui fermentum eros hendrerit, id lobortis leo volutpat.</p>
        </div>
        <div className="card">
          <h3>2002</h3>
          <p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus
          rutrum dui fermentum eros hendrerit, id lobortis leo volutpat.</p>
        </div>
      </div>
      <img src={Sign} alt=""/>
    </div>
  );
};

export default Welcome;
