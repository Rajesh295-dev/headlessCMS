import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";

const Products = () => {
  const catId = parseInt(useParams().id);
  //console.log("catId", catId);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  // const { data } = useFetch(
  //   categoryName
  //     ? `/products?populate[0]=categories&filters[categories][title][$eq]=${categoryName}`
  //     : null
  // );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  //console.log("Full data:", data);

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

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import List from "../../components/List/List";
// import useFetch from "../../hooks/useFetch";
// import "./Products.scss";

// const Products = () => {
//   const catId = parseInt(useParams().id);

//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sort, setSort] = useState(null);
//   const [selectedSubCats, setSelectedSubCats] = useState([]);

//   const { data } = useFetch(
//     `/sub-categories?[filters][categories][id][$eq]=${catId}`
//   );

//   console.log("catDataaaa", data);

//   // Ensure data is an array before mapping
//   const subCategories = data?.data || [];

//   const handleChange = (e) => {
//     const value = e.target.value;
//     const isChecked = e.target.checked;
//     setSelectedSubCats(
//       isChecked
//         ? [...selectedSubCats, value]
//         : selectedSubCats.filter((item) => item !== value)
//     );
//   };

//   return (
//     <div className="products">
//       <div className="left">
//         <div className="filterItem">
//           <h2>Product Categories</h2>
//           {subCategories.length > 0 ? (
//             subCategories.map((item) => (
//               <div className="inputItem" key={item.id}>
//                 <input
//                   type="checkbox"
//                   id={`subCat-${item.id}`}
//                   value={item.documentId}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor={`subCat-${item.id}`}>
//                   {item.title || "Unnamed Category"}
//                 </label>
//               </div>
//             ))
//           ) : (
//             <p>Loading categories...</p>
//           )}
//         </div>
//         <div className="filterItem">
//           <h2>Filter by price</h2>
//           <div className="inputItem">
//             <span>0</span>
//             <input
//               type="range"
//               min={0}
//               max={1000}
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//             />
//             <span>{maxPrice}</span>
//           </div>
//         </div>
//         <div className="filterItem">
//           <h2>Sort by</h2>
//           <div className="inputItem">
//             <input
//               type="radio"
//               id="asc"
//               value="asc"
//               name="price"
//               checked={sort === "asc"}
//               onChange={() => setSort("asc")}
//             />
//             <label htmlFor="asc">Price (Lowest first)</label>
//           </div>
//           <div className="inputItem">
//             <input
//               type="radio"
//               id="desc"
//               value="desc"
//               name="price"
//               checked={sort === "desc"}
//               onChange={() => setSort("desc")}
//             />
//             <label htmlFor="desc">Price (Highest first)</label>
//           </div>
//         </div>
//       </div>
//       <div className="right">
//         <img
//           className="catImg"
//           src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
//           alt="Category"
//         />
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

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import List from "../../components/List/List";
// import useFetch from "../../hooks/useFetch";
// import "./Products.scss";

// const Products = () => {
//   const { id } = useParams(); // Get category id from URL
//   const catId = parseInt(id, 10); // Convert to integer safely

//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sort, setSort] = useState(null);
//   const [selectedSubCats, setSelectedSubCats] = useState([]);

//   // // Fetch subcategories using category id
//   // const { data } = useFetch(
//   //   catId ? `/sub-categories?[filters][categories][id][$eq]=${catId}` : null
//   // );

//   // console.log("Fetched Subcategories:", data);

//   // Fetch subcategories using category id
//   const { data } = useFetch(
//     catId ? `/sub-categories?[filters][categories][id][$eq]=${catId}` : null
//   );

//   console.log("Fetched Subcategories:", data?.data);

//   // Extract subcategories correctly
//   const subCategories = data?.data || [];

//   const handleChange = (e) => {
//     const value = e.target.value;
//     const isChecked = e.target.checked;

//     setSelectedSubCats(
//       isChecked
//         ? [...selectedSubCats, value]
//         : selectedSubCats.filter((item) => item !== value)
//     );
//   };

//   return (
//     <div className="products">
//       <div className="left">
//         <div className="filterItem">
//           <h2>Product Categories</h2>
//           {subCategories.length > 0 ? (
//             subCategories.map((item) => (
//               <div className="inputItem" key={item.id}>
//                 <input
//                   type="checkbox"
//                   id={`subCat-${item.id}`}
//                   value={item.id}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor={`subCat-${item.id}`}>
//                   {item.title || "Unnamed Category"}
//                 </label>
//               </div>
//             ))
//           ) : (
//             <p>Loading categories...</p>
//           )}
//         </div>
//         <div className="filterItem">
//           <h2>Filter by price</h2>
//           <div className="inputItem">
//             <span>0</span>
//             <input
//               type="range"
//               min={0}
//               max={1000}
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//             />
//             <span>{maxPrice}</span>
//           </div>
//         </div>
//         <div className="filterItem">
//           <h2>Sort by</h2>
//           <div className="inputItem">
//             <input
//               type="radio"
//               id="asc"
//               value="asc"
//               name="price"
//               checked={sort === "asc"}
//               onChange={() => setSort("asc")}
//             />
//             <label htmlFor="asc">Price (Lowest first)</label>
//           </div>
//           <div className="inputItem">
//             <input
//               type="radio"
//               id="desc"
//               value="desc"
//               name="price"
//               checked={sort === "desc"}
//               onChange={() => setSort("desc")}
//             />
//             <label htmlFor="desc">Price (Highest first)</label>
//           </div>
//         </div>
//       </div>
//       <div className="right">
//         <img
//           className="catImg"
//           src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
//           alt="Category"
//         />
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
