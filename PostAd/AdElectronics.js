import React, { useState } from "react";
import "./Adproduct.css";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database } from "../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../components/firebase";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import Adelectronic from "../images/Adelectronic.jpg";
import Sample from "../components/Sample";
function AdElectronics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    adTitle: "",
    description: "",
    price: "",
    photos: [], // Placeholder for photo uploads
    state: "",
    name: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      photos: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.adTitle &&
      formData.description &&
      formData.phoneNumber &&
      formData.price &&
      formData.state &&
      formData.photos &&
      formData.photos.length > 0
    ) {
      try {
        const auth = getAuth();
        // Upload images to Firebase Storage
        setLoading(true);
        const imageRef = ref(
          storage,
          `users/${auth.currentUser.uid}/images/${formData.name}_${Date.now()}`
        );

        await uploadBytes(imageRef, formData.photos[0]);
        const imageUrl = await getDownloadURL(imageRef);

        const userCarAdsCollection = collection(
          database,
          "UserAds",
          auth.currentUser.uid,
          "ElectronicAds"
        );
        const formDataWithoutPhotos = { ...formData };
        delete formDataWithoutPhotos.photos;
        const username = auth.currentUser.displayName;
        const docRef = await addDoc(userCarAdsCollection, {
          // uid: auth.currentUser.uid,
          imageUrl,
          ...formDataWithoutPhotos,
          username,
          uid: auth.currentUser.uid,
          category: "ElectronicAds",
        });
        // all ads collection-------------------------------------------------------------------------------------------------------
        const allAdsCollectionRef = collection(database, "AllData");
        const allAllAds = await addDoc(allAdsCollectionRef, {
          imageUrl,
          ...formDataWithoutPhotos,
          uid: auth.currentUser.uid,
          username,
        });
        // -----------------------------------------------------------------------------------------------------------------------------
        if (!docRef.id || !allAllAds.id) {
          throw new Error("Failed to submit data to Firestore");
        }

        toast.success("Ad posted successfully", {
          position: "top-center",
          duration: "1000",
        });
        console.log("Data submitted successfully");
        // Reset the form data
        setFormData({
          adTitle: "",
          description: "",
          price: "",
          state: "",
          phoneNumber: "",
          photos: [],
        });
        navigate("/");
      } catch (error) {
        console.error("Error submitting data:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please Fill In All The Fields!", {
        position: "top-center",
        duration: "600",
      });
      console.error("Please Fill In All The Fields!");
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
        className="d-flex admaindiv"
        style={{
          justifyContent: "center",
          flexDirection: "column",
          // padding: "2rem",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {loading ? (
          <Sample />
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#ff4f5a",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white", marginTop: "8px" }}>Post Your Ad</h2>
            </div>

            <div
              // className="d"
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundImage: { Adcar },
                // backgroundPosition: "center",
                // backgroundRepeat: "repeat",
              }}
            >
              <img
                src={Adelectronic}
                alt=""
                style={
                  {
                    // width: "50%",
                    // position: "fixed",
                    // opacity: "30px",
                    // height: "50%",
                  }
                }
              />
            </div>
            <form>
              <label>
                Ad Title:
                <input
                  type="text"
                  name="adTitle"
                  value={formData.adTitle}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength="4096"
                  required
                ></textarea>
              </label>

              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Upload Photos:
                <input
                  type="file"
                  name="photos"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
              </label>

              {/* You can add more input fields as needed */}

              <label>
                State:
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </label>

              <button
                className="btn postadbtn"
                type="submit"
                style={{ borderRadius: "20px" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                Post Now
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AdElectronics;
