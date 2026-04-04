import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getMyRoadmaps, deleteRoadmap, regenerateRoadmap } from "../services/roadmapService";
import "../styles/profile.css";

const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [regeneratingId, setRegeneratingId] = useState(null);

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

  const handleDelete = async (roadmapId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this roadmap?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(roadmapId);
      await deleteRoadmap(roadmapId);
      
      // Remove roadmap from UI immediately
      setRoadmaps((prevRoadmaps) =>
        prevRoadmaps.filter((r) => r.id !== roadmapId)
      );
      
      alert("✓ Roadmap deleted successfully");
    } catch (err) {
      console.error("Error deleting roadmap:", err);
      alert("Failed to delete roadmap");
    } finally {
      setDeletingId(null);
    }
  };

  const handleRegenerate = async (roadmap) => {
    const confirmed = window.confirm(
      "Regenerate this roadmap? This will replace the existing roadmap."
    );

    if (!confirmed) return;

    try {
      setRegeneratingId(roadmap.id);
      
      const requestData = {
        topic: roadmap.mainTopic,
        level: "Beginner",
        goal: "Learning",
        time: "2 hours",
        learningStyle: "Videos",
        workingStatus: "Student",
        timeline: "3 months"
      };
      
      const regeneratedRoadmap = await regenerateRoadmap(roadmap.id, requestData);
      
      // Replace old roadmap with new response
      setRoadmaps((prevRoadmaps) =>
        prevRoadmaps.map((r) =>
          r.id === roadmap.id ? regeneratedRoadmap : r
        )
      );
      
      alert("✓ Roadmap regenerated successfully");
    } catch (err) {
      console.error("Error regenerating roadmap:", err);
      alert("Failed to regenerate roadmap");
    } finally {
      setRegeneratingId(null);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <h2 className="dashboard-welcome">My Profile</h2>

        <section className="profile-section">
          <div className="profile-info">
            <div className="profile-header">
              <div className="avatar">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="profile-details">
                <h3>{username ? username : "User"}</h3>
                <p className="profile-email">{email ? email : "No email"}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-item">
                <span className="info-label">Username</span>
                <span className="info-value">{username || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{email || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Total Roadmaps</span>
                <span className="info-value">{roadmaps.length}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h3>My Roadmaps</h3>

          {loading && (
            <div className="dashboard-loading">Loading roadmaps...</div>
          )}

          {error && <div className="dashboard-error">{error}</div>}

          {!loading && roadmaps.length === 0 && (
            <div className="profile-empty">
              <h4>No roadmaps yet</h4>
              <p>Create your first roadmap to get started</p>
            </div>
          )}

          {!loading && roadmaps.length > 0 && (
            <div className="roadmaps-grid">
              {roadmaps.map((roadmap) => (
                <div key={roadmap.id} className="roadmap-card">
                  <div className="roadmap-card-header">
                    <h4 className="roadmap-title">{roadmap.mainTopic}</h4>
                    <span className="roadmap-date">
                      {new Date(roadmap.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="roadmap-card-body">
                    <div className="roadmap-stat">
                      <span className="stat-label">Topics</span>
                      <span className="stat-value">
                        {roadmap.topics?.length || 0}
                      </span>
                    </div>
                  </div>

                  <div className="roadmap-card-footer">
                    <button
                      onClick={() => handleRegenerate(roadmap)}
                      disabled={regeneratingId === roadmap.id}
                      className="regenerate-btn"
                    >
                      {regeneratingId === roadmap.id ? "Regenerating..." : "Regenerate"}
                    </button>
                    <button
                      onClick={() => handleDelete(roadmap.id)}
                      disabled={deletingId === roadmap.id}
                      className="delete-btn"
                    >
                      {deletingId === roadmap.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
