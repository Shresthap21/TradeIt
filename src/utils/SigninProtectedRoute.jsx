import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const SigninProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const isSessionLoaded = useSelector((state) => state.user.isSessionLoaded);

  //TODO: refactor login check


    if (isLoggedin) {
      return <Navigate to="/dashboard" replace />;
    }

  return children;

 
  // TODO:
  // if (!isLoggedin) {
  //   return <Navigate to="/" replace />;
  // }
  // if (isSessionLoaded) {
  //   if (isLoggedin && !hasAccess(requiredRoles)) {
  //     return <Navigate to="/unauthorized" replace />;
  //   }
  //   return children;
  // }
};

export default SigninProtectedRoute;
