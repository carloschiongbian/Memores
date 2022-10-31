import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children, isLoading }) => {
  const authUser = useContext(AuthContext);

  if (Object.keys(authUser.user).length === 0 && isLoading) {
    return <Navigate to="/error-404" replace />;
  }

  if (authUser.user.role !== "user" && isLoading === true) {
    return <Navigate to="/error-404" replace />;
  }

  return children;
};

export default UserRoute;
