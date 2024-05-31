import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { database } from "../components/firebase";

function UserChats() {
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const docRef = collection(database, "ContactUsMessages");
        const docSnapshot = await getDocs(docRef);
        var allMessage = [];
        docSnapshot.docs.forEach((doc) => {
          allMessage.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setAllMessages(allMessage);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // textAlign: "left",
        flexDirection: "column",
      }}
    >
      {allMessages.map((doc) => (
        <div
          key={doc.id}
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            backgroundColor: "#190482",
            // alignItems: "center",
            color: "white",
            margin: "1rem",
            borderRadius: "30px",
            width: "70%",
          }}
        >
          <div
            key={doc.id}
            style={{
              display: "flex",
              gap: "2rem",
              // justifyContent: "center",
              // alignItems: "center",
              // textAlign: "left",
              marginTop: "1rem",
            }}
          >
            <p>UserName: {doc.name}</p>
            <p>Message: {doc.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserChats;
