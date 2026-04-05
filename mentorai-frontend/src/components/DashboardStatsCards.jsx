import React from "react";
import { motion } from "framer-motion";
import "../styles/dashboard.css";

const DashboardStatsCards = ({ stats }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="dashboard-stats-row"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, idx) => (
        <motion.div
          className="dashboard-stat-card"
          key={idx}
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79, 172, 254, 0.3)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="dashboard-stat-value">{stat.value}</div>
          <div className="dashboard-stat-label">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStatsCards;
