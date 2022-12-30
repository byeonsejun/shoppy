import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div
      style={{ 
        display:"flex",
        alignItems:"center",
        flexShrink:"0",
      }}
    >
      {/* <img
        className="w-10 h-10 rounded-full mr-2"
        src={photoURL}
        alt={displayName}
        referrerPolicy="no-referrer"
      /> */}
      <span 
        style={{
          display:"block",
          cursor:"default"
        }}
      >
        {displayName}
      </span>
    </div>
  );
}
