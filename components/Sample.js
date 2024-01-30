import React from "react";
import giphy from "../images/giphy-1--unscreen.gif";
function Sample() {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        // width: "50%",
        height: "20%",
      }}
    >
      <img src={giphy} alt="" />
    </div>
  );
}

export default Sample;
