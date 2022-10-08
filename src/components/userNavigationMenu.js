import { Link } from 'react-router-dom';
import closeNavMenu from '../public/images/icons/close-nav-menu.svg';
import samplePhoto from '../public/images/icons/hamburger-open-menu.png';
import '../public/css/components/userNavigationMenu/userNavigationMenu.css';
import hamburgerMenuIcon from '../public/images/icons/hamburger-open-menu.png';
import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';

const UserNavigationMenu = () => {
    const authUser = useContext(AuthContext)
    console.log(authUser)
    const openNav = () => {
        document.getElementById("user-navigation-menu").style.width = "320px";
    }

    const closeNav = () => {
        document.getElementById("user-navigation-menu").style.width = "0";
    }

    const navMenu = [ 
        {link: "/", linkName: "Dashboard"}, 
        {link: "/screening", linkName: "Screening"},
        { link: "/patientRecord", linkName: "Patients" },
        { link: "/userRecord", linkName: "Manage Users"}
    ]

    const adminMenu = [ 
        {link: "/", linkName: "User Record"}, 
        {link: "/createUser", linkName: "Create User"},
    ]

    var navigationLinkStyles = {
        textDecoration: 'none',
        width: '100%',
        // textAlign: 'center',
        // paddingBlock: '20px',
        // color: 'blue'
    };

    const changeStyle = () => {
        console.log("this is working");
        document.getElementByID("navigation-link-name").style.color = "white";
    }

    return (
        <div className="user-navigation-menu-container">
            <div id="user-navigation-menu">
                <div className="navigation-top-section">
                    <div className="user-profile">
                        <div className="user-profile-photo">
                            <img src={ samplePhoto } alt="user-profile" />
                        </div>

                        <div className="user-name-display">
                            <label htmlFor="user-name">Dr. Stephen Strange</label>
                        </div>
                    </div>

                    <div className="close-menu-button">
                        <button className="closebtn" onClick={() => closeNav()}>
                            <img src={ closeNavMenu } alt="close-menu" />
                        </button>
                    </div>
                </div>

                <div className="navigation-middle-section">
                    <nav>
                        { authUser.user.role === 'user' && navMenu.map((navigation, index) => (
                            <div className="navigation-menu-link-container" key={ index }>
                                <Link 
                                    to={ navigation.link } 
                                    id="navigation-link" 
                                    style={ navigationLinkStyles } 
                                >
                                    <h3 id="navigation-link-name"> { navigation.linkName } </h3>
                                </Link>
                            </div>
                        ))}
                        { authUser.user.role === 'admin' && adminMenu.map((navigation, index) => (
                            <div className="navigation-menu-link-container" key={ index }>
                                <Link 
                                    to={ navigation.link } 
                                    id="navigation-link" 
                                    style={ navigationLinkStyles } 
                                >
                                    <h3 id="navigation-link-name"> { navigation.linkName } </h3>
                                </Link>
                            </div>
                        ))}
                    </nav>                    
                </div>
                <div className="d-flex align-items-center justify-content-center">
                {
                    Object.keys(authUser).length !== 0 && 
                    (
                    <button type="button" className="btn btn-link" onClick={ async ()=>{
                        try {
                            const response = await fetch("/api/logout", {method: "POST",})
                            if(response.status === 200 && response.ok){
                                authUser.setUser(null)
                                localStorage.removeItem("user")
                                console.log(response)
                            }
                        } catch(error){
                            alert(error)
                        }
                    }}>
                    Sign Out
                  </button>
                  )
                }
                </div>
            </div>

            <div className="open-menu-button-container">
                <button className="open-menu-button" onClick={() => openNav()}>
                    <img src={ hamburgerMenuIcon } alt="menu-icon" />
                </button>
            </div>
        </div>
    );
}
 
export default UserNavigationMenu;