import React from "react";
// import { Link } from "react-router-dom";
import Landingimg from "../images/Landingimg.jpg";
import { Button } from "@nextui-org/react";

// import GiphyEmbed from "./Sample";
// import logo from "../images/logo1.png";
import Footer from "./Footer";
// import SpecificProdTest from "../components/SpecificProdTest";
// import videoRef from "../images/Video.mp4";
// import NewFetch from "./MyAds";
import Typed from "react-typed";
import Header from "./Header";
// import Product from "./Product";
// import { useState } from "react";
import "./Landing.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AllProducts from "./AllProducts";
function Landing() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  // const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem("user")) {
    var userExists = true;
  } else {
    // imgUrl = false;
    userExists = false;
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: "linear" }}
    >
      <div style={{ boxSizing: "border-box", width: "100%", padding: ".2rem" }}>
        <Header />
        <div
          className="container-fluid d-flex justify-content-center align-items-center "
          style={{
            boxSizing: "border-box",
            // width: "100%",
            height: "350px",
          }}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center  "
            style={{ boxSizing: "border-box", width: "100%" }}
          >
            <div
              className="d-flex flex-column align-items-center  landingimg"
              style={{
                position: "fixed",
                zIndex: "-2",
                // opacity: "0.4",
                boxSizing: "border-box",
                justifyContent: "center",
                width: "100%",
                // height: "100spx",
              }}
            >
              {/* <GiphyEmbed /> */}

              {/* <video
              src={videoRef} // Replace with your video URL
              loop
              muted
              autoPlay
              style={{
                width: "100%",
                // objectFit: "cover",
                opacity: 0.7,
              }}
            /> */}

              <img src={Landingimg} alt="" />
            </div>
            <div
              className="d-flex flex-column align-items-center typediv"
              style={{
                backgroundColor: "rgba(52, 152, 219, 0.5)", // RGBA for background color with opacity
                background: "white",
                // opacity: ".8",
                // width: "400px",
                height: "200px",
                // border: "2px solid black",
                justifyContent: "center",
                borderRadius: "5px",
                // position: "absolute",
                zIndex: "2",
              }}
            >
              {/* <div
              className="d-flex  flex-column justify-content-center"
              style={
                {
                  // height: "30%",
                }
              }
            > */}
              <div className="d-flex flex-column justify-content-center align-items-center  ">
                <Typed
                  strings={[
                    "Buy, Sell And Exchange In One Click!!",
                    "Your Marketplace For Treasures, Old And New!",
                    "Your Next Great Deal Awaits At NetBuys!",
                    " Improve Your Buying And Selling Experience!",
                  ]}
                  typeSpeed={60}
                  backSpeed={10}
                  className="typed"
                  style={{
                    color: "black",
                    // fontSize: "35px",
                    fontWeight: "bold",
                    fontFamily: "Nunito Sans",
                  }}
                  loop
                />
              </div>
              {/* </div> */}
              <div className="d-flex flex-column jusent-center align-items-center  gap-4 w-75">
                <div className="d-flex justify-content-centify-contter flex-column ">
                  <h1
                    style={{
                      color: "black",
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Nunito Sans",
                    }}
                  >
                    Welcome to NetBuys
                  </h1>
                </div>
                {!userExists ? (
                  <>
                    <div className="d-flex justify-content-center flex-row gap-4 ">
                      <Button
                        // radius="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/login");
                        }}
                        className=" btn w-100"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#4244E6",
                          color: "white",
                        }}
                      >
                        Log In
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/register");
                        }}
                        // radius="sm"
                        className="btn  w-100"
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "#4244E6",
                          color: "white",
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex " style={{ flexDirection: "column" }}>
          {/* <Product /> */}
          <AllProducts />
          {/* <SpecificProdTest /> */}
        </div>
        <Footer />
      </div>
    </motion.div>
  );
}

export default Landing;
