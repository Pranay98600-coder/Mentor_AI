import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // Hide navbar on dashboard (it will be inside dashboard layout)
  if (location.pathname.startsWith("/dashboard")) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo192.png" alt="MentorAI Logo" className="navbar-logo" />
        <span className="navbar-title">MentorAI</span>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="navbar-username">{username}</span>
            <button className="navbar-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn">Login</Link>
            <Link to="/register" className="navbar-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
