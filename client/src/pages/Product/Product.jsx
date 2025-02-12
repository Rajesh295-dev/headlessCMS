import React, { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { documentId } = useParams(); // Extract documentId from URL params
  console.log("Product document ID:", documentId); // Debugging

  // Prevent API call if documentId is missing
  if (!documentId) {
    console.error("Error: documentId is undefined or empty!");
  }

  // API request (conditionally used ❌)
  const { data, loading, error } = useFetch(
    documentId
      ? `/products?filters[documentId][$eq]=${documentId}&populate=*`
      : null
  );

  console.log("Fetched Product Data:", data);

  if (loading) return <div className="product">Loading...</div>;
  if (error)
    return (
      <div className="product">
        <h1>Error</h1>
        <p>Failed to load product.</p>
      </div>
    );

  // Ensure data exists and is in the correct format
  const product = Array.isArray(data) ? data[0] : data;
  if (!product) {
    console.warn("No product found");
    return <p>Product not found</p>;
  }

  // Extract properties correctly
  const title = product?.title || "Product Title";
  const price = product?.price || "N/A";
  const desc = product?.desc || "No description available";
  const img = product?.img?.url || null;
  const img2 = product?.img2?.url || null;
  const mainImgUrl = img || "path/to/default/image.jpg";
  const secondImgUrl = img2 || "path/to/default/image.jpg";

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img
            src={mainImgUrl}
            alt={title}
            onClick={() => setSelectedImg("img")}
          />
          <img
            src={secondImgUrl}
            alt={`${title} - Additional`}
            onClick={() => setSelectedImg("img2")}
          />
        </div>
        <div className="mainImg">
          <img
            src={selectedImg === "img2" ? secondImgUrl : mainImgUrl}
            alt="Selected Product"
          />
        </div>
      </div>
      <div className="right">
        <h1>{title}</h1>
        <span className="price">${price}</span>
        <p>{desc}</p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button
          className="add"
          onClick={() =>
            dispatch(
              addToCart({
                id: product.documentId, // Use documentId
                title,
                desc,
                price,
                img: mainImgUrl,
                quantity,
              })
            )
          }
        >
          <AddShoppingCartIcon /> ADD TO CART
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorderIcon /> ADD TO WISH LIST
          </div>
          <div className="item">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
