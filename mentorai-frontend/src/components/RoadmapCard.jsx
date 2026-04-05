import React from "react";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import "../styles/roadmap.css";

const statusColors = {
  completed: "#22c55e",
  inprogress: "#38bdf8",
  notstarted: "#e2e8f0"
};

const RoadmapCard = ({ topic, video, status = "notstarted", percent = 0 }) => (
  <motion.div
    className="roadmap-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.03, y: -8 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="roadmap-card-header">
      <h3 className="roadmap-card-title">{topic}</h3>
      <motion.span
        className={`roadmap-card-badge ${status}`}
        style={{ background: statusColors[status] || statusColors.notstarted }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {status === "completed"
          ? "Completed"
          : status === "inprogress"
          ? "In Progress"
          : "Not Started"}
      </motion.span>
    </div>
    <ProgressBar percent={percent} color={statusColors[status] || statusColors.notstarted} />
    <motion.a
      href={video}
      className="roadmap-card-link"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      Watch Video
    </motion.a>
  </motion.div>
);

export default RoadmapCard;