import React, { useState } from "react";
import { updateProgress } from "../services/roadmapService";
import "./ProgressTracker.css";

const ProgressTracker = ({ topic }) => {
  const [knowledgeBefore, setKnowledgeBefore] = useState(5);
  const [knowledgeAfter, setKnowledgeAfter] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdate = async () => {
    if (knowledgeBefore < 1 || knowledgeBefore > 10 || knowledgeAfter < 1 || knowledgeAfter > 10) {
      setMessage("Please enter values between 1 and 10");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await updateProgress(topic, knowledgeBefore, knowledgeAfter);
      setMessage("✓ Updated");
      setIsSuccess(true);
      // Clear message after 2 seconds
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error updating progress:", error);
      setMessage("Failed to update progress");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="progress-tracker">
      <div className="progress-tracker-inputs">
        <div className="progress-input-group">
          <label htmlFor={`before-${topic}`}>Before:</label>
          <input
            id={`before-${topic}`}
            type="number"
            min="1"
            max="10"
            value={knowledgeBefore}
            onChange={(e) => setKnowledgeBefore(Number(e.target.value))}
            disabled={loading}
            className="progress-input"
          />
        </div>

        <div className="progress-input-group">
          <label htmlFor={`after-${topic}`}>After:</label>
          <input
            id={`after-${topic}`}
            type="number"
            min="1"
            max="10"
            value={knowledgeAfter}
            onChange={(e) => setKnowledgeAfter(Number(e.target.value))}
            disabled={loading}
            className="progress-input"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="progress-btn"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>

      {message && (
        <div className={`progress-message ${isSuccess ? "success" : "error"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
