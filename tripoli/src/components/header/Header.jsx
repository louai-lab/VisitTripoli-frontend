import React, { useEffect, useState } from "react";
import Logo from "../SVGComponents/Logo";
import HeaderCSS from "./Header.module.css";
import MapIcon from "../SVGComponents/MapIcon";
import { Link } from "react-router-dom";

export default function Header() {

  const [collapsed, setCollapsed] = useState(false);
  const [smallLogo, setSmallLogo] = useState(false);

  useEffect(() => {
      function updateSize() {
          if (window.innerWidth > 600) {
              setCollapsed(false);
          }
          if (window.innerWidth < 388) {
            setSmallLogo(true);
        } else{
          setSmallLogo(false);
        }

      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleClasses = [HeaderCSS.navUlMobile, collapsed ? HeaderCSS.activeNav : ''].join(' ');
  const bar1 = [HeaderCSS.line1, collapsed ? HeaderCSS.a : ''].join(' ');
  const bar2 = [HeaderCSS.line2, collapsed ? HeaderCSS.a : ''].join(' ');
  const bar3 = [HeaderCSS.line3, collapsed ? HeaderCSS.a : ''].join(' ');


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

  return (
    <header className={HeaderCSS.headerMainStyle}>
      <div className={HeaderCSS.containerHeader}>

        <div className={HeaderCSS.logoContainer}>
          <Link to='/'>{smallLogo ?<Logo size="small"/> : <Logo /> }</Link>
        </div>
        <nav className={HeaderCSS.navMainStyle}>

          <ul className={HeaderCSS.navUl}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/locations'>Locations</Link></li>
            <li><Link to='/hotels'>Hotels</Link></li>
            <li><Link to='/tours'>Tours</Link></li>
            <li onMouseEnter={handleMapIcon} onMouseLeave={handleMapIcon}><a href="/#map"><MapIcon place="header" hovered={mapHovered}></MapIcon></a></li>
          </ul>

           <ul className={toggleClasses}>
            <li><Link to='/locations'>Locations</Link></li>
            <li><Link to='/hotels'>Hotels</Link></li>
            <li><Link to='/tours'>Tours</Link></li>
            <li><Link to='/tours'>Top Attractions</Link></li>
          </ul>

          <div className={HeaderCSS.burgerButton} onClick={() => setCollapsed(!collapsed)}>
                      <div className={bar1}></div>
                      <div className={bar2}></div>
                      <div className={bar3}></div>
          </div> 

        </nav>

        
      </div>
    </header>
  );
}
