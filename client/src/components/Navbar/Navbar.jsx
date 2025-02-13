// import React, { useState } from "react";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import SearchIcon from "@mui/icons-material/Search";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { Link } from "react-router-dom";
// import "./Navbar.scss";
// import Cart from "../Cart/Cart";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const products = useSelector((state) => state.cart.products);

//   return (
//     <div className="navbar">
//       <div className="wrapper">
//         <div className="left">
//           <div className="item">
//             <img src="/img/en.png" alt="" />
//             <KeyboardArrowDownIcon />
//           </div>
//           <div className="item">
//             <span>USD</span>
//             <KeyboardArrowDownIcon />
//           </div>

//           <div className="item">
//             <Link className="link" to="/products?category=women">
//               Women
//             </Link>
//           </div>
//           <div className="item">
//             <Link className="link" to="/products?category=men">
//               Men
//             </Link>
//           </div>
//           <div className="item">
//             <Link className="link" to="/products?category=children">
//               Children
//             </Link>
//           </div>
//         </div>

//         <div className="center">
//           <Link className="link" to="/">
//             RajStore
//           </Link>
//         </div>
//         <div className="right">
//           <div className="item">
//             <Link className="link" to="/">
//               Homepage
//             </Link>
//           </div>
//           <div className="item">
//             <Link className="link" to="/">
//               About
//             </Link>
//           </div>
//           <div className="item">
//             <Link className="link" to="/">
//               Contact
//             </Link>
//           </div>
//           <div className="item">
//             <Link className="link" to="/">
//               Stores
//             </Link>
//           </div>
//           <div className="icons">
//             <SearchIcon />
//             <PersonOutlineOutlinedIcon />
//             <FavoriteBorderOutlinedIcon />
//             <div className="cartIcon" onClick={() => setOpen(!open)}>
//               <ShoppingCartOutlinedIcon />
//               <span>{products.length}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       {open && <Cart />}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Cart from "../Cart/Cart";
import useFetch from "../../hooks/useFetch";
import "./Navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.cart.products);

  // Fetch categories from API
  const { data } = useFetch("/categories?populate=*");

  // Update categories state when data is available
  useEffect(() => {
    if (data) {
      setCategories(data); // Extracting 'data' array from API response
    }
  }, [data]);

  console.log("categories", categories);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="/img/en.png" alt="Language" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>USD</span>
            <KeyboardArrowDownIcon />
          </div>

          {/* Dynamically render categories using documentId */}
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="item" key={category.id}>
                <Link className="link" to={`/products/${category.id}`}>
                  {category.title}
                </Link>
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>

        <div className="center">
          <Link className="link" to="/">
            RajStore
          </Link>
        </div>

        <div className="right">
          <div className="item">
            <Link className="link" to="/">
              Homepage
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Contact
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Stores
            </Link>
          </div>

          <div className="icons">
            <SearchIcon />
            <PersonOutlineOutlinedIcon />
            <FavoriteBorderOutlinedIcon />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
