import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./assets/jimmi.png";
import "./nav.css";
import Menu from "./menu"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at top
      if (currentScrollY < 100) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Show navbar when scrolling up
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`navbar-bg ${isVisible ? "visible" : "hidden"}`}></div>

      <nav className={`navbar ${isVisible ? "visible" : "hidden"}`}>
        <ul className="nav-left desktop-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/menu">Menu</Link></li>
        </ul>

        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <ul className="nav-right desktop-menu">
          <li><Link to="/franchise">Franchise</Link></li>
          <li><Link to="/store-locator">Store Locator</Link></li>
        </ul>

        <div className="menu-toggle" onClick={toggleMenu}>
          <FaBars />
        </div>

        <ul className={`mobile-nav ${isOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link></li>
          <li><Link to="/franchise" onClick={() => setIsOpen(false)}>Franchise</Link></li>
          <li><Link to="/store-locator" onClick={() => setIsOpen(false)}>Store Locator</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
