// src/components/AboutUs.js
import Aboutus from "../images/Aboutus.jpg";
import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { motion } from "framer-motion";
import "./Contact.css";
import { RiAdvertisementFill } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: "linear" }}
    >
      <div
        className="d-flex"
        style={{
          boxSizing: "border-box",
          width: "100%",
          padding: ".2rem",
          flexDirection: "column",
        }}
      >
        <Header />
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            className="leftdiv-main"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "justify",
              textJustify: "inter-word",
              flexDirection: "column",
            }}
          >
            <h1>We Are NetBuys ❤</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
              facilis velit nihil asperiores amet quas voluptatem! Minima,
              quisquam eum. Iusto enim, magni et libero rem repellendus?
              Adipisci hic dolorum maiores ea! Sapiente exercitationem quaerat
              perferendis alias, consectetur laboriosam libero, iste neque
              commodi dolor facere corporis ipsam ratione deleniti nesciunt
              quae.
            </p>
            <h2>What We Do</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem repellat quibusdam ratione ab debitis eius dolore
              incidunt et dolor, magnam tempore provident fuga natus voluptates
              nobis sit facere? Molestias eaque consectetur assumenda quod
              aliquam cumque tempore. Eius, tempora dolore!
            </p>
          </div>
          <div
            className="rightdiv-main"
            style={{
              display: "flex",
              // width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img style={{ width: "100%" }} src={Aboutus} alt="" />
          </div>
        </div>
        <div className="container ">
          <div
            className="d-flex"
            style={{ justifyContent: "center", marginBottom: "2rem" }}
          >
            <h1>How It Works ?</h1>
          </div>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: "3rem",
              textAlign: "justify",
              textJustify: "inter-word",
              flexWrap: "wrap ",
            }}
          >
            <div
              className="d-flex row howItWorks"
              style={{
                width: "10rem",
                // backgroundColor: "#4244E6",
                // gap: ".2rem",
              }}
            >
              <MdAccountCircle style={{ height: "4rem" }} />
              <h5>Create Account</h5>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officiis, nam.
              </p>
            </div>
            <div className="d-flex row howItWorks" style={{ width: "10rem" }}>
              <RiAdvertisementFill style={{ height: "4rem" }} />
              <h5>Post Your Ad</h5>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officiis, nam.
              </p>
            </div>
            <div className="d-flex row howItWorks" style={{ width: "10rem" }}>
              <BiSolidOffer style={{ height: "4rem" }} />
              <h5> Get Offers</h5>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officiis, nam.
              </p>
            </div>
            <div className="d-flex row howItWorks" style={{ width: "10rem" }}>
              <FaHandshake style={{ height: "4rem" }} />
              <h5>Sell Your Item</h5>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officiis, nam.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default About;
