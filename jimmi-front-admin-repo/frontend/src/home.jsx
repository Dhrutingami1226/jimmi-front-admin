import React from "react";
import Carousel from "./carousel.jsx";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Carousel Section */}
      <Carousel />

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to Jimmi's Burger</h1>
        <p>Discover our delicious menu with fresh ingredients and authentic flavors</p>
      </div>
    </div>
  );
};

export default Home;
