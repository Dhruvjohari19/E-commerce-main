import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../src/App.css";

function ProductDetails() {
  const { productId } = useParams();
  const location = useLocation();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (location.state && location.state.productDetails) {
      setProductDetails(location.state.productDetails);
    } else {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(
            `https://dummyjson.com/products/${productId}`
          );
          const data = await response.json();
          setProductDetails(data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [productId, location.state]);

  if (!productDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
      <div className="product-details-column">
  <h2 className="font-bold text-2xl mb-2">{productDetails.title}</h2>
  <p className="text-gray-700 text-base mb-4">{productDetails.description}</p>
  <p className="text-gray-700 text-lg">Price: ${productDetails.price}</p>
</div>
<p>Product Dimensions</p>
<div className="product-images-column flex justify-center items-center space-x-4 shadow-md">
   {productDetails?.images &&
    productDetails?.images.length > 0 &&
    productDetails?.images?.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`${productDetails.title} - Image ${index + 1}`}
        className="product-image w-32 h-auto rounded-lg"
      />
    ))}
</div>

      </div>
    </div>
  );
}

export default ProductDetails;
