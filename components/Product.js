import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import "./Product.css";
// import { useNavigate } from "react-router-dom";
// const api = [
//   {
//     id: 1,
//     title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
//     price: 39.99,
//     description:
//       "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
//     category: "women's clothing",
//     image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
//     rating: {
//       rate: 3.8,
//       count: 679,
//     },
//   },
//   {
//     id: 2,
//     title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
//     price: 109,
//     description:
//       "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
//     category: "electronics",
//     image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
//     rating: {
//       rate: 2.9,
//       count: 470,
//     },
//   },
//   {
//     id: 3,
//     title: "Solid Gold Petite Micropave ",
//     price: 168,
//     description:
//       "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
//     category: "jewelery",
//     image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
//     rating: {
//       rate: 3.9,
//       count: 70,
//     },
//   },
//   {
//     id: 4,
//     title:
//       "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
//     price: 200.9,
//     description:
//       "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
//     category: "electronics",
//     image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
//     rating: {
//       rate: 2.2,
//       count: 140,
//     },
//   },
// ];
// const api2 = "https://fakestoreapi.com/products";
const Product = ({ id }) => {
  const [products, setProducts] = useState([]);
  const handlewishbuttonclick = (e) => {
    toast.success("Added  To Favourites", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const navigate = useNavigate();

  const handleButtonClick = (itemId) => {
    navigate(`/productdesc/${itemId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-1" style={{ boxSizing: "border-box" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="row ">
        <div
          className="d-flex flex-wrap justify-content-center w-100 "
          style={{
            gap: "2rem",
            flexDirection: "row",
            // border: "4px solid black",
            boxSizing: "border-box",
          }}
        >
          {products.map((item) => (
            <div
              className="card  "
              // onClick={productinfo}
              style={{ boxSizing: "border-box" }}
              key={item.id}
            >
              {/* <About /> */}
              {/* <Link to="productinfo"> */}
              <div
                className="h-100"
                style={{
                  display: "flex",
                  boxSizing: "border-box",
                  justifyContent: "center",
                }}
              >
                <img
                  className="item-image"
                  src={item.image}
                  alt=""
                  style={{ boxSizing: "border-box" }}
                />
              </div>
              <div className="card-body">
                <p
                  className="card-title"
                  style={{
                    overflow: "hidden",
                    // fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </p>
                <h5 className="price">
                  ₹{(item.price * 60).toFixed(2)}
                  <button
                    type="button"
                    href="#"
                    className="btn btn-sm wishlistbtn"
                    style={{
                      backgroundColor: "#4244E6",
                      color: "white",
                      // fontSize: "15px",
                      float: "right",
                    }}
                    onClick={handlewishbuttonclick}
                  >
                    <FaHeart />
                  </button>
                </h5>
                {/* </Link> */}
              </div>
              {/* <Link to={`/productdetails/${item.id}`}> */}
              <button
                className="btn "
                style={{
                  backgroundColor: "#4244E6",
                  border: "none",
                  color: "white",
                  width: "100%",
                }}
                onClick={() => handleButtonClick(item.id)}
              >
                Show Product Details
              </button>

              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
