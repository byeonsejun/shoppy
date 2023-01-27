import React from "react";
import { Link } from "react-router-dom";

export default function PageNav({ sliceUrl }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      {!sliceUrl ? (
        <>
          <Link to="/">Home</Link> /{" "}
          <span style={{ fontWeight: "bold" }}>Shop</span>
        </>
      ) : (
        <>
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
          <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {sliceUrl.toLowerCase()}
          </span>
        </>
      )}
    </div>
  );
}
