import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "0.125rem",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
