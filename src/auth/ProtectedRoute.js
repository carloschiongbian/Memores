import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authUser = useContext(AuthContext);

  if (
    authUser.user.role !== "admin" ||
    Object.keys(authUser.user).length === 0
  ) {
    return <Navigate to="/error-404" replace />;
  }

  return children;
};

export default ProtectedRoute;
