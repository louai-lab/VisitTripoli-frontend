import {React} from "react";
import SidebarForDash from "../../layouts/SidebarForDash/SidebarForDash";

function DashboardPages({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidebarForDash />
      <div style={{ overflowY: "auto", flex: "1" }}>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardPages;
