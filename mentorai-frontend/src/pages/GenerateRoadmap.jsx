import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../services/roadmapService";
import "../styles/generate-roadmap.css";

const GenerateRoadmap = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    topic: "",
    level: "Beginner",
    goal: "Job",
    timePerDay: "1",
    learningStyle: "Both",
    workingStatus: "No",
    timeline: "3",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await generateRoadmap(formData);
      // Redirect to dashboard to show new roadmap
      navigate("/dashboard");
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError(err.response?.data?.message || "Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-roadmap-page">
      <div className="generate-roadmap-container">
        <h1>Generate Your Roadmap</h1>
        <p className="generate-roadmap-subtitle">
          Tell us about your learning goals and we'll create a personalized roadmap for you
        </p>

        <form className="generate-roadmap-form" onSubmit={handleSubmit}>
          {error && <div className="generate-roadmap-error">{error}</div>}

          {/* Topic Field */}
          <div className="form-group">
            <label htmlFor="topic">What do you want to learn? *</label>
            <input
              type="text"
              id="topic"
              name="topic"
              placeholder="e.g., React, Python, Web Development"
              value={formData.topic}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Two Column Layout */}
          <div className="form-row">
            {/* Level */}
            <div className="form-group">
              <label htmlFor="level">Your Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Goal */}
            <div className="form-group">
              <label htmlFor="goal">Your Goal</label>
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Job">Job</option>
                <option value="Internship">Internship</option>
                <option value="Switch">Career Switch</option>
                <option value="Freelancing">Freelancing</option>
              </select>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="form-row">
            {/* Time Per Day */}
            <div className="form-group">
              <label htmlFor="timePerDay">Time per day (hours)</label>
              <select
                id="timePerDay"
                name="timePerDay"
                value={formData.timePerDay}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="0.5">0.5 hours</option>
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4+ hours</option>
              </select>
            </div>

            {/* Learning Style */}
            <div className="form-group">
              <label htmlFor="learningStyle">Learning Style</label>
              <select
                id="learningStyle"
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Videos">Videos</option>
                <option value="Practice">Practice</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="form-row">
            {/* Working Status */}
            <div className="form-group">
              <label htmlFor="workingStatus">Currently Working?</label>
              <select
                id="workingStatus"
                name="workingStatus"
                value={formData.workingStatus}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Timeline */}
            <div className="form-group">
              <label htmlFor="timeline">Timeline (months)</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="1">1 month</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">1 year</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="form-btn form-btn-secondary"
              onClick={() => navigate("/dashboard")}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-btn form-btn-primary"
              disabled={loading}
            >
              {loading ? "Generating Roadmap..." : "Generate Roadmap"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateRoadmap;
