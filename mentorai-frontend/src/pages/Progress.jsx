import React, { useState } from "react";
import { updateProgress } from "../services/roadmapService";
import ProgressBar from "../components/ProgressBar";
import "../styles/roadmap.css";

const Progress = () => {
  const [topic, setTopic] = useState("");
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [percent, setPercent] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!topic.trim() || !before.trim() || !after.trim()) return;
    
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const data = await updateProgress(topic, before, after);
      setPercent(data.percent || 0);
      setMessage(`Progress updated successfully! - ${data.message || ""}`);
      setTopic("");
      setBefore("");
      setAfter("");
    } catch (err) {
      console.error("Error updating progress:", err);
      setError(err.response?.data?.message || "Failed to update progress");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="progress-page">
      <form className="progress-form" onSubmit={handleUpdate}>
        <h3>Update Progress</h3>
        {error && <div className="progress-error">{error}</div>}
        {message && <div className="progress-message">{message}</div>}
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="text"
          placeholder="Knowledge Before"
          value={before}
          onChange={(e) => setBefore(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="text"
          placeholder="Knowledge After"
          value={after}
          onChange={(e) => setAfter(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading || !topic.trim()}>
          {loading ? "Updating..." : "Update Progress"}
        </button>
        {percent > 0 && <ProgressBar percent={percent} color="#22c55e" />}
      </form>
    </div>
  );
};

export default Progress;
