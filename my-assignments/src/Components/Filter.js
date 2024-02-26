import React, { useState } from "react";
import "../../src/App.css";

function FilterComponent({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange({
      category: event.target.value,
      minPrice,
      maxPrice,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="filter-component flex justify-between items-center py-4 border-b border-gray-200">
    <div className="flex items-center">
      <label className="mr-4">Category:</label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border rounded py-1 px-2"
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  
    <div className="flex items-center">
      <label className="mr-4">Price Range:</label>
      <div className="price-inputs flex">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="border rounded py-1 px-2 mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="border rounded py-1 px-2"
        />
      </div>
    </div>
  </div>
  
  );
}

export default FilterComponent;
