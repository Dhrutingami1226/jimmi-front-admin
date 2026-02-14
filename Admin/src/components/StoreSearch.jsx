import React, { useState } from "react";

const StoreSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="store-search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search stores by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-btn">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default StoreSearch;
