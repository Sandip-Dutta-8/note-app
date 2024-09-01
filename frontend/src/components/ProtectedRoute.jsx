import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the sign-in page
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;
