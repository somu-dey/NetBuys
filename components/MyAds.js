import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { database } from "./firebase";
import { MdDelete } from "react-icons/md";
// import Sample from "./Sample";
import Myads from "../images/Myads.jpeg";
import { toast, Toaster } from "react-hot-toast";
import "./Product.css";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Modal from "react-modal";

import Header from "./Header";
// import { getAuth } from "firebase/auth";
import Sample from "./Sample";
const appElement = document.getElementById("root");
Modal.setAppElement(appElement);
const MyAds = () => {
  // const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [finalData1, setFinalData] = useState([]);
  const [isOverLay, setOverlayVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteCategory, setDeleteCategory] = useState("");
  const showOverlay = ([id, category]) => {
    setOverlayVisible(true);
    setDeleteId(id);
    setDeleteCategory(category);
  };
  const hideOverlay = () => {
    setOverlayVisible(false);
    setDeleteId("");
    setDeleteCategory("");
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      transition: "opacity 2s ease, transform 2s ease",
    },
  };
  const handleDelete = async ([id, category]) => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = JSON.parse(storedUser);
      var userId = user.uid;
      const collectionRef = collection(database, "UserAds", userId, category);
      const subdocumentRef = doc(collectionRef, id);

      // Use deleteDoc to remove the specific subdocument
      setTrigger(true);
      await deleteDoc(subdocumentRef);
      setTrigger(false);
      setOverlayVisible(false);
      toast.success("Ad Deleted Successfully!!", {
        position: "top-center",
      });
      // console.log("Ad deleted");
    } catch (error) {
      console.error(error);
    }
  };
  //put all myads in finaldata----------------------------------------------------------------
  const getUserAdsData = async (collectionName) => {
    if (localStorage.getItem("user") != null) {
      // if (auth.currentUser) {
      const storedUser = localStorage.getItem("user");
      const user = JSON.parse(storedUser);
      var userId = user.uid;
    }
    const val = doc(database, "UserAds", userId);
    const subcollectionRef = collection(val, collectionName);
    const getValue = await getDocs(subcollectionRef);
    return getValue.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };
  // fetch data below----------------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(auth.currentUser.uid);
        setLoading(true);
        const [carAds, mobileAds, electronicAds, bikeAds] = await Promise.all([
          getUserAdsData("CarAds"),
          getUserAdsData("MobileAds"),
          getUserAdsData("ElectronicAds"),
          getUserAdsData("BikeAds"),
        ]);
        // Combine the data into a single array
        const finalData1 = [
          ...carAds,
          ...mobileAds,
          ...electronicAds,
          ...bikeAds,
        ];
        // Set the combined data in setFinalData
        setFinalData(finalData1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [trigger]);
  // console.log(finalData);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: "linear" }}
    >
      <Header />

      {loading ? (
        <Sample />
      ) : (
        <>
          <div
            className="container mt-1 maindiv2"
            style={{ boxSizing: "border-box", height: "100%" }}
          >
            <Toaster position="top-center" reverseOrder={false} />
          </div>

          <div className="d-flex flex-column align-items-center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                zIndex: "-2",
                // height: "50%",
                width: "100%",
              }}
            >
              <img src={Myads} alt="" />
            </div>
            <div
              className="d-flex flex-wrap justify-content-center w-100 "
              style={{
                gap: "2rem",
                height: "100%",
                flexDirection: "row",
                boxSizing: "border-box",
              }}
            >
              <Modal
                isOpen={isOverLay}
                // onAfterOpen={afterOpenModal}
                style={customStyles}
                onRequestClose={hideOverlay}
                contentLabel="Example Modal"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h4>Are You Sure ?</h4>
                  <h5>This Ad Will Be Deleted Permanently !</h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "2rem",
                    }}
                  >
                    <Button
                      style={{ borderRadius: "20px", border: "none" }}
                      color="primary"
                      onClick={hideOverlay}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ borderRadius: "20px", border: "none" }}
                      color="danger"
                      onClick={() => handleDelete([deleteId, deleteCategory])}
                    >
                      Yes, Delete
                    </Button>
                  </div>
                </div>
              </Modal>

              {finalData1.map((data, index) => (
                // <div key={index}>
                //       {/* Display data from the finaldata document */}
                //       {/* <p>Field1: {data.title}</p>
                //   <p>Field2: {data.description}</p> */}

                <div
                  className="card"
                  data-aos="zoom-in"
                  // onClick={productinfo}
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    // height: "18rem",
                    // justifyContent: "center",
                  }}
                  key={data?.id}
                >
                  <div
                    className="h-100"
                    style={{
                      display: "flex",
                      overflow: "hidden",
                      boxSizing: "border-box",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="item-image"
                      src={data?.imageUrl}
                      alt=""
                      style={{ boxSizing: "border-box", borderRadius: "9px" }}
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
                          float: "right",
                        }}
                        onClick={() => showOverlay([data?.id, data?.category])}
                      >
                        <MdDelete />
                      </button>
                    </h5>
                    {/* </Link> */}
                  </div>
                  {/* <Link to={`/productdetails/${data.id}`}> */}
                  <Button
                    className="btn "
                    style={{
                      backgroundColor: "#4244E6",
                      border: "none",
                      color: "white",
                      width: "100%",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                    // onClick={() => handleButtonClick(data.id)}
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
    </motion.div>
  );
};

export default MyAds;
