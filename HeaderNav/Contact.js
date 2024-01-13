// src/components/AboutUs.js
import ContactUs from "../images/ContactUs.jpg";
import React from "react";
import Footer from "../components/Footer";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import "./Contact.css";
import Header from "../components/Header";
const Contact = () => {
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
            flexDirection: "row",
          }}
        >
          <div
            className="leftdiv-main"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // zIndex: "-2",
            }}
          >
            <img style={{ width: "100%" }} src={ContactUs} alt="" />
          </div>
          <div
            className="rightdiv-main"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "justify",
              textJustify: "inter-word",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            <h1>WE'RE READY, LET'S TALK.</h1>
            <input
              type="text"
              placeholder="Enter Your Name"
              style={{ borderRadius: "20px" }}
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              style={{ borderRadius: "20px" }}
            />
            <textarea
              name="mesaage"
              placeholder="Write Your Message"
              id=""
              cols="10"
              rows="2"
              style={{ borderRadius: "20px" }}
            ></textarea>
            <Button
              className="btn"
              style={{
                backgroundColor: "#1B83FE",
                color: "white",
                borderRadius: "20px",
              }}
            >
              Send Message
            </Button>
          </div>
        </div>
        <div className="container " style={{ justifyContent: "center" }}>
          <div
            className="d-flex"
            style={{ justifyContent: "left", marginBottom: "" }}
          >
            <h1>Contact Info</h1>
          </div>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "left",
              // alignItems: "center",
              flexDirection: "column",
              // gap: "3rem",
              flexWrap: "wrap ",
            }}
          >
            <div style={{ justifyContent: "left" }}>
              <h4>Address</h4>
              <p>SKIT College, Jaipur, Rajasthan</p>
              <h4>Email Us</h4>
              <p>deysomu16@gmail.com</p>
              <h4>Call Us</h4>
              <p>+91-1001349289</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Contact;
