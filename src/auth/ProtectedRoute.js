import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoading }) => {
  const authUser = useContext(AuthContext);
  console.log(authUser.user);
  console.log(isLoading);
  if (authUser.user.role !== "admin" && isLoading) {
    return <Navigate to="/error-404" replace />;
  }

  return children;
};

export default ProtectedRoute;
