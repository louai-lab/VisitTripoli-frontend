import { React } from "react";
import { Link } from "react-router-dom";
import Styles from "./SidebarForDash.module.css";
import logo from "../../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SidebarForDash() {

  const navigate = useNavigate();
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
    <aside id={Styles.sidebar}>
      <div className={Styles.sidebartitle}>
        <Link to={"/"}>
          <img src={logo} alt="" className={Styles.logo} />
        </Link>
      </div>
      <ul className={Styles.sidebarList}>
        <div className={Styles.firstDiv}>
          <Link to="/dashboard/locations">
            <li className={Styles.sidebarListItem}>Locations</li>
          </Link>
          <Link to="/dashboard/tours">
            <li className={Styles.sidebarListItem}>Tours</li>
          </Link>
          <Link to="/dashboard/hotes">
            <li className={Styles.sidebarListItem}>Hotels</li>
          </Link>
          <Link to="/dashboard/users">
            <li className={Styles.sidebarListItem}>Users</li>
          </Link>
        </div>
        <button onClick={handleLogOut} style={{backgroundColor:"transparent"}}>
          <Link to="/signin">
            <li className={Styles.sidebarListItem}>Log out</li>
          </Link>
        </button>
      </ul>
    </aside>
  );
}

export default SidebarForDash;
