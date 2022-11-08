import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";
import routes from "../routes/routes";
import PageLoading from "../components/pageLoading";

const LoginRedirect = ({ children }) => {
  const authUser = useContext(AuthContext);

  // during first run/render, role is undefined
  // but is logged in
  if (!authUser.user.role && localStorage.getItem("isLogin") !== null) {
    // return loading screen
    return <PageLoading />;
  }

  if (authUser.user.role === "admin") {
    return <Navigate to={routes.admin.ADMIN_DASHBOARD} replace />;
  }

  if (authUser.user.role === "user") {
    return <Navigate to={routes.user.DASHBOARD} replace />;
  }

  return children;
};

export default LoginRedirect;
