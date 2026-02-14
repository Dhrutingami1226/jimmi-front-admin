import React from "react";
import "./about.css";
import aboutImg from "./assets/aboutus.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About JIMIS BURGER</h1>
        <p className="tagline">You are what you eat...</p>
      </div>

      <div className="about-content">
        <div className="about-image">
          <img src={aboutImg} alt="Jimis Burger Cart" />
        </div>

        <div className="about-text">
          <section className="about-section">
            <h2>Our Journey</h2>
            <p>
              We started our journey on a cart back in Sangli in 2012! With your continued love and support, we have improved and grown to what we are today.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Founder</h2>
            <p>
              Jimis Burger is the dream project of Jimmy Bhore, a burger addict and music enthusiast! He is also the lead singer of Metal band, Zygnema. You can sense its vibe in all the outlets.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Philosophy</h2>
            <p>
              We strongly believe better ingredients make better food, and that's our mantra. We strive to bring a smile to all our patrons with juicy burgers and the best hospitality. Enough about us, all YOU need in life right now is a Killer Burger and some Rock & Roll.
            </p>
          </section>
        </div>
      </div>

      <div className="about-values">
        <div className="value-card">
          <h3>🎸 Rock & Roll Vibe</h3>
          <p>Feel the music in every bite</p>
        </div>
        <div className="value-card">
          <h3>🍔 Quality Ingredients</h3>
          <p>Better ingredients, better food</p>
        </div>
        <div className="value-card">
          <h3>😊 Hospitality First</h3>
          <p>Your smile is our reward</p>
        </div>
      </div>
    </div>
  );
};

export default About;
