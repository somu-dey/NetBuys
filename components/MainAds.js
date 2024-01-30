import React from "react";
// import { useState } from "react";
import { MdLaptopMac } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaCar } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa6";

import { motion } from "framer-motion";
import Mainads from "../images/Mainads.jpg";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
// import AdElectronics from "./AdElectronics";
import "./MainAds.css";
function MainAds() {
  // const [selected, setselected] = useState("");
  // const handleFormChange = (e) => {
  //   setselected(e.target.value);
  // };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: "linear" }}
    >
      {/* <div className="container"> */}
      <Header />
      <div
        className="container d-flex"
        style={{
          justifyContent: "center",
          // flexWrap: "wrap",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h1>Choose Your Category</h1>
        </div>
        <div
          className="leftrightmain"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // flexWrap: "wrap",
            // flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div className="left-div">
            <img src={Mainads} className="mainads" alt="" />
          </div>
          <div
            className="right-div"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "2rem",
            }}
          >
            <Link to="/adcar">
              <div
                className="container pdcolor"
                style={{
                  // border: " 2px solid grey",
                  borderRadius: "6px",
                  width: "150px",
                  height: "150px",
                }}
              >
                <FaCar
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "2rem",
                    // color: "black",
                  }}
                />
              </div>
            </Link>

            <Link to="/adbike">
              <div
                className="container pdcolor"
                style={{
                  // border: " 2px solid grey",
                  borderRadius: "6px",
                  width: "150px",
                  height: "150px",
                }}
              >
                <FaMotorcycle
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "2rem",
                    // color: "black",
                  }}
                />
              </div>
            </Link>
            <Link to="/admobile">
              <div
                className="container pdcolor"
                style={{
                  // border: " 2px solid grey",
                  borderRadius: "6px",
                  width: "150px",
                  height: "150px",
                }}
              >
                <IoIosPhonePortrait
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "2rem",
                    // color: "black",
                  }}
                />
              </div>
            </Link>
            <Link to="/adelectronic">
              <div
                className="container pdcolor"
                style={{
                  // border: " 2px solid grey",
                  borderRadius: "6px",
                  width: "150px",
                  height: "150px",
                }}
              >
                <MdLaptopMac
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "2rem",
                    // color: "black",
                  }}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default MainAds;
