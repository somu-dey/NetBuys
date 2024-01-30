import React, { useRef, useEffect, useState } from "react";
import Message from "../images/Message.jpg";
import { motion } from "framer-motion";

import { useLocation } from "react-router-dom";
import "./Chat.css";
// import catHello from "../images/cat-bonjour.gif";
import { BiSend } from "react-icons/bi";
import { addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { collection, orderBy, query } from "firebase/firestore";
import { database } from "../components/firebase";
import { onSnapshot } from "firebase/firestore";
const Chat = () => {
  const [enteredMsg, setEnteredMsg] = useState("");
  // retrieve seller id from ProductDetails
  const location = useLocation();
  const sellerId = location.state?.props;

  // console.log(sellerId);
  const userExist = JSON.parse(localStorage.getItem("user"));
  var userId = userExist.uid.toString();
  const scroll = useRef();
  const [allMessages, setAllMessages] = useState([]);
  // const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    try {
      if (sellerId) {
        const unsub = onSnapshot(
          query(
            collection(
              database,
              "users",
              userId,
              "chatUsers",
              sellerId,
              "messages"
            ),
            orderBy("timestamp")
          ),
          (snapshot) => {
            setAllMessages(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                messages: doc.data(),
              }))
            );
          }
        );
        return unsub;
      }
    } catch (error) {
      console.error(error);
    }
  }, [sellerId, userId]);

  useEffect(() => {
    // Scroll to the end when messages change
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    // console.log(sellerId);
    // console.log(userId);
    try {
      if (enteredMsg === "") {
        toast.error("Enter a message first !", {
          position: "top-center",
        });
        return;
      }

      if (userId === sellerId) {
        const docRef = doc(database, "users", userId);

        await setDoc(
          docRef,
          {
            temp: "uid", // new field or updated value
          },
          { merge: true }
        );

        await addDoc(
          collection(
            database,
            "users",
            userId,
            "chatUsers",
            sellerId,
            "messages"
          ),
          {
            username: userExist.name,
            messageUserId: userId,
            message: enteredMsg,
            timestamp: serverTimestamp(),
          }
        );
      } else {
        // adding dummy element for persistency
        const docRef = doc(database, "users", userId);
        await setDoc(
          docRef,
          {
            temp: "uid", // new field or updated value
          },
          { merge: true }
        );
        const docRef1 = doc(database, "users", userId, "chatUsers", sellerId);
        await setDoc(
          docRef1,
          {
            temp: "uid", // new field or updated value
          },
          { merge: true }
        );
        const docRef2 = doc(database, "users", sellerId, "chatUsers", userId);
        await setDoc(
          docRef2,
          {
            temp: "uid", // new field or updated value
          },
          { merge: true }
        );

        await addDoc(
          collection(
            database,
            "users",
            userId,
            "chatUsers",
            sellerId,
            "messages"
          ),
          {
            username: userExist.name,
            messageUserId: userId,
            message: enteredMsg,
            timestamp: serverTimestamp(),
          }
        );
        await addDoc(
          collection(
            database,
            "users",
            sellerId,
            "chatUsers",
            userId,
            "messages"
          ),
          {
            username: userExist.name,
            messageUserId: userId,
            message: enteredMsg,
            timestamp: serverTimestamp(),
          }
        );
      }
      setEnteredMsg("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessageHandler(e);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, type: "linear" }}
    >
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
        <Toaster position="top-center" reverseOrder={false} />
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
          {/* {console.log(allMessages.length)} */}
          {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>New Chat Say ,</h1>
          <img src={catHello} alt="" />
        </div> */}
          {allMessages &&
            allMessages.map(({ messages, id }) => (
              <div
                className="top-msg-div"
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  rowGap: "2rem",
                  wordWrap: "break-word",
                  textAlign: "justify",
                }}
              >
                {userExist.uid === messages.messageUserId ? (
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
                      {messages.username}
                    </span>
                    <p key={messages.id} style={{ margin: 0, color: "white" }}>
                      {messages.message}
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      maxWidth: "60%",
                      padding: ".5rem 1rem ",
                      backgroundColor: "#EDE4FF",
                      borderRadius: "0px 10px 10px 10px",
                      alignSelf: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: "10px" }}>
                      {messages.username}
                    </span>
                    <p key={messages.id} style={{ margin: 0 }}>
                      {messages.message}
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
          <div
            style={{
              display: "flex",
              width: "85%",
              rowGap: "3rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Toaster position="top-center" reverseOrder={false} />

            <form>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "1rem",
                  // margin: "1rem",
                  gap: "1rem",
                  alignItems: "center",
                  // justifyContent: "space-around",
                }}
              >
                <textarea
                  type="text"
                  value={enteredMsg}
                  cols="50"
                  placeholder="Message"
                  rows="1"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEnteredMsg(e.target.value)}
                  style={{ borderRadius: "5px" }}
                ></textarea>
                {/* <textarea type="text" value={input} placeholder="Enter Message" /> */}
                <button
                  className="btn rounded-full"
                  style={{
                    backgroundColor: "#4622FE",
                    color: "white",
                  }}
                  onClick={sendMessageHandler}
                >
                  <BiSend style={{ fontSize: "25px" }} />
                </button>
              </div>
            </form>
          </div>
          {/* <SendMessages scroll={scroll} sellerId={sellerId} /> */}
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
