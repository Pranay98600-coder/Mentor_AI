import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { isAuthenticated, logout } from "../utils/auth";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    logout();
    // Force full app reload to ensure ProtectedRoute re-evaluates
    window.location.href = "/login";
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
        <img src="/logo192.png" alt="MentorAI Logo" className="navbar-logo" />
        <span className="navbar-title">MentorAI</span>
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
