import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { saveUserData } from "../utils/auth";
import { login } from "../services/authService";
import { FaArrowLeft } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Debug: Log the data being sent
    console.log("Login attempt:", {
      email: email.trim(),
      password: password.trim()
    });

    try {
      const data = await login(email.trim(), password.trim());

      // Save user data using centralized utility
      saveUserData({
        token: data.token,
        username: data.username,
        email: data.email,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          background: "rgba(139, 92, 246, 0.15)",
          border: "1px solid #8b5cf6",
          color: "#8b5cf6",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
        whileHover={{ 
          background: "rgba(139, 92, 246, 0.25)",
          scale: 1.05 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft size={16} />
        Back
      </motion.button>

      <motion.form
        className="auth-card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2>Login</h2>
        {error && (
          <motion.div
            className="auth-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.button
          type="submit"
          className="auth-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Login
        </motion.button>
        
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          <Link to="/" style={{ color: "#8b5cf6", textDecoration: "none", fontWeight: "600" }}>
            Back to Home
          </Link>
          <span style={{ color: "#64748b" }}>•</span>
          <Link to="/register" style={{ color: "#8b5cf6", textDecoration: "none", fontWeight: "600" }}>
            Register
          </Link>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Login;