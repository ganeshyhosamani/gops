import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Branding from "./Branding";
export default () => {
  return (
    <div
      style={{
        height: 60,
        borderBottom: "1px solid #e1e1e1",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Branding />
      <div style={{ flex: 1 }}></div>
    </div>
  );
};
