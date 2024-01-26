import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../components/firebase";
import { useNavigate } from "react-router-dom";
function ChatUsers() {
  const user = localStorage.getItem("user");
  var userData = JSON.parse(user);
  const [, setAllUsers] = useState([]);
  const [allChatUser, setAllChatUsers] = useState([]);
  const navigate = useNavigate();
  const fetchUsers = async (id) => {
    try {
      const docRef = doc(database, "RegisteredUsers", id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // If the document exists, extract the data
        const userData = { ...docSnapshot.data(), id: docSnapshot.id };
        setAllChatUsers((prevUsers) => {
          if (!prevUsers.some((user) => user.id === userData.id)) {
            return [...prevUsers, userData];
          }
          return prevUsers;
        });
      } else {
        // Handle the case where the document does not exist
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const usersCollectionRef = collection(
          database,
          "users",
          userData.uid,
          "chatUsers"
        );

        // Execute the query to get all documents in the 'users' collection
        const querySnapshot = await getDocs(usersCollectionRef);

        // Extract the data from the query snapshot
        var allUsersFetch = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllUsers(allUsersFetch);

        // Fetch user details for each user in allUsers
        allUsersFetch.forEach((user) => fetchUsers(user.id));
      } catch (error) {
        console.error(error);
      }
    };

    // Call the function to fetch chat users
    fetchChatUsers();
  }, [userData.uid]);

  const chatRedirectHandler = (id) => {
    // ipreventDefault();
    navigate("/chat", { state: { props: id } });
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div style={{ display: "flex", paddingTop: "2rem" }}>
        <h1>Select Chat User</h1>
      </div>
      {allChatUser.map((data, index) => (
        <div
          className="d-flex"
          key={data.id}
          style={{
            // height: "10rem",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {userData.uid !== data.uid ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#4244E6",
                alignItems: "center",
                color: "white",
                padding: "1rem",
                borderRadius: "20px",
                width: "18rem",
                gap: "1rem",
                cursor: "pointer",
              }}
              onClick={() => chatRedirectHandler(data.id)}
            >
              {/* <p>{data.id}</p> */}
              <img
                src={data.image}
                alt=""
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "100%",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <h4>{data.name}</h4>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatUsers;
