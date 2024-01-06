import React, { useEffect, useState } from "react";
import Logo from "../SVGComponents/Logo";
import HeaderCSS from "./Header.module.css";
import MapIcon from "../SVGComponents/MapIcon";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [smallLogo, setSmallLogo] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
  
    const checkLoginStatus = async () => {
      try {
        
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/check-login-status`
        );

        if (response.status === 200) {
          
          setIsLoggedIn(true);
        } else {
          
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 600) {
        setCollapsed(false);
      }
      if (window.innerWidth < 388) {
        setSmallLogo(true);
      } else {
        setSmallLogo(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const toggleClasses = [
    HeaderCSS.navUlMobile,
    collapsed ? HeaderCSS.activeNav : "",
  ].join(" ");
  const bar1 = [HeaderCSS.line1, collapsed ? HeaderCSS.a : ""].join(" ");
  const bar2 = [HeaderCSS.line2, collapsed ? HeaderCSS.a : ""].join(" ");
  const bar3 = [HeaderCSS.line3, collapsed ? HeaderCSS.a : ""].join(" ");

  // const [locationsTrigger, setLocationsTrigger] = useState(false);
  const [mapHovered, setMapHovered] = useState(false);

  const handleMapIcon = (e) => {
    e.preventDefault();
    if (mapHovered) {
      setMapHovered(false);
    } else {
      setMapHovered(true);
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/logOut`
      );

      if (response.status === 200) {
        navigate("/signin");
        console.log("Successfully logged out");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={HeaderCSS.headerMainStyle}>
      <div className={HeaderCSS.containerHeader}>
        <div className={HeaderCSS.logoContainer}>
          <Link to="/home">{smallLogo ? <Logo size="small" /> : <Logo />}</Link>
        </div>
        <nav className={HeaderCSS.navMainStyle}>
          <ul className={HeaderCSS.navUl}>
            <li>
              <Link to="/home/locations">Locations</Link>
            </li>
            <li>
              <Link to="/home/hotels">Hotels</Link>
            </li>
            <li>
              <Link to="/home/tours">Tours</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogOut}
                  style={{ backgroundColor: "transparent", fontWeight: "bold" }}
                >
                  LogOut
                </button>
              </li>
            ) : (
              <></>
            )}
            <li onMouseEnter={handleMapIcon} onMouseLeave={handleMapIcon}>
              <a href="/home/#map">
                <MapIcon place="header" hovered={mapHovered}></MapIcon>
              </a>
            </li>
          </ul>

          <ul className={toggleClasses}>
            <li>
              <Link to="/home/locations">Locations</Link>
            </li>
            <li>
              <Link to="/home/hotels">Hotels</Link>
            </li>
            <li>
              <Link to="/home/tours">Tours</Link>
            </li>
            <li>
              <Link to="/home/tours">Top Attractions</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link>
                  <button
                    onClick={handleLogOut}
                    style={{
                      backgroundColor: "transparent",
                      fontWeight: "bold",
                    }}
                  >
                    LogOut
                  </button>
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>

          <div
            className={HeaderCSS.burgerButton}
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className={bar1}></div>
            <div className={bar2}></div>
            <div className={bar3}></div>
          </div>
        </nav>
      </div>
    </header>
  );
}
