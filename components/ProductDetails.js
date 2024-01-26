// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { IoIosMail } from "react-icons/io";
import { Button } from "@nextui-org/react";
import NoImage from "../images/NoImage.jpg";
import Header from "../components/Header";
import Footer from "./Footer";
import { FaPhone } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { database } from "./firebase";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { doc, getDoc } from "firebase/firestore";
import Sample from "./Sample";
import { getAuth } from "firebase/auth";
// const user = JSON.parse(localStorage.getItem("user"));
// const userId = user.uid;
// console.log(userId);
// console.log(user);
const ProductDetails = () => {
  // Get the product ID from the route parameters
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [finalData, setFinalData] = useState([]);
  const auth = getAuth();
  // Fetch product details from the API based on the ID
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        // specific document?
        const specificDocumentRef = doc(database, "AllData", `${id}`);
        const specificDoc = await getDoc(specificDocumentRef);
        setFinalData({
          ...specificDoc.data(),
          id: specificDoc.id,
        });
        // specificDoc?
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  // console.log(finalData);
  const handleChatButtonClick = (sellerId) => {
    // console.log(sellerId);
    navigate("/chat", { state: { props: sellerId } });
  };

  const handleCallButtonClick = () => {
    // Use the 'tel:' protocol to open the phone dialer
    const dialerUrl = `tel:${finalData?.phoneNumber}`;

    // Redirect to the phone dialer
    window.location.href = dialerUrl;
  };
  const handleMailButtonClick = () => {
    const emailAddress = "abs@gmail.com";
    const subject = "Subject of the Email";

    // Construct the mailto link
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}`;

    // Open the mailto link
    window.location.href = mailtoLink;
  };
  return (
    <div
      className=""
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <Header />
      {loading ? (
        <Sample />
      ) : (
        <>
          <div
            className="maindiv container"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              // gap: "10rem",
            }}
          >
            <div
              className="leftdiv"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "50vh",
                alignItems: "center",
                // width: "60%",
                // flexDirection: "row",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                className="productimage"
                src={finalData?.imageUrl}
                alt=""
              />
            </div>
            <div
              className="rightdiv1"
              style={{
                display: "flex",
                // flexDirection: "row",
                // width: "50%",
                // border: "2px solid black",
                justifyContent: "center",
                alignItems: "center",
                rowGap: "2rem",
                // padding: "3rem",
                // gap: "2rem",
              }}
            >
              <div
                className="d-flex"
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  rowGap: "8px",
                }}
              >
                <h4 style={{ textDecoration: "underline" }}>
                  SELLER INFORMATON
                </h4>
                <div
                  className="d-flex"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-around",
                    gap: "1rem",
                  }}
                >
                  <img
                    className="profileimage"
                    src={
                      auth.currentUser?.photoURL
                        ? auth.currentUser.photoURL
                        : NoImage
                    }
                    // onClick={handleOptionClick}
                    style={{
                      // height: "10px",
                      cursor: "pointer",
                      borderRadius: "50%",
                      border: "2px solid grey",
                    }}
                    alt="photourl"
                  />
                  <div
                    className="d-flex mt-2"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <h4>{finalData?.username}</h4>
                  </div>
                </div>
                <p>Location : {finalData?.state}</p>
                {window.innerWidth < 500 ? (
                  <Button
                    style={{
                      borderRadius: "20px",
                      border: "none",
                    }}
                    // className="btn"
                    color="danger"
                    onClick={handleCallButtonClick}
                  >
                    <FaPhone />
                    Contact Seller
                  </Button>
                ) : (
                  ""
                )}
                {/* {console.log(auth.currentUser.uid, finalData.uid)} */}
                {auth.currentUser.uid !== finalData.uid ? (
                  <Button
                    style={{ borderRadius: "20px", border: "none" }}
                    // className="btn"
                    color="primary"
                    onClick={() => handleChatButtonClick(finalData.uid)}
                  >
                    Chat With Seller
                    <IoChatboxEllipsesOutline />
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  style={{ borderRadius: "20px", border: "none" }}
                  // className="btn"
                  color="primary"
                  onClick={handleMailButtonClick}
                >
                  <IoIosMail />
                  Email To Seller
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className="container descContainer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          // flexDirection: "column",
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        <div
          className="leftdiv-overview"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            // backgroundColor: "#EDE4FF",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <h2>Overview</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div className="d-flex flex-column">
              <h6>Price</h6>
              <h3>₹30000</h3>
            </div>
            <div className="d-flex flex-column">
              <h6>
                <FaLocationArrow /> Location
              </h6>
              <h3>Jaipur</h3>
            </div>
            <div className="d-flex flex-column">
              <h6>
                <FaHeart />
                Add To
              </h6>
              <h3>Wishlist</h3>
            </div>
          </div>
        </div>
        <div
          className="rightdiv"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            fugiat possimus reprehenderit expedita ab sed at id, praesentium,
            perspiciatis consequatur ad hic iure ratione, nemo quis amet beatae
            nesciunt quia in eos debitis tenetur dolore reiciendis. Cum aliquam
            eius deleniti mollitia debitis delectus, minima, optio praesentium
            tempora sit nobis sint molestias exercitationem harum ipsam
            repudiandae dolore dolores fuga animi nesciunt quam id recusandae
            officia quibusdam! Similique, perspiciatis eum. Numquam, aliquam.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
