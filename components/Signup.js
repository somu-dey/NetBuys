import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
// import Header from "../components/Header";
import { motion } from "framer-motion";
import image from "../images/Mobile-login.jpg";
import { Link, useNavigate } from "react-router-dom";
// import { database } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { database } from "./firebase";
function Signup() {
  // const [firstName, setName] = useState("");
  // const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");

  const navigate = useNavigate();

  // const [error, setError] = useState(false);

  // const handleButtonClick = async (e) => {
  //   e.preventDefault();
  //   toast.dismiss(); // Clear any previous toasts
  //   let isValid = true;

  //   // email format
  //   if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
  //     toast.error("Invalid Email Address !", { position: "top-center" });
  //     isValid = false;
  //   }

  //   // password
  //   if (!password || password.length < 8) {
  //     toast.error("Password must be at least 8 characters !", {
  //       position: "top-center",
  //     });
  //     isValid = false;
  //   }
  //   if (!phoneno || phoneno.length < 10) {
  //     toast.error("Phone Number must be of 10 digits !", {
  //       position: "top-center",
  //     });
  //     isValid = false;
  //   }
  //   if (isValid) {
  //     // successful login
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       };
  //       const { data } = await axios.post(
  //         "http://localhost:5000/api/users/register",
  //         {
  //           firstName,
  //           lastName,
  //           email,
  //           password,
  //         },
  //         config
  //       );
  //       // console.log(data);
  //       toast.success("Successfully Registered", {
  //         position: "top-center",
  //       });
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //     } catch (error) {
  //       setError(error.reponse.data.message);
  //       toast.error("Email or Password is Incorrect", {
  //         position: "top-center",
  //       });
  //       console.log(error.message);
  //     }
  //   }

  //   // console.log(firstName, lastName, email, password, phoneno);
  // };
  const handlesubmit1 = async (e) => {
    const auth = getAuth(); // Use getAuth() to get the authentication instance

    e.preventDefault();
    toast.dismiss(); // Clear any previous toasts
    let isValid = true;

    // email format
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Invalid Email Address !", { position: "top-center" });
      isValid = false;
    }

    // password
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters !", {
        position: "top-center",
      });
      isValid = false;
    }
    if (!phoneno || phoneno.length < 10 || phoneno.length > 10) {
      toast.error("Phone Number must be of 10 digits !", {
        position: "top-center",
      });
      isValid = false;
    }
    if (isValid)
      try {
        // const auth = getAuth(); // Use getAuth() to get the authentication instance
        await createUserWithEmailAndPassword(auth, email, password);
        // const user = userCredential.user;

        toast.success("Successfully Registered", {
          position: "top-center",
        });

        await setDoc(doc(database, "RegisteredUsers", auth.currentUser.uid), {
          email: auth.currentUser.email,
          name: auth.currentUser.displayName,
          image: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
        });
        // setTimeout(() => {
        navigate("/login");
        // }, 2000);
        // console.log(user, "authdata");
      } catch (error) {
        // setError(error.reponse.data.message);
        toast.error("Account already exist", {
          position: "top-center",
        });
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
      {/* <Header /> */}
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ padding: 0, margin: 0 }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div
          className="maindiv1 d-flex shadow w-100 "
          style={{ boxSizing: "border-box" }}
        >
          <div className="leftdiv ">
            <img src={image} alt="" style={{ width: "100%" }} />
          </div>
          <div className="rightdiv d-flex flex-column justify-content-center align-items-center gap-2">
            <h2 className="mb-4">Sign Up</h2>
            <div className="custom-width d-flex flex-column gap-2">
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <input
                  type="text"
                  style={{ width: "50%", borderRadius: "20px" }}
                  placeholder="First Name"
                  // onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  style={{ width: "50%", borderRadius: "20px" }}
                  placeholder="Last Name"
                  // onChange={(e) => setlastName(e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ borderRadius: "20px" }}
              />
              <input
                type="text"
                placeholder="Mobile Number"
                onChange={(e) => setPhoneno(e.target.value)}
                value={phoneno}
                style={{ borderRadius: "20px" }}
              />
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <button
              className="custom-width btn"
              onClick={handlesubmit1}
              style={{
                borderRadius: "20px",
                backgroundColor: "#FF4F5A",
                color: "white",
              }}
            >
              Sign Up
            </button>

            <p style={{ fontSize: "13px" }}>
              Already have an account ?{" "}
              <span style={{ color: "#002c92", cursor: "pointer" }} />
              <Link to="/login" style={{ textDecoration: "None" }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Signup;
