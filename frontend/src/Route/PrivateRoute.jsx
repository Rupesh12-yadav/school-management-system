import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// roles = array of allowed roles
const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />; // Not logged in
  if (roles && !roles.includes(user.role.toLowerCase())) return <Navigate to="/login" replace />; // Role not allowed

  return children; // Access granted
};

export default PrivateRoute;
