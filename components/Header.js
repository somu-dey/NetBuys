import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import "./Header.css";
import { Button } from "@nextui-org/react";
// import Modal from "react-modal";
import { toast, Toaster } from "react-hot-toast";
import NoImage from "../images/NoImage.jpg";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [isOverLay, setOverlayVisible] = useState(false);

  // const showOverlay = () => {
  //   setOverlayVisible(true);
  // };
  // const hideOverlay = () => {
  //   setOverlayVisible(false);
  // };

  // const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     zIndex: "1000",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //     transition: "opacity 2s ease, transform 2s ease",
  //   },
  // };

  const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user.uid;
  // console.log(userId);
  // console.log(user);
  if (localStorage.getItem("user")) {
    var imgUrl = user.image;
    var userExists = true;
    // console.log(userExists);
  } else {
    imgUrl = false;
    userExists = false;
  }
  // console.log(imgUrl);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.clear("user");
      navigate("/");

      // imgUrl = undefined;
      console.log("Sign Out Successful");
      toast.success("Sign Out Successful", {
        position: "top-center",
        duration: "600",
      });
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  const handleOptionClick = () => {
    setDropdownOpen(!isDropdownOpen);
    // console.log(isDropdownOpen);
  };

  const postBtnHandler = () => {
    if (userExists) {
      navigate("/adproduct");
    } else {
      toast.error("You Must Login First !!", {
        position: "top-center",
        duration: "600",
      });
    }
  };
  return (
    <div
      className="somu"
      style={{
        // position: "fixed",
        width: "100%",
        boxSizing: "border-box",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // margin: "2rem",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="header">
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        <div className="navbar">
          <ul className="listnav ">
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          {user ? (
            <img
              className="profileimage"
              src={imgUrl ? imgUrl : NoImage}
              onClick={handleOptionClick}
              style={{
                // height: "10px",
                cursor: "pointer",
                borderRadius: "50%",
                border: "2px solid grey",
              }}
              alt="photourl"
            />
          ) : (
            <img
              className="profileimage"
              src={NoImage}
              alt=""
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                border: "2px solid grey",
              }}
            ></img>
          )}

          {isDropdownOpen && userExists ? (
            <div
              className="submenu"
              style={{
                // borderRadius: "100%",
                zIndex: "10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Modal
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
                      onClick={handleLogout}
                    >
                      Yes, Delete
                    </Button>
                  </div>
                </div>
              </Modal> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#4547ED",
                  color: "white",
                  borderRadius: "6px",
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0%",
                    margin: "0%",
                  }}
                >
                  <li>
                    <Link className="nav-link" to="#">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/myads">
                      My Ads
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="#">
                      Favourites
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}

          <Button
            className="btn  postad"
            // radius="sm"
            onClick={postBtnHandler}
            style={{
              backgroundColor: "#4244E6",
              color: "white",
              borderRadius: "20px",
              // marginLeft: "1rem",
            }}
          >
            Post Your Ad
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
