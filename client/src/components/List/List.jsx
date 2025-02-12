import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
  let query = `/products?populate=*&[filters][categories][id]=${catId}`;

  if (subCats.length > 0) {
    query += subCats
      .map((item) => `&[filters][sub_categories][id][$eq]=${item}`)
      .join("");
  }

  query += `&[filters][price][$lte]=${maxPrice}`;

  if (sort) {
    query += `&sort=price:${sort}`;
  }

  // console.log("Fetching data with query:", query);

  const { data, loading, error } = useFetch(query); // Fetch data using the constructed query

  if (loading) {
    return <div className="list">Loading...</div>;
  }

  if (error) {
    return (
      <div className="list">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="list">
      {loading ? (
        "loading"
      ) : data?.length > 0 ? (
        data.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default List;
