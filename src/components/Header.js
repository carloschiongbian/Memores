/* eslint-disable jsx-a11y/anchor-is-valid */
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import routes from "../routes/routes";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

const getDynamicHeaderTitle = (route) => {
  switch (route) {
    case getRoute(routes.user.SCREENING):
      return "Screening Assessment";
    case getRoute(routes.user.DASHBOARD):
      return "Dashboard";
    case getRoute(routes.user.PATIENT_RECORDS):
      return "Patient Records";
    case getRoute(routes.user.PATIENT_DETAILS):
      return "Patient Details";
    case getRoute(routes.admin.ADMIN_DASHBOARD):
      return "Dashboard";
    case getRoute(routes.admin.USER_RECORDS):
      return "User Records";
    default:
      return "UNKNOWN ROUTE";
  }
};

const getRoute = (string) => {
  const path = string.split("/");

  // get only the first route name, i.e., '/patient-details', excluding the
  // nested route and url params
  if (path.length > 1) return "/" + path[1];
  return "/";
};

const Header = ({ handleLeftNavigation, isLeftNavigationOpen }) => {
  const currentLocation = useLocation();
  const [title, setTitle] = useState("");
  const authUser = useContext(AuthContext);

  useEffect(() => {
    const route = getRoute(currentLocation.pathname);
    const headerTitle = getDynamicHeaderTitle(route);
    setTitle(headerTitle);
  }, [currentLocation, isLeftNavigationOpen]);

  return (
    <nav
      id="nav"
      className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
      style={{
        transition: "margin-left 0.5s",
        marginLeft: isLeftNavigationOpen ? "250px" : "0px",
      }}
    >
      <div className="container-fluid text-white">
        <div className="d-flex">
          {/* Button for Left Navigation Menu */}
          <button
            className="btn btn-primary me-4"
            onClick={() => handleLeftNavigation()}
          >
            <i
              className={`bi ${
                isLeftNavigationOpen
                  ? "bi-chevron-double-left"
                  : "bi-chevron-double-right"
              }`}
            ></i>
          </button>
          <a href="" className="navbar-brand text-white">
            {title}
          </a>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p
            className="mr-2 mb-0"
            style={{ marginRight: 5 }}
          >{`${authUser.user.uname}`}</p>
          <Avatar
            src={"data:image/png;base64," + authUser.user.photo}
            sx={{ width: 32, height: 32 }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
