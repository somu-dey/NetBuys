// src/components/AboutUs.js
import ContactUs from "../images/ContactUs.jpg";
import React, { useState } from "react";
import Footer from "../components/Footer";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { database } from "../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Contact.css";
import { toast, Toaster } from "react-hot-toast";
import Header from "../components/Header";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // console.log(email);
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || message === "") {
      toast.error("Please Fill In Empty Fields !", {
        position: "top-center",
      });
      return;
    }
    try {
      const collectionRef = collection(database, "ContactUsMessages");
      await addDoc(collectionRef, {
        name: name,
        email: email,
        message: message,
      });
      toast.success("Message Sent, We Will Get Back To You Soon!!", {
        position: "top-center",
      });
      setEmail("");
      setMessage("");
      setName("");
    } catch (error) {
      toast.error("Some Error Occurred");
      console.error(error);
    }
  };
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
        <Toaster position="top-center" reverseOrder={false} />
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
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              placeholder="Enter Your Name"
              style={{ borderRadius: "20px" }}
            />
            <input
              type="email"
              value={email}
              placeholder="Enter Your Email"
              style={{ borderRadius: "20px" }}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
            <textarea
              value={message}
              name="message"
              placeholder="Write Your Message"
              id=""
              cols="10"
              rows="2"
              style={{ borderRadius: "20px" }}
              onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
            ></textarea>

            <Button
              className="btn"
              style={{
                backgroundColor: "#1B83FE",
                color: "white",
                borderRadius: "20px",
              }}
              onClick={sendMessageHandler}
            >
              Send Message
            </Button>
          </div>
        </div>
        <div className="container " style={{ justifyContent: "center" }}>
          <div
            className="d-flex"
            style={{ justifyContent: "center", marginBottom: "" }}
          >
            <h1>Contact Info</h1>
          </div>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              flexDirection: "column",
              // gap: "3rem",
              flexWrap: "wrap ",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
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
