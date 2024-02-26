import React, { useState } from "react";
import "../../src/App.css";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="search-container flex items-center py-4 border-b border-gray-200">
  <label htmlFor="searchInput" className="search-label mr-4">
    Search Products
  </label>
  <input
    type="text"
    id="searchInput"
    placeholder="Search by Title or Description"
    value={searchQuery}
    onChange={handleSearchChange}
    className="search-input border rounded py-1 px-2"
  />
</div>

  );
}

export default Search;
