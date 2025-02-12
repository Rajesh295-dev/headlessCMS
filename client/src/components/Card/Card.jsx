import React from "react";
import "./Card.scss";

import { Link } from "react-router-dom";

const Card = ({ item }) => {
  if (!item || typeof item !== "object") {
    console.warn("Invalid item passed to Card component:", item);
    return null; // Avoid rendering if item is invalid
  }

  // Destructuring the properties directly (since there is no `attributes` field)
  const { documentId, title, price, isNew, img, img2 } = item;
  //console.log("this is d documentId", documentId);

  // Extract image URLs (Cloudinary URLs are already fully qualified)
  const mainImgUrl = img?.url || img?.formats?.thumbnail?.url || null;
  const secondImgUrl = img2?.url || img2?.formats?.thumbnail?.url || null;

  return (
    <Link className="link" to={`/product/${documentId}`}>
      <div className="card">
        <div className="image">
          {isNew && <span>New Season</span>}
          {mainImgUrl && (
            <img
              src={mainImgUrl}
              alt={title || "Main Image"}
              className="mainImg"
            />
          )}
          {secondImgUrl && (
            <img
              src={secondImgUrl}
              alt={title || "Second Image"}
              className="secondImg"
            />
          )}
        </div>
        <h2>{title || "Untitled Product"}</h2>
        <div className="prices">
          <h3>${item.oldPrice || price + 20}</h3>
          <h3>${price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;

// const Card = ({ item }) => {
//   if (!item || !item.attributes) {
//     console.warn("Invalid item passed to Card component:", item);
//     return null; // Avoid rendering anything if item is invalid
//   }

//   const {
//     id,
//     attributes: { title, price, isNew, img, img2 },
//   } = item;

//   const mainImgUrl = img?.data?.attributes?.url
//     ? process.env.REACT_APP_UPLOAD_URL + img.data.attributes.url
//     : null;

//   const secondImgUrl = img2?.data?.attributes?.url
//     ? process.env.REACT_APP_UPLOAD_URL + img2.data.attributes.url
//     : null;
//   // const ulUrl = process.env.REACT_APP_UPLOAD_URL;
//   return (
//     <Link className="link" to={`/product/${item.id}`}>
//       <div className="card">
//         <div className="image">
//           {item?.attributes.isNew && <span>New Season</span>}
//           {mainImgUrl && (
//             <img
//               src={
//                 process.env.REACT_APP_UPLOAD_URL +
//                 item.attributes.img.data.attributes.url
//               }
//               alt={title || "Main Image"}
//               className="mainImg"
//             />
//           )}
//           {secondImgUrl && (
//             <img
//               src={
//                 process.env.REACT_APP_UPLOAD_URL +
//                 item.attributes.img2.data.attributes.url
//               }
//               alt={title || "Second Image"}
//               className="secondImg"
//             />
//           )}
//         </div>
//         <h2>{item?.attributes.title || "Untitled Product"}</h2>
//         <div className="prices">
//           <h3>${item.oldPrice || item?.attributes.price + 20}</h3>
//           <h3>${item?.attributes.price}</h3>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Card;
