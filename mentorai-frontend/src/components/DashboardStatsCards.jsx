import React from "react";
import "../styles/dashboard.css";

const DashboardStatsCards = ({ stats }) => (
  <div className="dashboard-stats-row">
    {stats.map((stat, idx) => (
      <div className="dashboard-stat-card" key={idx}>
        <div className="dashboard-stat-value">{stat.value}</div>
        <div className="dashboard-stat-label">{stat.label}</div>
      </div>
    ))}
  </div>
);

export default DashboardStatsCards;
