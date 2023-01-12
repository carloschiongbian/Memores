import LeftNavigationMenu from "./LeftNavigationMenu";
import { useEffect, useState } from "react";
import { screen } from "@testing-library/react";
import Header from "./Header";
import "../public/css/components/Layout.css";
import { useLocation } from "react-router-dom";


const Layout = ({ children }) => {
  const [isLeftNavigationOpen, setIsLeftNavigationOpen] = useState(true);
  const location = useLocation()

  // Catch browser refresh and back button: 
  // we do not need the dependency array
  useEffect(() => {
    const inProgress = localStorage.getItem('inProgress')

    window.onpopstate = (ev) => {
      // Remove the backdrop of the modal if the user
      // navigates away from the screening page without
      // starting the assessment. Otherwise, the dialogBox.js
      // handles the removal of the modal backdrop.
      if (!inProgress) {
        document.querySelector('.modal-backdrop')?.remove()
      }
      // Remove the added style of the body due to the modal pop up
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    if (inProgress && location.pathname === '/screening') {
      window.onbeforeunload = () => { return true }
    } else {
      window.onbeforeunload = null
      localStorage.removeItem('inProgress')
    }
  })

  const handleLeftNavigation = () => {
    const sideMenu = document.getElementById("side-menu");
    const pgContent = document.getElementById("pg-content");
    const nav = document.getElementById("nav");

    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

    // if small screen
    if (width <= 768) {
      pgContent.style.marginLeft = "0px";
      if (sideMenu.style.width !== "0px") {
        setIsLeftNavigationOpen(false);
        nav.style.marginLeft = "0px";
        sideMenu.style.width = "0px";
        sideMenu.style.zIndex = "0";
      } else {
        setIsLeftNavigationOpen(true);
        nav.style.marginLeft = "250px";
        sideMenu.style.width = "250px";
        sideMenu.style.zIndex = "10000";
      }
      return;
    }

    if (sideMenu.style.width !== "0px") {
      setIsLeftNavigationOpen(false);
      sideMenu.style.width = "0px";
      pgContent.style.marginLeft = "0px";
      nav.style.marginLeft = "0px";
    } else {
      setIsLeftNavigationOpen(true);
      sideMenu.style.width = "220px";
      pgContent.style.marginLeft = "220px";
      nav.style.marginLeft = "220px";
    }
  };

  return (
    <div>
      <LeftNavigationMenu
        isLeftNavigationOpen={isLeftNavigationOpen}
      ></LeftNavigationMenu>
      <div
        id="pg-content"
        className="pg-content relative"
        style={{ marginLeft: isLeftNavigationOpen ? "250px" : "0px" }}
      >
        <Header
          handleLeftNavigation={handleLeftNavigation}
          isLeftNavigationOpen={isLeftNavigationOpen}
        ></Header>
        <div className="mt-4 py-4 container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
