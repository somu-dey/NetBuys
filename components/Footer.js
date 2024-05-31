// Footer.js
// import Mainads from "../images/Mainads.jpg";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
          // gap: "5rem",
          padding: "2rem 1rem 0 1rem",
          // paddingBottom: "0px",
          // marginTop: "3rem",
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
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <img src={logo1} alt="" />
          </div>
          <hr style={{ border: "1px solid black" }} />
          <p>
            NetBuys is the ultimate hub for effortless buying and selling of
            used items, electronics, and more. Our user-friendly platform
            connects individuals seamlessly, providing a secure and dynamic
            online trading experience for all.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link className="nav-link" to="https://www.facebook.com">
              <FaFacebook />
            </Link>
            <Link className="nav-link" to="https://web.whatsapp.com/">
              <FaWhatsapp />
            </Link>
            <Link className="nav-link" to="https://www.linkedin.com">
              <FaLinkedin />
            </Link>
            <Link className="nav-link" to="https://www.instagram.com">
              <FaInstagram />
            </Link>
          </div>
        </div>
        <div className="footer-section" style={{}}>
          <div className=" footer-section-heading" style={{ display: "flex" }}>
            <h4 style={{ textJustify: "none", textAlign: "left" }}>
              Boost Your Ad
            </h4>
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
        {/* <div className="footer-section">
          <div className=" footer-section-heading" style={{ display: "flex" }}>
            <h4>Help & Support</h4>
          </div>
          <hr style={{ border: "1px solid black" }} />
          <p>Live Chat</p>
          <p>FAQ</p>
          <p>How to Stay Safe</p>
          <p>Terms & Conditions</p>
          <p>Contact Us</p>
        </div> */}
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
