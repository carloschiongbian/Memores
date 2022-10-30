import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const authUser = useContext(AuthContext);

  if (
    authUser.user.role !== "user" ||
    Object.keys(authUser.user).length === 0
  ) {
    return <Navigate to="/error-404" replace />;
  }

  return children;
};

export default UserRoute;
