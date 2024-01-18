import React, { useState } from "react";
import { database } from "../components/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { toast, Toaster } from "react-hot-toast";
import { BiSend } from "react-icons/bi";
// import { Button } from "@nextui-org/react";
const SendMessages = ({ scroll, sellerId }) => {
  const [input, setInput] = useState("");
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast.error("Enter Message First !", {
        position: "top-center",
      });
      return;
    }
  };

  return <div></div>;
};

export default SendMessages;
