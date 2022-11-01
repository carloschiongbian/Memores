import { Link, useLocation, useNavigate } from "react-router-dom";
import "../public/css/components/LeftNavigationMenu.css";
import routes from "../routes/routes";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { BaseApi } from "../services/api";
import Memores from "../public/images/wisteria-designify.png";

const LeftNavigationMenu = ({ isLeftNavigationOpen }) => {
  const authUser = useContext(AuthContext);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const userNavMenu = [
    {
      link: routes.user.DASHBOARD,
      name: "Dashboard",
      icon: "bi bi-speedometer2",
    },
    {
      link: routes.user.SCREENING,
      name: "Screening",
      icon: "bi bi-person-workspace",
    },
    {
      link: routes.user.PATIENT_RECORDS,
      name: "Patient Records",
      icon: "bi bi-clipboard2-pulse",
    },
  ];

  const adminNavMenu = [
    {
      link: routes.admin.ADMIN_DASHBOARD,
      name: "Dashboard",
      icon: "bi bi-speedometer2",
    },
    {
      link: routes.admin.USER_RECORDS,
      name: "User Records",
      icon: "bi bi-people",
    },
  ];

  return (
    <div
      id="side-menu"
      className="sidemenu d-flex flex-column"
      style={{ width: isLeftNavigationOpen ? "250px" : "0px" }}
    >
      <div className="row pb-3">
        <div className="col px-0 d-flex flex-column justify-content-center align-items-center">
          <img
            src={Memores}
            className="bg-light rounded-circle"
            width={120}
            height={120}
            alt=""
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-white">
            <div className="list-group">
              {/* FOR USERS */}
              {authUser.user.role === "user" &&
                userNavMenu.map((route, index) => (
                  <Link
                    to={route.link}
                    key={index}
                    className={`${
                      currentLocation.pathname === route.link ? "active" : ""
                    } list-group-item list-group-item-action py-4 rounded-0`}
                  >
                    <span>
                      <i className={`${route.icon} me-4`}></i>
                    </span>
                    {route.name}
                  </Link>
                ))}

              {/* FOR ADMIN */}
              {authUser.user.role === "admin" &&
                adminNavMenu.map((route, index) => (
                  <Link
                    to={route.link}
                    key={index}
                    className="list-group-item list-group-item-action py-4 rounded-0"
                  >
                    <span>
                      <i className={`${route.icon} me-4`}></i>
                    </span>
                    {route.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-between h-100">
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="align-self-end w-100 d-flex align-items-center justify-content-center py-1"
            style={{ backgroundColor: "#7f5fd9" }}
          >
            <i className="bi bi-box-arrow-left text-white"></i>
            <button
              className="btn btn-link text-white text-decoration-none"
              onClick={async () => {
                try {
                  const response = await BaseApi.post("/logout");
                  if (response.status === 200) {
                    authUser.setUser({});
                    navigate(routes.shared.INDEX);
                  }
                } catch (error) {
                  alert(error);
                }
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavigationMenu;
