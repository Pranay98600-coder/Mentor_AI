import React, { useState } from "react";
import { updateProgress } from "../services/roadmapService";
import "./ProgressForm.css";

const ProgressForm = () => {
  const [topic, setTopic] = useState("");
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await updateProgress(topic, before, after);
      setMessage("Progress updated!");
      setTopic("");
      setBefore("");
      setAfter("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update progress");
    }
    setLoading(false);
  };

  return (
    <form className="progress-form" onSubmit={handleSubmit}>
      <h3>Update Progress</h3>
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Knowledge Before"
        value={before}
        onChange={(e) => setBefore(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Knowledge After"
        value={after}
        onChange={(e) => setAfter(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Progress"}
      </button>
      {message && <div className="progress-message">{message}</div>}
    </form>
  );
};

export default ProgressForm;
