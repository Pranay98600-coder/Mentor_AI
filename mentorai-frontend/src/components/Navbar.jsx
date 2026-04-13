import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { isAuthenticated, logout } from "../utils/auth";
import ThemeToggle from "./ThemeToggle";
import { useThemeLogo } from "../hooks/useThemeLogo";
import "./Navbar.css";
import "../styles/logos.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const username = localStorage.getItem("username");
  const { fullLogo } = useThemeLogo();

  const handleLogout = () => {
    logout();
    // UPDATED: Use navigate instead of window.location.href to avoid 404
    // UPDATED: Redirect to "/" (landing page) instead of "/login"
    // UPDATED: Use { replace: true } to prevent back-button access
    navigate("/", { replace: true });
  };

  // Hide navbar on dashboard (it will be inside dashboard layout)
  if (location.pathname.startsWith("/dashboard")) return null;

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="navbar-left"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={fullLogo} alt="MentorAI Logo" className="navbar-logo" />
      </motion.div>
      <div className="navbar-right">
        <ThemeToggle />
        {loggedIn ? (
          <>
            <span className="navbar-username">{username}</span>
            <motion.button
              className="navbar-btn"
              onClick={handleLogout}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 172, 254, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/login" className="navbar-btn">Login</Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/register" className="navbar-btn">Register</Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
