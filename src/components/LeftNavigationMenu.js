import { Link, useLocation, useNavigate } from "react-router-dom";
import "../public/css/components/LeftNavigationMenu.css";
import routes from "../routes/routes";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { BaseApi } from "../services/api";

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
      icon: "bi bi-speedometer2",
    },
  ];

  return (
    <div
      id="side-menu"
      className="sidemenu d-flex flex-column"
      style={{ width: isLeftNavigationOpen ? "250px" : "0px" }}
    >
      <div className="row mb-4 justify-content-between">
        <div className="col px-0 d-flex justify-content-center">
          <img
            src={"data:image/png;base64," + authUser.user.photo}
            className="bg-light rounded-circle"
            width={90}
            height={90}
            alt=""
          />
        </div>
      </div>
      <div className="row mt-4">
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
          <button
            className="btn btn-link text-white align-self-end"
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
  );
};

export default LeftNavigationMenu;
