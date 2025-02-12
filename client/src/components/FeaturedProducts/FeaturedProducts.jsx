import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  console.log("featured Products", data);

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} Products</h1>
        <p>
          Browse our exclusive collection of {type} products. Discover amazing
          items tailored for your needs!
        </p>
      </div>
      <div className="bottom">
        {error ? (
          <p className="error">Something went wrong! Please try again later.</p>
        ) : loading ? (
          <p className="loading">Loading...</p>
        ) : data.length > 0 ? (
          data.map((item) => <Card item={item} key={item.id} />)
        ) : (
          <p className="no-data">No {type} products found.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
