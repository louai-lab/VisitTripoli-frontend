import {React} from 'react';
import { Link } from 'react-router-dom';
import Styles from './SidebarForDash.module.css';
import logo from '../../images/logo.png'

function SidebarForDash() {

  return (
    <aside id={Styles.sidebar}>
      <div className={Styles.sidebartitle}>
        <Link to={'/'}>
          <img src={logo} alt="" className={Styles.logo}/>
        </Link>
      </div>
      <ul className={Styles.sidebarList}>
          <div className={Styles.firstDiv}>
          <Link to="dashboard/locations">
        <li className={Styles.sidebarListItem}>
            All Locations
            </li>
          </Link>
        <Link to="dashboard/tours">
        <li className={Styles.sidebarListItem}>
            All Tours
            </li>
          </Link>
        <Link to="dashboard/hotes">
        <li className={Styles.sidebarListItem}>
            All Hotels
        </li>
        </Link>
        <Link to="dashboard/guests">
        <li className={Styles.sidebarListItem}>
            All Guests
            </li>
          </Link>
          </div>
            <Link to="/signin">
          <li className={Styles.sidebarListItem}>
              Log out
              </li>
            </Link>
      </ul>
    </aside>
  );
}

export default SidebarForDash;
