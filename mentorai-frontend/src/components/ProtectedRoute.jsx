import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Redirects to login if user is not authenticated
 * Directly checks localStorage to ensure latest auth state
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
