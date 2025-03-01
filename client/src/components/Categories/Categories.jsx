// import React, { useEffect, useState } from "react";
// import "./Categories.scss";
// import { Link } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
// const Categories = () => {
//   // Fetch categories from API
//   const { data } = useFetch("/categories?populate=*");
//   const [categories, setCategories] = useState([]);
//   // Update categories state when data is available
//   useEffect(() => {
//     if (data) {
//       setCategories(data); // Extracting 'data' array from API response
//     }
//   }, [data]);

//   console.log("categories page", categories);
//   return (
//     <div className="categories">
//       <div className="col">
//         <div className="row">
//           <img
//             src="https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600"
//             alt=""
//           />
//           <button>
//             <Link className="link" to="/products/1">
//               Sale
//             </Link>
//           </button>
//         </div>
//         <div className="row">
//           <img
//             src="https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600"
//             alt=""
//           />
//           <button>
//             <Link to="/products/1" className="link">
//               Women
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div className="col">
//         <div className="row">
//           {" "}
//           <img
//             src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600"
//             alt=""
//           />
//           <button>
//             <Link to="/products/1" className="link">
//               New Season
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div className="col col-l">
//         <div className="row">
//           <div className="col">
//             <div className="row">
//               <img
//                 src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <button>
//                 <Link to="/products/1" className="link">
//                   Men
//                 </Link>
//               </button>
//             </div>
//           </div>
//           <div className="col">
//             <div className="row">
//               {" "}
//               <img
//                 src="https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//               <button>
//                 <Link to="/products/1" className="link">
//                   Accessories
//                 </Link>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <img
//             src="https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600"
//             alt=""
//           />
//           <button>
//             <Link to="/products/1" className="link">
//               Shoes
//             </Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useEffect, useState } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Categories = () => {
  // Fetch categories from API
  const { data } = useFetch("/categories?populate=*");
  const [categories, setCategories] = useState([]);

  // Update categories state when data is available
  useEffect(() => {
    if (data && data.length) {
      setCategories(data);
    }
  }, [data]);

  console.log("categories page", categories);

  return (
    <div className="categories">
      {categories.map((category) => (
        <div className="col" key={category.id}>
          <div className="row">
            <img
              src={category.img?.url || "https://via.placeholder.com/150"}
              alt={category.name}
            />
            <button>
              <Link className="link" to={`/products/${category.id}`}>
                {category.title}
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
