import React from "react";
import "./Myprofile.css";
import Myprofile from "../images/Myprofile.jpg";
function MyProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem("user")) {
    var imgUrl = user.image;
    var userExists = true;
  } else {
    imgUrl = false;
    userExists = false;
  }

  return (
    <div
      className="m-0 p-0 container-fluid d-flex"
      style={{
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        className="m-0 p-0 container-fluid d-flex "
        style={{ zIndex: "-20" }}
      >
        {/* <img
          style={{ width: "100vw", height: "100vh" }}
          src={Myprofile}
          alt=""
        /> */}
      </div>
      <div
        className="row profileDiv"
        style={{
          position: "absolute",
          gap: "1rem",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#190482",
          color: "white",
          //   width: "35%",
          padding: "1rem",
          borderRadius: "20px",
        }}
      >
        <h4 style={{ textDecoration: "underline" }}>Profile </h4>
        <img
          src={imgUrl}
          alt=""
          style={{ height: "9rem", width: "10rem", borderRadius: "50%" }}
        />
        <h4>User Id</h4>
        {user.uid}
        <h4>UserName</h4>
        {user.name}
        <h4>Email Id</h4>
        {user.email}
      </div>
    </div>
  );
}

export default MyProfile;
