import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardStatsCards from "../components/DashboardStatsCards";
import RoadmapCard from "../components/RoadmapCard";
import { getMyRoadmaps } from "../services/roadmapService";
import "../styles/dashboard.css";
import "../styles/roadmap.css";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMyRoadmaps();
        setRoadmaps(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
        setError("Failed to load roadmaps");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  // Calculate stats from real data
  const stats = [
    { label: "Roadmaps", value: roadmaps.length },
    { label: "Topics", value: roadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0) },
    { label: "Completed", value: roadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.status === "completed").length || 0), 0) },
    { label: "In Progress", value: roadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.status === "inprogress").length || 0), 0) },
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-loading">Loading...</div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-error">{error}</div>
        </main>
      </div>
    );
  }

  // Show empty state
  if (roadmaps.length === 0) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <h2 className="dashboard-welcome">Welcome back, {username}</h2>
          <div className="dashboard-empty">
            <h3>No roadmap found</h3>
            <p>Start your learning journey by generating a roadmap</p>
            <button className="dashboard-btn" onClick={() => navigate("/dashboard/generate")}>
              Generate Roadmap
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Show dashboard with roadmaps
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <h2 className="dashboard-welcome">Welcome back, {username}</h2>
        <DashboardStatsCards stats={stats} />
        <section className="dashboard-section">
          <h3>Your Roadmaps</h3>
          <div className="dashboard-roadmaps-list">
            {roadmaps.map((roadmap, idx) => {
              const firstTopic = roadmap.topics?.[0] || {};
              return (
                <div key={roadmap.id || idx} className="roadmap-item">
                  <div className="roadmap-item-header">
                    <h4>{roadmap.mainTopic}</h4>
                    <span className="roadmap-item-date">
                      {new Date(roadmap.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <RoadmapCard
                    topic={firstTopic.name || roadmap.mainTopic}
                    video={firstTopic.video || ""}
                    status={firstTopic.status || "notstarted"}
                    percent={firstTopic.percent || 0}
                  />
                  <div className="roadmap-item-topics">
                    <p><strong>Topics:</strong> {roadmap.topics?.length || 0}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;