import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNav({ sliceUrl }) {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '48px',
        marginBottom: '8px',
        fontSize: '12px',
        letterSpacing: '0.1em',
        color: '#8a857e',
      }}
    >
      {!sliceUrl ? (
        <>
          <Link to="/">HOME</Link> <span style={{ margin: '0 6px' }}>/</span>
          <span style={{ fontWeight: 700, color: '#111111' }}>SHOP</span>
        </>
      ) : (
        <>
          <Link to="/">HOME</Link> <span style={{ margin: '0 6px' }}>/</span>
          <Link to="/shop">SHOP</Link> <span style={{ margin: '0 6px' }}>/</span>
          <span style={{ fontWeight: 700, color: '#111111', textTransform: 'uppercase' }}>{sliceUrl}</span>
        </>
      )}
    </div>
  );
}
