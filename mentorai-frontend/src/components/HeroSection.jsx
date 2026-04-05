import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../components/HeroSection.css";

const HeroSection = () => {
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
      <motion.p className="hero-tagline" variants={itemVariants}>
        "Your AI-powered personal roadmap to master any technology."
      </motion.p>
      <motion.p className="hero-desc" variants={itemVariants}>
        MentorAI helps learners generate personalized learning roadmaps, discover best learning resources, and track their progress step-by-step.
      </motion.p>
      <motion.div className="hero-cta" variants={itemVariants}>
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
          <Link to="#features" className="hero-btn secondary">Explore Features</Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
