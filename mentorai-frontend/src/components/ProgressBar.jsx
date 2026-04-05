import React from "react";
import { motion } from "framer-motion";
import "../styles/roadmap.css";

const ProgressBar = ({ percent = 0, color = "#38bdf8" }) => (
  <div className="progress-bar-bg">
    <motion.div
      className="progress-bar-fill"
      style={{ background: color }}
      initial={{ width: 0 }}
      animate={{ width: `${percent}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.span
        className="progress-bar-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {percent}%
      </motion.span>
    </motion.div>
  </div>
);

export default ProgressBar;
