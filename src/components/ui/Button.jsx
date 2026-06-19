import React from 'react';

export default function Button({ text, onClick, disabled = false, fullWidth = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#9a958e' : '#111111',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '2px',
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        width: fullWidth ? '100%' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'opacity 0.2s ease',
      }}
    >
      {text}
    </button>
  );
}
