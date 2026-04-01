import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/Sidebar";
import { getProgress } from "../services/progressService";
import "../styles/dashboard.css";
import "../styles/roadmap.css";

const ProgressAnalytics = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProgress();

        if (Array.isArray(data) && data.length > 0) {
          // Create a map to keep only the latest entry for each topic
          const topicMap = {};
          data.forEach((item) => {
            topicMap[item.topic] = {
              topic: item.topic,
              before: item.knowledgeBefore || 0,
              after: item.knowledgeAfter || 0,
            };
          });
          
          // Convert map back to array
          const formatted = Object.values(topicMap);
          setChartData(formatted);
        } else {
          setChartData([]);
        }
      } catch (err) {
        console.error("Error loading progress data:", err);
        setError("Failed to load progress data");
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <h2 className="dashboard-welcome">Progress Analytics</h2>

        {loading && (
          <div className="dashboard-loading">Loading analytics...</div>
        )}

        {error && (
          <div className="dashboard-error">{error}</div>
        )}

        {!loading && !error && chartData.length === 0 && (
          <div className="dashboard-empty">
            <h3>No progress data yet</h3>
            <p>Track your learning progress to see analytics</p>
          </div>
        )}

        {!loading && !error && chartData.length > 0 && (
          <section className="dashboard-section">
            <h3>Learning Progress Chart</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <XAxis dataKey="topic" />
                  <YAxis
                    label={{
                      value: "Knowledge Level",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" fill="#94a3b8" name="Before" />
                  <Bar dataKey="after" fill="#22c55e" name="After" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProgressAnalytics;
