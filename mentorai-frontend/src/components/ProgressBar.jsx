import React from "react";
import "../styles/roadmap.css";

const ProgressBar = ({ percent = 0, color = "#38bdf8" }) => (
  <div className="progress-bar-bg">
    <div
      className="progress-bar-fill"
      style={{ width: `${percent}%`, background: color }}
    >
      <span className="progress-bar-label">{percent}%</span>
    </div>
  </div>
);

export default ProgressBar;
