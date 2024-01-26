import "./App.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Welcome from "./components/Welcome";
import Recent from "./components/Recent";
import Click from "./components/Click";
import Footer from "./components/Footer";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`App ${showSidebar ? "sidebar-open" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={showSidebar ? faTimes : faBars} />
      </button>

      <div className="sidebar">
        <h2>Zamir App </h2>
        <ul>
          <li>
            <a href="#hero">Hero</a>
          </li>
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#welcome">Welcome</a>
          </li>
          <li>
            <a href="#recent">Recent</a>
          </li>
          <li>
            <a href="#click">Click</a>
          </li>
          <li>
            <a href="#footer">Footer</a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <Hero />
        <Portfolio />
        <Services />
        <Welcome />
        <Recent />
        <Click />
        <Footer />
      </div>
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowCircleUp} />
        </button>
      )}
    </div>
  );
}

export default App;
