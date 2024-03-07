import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([""]);
  useEffect(() => {
    console.log("Fetching Products");
    setProducts(["Clothing", "Household"]);
  }, []);
  return <div></div>;
};

export default ProductList;
