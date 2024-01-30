import React, { useState } from "react";
import "./Adproduct.css";
import { useNavigate } from "react-router-dom";
import Admobile from "../images/Admobile.jpg";
import { toast, Toaster } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database } from "../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../components/firebase";
import { getAuth } from "firebase/auth";
import Sample from "../components/Sample";

function AdMobile() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    adTitle: "",
    description: "",
    price: "",
    photos: [], // Placeholder for photo uploads
    state: "",
    location: "",
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.brand &&
      formData.adTitle &&
      formData.description &&
      formData.location &&
      formData.phoneNumber &&
      formData.price &&
      formData.photos &&
      formData.state &&
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
        const username = auth.currentUser.displayName;

        const userMobileAdsCollection = collection(
          database,
          "UserAds",
          auth.currentUser.uid,
          "MobileAds"
        );
        const formDataWithoutPhotos = { ...formData };
        delete formDataWithoutPhotos.photos;

        const docRef = await addDoc(userMobileAdsCollection, {
          uid: auth.currentUser.uid,
          imageUrl,
          category: "MobileAds",
          ...formDataWithoutPhotos, // Assuming transmission is optional
        });

        // all ads collection-------------------------------------------------------------------------------------------------------
        const allAdsCollectionRef = collection(database, "AllData");
        const allAds = await addDoc(allAdsCollectionRef, {
          imageUrl,
          ...formDataWithoutPhotos,
          uid: auth.currentUser.uid,
          username,
        });

        if (!docRef.id || !allAds.id) {
          throw new Error("Failed to submit data to Firestore");
        }

        toast.success("Ad posted successfully", {
          position: "top-center",
          duration: "1000",
        });
        console.log("Data submitted successfully");
        // Reset the form data
        setFormData({
          brand: "",
          adTitle: "",
          description: "",
          price: "",
          location: "",
          name: "",
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
    <div
      className="d-flex admaindiv"
      style={{
        justifyContent: "center",
        flexDirection: "column",
        // padding: "2rem",
        // width: "300px",
      }}
    >
      {loading ? (
        <Sample />
      ) : (
        <div>
          <Toaster position="top-center" reverseOrder={false} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#FF735C",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "white", marginTop: "8px" }}>Post Your Ad</h2>
          </div>
          <div
            // className="d"
            style={{
              // height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundImage: { Adcar },
              // backgroundPosition: "center",
              // backgroundRepeat: "repeat",
            }}
          >
            <img
              src={Admobile}
              alt=""
              className="mobileadimg"
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

          <form onSubmit={handleSubmit}>
            <label>
              Brand:
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              >
                <option value="" disabled>
                  Select a brand
                </option>
                <option value="Apple">Apple</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Oppo">Oppo</option>
                <option value="Vivo">Vivo</option>
                <option value="OnePlus">OnePlus</option>
              </select>
            </label>

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
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
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
              type="submit "
              style={{ backgroundColor: "#FF735C", borderRadius: "20px" }}
              onClick={handleSubmit}
              disabled={loading}
            >
              Post Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdMobile;
