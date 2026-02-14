import React, { useState, useEffect, useMemo } from "react";
import "./nav.css";
import "./menu.css";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const API_URL = "https://jimmi-backend.onrender.com/api/menu"; // manual API

  useEffect(() => {
    let isMounted = true;

    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch menu");
        const data = await response.json();

        if (isMounted) {
          if (data.success && data.data) {
            setMenus(data.data);
            if (activeIndex >= data.data.length) setActiveIndex(0);
          } else {
            setMenus([]);
          }
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMenus(); 
    const interval = setInterval(fetchMenus, 5000); // auto-refresh every 5s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeIndex]);

  const indices = useMemo(() => {
    if (!menus || menus.length === 0) return { left: null, center: null, right: null };
    const leftIndex = (activeIndex - 1 + menus.length) % menus.length;
    const rightIndex = (activeIndex + 1) % menus.length;
    return {
      left: menus[leftIndex],
      center: menus[activeIndex],
      right: menus[rightIndex],
    };
  }, [activeIndex, menus]);

  if (loading) return <div className="Menu"><p>Loading menu...</p></div>;
  if (error) return <div className="Menu"><p>Error: {error}</p></div>;
  if (!menus || menus.length === 0) return <div className="Menu"><p>No menu items available.</p></div>;

  const { left, center, right } = indices;

  return (
    <>
      <div className="Menu">
        <nav className="menu-nav">
          <ul>
            {menus.map((menu, index) => (
              <li key={menu.id}>
                <button
                  className={activeIndex === index ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                >
                  {menu.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section className="triple-carousel">
        <div className="carousel-stage">
          {left && <div className="slide slide-left"><img src={left.image} alt={left.name} /></div>}
          {center && <div className="slide slide-center"><img src={center.image} alt={center.name} /></div>}
          {right && <div className="slide slide-right"><img src={right.image} alt={right.name} /></div>}
        </div>
      </section>
    </>
  );
};

export default Menu;
