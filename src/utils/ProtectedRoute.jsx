import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const isSessionLoaded = useSelector((state) => state.user.isSessionLoaded);

  useEffect(() => {
    console.log("isSessionLoaded changed:", isSessionLoaded);
  }, [isSessionLoaded]);

  if (isSessionLoaded) {
    if (!isLoggedin) {
      return <Navigate to="/" replace />;
    }
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
