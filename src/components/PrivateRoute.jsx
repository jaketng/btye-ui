import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Adjust path based on your structure

function PrivateRoute({ children }) {
  const { currentUser } = useAuth(); // Get current user from AuthContext

  // If user is authenticated, render the child components; otherwise, redirect to login
  return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
