import React from "react";
import {
  BsMenuButtonWide,
  Bs0Circle,
  BsBookmark,
  BsLightbulb,
  BsPersonCircle,
} from "react-icons/bs";
import logo from "./chowfit.png";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        maxWidth: "100vw",
        overflow: "hidden",
        backgroundColor: "#111928",
      }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <BsMenuButtonWide size={24} color="white" />
        <img src={logo} style={{ height: "1.5rem" }} />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <BsBookmark size={24} color="white" />
        <BsLightbulb size={24} color="white" />
        <BsPersonCircle size={24} color="white" />
      </div>
    </div>
  );
}

export default Navbar;
