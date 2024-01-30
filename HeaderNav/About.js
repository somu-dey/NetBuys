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
              Explore the convenience of NetBuys, where buying and selling used
              products, electronics, and more is made simple. Our user-friendly
              platform ensures a seamless online trading experience, connecting
              individuals and businesses effortlessly. Join our community to
              discover a secure and vibrant marketplace, transforming the way
              you trade with confidence.
            </p>
            <h2>What We Do</h2>
            <p>
              At NetBuys, we're dedicated to revolutionizing online marketplace,
              focusing on creating a seamless platform for buying and selling
              used products and electronics. Our user-friendly environment
              connects individuals effortlessly, fostering a sense of community.
              Declutter your space or discover unique items with ease. Join us
              in transforming the way you engage with pre-loved treasures.
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
                // height: "20rem",
                // backgroundColor: "#4244E6",
                // gap: ".2rem",
              }}
            >
              <MdAccountCircle style={{ height: "4rem" }} />
              <h5>Create Account</h5>
              <p>
                Join NetBuys, your vibrant online marketplace for buying and
                selling used products.
              </p>
            </div>
            <div className="d-flex row howItWorks" style={{ width: "10rem" }}>
              <RiAdvertisementFill style={{ height: "4rem" }} />
              <h5>Post Your Ad</h5>
              <p>
                Showcase your items easily by posting an ad with descriptions
                and images, reaching potential buyers looking for unique finds.
              </p>
            </div>
            <div className="d-flex row howItWorks" style={{ width: "10rem" }}>
              <BiSolidOffer style={{ height: "4rem" }} />
              <h5> Get Offers</h5>
              <p>
                Experience the convenience of receiving offers from buyers, with
                a diverse community eager to explore your listings.
              </p>
            </div>
            <div className="d-flex row howItWorks" style={{ width: "10rem" }}>
              <FaHandshake style={{ height: "4rem" }} />
              <h5>Sell Your Item</h5>
              <p>
                Finalize deals confidently, ensuring a seamless and secure
                online trading experience.
              </p>
            </div>
          </div>
        </div>
        <div style={{ margin: "1rem" }}></div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default About;
