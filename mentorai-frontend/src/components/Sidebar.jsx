import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaChartBar,
  FaUser,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink to="/dashboard/generate" className="sidebar-link">
          <FaProjectDiagram /> Generate Roadmap
        </NavLink>
        <NavLink to="/dashboard/analytics" className="sidebar-link">
          <FaChartBar /> Analytics
        </NavLink>
        <NavLink to="/dashboard/profile" className="sidebar-link">
          <FaUser /> Profile
        </NavLink>
        <NavLink to="/chat" className="sidebar-link">
          <FaComments /> AI Mentor
        </NavLink>
        <button className="sidebar-link logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
