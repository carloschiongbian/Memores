import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";
import PageLoading from "../components/pageLoading";

const UserRoute = ({ children }) => {
  const authUser = useContext(AuthContext);

  // during first run/render, role is undefined
  // but is logged in
  if (!authUser.user.role && 
    localStorage.getItem("isLogin") !== null) {
    // return loading screen
    return <PageLoading />
  }

  // if role is not user OR not logged in
  // access to resources is not allowed
  if (
    authUser.user.role !== "user" ||
    localStorage.getItem("isLogin") === null
  ) {
    return <Navigate to="/error-404" replace />;
  }

  return children;
};

export default UserRoute;
