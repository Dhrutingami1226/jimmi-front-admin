import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p className="address">
            16, Chandrakant Bhavan, Marolnaka, Andheri (East)<br />
            Mumbai 400 059
          </p>
          <p className="email">
            <a href="mailto:info@jimmiburguer.in">info@jimmiburguer.in</a>
          </p>
          <p className="phone">
            <a href="tel:+9184339 58389">+91 84339 58389</a>
          </p>
        </div>

        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            <li><a href="#terms">Terms & Condition</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/jimisburger" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/channel/UCzkelvfQ-6Xw2QQgaEihkCw" target="_blank" rel="noopener noreferrer" title="YouTube">
              <FaYoutube />
            </a>


          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Jimmi Burger. All rights reserved.</p>
        <p>Powered by <strong>Jimmi Burger</strong></p>
      </div>
    </footer>
  );
};

export default Footer;
