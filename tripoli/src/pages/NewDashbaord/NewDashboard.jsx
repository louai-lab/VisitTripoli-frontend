import {React} from "react";
import SidebarForDash from "../../layouts/SidebarForDash/SidebarForDash";
import { Helmet } from "react-helmet-async";

function DashboardPages({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Helmet>
        <title>Visit Tripoli - Dashboard</title>
        <meta name="description" content="Explore and manage tours in Tripoli through our user-friendly dashboard. Plan, organize, and optimize your travel experiences." />
        <meta name="keywords" content="Visit Tripoli, tours, travel planning, dashboard, manage tours, Tripoli attractions" />
      </Helmet>
      <SidebarForDash />
      <div style={{ overflowY: "auto", flex: "1" }}>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardPages;
