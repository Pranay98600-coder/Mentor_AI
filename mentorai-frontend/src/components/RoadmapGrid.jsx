import React, { useState } from "react";
import { generateRoadmap } from "../services/roadmapService";
import RoadmapCard from "./RoadmapCard";
import "./RoadmapGrid.css";

const RoadmapGrid = () => {
  const [topic, setTopic] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await generateRoadmap(topic);
      setRoadmap(data.topics || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate roadmap");
    }
    setLoading(false);
  };

  return (
    <section className="roadmap-section">
      <div className="roadmap-generate-card">
        <input
          type="text"
          placeholder="Enter topic name"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button onClick={handleGenerate} disabled={loading || !topic}>
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>
      {error && <div className="roadmap-error">{error}</div>}
      <div className="roadmap-grid">
        {roadmap.map((item, idx) => (
          <RoadmapCard
            key={idx}
            topic={item.topic}
            video={item.videoUrl}
            status={item.status}
          />
        ))}
      </div>
    </section>
  );
};

export default RoadmapGrid;
