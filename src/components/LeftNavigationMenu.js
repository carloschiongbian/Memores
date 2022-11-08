/* eslint-disable jsx-a11y/anchor-is-valid */
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

  const handleSignOut = async () => {
    try {
      const response = await BaseApi.post("/logout");
      if (response.status === 200) {
        authUser.setUser({});
        localStorage.removeItem("isLogin");
        navigate(routes.shared.INDEX);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div
      id="side-menu"
      className="sidemenu d-flex flex-column justify-content-between"
      style={{ width: isLeftNavigationOpen ? "250px" : "0px" }}
    >
      <div>
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
                      className={`${currentLocation.pathname === route.link ? "active" : ""
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
                      className={`${currentLocation.pathname === route.link ? "active" : ""
                        } list-group-item list-group-item-action py-4 rounded-0`}
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
      </div>

      <a className="list-group-item list-group-item-action py-3 rounded-0 text-white text-center" role="button" style={{ backgroundColor: "#7f5fd9" }} onClick={handleSignOut}>
        <span>
          <i className="bi bi-box-arrow-left me-2"></i>
        </span>
        Sign Out
      </a>
    </div>
  );
};

export default LeftNavigationMenu;
