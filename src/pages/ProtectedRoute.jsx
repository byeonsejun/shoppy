import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  // console.log(user);
  
  if(user===null || (requireAdmin && !user.isAdmin)) {
    // console.log(user);
    return <Navigate to="/" replace={true} />
  }
  return children;
  
}

