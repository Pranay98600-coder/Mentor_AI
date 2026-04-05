import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import DashboardStatsCards from "../components/DashboardStatsCards";
import RoadmapCard from "../components/RoadmapCard";
import ProgressBar from "../components/ProgressBar";
import { getMyRoadmaps, updateProgress } from "../services/roadmapService";
import { getProgress } from "../services/progressService";
import "../styles/dashboard.css";
import "../styles/roadmap.css";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [progressData, setProgressData] = useState({});

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

  // Load user progress data from backend
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getProgress();

        const formatted = {};

        if (Array.isArray(data)) {
          data.forEach((item) => {
            formatted[item.topic] = {
              before: item.knowledgeBefore,
              after: item.knowledgeAfter,
            };
          });
        }

        setProgressData(formatted);
      } catch (err) {
        console.error("Failed to load progress:", err);
        // Silently fail - progress is optional
      }
    };

    loadProgress();
  }, []);

  // Toggle roadmap expansion (only one open at a time)
  const toggleRoadmap = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle progress data changes
  const handleProgressChange = (topicName, field, value) => {
    setProgressData((prev) => ({
      ...prev,
      [topicName]: {
        ...prev[topicName],
        [field]: Number(value),
      },
    }));
  };

  // Handle progress update (sends to API)
  const handleProgressUpdate = async (topicName) => {
    const data = progressData[topicName];
    if (!data || data.before === undefined || data.after === undefined) {
      alert("Please fill in both Before and After values");
      return;
    }

    try {
      await updateProgress(topicName, data.before, data.after);
      alert("✓ Progress updated successfully");
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Failed to update progress");
    }
  };

  // Calculate progress for a topic (0-100%)
  const getTopicProgress = (topicName) => {
    const data = progressData[topicName];
    if (!data || data.after === undefined) return 0;
    return Math.min((data.after / 10) * 100, 100);
  };

  // Check if topic is completed (after >= 8)
  const isTopicCompleted = (topicName) => {
    const data = progressData[topicName];
    return data && data.after >= 8;
  };

  // Calculate overall dashboard stats
  const calculateOverallStats = () => {
    const allTopics = roadmaps.flatMap((r) => r.topics || []);
    const totalTopics = allTopics.length;
    const completedTopics = Object.values(progressData).filter(
      (p) => p && p.after >= 8
    ).length;
    const overallProgress = totalTopics > 0
      ? Math.floor((completedTopics / totalTopics) * 100)
      : 0;

    return { totalTopics, completedTopics, overallProgress };
  };

  const { totalTopics, completedTopics, overallProgress } = calculateOverallStats();

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
          <motion.div
            className="dashboard-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
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
          <motion.div
            className="dashboard-error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
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
          <motion.h2
            className="dashboard-welcome"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome, {username ? username : "User"} 👋
          </motion.h2>
          <motion.div
            className="dashboard-empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>No roadmap found</h3>
            <p>Start your learning journey by generating a roadmap</p>
            <motion.button
              className="dashboard-btn"
              onClick={() => navigate("/dashboard/generate")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Generate Roadmap
            </motion.button>
          </motion.div>
        </main>
      </div>
    );
  }

  // Show dashboard with roadmaps
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <motion.main
        className="dashboard-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="dashboard-welcome"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome, {username ? username : "User"} 👋
        </motion.h2>
        <DashboardStatsCards stats={stats} />

        {/* Progress Overview */}
        <section className="dashboard-progress-overview">
          <h3>Progress Overview</h3>
          <div className="progress-overview-items">
            <div className="progress-stat-item">
              <span className="stat-label">Total Topics</span>
              <span className="stat-value">{totalTopics}</span>
            </div>
            <div className="progress-stat-item">
              <span className="stat-label">Completed</span>
              <span className="stat-value completed">{completedTopics}</span>
            </div>
            <div className="progress-stat-item full-width">
              <span className="stat-label">Overall Progress</span>
              <span className="stat-value">{overallProgress}%</span>
              <ProgressBar percent={overallProgress} color="#0ea5e9" />
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h3>Your Roadmaps</h3>
          <div className="dashboard-roadmaps-list">
            {roadmaps.map((roadmap, idx) => (
              <div key={roadmap.id || idx} className="roadmap-card-accordion">
                <div
                  className="roadmap-accordion-header"
                  onClick={() => toggleRoadmap(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleRoadmap(idx);
                    }
                  }}
                >
                  <div className="roadmap-header-content">
                    <h4>{roadmap.mainTopic}</h4>
                    <span className="roadmap-header-date">
                      {new Date(roadmap.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="roadmap-toggle-icon">
                    {openIndex === idx ? "▲" : "▼"}
                  </span>
                </div>

                {/* Show topics only when roadmap is expanded */}
                {openIndex === idx && (
                  <div className="roadmap-accordion-content">
                    {roadmap.topics && roadmap.topics.length > 0 ? (
                      <div className="roadmap-topics-container">
                        {roadmap.topics.map((topic, topicIdx) => {
                          const topicName = topic.name || topic.topic;
                          const progress = getTopicProgress(topicName);
                          const completed = isTopicCompleted(topicName);

                          return (
                            <div key={topicIdx} className="topic-item">
                              <div className="topic-header">
                                <div className="topic-title-section">
                                  <h5 className="topic-name">{topicName}</h5>
                                  {completed && (
                                    <span className="topic-completed-badge">✅ Completed</span>
                                  )}
                                </div>
                                <a
                                  href={topic.video || topic.videoUrl}
                                  className="topic-video-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Watch Video
                                </a>
                              </div>

                              {/* Visual Progress Section */}
                              <div className="topic-progress-section">
                                <div className="topic-progress-inputs">
                                  <div className="progress-input-group">
                                    <label>Before (1-10)</label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={progressData[topicName]?.before || 0}
                                      onChange={(e) =>
                                        handleProgressChange(topicName, "before", e.target.value)
                                      }
                                      className="topic-progress-input"
                                    />
                                  </div>
                                  <div className="progress-input-group">
                                    <label>After (1-10)</label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={progressData[topicName]?.after || 0}
                                      onChange={(e) =>
                                        handleProgressChange(topicName, "after", e.target.value)
                                      }
                                      className="topic-progress-input"
                                    />
                                  </div>
                                  <button
                                    onClick={() => handleProgressUpdate(topicName)}
                                    className="progress-update-btn"
                                  >
                                    Update
                                  </button>
                                </div>

                                {/* Progress Bar */}
                                <div className="topic-progress-bar">
                                  <ProgressBar
                                    percent={progress}
                                    color={completed ? "#22c55e" : "#0ea5e9"}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="roadmap-item-topics">
                        <p>No topics available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default Dashboard;