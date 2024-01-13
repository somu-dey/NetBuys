import React, { useState } from "react";
import { database } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FiSend } from "react-icons/fi";
import { Button } from "@nextui-org/react";
const SendMessages = ({ scroll }) => {
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Enter a message first");
      return;
    }
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);
    // var name = user.displayName;
    await addDoc(collection(database, "messages"), {
      text: input,
      name: user?.name,
      uid: user?.uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  const [input, setInput] = useState("");
  return (
    <div style={{ width: "85%", rowGap: "3rem" }}>
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "2rem",
            gap: "2rem",
          }}
        >
          <textarea
            // type="text"
            value={input}
            cols="50"
            placeholder="Message"
            rows="1"
            onChange={(e) => setInput(e.target.value)}
            style={{ borderRadius: "5px" }}
          ></textarea>
          {/* <textarea type="text" value={input} placeholder="Enter Message" /> */}
          <Button
            // className="btn "
            color="primary"
            style={{
              borderRadius: "60px",
              top: "2px",
              // width: "3px",
              border: "none",
            }}
            onClick={sendMessageHandler}
          >
            <FiSend />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMessages;
