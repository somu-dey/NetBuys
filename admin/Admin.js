import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { database } from "../components/firebase";
import AdminLogin from "../images/AdminLogin.jpg";
import { Toaster, toast } from "react-hot-toast";
import { collection, getDocs, where, query } from "firebase/firestore";
// import app from "../components/firebase";

function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [envEmail, setEnvEmail] = useState("");
  // const [envPassword, setEnvPassword] = useState("");

  // const adminRef = collection(database, "AdminDetails");
  // useEffect(() => {
  //   const getAdmin = async () => {
  //     try {
  //       const querySnapshot = await getDocs(adminRef);
  //       querySnapshot.docs.forEach((doc) => {
  //         setEnvEmail(doc.data().email);
  //         setEnvPassword(doc.data().password);
  //       });
  //     } catch (error) {
  //       console.error("Error getting documents: ", error);
  //     }
  //   };
  //   getAdmin();
  // }, [adminRef]);

  const handleLogin = () => {
    const registeredUsersRef = collection(database, "AdminDetails");
    const q = query(
      registeredUsersRef,
      where("email", "==", email),
      where("password", "==", password)
    );

    const checkUser = async () => {
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          toast.success("Login Successfull !!");
          navigate("/adminpanel");
          // console.log("User exists");
        } else {
          toast.error("Invalid Credentails !!");
          // console.log("User does not exist");
        }
      } catch (error) {
        console.error("Error searching for user:", error);
      }
    };

    checkUser();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: "linear" }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container-fluid d-flex justify-content-center align-items-center flex-column">
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ position: "fixed", zIndex: -2 }}
        >
          <img src={AdminLogin} alt="" />
        </div>
        <form action="submit">
          <div
            className="overlay-div-admin"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
              // width: "100%",
              // maxWidth: "70%",
            }}
          >
            <h3>Admin Login</h3>
            <input
              type="text"
              placeholder=" Email Address"
              style={{ borderRadius: "20px" }}
              value={email}
              autoComplete="username"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              style={{ borderRadius: "20px" }}
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              // radius=""
              className="btn"
              onClick={handleLogin}
              style={{
                borderRadius: "20px",
                width: "100%",
                backgroundColor: "#018673",
                color: "white",
              }}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Admin;
