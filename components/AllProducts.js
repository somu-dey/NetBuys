import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./firebase";
import { FaHeart } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import "./Product.css";
import { Button } from "@nextui-org/react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import Sample from "./Sample";
const AllProducts = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const handlewishbuttonclick = (e) => {
    if (userExists) {
      toast.success("Added  To Favourites", {
        position: "top-center",
        duration: "600",
      });
    } else {
      toast.error("You Must Login First !", {
        position: "top-center",
        duration: "600",
      });
    }
  };

  var userExists = localStorage.getItem("user");
  const handleButtonClick = (docId) => {
    // docId.preventDefault();
    console.log(`${docId}`);
    if (userExists) {
      navigate(`/productdetails/${docId}`);
    } else {
      toast.error("You Must Login First !!", {
        position: "top-center",
        duration: "600",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const subcollectionRef = collection(database, "AllData");
        const getValue = await getDocs(subcollectionRef);

        setFinalData(
          getValue.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(finalData);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: "linear" }}
    >
      <div
        className="container mt-1"
        style={{ boxSizing: "border-box", height: "100%" }}
      >
        {loading ? (
          <Sample />
        ) : (
          <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="row ">
              <div
                className="d-flex flex-wrap justify-content-center w-100 "
                style={{
                  gap: "2rem",
                  height: "100%",
                  flexDirection: "row",
                  // border: "4px solid black",
                  boxSizing: "border-box",
                }}
              >
                {/* Render your data here */}
                {finalData.map((data, index) => (
                  // <div key={index}>
                  //       {/* Display data from the finaldata document */}
                  //       {/* <p>Field1: {data.title}</p>
                  //   <p>Field2: {data.description}</p> */}

                  <div
                    className="card"
                    // onClick={productinfo}
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      // overflow: "hidden",
                      // height: "18rem",
                      // justifyContent: "center",
                    }}
                    key={data?.id}
                  >
                    {/* <About /> */}
                    {/* <Link to="productinfo"> */}
                    <div
                      className="insider-div h-100"
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        boxSizing: "border-box",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        className="item-image"
                        src={data?.imageUrl}
                        alt=""
                        style={{
                          boxSizing: "border-box",
                          borderRadius: "9px",
                        }}
                      />
                    </div>
                    <div
                      className="card-body"
                      style={{ boxSizing: "border-box" }}
                    >
                      <p
                        className="card-title"
                        style={{
                          overflow: "hidden",
                          // fontWeight: "bold",
                          margin: "0%",
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data?.adTitle}
                      </p>
                      <p
                        className="card-title"
                        style={{
                          overflow: "hidden",
                          // fontWeight: "bold",
                          margin: "0%",
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data?.description}
                      </p>
                      <p
                        className="card-title"
                        style={{
                          overflow: "hidden",
                          // fontWeight: "bold",
                          margin: "0%",
                          fontSize: "10px",
                          color: "grey",
                          // fontWeight: "lighter",
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Posted By : {data?.username}
                      </p>
                      <h5 className="price">
                        ₹{data?.price}
                        <button
                          type="button"
                          href="#"
                          className="btn btn-sm wishlistbtn"
                          style={{
                            backgroundColor: "#4244E6",
                            color: "white",
                            borderRadius: "20px",
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
                    {/* <Link to={`/productdetails/${data.id}`}> */}
                    <Button
                      className="btn "
                      // radius="sm"
                      style={{
                        backgroundColor: "#4244E6",
                        border: "none",
                        borderRadius: "0px 0px 5px 5px",
                        color: "white",
                        width: "100%",
                      }}
                      onClick={() => handleButtonClick(data?.id)}
                    >
                      Show Product Details
                    </Button>

                    {/* </Link> */}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AllProducts;
