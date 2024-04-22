// Import statements
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Corrected import

// PrivateRoute Component
function PrivateRoute({ element }) {
  const user = useSelector((state) => state.user.currentUser);

  return <>{user ? element : <Navigate to="/sign-in" />}</>;
}

export default PrivateRoute;
