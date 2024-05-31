import React from "react";
import Product from "../components/Product"; // Adjust the import path

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
