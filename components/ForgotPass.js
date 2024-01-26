import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { toast, Toaster } from "react-hot-toast";
import ForgotPass from "../images/ForgotPass.jpg";
const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  // const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent, please check your email !!", {
        position: "top-center",
      });
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // gap: "1rem",
          // padding: "1rem",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />{" "}
        <h2>Forgot Password ?</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //   height: "50vh",
            position: "",
            zIndex: "-2",
          }}
        >
          <img src={ForgotPass} alt="" />
        </div>
        <div className="row" style={{ position: "absolute", gap: "1rem" }}>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            placeholder="Enter You Registered Email-Id "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderRadius: "20px" }}
          />
          <Button
            className=" btn "
            style={{
              backgroundColor: "#33186B",
              color: "white",
              borderRadius: "20px",
            }}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </div>
        <Button
          className="btn"
          style={{
            backgroundColor: "#33186B",
            color: "white",
            borderRadius: "20px",
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Sign In With New Password
        </Button>
      </div>
    </>
  );
};

export default ForgotPassword;
