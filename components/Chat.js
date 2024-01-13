import React, { useRef, useEffect, useState } from "react";
import Messages from "./Messages";
import { collection, orderBy, query } from "firebase/firestore";
import { database } from "./firebase";
import { onSnapshot } from "firebase/firestore";
import SendMessages from "./SendMessages";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const storedUser = localStorage.getItem("user");
  var user = JSON.parse(storedUser);
  useEffect(() => {
    const queryFirestore = query(
      collection(database, "messages"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(queryFirestore, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the end when messages change
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "95vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1>NetBuys ChatRoom</h1>
      </div>
      <div style={{ overflowY: "auto" }}>
        {messages &&
          messages.map((message) => (
            <div key={message.id} style={{ gap: "2rem", rowGap: "2rem" }}>
              {message.uid === user.uid ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      textAlign: "left",
                      flexDirection: "column",
                      rowGap: "0px",
                      margin: "10px",
                      backgroundColor: "#EEF5FF",
                      borderRadius: "5px",
                      // padding: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "8px" }}>{message.name}</span>
                    <p key={message.id}>{message.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      textAlign: "right",
                      flexDirection: "column",
                      rowGap: "0px",
                      margin: "10px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "#6528F7",
                    }}
                  >
                    <span style={{ fontSize: "10px" }}>{message.name}</span>
                    <p key={message.id}>{message.text}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        <span ref={scroll}></span>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "1rem",
          // backgroundColor: "#6528F7",
        }}
      >
        <SendMessages scroll={scroll} />
      </div>
    </div>
  );
};

export default Chat;
