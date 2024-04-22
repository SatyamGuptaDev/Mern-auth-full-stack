import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ element, ...rest }) {
  const user = useSelector((state) => state.user.currentUser);

  return user ? <Outlet/ : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
