import React, { useEffect, useState } from "react";
import { getMyRoadmaps } from "../services/roadmapService";
import "../styles/roadmap.css";

const MyRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);

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

  if (loading) {
    return <div className="my-roadmaps-page"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="my-roadmaps-page"><p className="error">{error}</p></div>;
  }

  if (!roadmaps.length) {
    return <div className="my-roadmaps-page"><p>No roadmaps found</p></div>;
  }

  return (
    <div className="my-roadmaps-page">
      {roadmaps.map((rm, idx) => (
        <div className="roadmap-expand-card" key={rm.id || idx}>
          <div
            className="roadmap-expand-header"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            <span>{rm.mainTopic || rm.title}</span>
            <span>{expanded === idx ? "▲" : "▼"}</span>
          </div>
          {expanded === idx && (
            <ul className="roadmap-expand-list">
              {rm.topics?.map((t, i) => (
                <li key={i}>{t.name || t}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRoadmaps;
