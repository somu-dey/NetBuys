import React, { useRef, useEffect, useState } from "react";
import Message from "../images/Message.jpg";
// import Messages from "./Messages";
import "./Chat.css";
import { collection, orderBy, query } from "firebase/firestore";
import { database } from "../components/firebase";
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
      className="container-fluid"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        // backgroundColor: "#FCF0C8",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          // backgroundColor: "#4622FE",
          padding: "20px",
        }}
      >
        <h1>NetBuys ChatRoom</h1>
      </div>
      <div
        className="msgsDiv"
        style={{
          display: "flex",
          overflowY: "auto",
          flexDirection: "column",
          // padding: "5rem",
          backgroundImage: `url(${Message})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          gap: "1rem",
        }}
      >
        {messages &&
          messages.map((message) => (
            <div
              className="top-msg-div"
              key={message.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                rowGap: "2rem",
                wordWrap: "break-word",
                textAlign: "justify",
              }}
            >
              {message.uid === user.uid ? (
                <div
                  style={{
                    maxWidth: "60%",
                    padding: ".5rem 1rem ",
                    backgroundColor: "#EDE4FF",
                    borderRadius: "0px 10px 10px 10px",
                    alignSelf: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "10px" }}>{message.name}</span>
                  <p key={message.id} style={{ margin: 0 }}>
                    {message.text}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: "60%",
                    padding: ".5rem 1rem",
                    background: "#4622FE",
                    borderRadius: "10px 0px 10px 10px",
                    wordWrap: "break-word",
                    // alignSelf: "flex-end",
                    justifyContent: "center",
                    marginLeft: "auto",
                    // right: "40%",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "white" }}>
                    {message.name}
                  </span>
                  <p key={message.id} style={{ margin: 0, color: "white" }}>
                    {message.text}
                  </p>
                </div>
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
