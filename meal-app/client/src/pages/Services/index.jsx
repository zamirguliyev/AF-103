import { GiMeatCleaver } from "react-icons/gi";
import "./index.scss";
const Services = () => {
  return (
    <div className="services-container">
      <GiMeatCleaver size={70} />
      <div className="title">
        <span></span>
        <h2 style={{ fontSize: "48px" }}>Our Services</h2>
        <span></span>
      </div>
      <div className="cards">
        <div className="card">
        <GiMeatCleaver size={40}/>
        <h3>Breakfast</h3>
        <p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus rutrum dui fermentum.</p>
        </div>
        <div className="card">
        <GiMeatCleaver size={40}/>
        <h3>Breakfast</h3>
        <p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus rutrum dui fermentum.</p>
        </div>
        <div className="card">
        <GiMeatCleaver size={40}/>
        <h3>Breakfast</h3>
        <p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus rutrum dui fermentum.</p>
        </div>
        <div className="card">
        <GiMeatCleaver size={40}/>
        <h3>Breakfast</h3>
        <p>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Vivamus rutrum dui fermentum.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
