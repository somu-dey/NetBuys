// Footer.js
// import Mainads from "../images/Mainads.jpg";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";

import React from "react";
import logo1 from "../images/logo1.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div
        className="footermain"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          // alignItems: "center",
          // background: URL(Mainads),
          gap: "3rem",
          padding: "3rem",
          // paddingBottom: "0px",
          marginTop: "3rem",
          // backgroundColor: "white",
          color: "black",
          flexWrap: "wrap",
        }}
      >
        <div
          className="footer-logo-div"
          style={{
            width: "18rem",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          <div
            className="footer-section-heading"
            style={{
              display: "flex",
              width: "18rem",
            }}
          >
            <img src={logo1} alt="" />
          </div>
          <hr style={{ border: "1px solid black" }} />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
            possimus nihil voluptatem illo, numquam autem rem reiciendis,
            laboriosam rerum dolores.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FaFacebook />
            <FaWhatsapp />
            <FaLinkedin />
            <FaInstagram />
            <FaPinterest />
            <FaXTwitter />
          </div>
        </div>
        <div className="footer-section" style={{}}>
          <div className=" footer-section-heading" style={{ display: "flex" }}>
            <h4>How to Sell Fast</h4>
          </div>
          <hr style={{ border: "1px solid black" }} />
          <p>Selling Tips</p>
          <p>Buy and Sell Quickly</p>
          <p>Membership</p>
          <p>Banner Advertising</p>
          <p>Promote Your Ad</p>
        </div>

        <div className="footer-section">
          <div className=" footer-section-heading" style={{ display: "flex" }}>
            <h4>Information</h4>
          </div>
          <hr style={{ border: "1px solid black" }} />
          <p>Company & Contact Info</p>
          <p>Blog & Articles</p>
          <p>Terms of Service</p>
          <p>Sitemap</p>
          <p>Privacy Policy</p>
        </div>
        <div className="footer-section">
          <div className=" footer-section-heading" style={{ display: "flex" }}>
            <h4>Help & Support</h4>
          </div>
          <hr style={{ border: "1px solid black" }} />
          <p>Live Chat</p>
          <p>FAQ</p>
          <p>How to Stay Safe</p>
          <p>Terms & Conditions</p>
          <p>Contact Us</p>
        </div>
      </div>
      <div>
        <p>
          <FaRegCopyright /> NetBuys @ 2023 SRVB
        </p>
        {/* (私ʍʀSoʍʊ私) */}
      </div>
    </footer>
  );
};

export default Footer;
