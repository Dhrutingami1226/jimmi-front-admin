import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./nav.jsx";
import Home from "./home.jsx";
import About from "./about.jsx";
import Menu from "./menu.jsx";
import StoreLocator from "./storelocator.jsx";
import FranchiseForm from "./franchiseform.jsx";
import Footer from "./footer.jsx";

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/franchise" element={<FranchiseForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
