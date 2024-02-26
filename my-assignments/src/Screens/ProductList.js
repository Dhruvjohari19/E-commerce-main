import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import FilterComponent from "../Components/Filter";
import Search from "../Components/Search";
import CartPage from "./CartPage";
import Modal from "react-modal";
import Navbar from "../Components/Navbar";

const ProductList = () =>  {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ]);
  const [viewCart, setViewCart] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
  });
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [addedProductIds, setAddedProductIds] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (newFilterCriteria) => {
    setFilterCriteria(newFilterCriteria);
    applyFilter(newFilterCriteria);
  };

  const applyFilter = ({ category, minPrice, maxPrice }) => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (minPrice !== "" && !isNaN(minPrice)) {
      filtered = filtered.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice !== "" && !isNaN(maxPrice)) {
      filtered = filtered.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder((prevOrder) =>
      criteria === sortCriteria ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const compareValue = sortOrder === "asc" ? 1 : -1;
    const propA = a[sortCriteria];
    const propB = b[sortCriteria];

    if (sortCriteria === "price") {
      return (propA - propB) * compareValue;
    } else if (sortCriteria === "name") {
      const nameA = propA || "";
      const nameB = propB || "";
      return nameA.localeCompare(nameB) * compareValue;
    }

    return 0;
  });

  const searchedAndSortedProducts = sortedProducts.filter((product) => {
    const productName = (product.name || "").toLowerCase();
    const productDescription = (product.description || "").toLowerCase();
    const query = searchedQuery.toLowerCase();
    return productName.includes(query) || productDescription.includes(query);
  });

  const handleAddToCard = (productId) => {
    setAddedProductIds((prevIds) => [...prevIds, productId]);
  };

  const handleProceed = (totalQuantity) => {
    console.log("Total Quantity:", totalQuantity);
  };

  return (
    <div>
      <Navbar onClick={() => setViewCart(true)} />
      <Search onSearch={setSearchedQuery} />
      <FilterComponent
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <div className="mx-auto px-4 md:px-8 max-w-screen-lg">
        <div className="flex items-center justify-between my-4">
          <label className="mr-2">Sort by:</label>
          <select
            value={sortCriteria}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded py-1 px-2"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <button
            onClick={() => handleSortChange(sortCriteria)}
            className="ml-2 border rounded py-1 px-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            Asc
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(searchedAndSortedProducts) &&
          searchedAndSortedProducts.length > 0 ? (
            searchedAndSortedProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
                onAddToCard={handleAddToCard}
              />
            ))
          ) : (
            <p className="text-center">No products available</p>
          )}
        </div>
      </div>
      <div>
        {viewCart && (
          <Modal
            isOpen={viewCart}
            onRequestClose={() => setViewCart(false)}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                transform: "translate(-50%, -50%)",
                overflowY: "scroll",
              },
            }}
          >
            <CartPage
              addedProductIds={addedProductIds}
              products={products}
              onProceed={handleProceed}
            />
            <button
              onClick={() => setViewCart(false)}
              className="border rounded py-1 px-2 bg-red-500 text-white hover:bg-red-600"
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ProductList;
