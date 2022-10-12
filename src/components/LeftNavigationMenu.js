import { Link, useLocation } from "react-router-dom";
import "../public/css/components/LeftNavigationMenu.css"
import routes from "../routes/routes";

const LeftNavigationMenu = () => {

    const currentLocation = useLocation()

    const userNavMenu = [
        {
            link: routes.user.DASHBOARD,
            name: "Dashboard",
            icon: "bi bi-speedometer2"
        },
        {
            link: routes.user.SCREENING,
            name: "Screening",
            icon: "bi bi-speedometer2"
        },
        {
            link: routes.user.PATIENT_RECORDS,
            name: "Patient Records",
            icon: "bi bi-speedometer2"
        },
    ]

    const adminNavMenu = [
        {
            link: routes.admin.USER_RECORDS,
            name: "User Records",
            icon: "bi bi-speedometer2"
        },
        {
            link: routes.admin.CREATE_USER,
            name: "Create Users",
            icon: "bi bi-speedometer2"
        },

    ]

    return (
        <div id="side-menu" className="sidemenu" style={{ "width": "0px" }}>
            <div className='row mb-4'>
                <div className="col px-0 d-flex justify-content-center">
                    <img src="/logo192.png" className='bg-light rounded-circle' width={90} height={90} alt="" />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className='text-white'>
                        <div className="list-group">

                            {/* FOR USERS */}
                            {
                                userNavMenu.map((route, index) => (
                                    <Link to={route.link} key={index} className={`${currentLocation.pathname === route.link ? 'active' : ''} list-group-item list-group-item-action py-4 rounded-0`} >
                                        <span><i className={`${route.icon} me-4`}></i></span>
                                        {route.name}
                                    </Link>
                                ))
                            }

                            {/* FOR ADMIN */}
                            {
                                adminNavMenu.map((route, index) => (
                                    <Link to={route.link} key={index} className="list-group-item list-group-item-action py-4 rounded-0" >
                                        <span><i className={`${route.icon} me-4`}></i></span>
                                        {route.name}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LeftNavigationMenu;