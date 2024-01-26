import React from "react";
// import { auth } from "./firebase";

const Messages = (props) => {
  // const <style></style>
  // console.log(props);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const isCurrentUserMessage = props.message.uid === user.uid;

  const containerStyle = {
    textAlign: isCurrentUserMessage ? "left" : "right",
    display: "flex",
    justifyContent: isCurrentUserMessage ? "left" : "right",
    borderRadius: "30px",
    // rowGap: "2rem",
    // height: "auto",
    position: "relative",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    margin: "8px",
    padding: "5px",
    backgroundColor: isCurrentUserMessage ? "#EDE4FF" : "#6528F7",
    color: isCurrentUserMessage ? "black" : "white",
  };
  return (
    <div
      className="container"
      style={
        {
          // overflow: "auto",
          // whiteSpace: "nowrap",
          // // wordWrap: "break-word",
          // textOverflow: "ellipsis",
        }
      }
    >
      <div style={containerStyle} className="flex-row">
        <p style={{ fontSize: "10px" }}>{props.message.name}</p>
        <p key={props.id}>{props.message.text}</p>
      </div>
    </div>
  );
};

export default Messages;
