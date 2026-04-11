import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logout } from "../utils/auth";
import ThemeToggle from "./ThemeToggle";
import { useThemeLogo } from "../hooks/useThemeLogo";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaChartBar,
  FaUser,
  FaComments,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";
import "../styles/logos.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { iconLogo } = useThemeLogo();

  const handleLogout = () => {
    logout();
    // Force full app reload to ensure ProtectedRoute re-evaluates
    window.location.href = "/login";
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { to: "/dashboard/generate", label: "Generate Roadmap", icon: FaProjectDiagram },
    { to: "/dashboard/analytics", label: "Analytics", icon: FaChartBar },
    { to: "/dashboard/profile", label: "Profile", icon: FaUser },
    { to: "/chat", label: "AI Mentor", icon: FaComments },
  ];

  return (
    <motion.aside
      className="sidebar"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sidebar-header">
        <motion.div
          className="sidebar-logo"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={iconLogo} alt="MentorAI Icon" className="icon-logo" />
        </motion.div>
        <ThemeToggle />
      </div>
      <nav className="sidebar-nav">
        {links.map((link, i) => (
          <motion.div
            key={link.to}
            custom={i}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <NavLink
              to={link.to}
              className="sidebar-link"
              end={link.to === "/dashboard"}
            >
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <link.icon /> {link.label}
              </motion.div>
            </NavLink>
          </motion.div>
        ))}
        {/* Home Button */}
        <motion.div
          custom={links.length}
          variants={linkVariants}
          initial="hidden"
          animate="visible"
        >
          <NavLink
            to="/"
            className="sidebar-link"
          >
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FaHome /> Home
            </motion.div>
          </NavLink>
        </motion.div>
        {/* Logout Button */}
        <motion.button
          className="sidebar-link logout"
          onClick={handleLogout}
          custom={links.length + 1}
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaSignOutAlt /> Logout
        </motion.button>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
