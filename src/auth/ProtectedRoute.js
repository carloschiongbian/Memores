import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authUser = useContext(AuthContext);

  if (
    Object.keys(authUser.user).length === 0 &&
    localStorage.getItem("isLogin") === null
  ) {
    console.log("here");
    return <Navigate to="/error-404" replace />;
  }

  if (
    authUser.user.role !== "admin" &&
    localStorage.getItem("isLogin") === null
  ) {
    console.log("here 2");
    return <Navigate to="/error-404" replace />;
  }

  return children;
};

export default ProtectedRoute;
