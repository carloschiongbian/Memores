import LeftNavigationMenu from "./LeftNavigationMenu";
import Header from "./Header";
import "../public/css/components/Layout.css";


const Layout = ({ children }) => {

    const handleLeftNavigation = () => {
        const sideMenu = document.getElementById('side-menu')
        const pgContent = document.getElementById('pg-content')
        const nav = document.getElementById('nav')
        if (sideMenu.style.width !== '0px') {
            sideMenu.style.width = '0px'
            pgContent.style.marginLeft = '0px'
            nav.style.marginLeft = '0px'
        } else {
            sideMenu.style.width = '220px'
            pgContent.style.marginLeft = '220px'
            nav.style.marginLeft = '220px'
        }
    }

    return (
        <div>
            <LeftNavigationMenu></LeftNavigationMenu>
            <div id="pg-content" className="pg-content relative">
                <Header handleLeftNavigation={handleLeftNavigation}></Header>
                <div className="mt-4 py-4 container">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;