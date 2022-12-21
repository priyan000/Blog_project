import React from "react";
// import "./images/teamimg.jpg";

function ImageSide() {
  return (
    <div className="mainimage">
      <img
        src={require("./images/teamimg.jpg")}
        alt="Discover the unknown screen"
        className="image"
      ></img>
    </div>
  );
}

export default ImageSide;
