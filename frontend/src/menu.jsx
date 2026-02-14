import React, { useState, useEffect, useMemo } from "react";
import "./nav.css";
import "./menu.css";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL; // backend URL from env variables

  useEffect(() => {
    let isMounted = true; // prevent state update if component unmounts

    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/menu`);
        if (!response.ok) throw new Error("Failed to fetch menu");
        const data = await response.json();

        if (isMounted) {
          if (data.success && data.data) {
            setMenus(data.data);
            // reset activeIndex if out of range
            if (activeIndex >= data.data.length) setActiveIndex(0);
          } else {
            setMenus([]);
          }
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMenus(); // initial fetch

    const interval = setInterval(fetchMenus, 10000); // refresh every 10s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [API_URL, activeIndex]);

  // calculate left, center, right slides
  const indices = useMemo(() => {
    if (!menus || menus.length === 0) {
      return { left: null, center: null, right: null };
    }
    const leftIndex = (activeIndex - 1 + menus.length) % menus.length;
    const rightIndex = (activeIndex + 1) % menus.length;
    return {
      left: menus[leftIndex],
      center: menus[activeIndex],
      right: menus[rightIndex],
    };
  }, [activeIndex, menus]);

  if (loading) {
    return <div className="Menu"><p>Loading menu...</p></div>;
  }

  if (error) {
    return <div className="Menu"><p>Error: {error}</p></div>;
  }

  if (!menus || menus.length === 0) {
    return <div className="Menu"><p>No menu items available.</p></div>;
  }

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
          {left && (
            <div className="slide slide-left">
              <img src={left.image} alt={left.name} />
            </div>
          )}
          {center && (
            <div className="slide slide-center">
              <img src={center.image} alt={center.name} />
            </div>
          )}
          {right && (
            <div className="slide slide-right">
              <img src={right.image} alt={right.name} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Menu;
