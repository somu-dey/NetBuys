import React from "react";
import "./Login.css";
import { useState } from "react";
import "firebase/auth";
import image from "../images/6310507.jpg";
import { Link, useNavigate } from "react-router-dom";
// import { BsGoogle } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
// import Header from "../components/Header";
import { toast, Toaster } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { database } from "./firebase";
function Login() {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  // const handlebuttonclick = async (e) => {
  //   e.preventDefault();
  //   toast.dismiss();
  //   let isValid = true;
  //   if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
  //     toast.error("Invalid Email Address !", { position: "top-center" });
  //     isValid = false;
  //   }
  //   if (!password || password.length < 8) {
  //     toast.error("Password must be at least 8 characters !", {
  //       position: "top-center",
  //     });
  //     isValid = false;
  //   } else if (isValid) {
  //     console.log(email, password);
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       };
  //       const { data } = await axios.post(
  //         "http://localhost:5000/api/users/login",
  //         {
  //           email,
  //           password,
  //         },
  //         config
  //       );
  //       toast.success("Login Successful", {
  //         position: "top-center",
  //       });
  //       console.log(data);
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //     } catch (error) {
  //       setError(error.response.data.message);
  //       toast.error("Email or Password is Incorrect", {
  //         position: "top-center",
  //       });
  //       console.log(error.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handlebuttonclick();
  // });

  //main function of layout

  //
  // {*handler for google singin*}
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);
      // const user = result.user;
      // console.log(user);
      toast.success("Login Successful", {
        position: "top-center",
        duration: "600",
      });
      // const collectionRef = doc();
      await setDoc(doc(database, "RegisteredUsers", auth.currentUser.uid), {
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        image: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: auth.currentUser.email,
          name: auth.currentUser.displayName,
          image: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
        })
      );
      // setTimeout(() => {
      navigate("/");
      // }, 2000);
    } catch (error) {
      console.error(error);
      // console.log("Google SignIn Failed");
    }
  };
  const [password, setPassword] = useState("");
  const [showPass, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPass);
  };

  const handlesubmit2 = async (e) => {
    e.preventDefault();
    toast.dismiss();
    let isValid = true;
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Invalid Email Address !", {
        position: "top-center",
        duration: "600",
      });
      isValid = false;
    }
    if (!password || password.length < 8) {
      toast.error("Password too short !", {
        position: "top-center",
        duration: "600",
      });
      isValid = false;
    } else if (isValid)
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        // console.log(data, "authdata");
        toast.success("Login Successful", {
          position: "top-center",
          duration: "600",
        });
        await setDoc(doc(database, "RegisteredUsers", auth.currentUser.uid), {
          email: auth.currentUser.email,
          name: auth.currentUser.displayName,
          image: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            image: auth.currentUser.photoURL,
            uid: auth.currentUser.uid,
          })
        );
        // setTimeout(() => {
        navigate("/");
        // }, 2000);
      } catch (error) {
        // setError(error.message);
        toast.error("Email or Password is Incorrect", {
          position: "top-center",
          duration: "600",
        });
        // console.er(error.message);
        console.error("Error during user creation:", error.message);
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
        <Toaster position="top-center" reverseOrder={false} />
        <div
          className="maindiv1 d-flex  shadow w-100"
          style={{ boxSizing: "border-box" }}
        >
          <div className="leftdiv ">
            <img src={image} alt="" />
          </div>
          <div className="rightdiv d-flex flex-column justify-content-center align-items-center gap-2">
            <h2 className="mb-4">Sign In</h2>
            <div className="custom-width d-flex flex-column gap-2">
              <input
                type="email"
                placeholder="Email Address"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                style={{ borderRadius: "20px" }}
              />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="d-flex custom-width px-1 align-items-center justify-content-between">
              <div className="d-flex justify-content-center align-items-center  ">
                <input
                  className="rounded-0"
                  type="checkbox"
                  checked={showPass}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label"
                  style={{ fontSize: "13px" }}
                >
                  Show Password
                </label>
              </div>
              <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
                <span style={{ fontSize: "13px" }}>Forgot Password?</span>
              </Link>
            </div>
            <Button
              // radius=""
              className="custom-width btn"
              onClick={handlesubmit2}
              style={{
                borderRadius: "20px",
                backgroundColor: "rgb(0, 128, 255)",
                color: "white",
              }}
            >
              Login
            </Button>
            <div className="custom-width d-flex flex-column gap-2">
              <p style={{ fontSize: "13px" }}>
                Don't have an account ?{" "}
                <span style={{ color: "#002c92", cursor: "pointer" }} />
                <Link to="/register" style={{ textDecoration: "None" }}>
                  Create An Account
                </Link>
                <div
                  className="container"
                  style={{
                    display: "flex",
                    margin: "1rem 0px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ flex: "1", borderBottom: "2px solid black" }}
                  ></div>
                  <div
                    style={{
                      width: "2rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    OR
                  </div>
                  <div
                    style={{ flex: "1", borderBottom: "2px solid black" }}
                  ></div>
                </div>
                <button
                  className="btn custom-width"
                  onClick={handleGoogleSignIn}
                  style={{
                    width: "100%",
                    // borderRadius: "20px",
                    backgroundColor: "#A6C9FF",
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  <FcGoogle style={{ fontSize: "2rem", marginRight: "15px" }} />
                  {/* <BsGoogle  /> */}
                  Sign In With Google
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { database } from "./firebase";
// import { toast, Toaster } from "react-hot-toast";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import image from "../images/6310507.jpg";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   const handlesubmit2 = async (e) => {
//     e.preventDefault();
//     toast.dismiss();
//     let isValid = true;
//     if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
//       toast.error("Invalid Email Address !", { position: "top-center" });
//       isValid = false;
//     }
//     if (!password || password.length < 8) {
//       toast.error("Password too short !", {
//         position: "top-center",
//       });
//       isValid = false;
//     } else if (isValid)
//       try {
//         const data = await signInWithEmailAndPassword(
//           database,
//           email,
//           password
//         );
//         console.log(data, "authdata");
//         toast.success("Login Successful", {
//           position: "top-center",
//         });
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } catch (error) {
//         setError(error.message);
//         toast.error("Email or Password is Incorrect", {
//           position: "top-center",
//         });
//         console.log(error.message);
//         console.error("Error during user creation:", error.message);
//       }
//   };

//   return (
//     <Container
//       fluid
//       className="d-flex justify-content-center align-items-center p-0 m-0"
//     >
//       <Toaster position="top-center" reverseOrder={true} />
//       <Row className="maindiv d-flex shadow">
//         <Col md={6} sm={3} className="leftdiv">
//           <img src={image} alt="" style={{ width: "100%" }} />
//         </Col>
//         <Col
//           md={6}
//           className="rightdiv d-flex flex-column justify-content-center align-items-center gap-2 p-3"
//         >
//           <h2 className="mb-2">Sign in</h2>
//           <Form className="custom-width d-flex flex-column gap-2">
//             <Form.Control
//               type="email"
//               placeholder="Email Address"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//             />
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form>
//           {/* <div className="d-flex custom-width px-1 align-items-center justify-content-between"> */}
//           {/* <div className="d-flex justify-content-center align-items-center gap-1">
//               <Form.Check type="checkbox" id="rememberMe">
//                 <Form.Check.Input className="rounded-0" />
//                 <Form.Check.Label style={{ fontSize: "13px" ,padding:"3px"}}>
//                   Remember Me
//                 </Form.Check.Label>
//               </Form.Check>
//             </div> */}
//           {/* <Link to="/forgot-password" style={{ fontSize: "13px" }}>
//               Forgot Password?
//             </Link> */}
//           {/* </div> */}
//           <Button
//             className="custom-width mt-2"
//             onClick={handlesubmit2}
//             style={{
//               borderRadius: "2px",
//               backgroundColor: "rgb(0, 128, 255)",
//               color: "white",
//               fontSize: "15px",
//               border: "none",
//             }}
//           >
//             Login
//           </Button>

//           <p style={{ fontSize: "13px" }}>
//             Don't have an account?{" "}
//             <Link to="/register" style={{ color: "#002c92" }}>
//               Create an account
//             </Link>
//           </p>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Login;
