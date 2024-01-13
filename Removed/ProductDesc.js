// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDesc.css";
import { FaPhone } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import Sample from "../components/Sample";

const ProductDesc = () => {
  // State to store the product details
  const [product, setProduct] = useState(null);

  // Get the product ID from the route parameters
  const { id } = useParams();

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Fetch product details from the API based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        // Set loading to false after data is fetched (whether successful or not)
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Render product details
  return (
    <div
      className="topdiv"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {" "}
      {loading ? (
        <Sample />
      ) : (
        <>
          <div
            className="maindiv"
            style={{
              display: "flex",
              justifyContent: "center",
              // flexDirection: "row",
              width: "100%",
            }}
          >
            <div
              className="imagediv"
              style={{
                display: "flex",
                justifyContent: "center",
                // flexDirection: "row",
              }}
            >
              <img className="productimage" src={product?.image} alt="" />
            </div>
            <div
              className="detailsdiv"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4>{product?.title}</h4>
              <h3 className="price" style={{ fontWeight: "bold" }}>
                ₹{(product?.price * 60).toFixed(2)}
              </h3>
              <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                {product?.description}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              className="btn btn-primary chatbtn "
              style={{ width: "35rem", fontSize: "15px" }}
            >
              <FaPhone style={{ margin: "5px" }} />
              Contact Seller
            </button>
            <button
              className="btn btn-primary   "
              style={{ width: "35rem", fontSize: "15px" }}
            >
              <IoChatboxEllipsesOutline style={{ margin: "5px" }} />
              Chat With Seller
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDesc;
