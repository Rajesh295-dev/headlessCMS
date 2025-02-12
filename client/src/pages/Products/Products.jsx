// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import List from "../../components/List/List";
// import useFetch from "../../hooks/useFetch";
// import "./Products.scss";

// const Products = () => {
//   const { id } = useParams(); // Extract category ID from URL
//   const catId = parseInt(id, 10); // Ensure the category ID is an integer
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sort, setSort] = useState(null);
//   const [selectedSubCats, setSelectedSubCats] = useState([]);

//   let query = `/sub-categories?[filters][categories][id][$eq]=${catId}`;

//   const { data, loading, error } = useFetch(query); // Fetch data using the constructed query

//   console.log("products data", data);
//   const handleChange = (e) => {
//     const { value, checked } = e.target;
//     setSelectedSubCats((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   if (loading) return <div className="loading">Loading...</div>;

//   if (error) {
//     return (
//       <div className="error">
//         <h1>Error</h1>
//         <p>Failed to fetch products. Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="products">
//       {/* Filters Sidebar */}
//       <div className="left">
//         {/* Filter by Categories */}
//         <div className="filterItem">
//           <h2>Product Categories</h2>

//           {data?.data?.map((item) => (
//             <div className="inputItem" key={item.id}>
//               <input
//                 type="checkbox"
//                 id={`subCat-${item.id}`}
//                 value={item.id}
//                 onChange={handleChange}
//               />
//               <label htmlFor={`subCat-${item.id}`}>
//                 {item.attributes?.title || "Unnamed Category"}
//               </label>
//             </div>
//           ))}
//         </div>

//         {/* Filter by Price */}
//         <div className="filterItem">
//           <h2>Filter by Price</h2>
//           <div className="inputItem">
//             <span>0</span>
//             <input
//               type="range"
//               min={0}
//               max={1000}
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//             />
//             <span>{maxPrice}</span>
//           </div>
//         </div>

//         {/* Sort by Price */}
//         <div className="filterItem">
//           <h2>Sort by</h2>
//           <div className="inputItem">
//             <input
//               type="radio"
//               id="asc"
//               value="asc"
//               name="sort"
//               onChange={() => setSort("asc")}
//             />
//             <label htmlFor="asc">Price: Low to High</label>
//           </div>
//           <div className="inputItem">
//             <input
//               type="radio"
//               id="desc"
//               value="desc"
//               name="sort"
//               onChange={() => setSort("desc")}
//             />
//             <label htmlFor="desc">Price: High to Low</label>
//           </div>
//         </div>
//       </div>

//       {/* Products List */}
//       <div className="right">
//         <List
//           catId={catId}
//           maxPrice={maxPrice}
//           sort={sort}
//           subCats={selectedSubCats}
//         />
//       </div>
//     </div>
//   );
// };

// export default Products;

import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  // console.log("Full data:", data);

  // Try different ways to access title
  // console.log("First item in data:", data?.[0]); // If data is an array
  // console.log("First item title:", data?.[0]?.title); // If data is an array
  // console.log("Direct title access:", data?.title); // If data is an object

  // console.log("products data", data);

  // console.log("product's title..", data?.title);

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>

          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={`subCat-${item.id}`}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={`subCat-${item.id}`}>
                {item?.title || "Unnamed Category"}
              </label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

export default Products;
