import React from "react";
import ProgressBar from "./ProgressBar";
import "../styles/roadmap.css";

const statusColors = {
  completed: "#22c55e",
  inprogress: "#38bdf8",
  notstarted: "#e2e8f0"
};

const RoadmapCard = ({ topic, video, status = "notstarted", percent = 0 }) => (
  <div className="roadmap-card">
    <div className="roadmap-card-header">
      <h3 className="roadmap-card-title">{topic}</h3>
      <span
        className={`roadmap-card-badge ${status}`}
        style={{ background: statusColors[status] || statusColors.notstarted }}
      >
        {status === "completed"
          ? "Completed"
          : status === "inprogress"
          ? "In Progress"
          : "Not Started"}
      </span>
    </div>
    <ProgressBar percent={percent} color={statusColors[status] || statusColors.notstarted} />
    <a
      href={video}
      className="roadmap-card-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Watch Video
    </a>
  </div>
);

export default RoadmapCard;