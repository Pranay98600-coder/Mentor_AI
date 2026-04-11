import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../components/HeroSection.css";

const HeroSection = ({ isAuthenticated }) => {
  // Get username from localStorage
  const username = localStorage.getItem("username") || "User";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleExploreFeatures = () => {
    const featuresElement = document.getElementById("features");
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      className="hero-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="hero-title" variants={itemVariants}>
        MentorAI
      </motion.h1>

      {/* Dynamic Welcome Message */}
      <motion.p className="hero-tagline" variants={itemVariants}>
        {isAuthenticated ? `Welcome back, ${username}! 🎓` : "Your AI-powered personal roadmap to master any technology."}
      </motion.p>

      {!isAuthenticated && (
        <motion.p className="hero-desc" variants={itemVariants}>
          MentorAI helps learners generate personalized learning roadmaps, discover best learning resources, and track their progress step-by-step.
        </motion.p>
      )}

      <motion.div className="hero-cta" variants={itemVariants}>
        {isAuthenticated ? (
          <>
            {/* Logged In - Go to Dashboard, Explore Features */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/dashboard" className="hero-btn primary">
                📊 Go to Dashboard
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button onClick={handleExploreFeatures} className="hero-btn secondary">Explore Features</button>
            </motion.div>
          </>
        ) : (
          <>
            {/* Not Logged In - Get Started, Explore Features */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/register" className="hero-btn primary">Get Started</Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button onClick={handleExploreFeatures} className="hero-btn secondary">Explore Features</button>
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
