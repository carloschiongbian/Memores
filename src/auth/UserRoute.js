import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children, isLoading }) => {
  const authUser = useContext(AuthContext);

  if (authUser.user.role !== "user" || isLoading === false) {
    return <Navigate to="/error-404" replace />;
  }

  return children;
};

export default UserRoute;
