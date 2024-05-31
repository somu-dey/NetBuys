import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
// import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../components/firebase";
// import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";
function AdminPanel() {
  const [allUsers, setAllUsers] = useState([]);
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const docRef = collection(database, "RegisteredUsers");
        const docSnapshot = await getDocs(docRef);

        // Use forEach to iterate over the documents
        var allUsersFetch = [];
        docSnapshot.docs.forEach((doc) => {
          allUsersFetch.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setAllUsers(allUsersFetch);
        // console.log(allUsersFetch);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    return;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5, type: "linear" }}
      >
        <div
          className="container-fluid p-0"
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            boxSizing: "border-box",
          }}
        >
          <div
            className="left1-div  flex-column"
            style={{
              // width: "5%",
              backgroundColor: "#190482",
              // height: "100vh",
              color: "black",
              justifyContent: "flex-start",
              // alignItems: "center",
              display: "flex",
              // position: "fixed",
            }}
          >
            <div className="d-flex " style={{ height: "5rem" }}>
              {isSidebarOpen ? (
                <RxCross2
                  style={{
                    fontSize: "45px",
                    color: "white",
                    margin: "1.5rem",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={closeSidebar}
                />
              ) : (
                <RxHamburgerMenu
                  style={{
                    fontSize: "35px",
                    margin: "1.7rem",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={closeSidebar}
                />
              )}
            </div>
            <div
              className="flex-column"
              style={{
                backgroundColor: "#190482",
                // height: "100vh",
                color: "white",
                // justifyContent: "flex-start",
                // alignItems: "center",
                display: isSidebarOpen ? "flex" : "none",
                // transition: ".3s all ease-in-out",
                // position: "absolute",
              }}
            >
              <ul style={{ margin: "0px", padding: "0px" }}>
                <li
                  style={{
                    listStyle: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  Dashboard
                </li>
                <Link
                  to="/userChats"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <li
                    style={{
                      listStyle: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    UserChats
                  </li>
                </Link>
                <Link
                  to="https://console.firebase.google.com/u/0/project/netbuys-9eaa5/overview"
                  target="blank"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <li
                    style={{
                      listStyle: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Firebase Console
                  </li>
                </Link>
                {/* <Link
                  to="/bookedCars"
                  // target="blank"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <li
                    style={{
                      listStyle: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    View Booked Cars
                  </li>
                </Link> */}
              </ul>
            </div>
          </div>
          <div
            className="d-flex right1-div"
            style={{
              width: "100%",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            <div
              className="d-flex flex-column "
              style={{ textAlign: "center" }}
            >
              <div
                // className="card-div"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2rem",
                  gap: "2rem",
                  // alignItems: "center",
                  // textAlign: "center",
                  // position: "fixed",
                }}
              >
                <h1>NetBuys Admin Panel</h1>
              </div>
              <div
                className="d-flex card-div-main"
                style={{
                  // gap: "2rem",
                  // width: "90%",
                  flexWrap: "wrap",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="card-div"
                  style={{
                    display: "flex",
                    height: "10rem",
                    // width: "11rem",
                    backgroundColor: "#EB455F",
                    justifyContent: "center",
                    // border: "1px solid black",
                    borderRadius: "10px",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1>8</h1>
                  <h3>No. Of Users</h3>
                </div>
                <div
                  className="card-div"
                  style={{
                    display: "flex",
                    height: "10rem",
                    // width: "11rem",
                    backgroundColor: "#190482",
                    justifyContent: "center",
                    // border: "1px solid black",
                    borderRadius: "10px",

                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1>20</h1>
                  <h3>Total Cars Added</h3>
                </div>
                <div
                  className="card-div"
                  style={{
                    display: "flex",
                    height: "10rem",
                    backgroundColor: "#EB455F",
                    // width: "15rem",
                    justifyContent: "center",
                    // border: "1px solid black",
                    borderRadius: "10px",
                    flexDirection: "column",
                  }}
                >
                  <h1>4</h1>
                  <h3>User Messages</h3>
                </div>
                <div
                  className="card-div"
                  style={{
                    display: "flex",
                    height: "10rem",
                    // width: "15rem",
                    backgroundColor: "#190482",
                    // border: "1px solid black",
                    borderRadius: "10px",

                    flexDirection: "column",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   navigate("/adcar");
                  // }}
                >
                  <h1>+</h1>
                  <h3>Add New Cars</h3>
                </div>
              </div>
              <div className=" d-flex flex-column container-fluid p-0">
                {allUsers.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      display: "flex",
                      // flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: "2rem",
                      // width: "50%",
                      // backgroundColor: "red",
                      padding: "1rem 0 1rem 0",
                    }}
                  >
                    <div
                      className="admin-user-div"
                      style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#018673",
                        padding: ".5rem",
                        borderRadius: "10px",
                        color: "white",
                        // width: "80%",
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={user.image}
                        alt=""
                        style={{ width: "3rem", height: "3rem" }}
                      />
                      <div
                        className="desc-div1"
                        style={{
                          display: "flex",
                          // gap: "1rem",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "1rem",
                          // width: "90%",
                          // flexDirection: "column",
                        }}
                      >
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Id: {user.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default AdminPanel;
