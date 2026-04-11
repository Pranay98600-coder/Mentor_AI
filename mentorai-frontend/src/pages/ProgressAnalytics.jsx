import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Sidebar from "../components/Sidebar";
import { getProgress } from "../services/progressService";
import { getMyRoadmaps } from "../services/roadmapService";
import "../styles/dashboard.css";
import "../styles/analytics.css";

const ProgressAnalytics = () => {
  const [allProgressData, setAllProgressData] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Calculate insights
  const [insights, setInsights] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState("");
  const [weakAreas, setWeakAreas] = useState([]);
  const [strongAreas, setStrongAreas] = useState([]);
  const [completedTopics, setCompletedTopics] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);

  // Get selected roadmap object from ID (convert to string for comparison)
  const selectedRoadmap = roadmaps.find(
    (r) => String(r._id) === String(selectedRoadmapId) || String(r.id) === String(selectedRoadmapId)
  );

  // Load roadmaps and progress data
  const loadData = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setRefreshing(true);
      setError("");

      // Fetch roadmaps
      console.log("Fetching roadmaps...");
      const roadmapsData = await getMyRoadmaps();
      console.log("Roadmaps received:", roadmapsData);

      if (Array.isArray(roadmapsData) && roadmapsData.length > 0) {
        setRoadmaps(roadmapsData);
        // Set first roadmap as default only if no selection exists
        if (!selectedRoadmapId) {
          setSelectedRoadmapId(roadmapsData[0]._id || roadmapsData[0].id);
        }
      } else {
        setRoadmaps([]);
        setSelectedRoadmapId(null);
        setError("No roadmaps found. Create a roadmap first!");
      }

      // Fetch progress data
      console.log("Fetching progress data...");
      const progressData = await getProgress();
      console.log("Progress data received:", progressData);
      if (Array.isArray(progressData)) {
        setAllProgressData(progressData);
      } else {
        setAllProgressData([]);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load analytics data. Please try again.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Refetch when user returns to this tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log("Page visibility changed. Hidden:", document.hidden);
      if (!document.hidden) {
        loadData(true); // Refresh without loading spinner
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Filter data when selected roadmap or progress data changes
  useEffect(() => {
    console.log("Filtering effect triggered. SelectedRoadmap:", selectedRoadmap);

    if (!selectedRoadmap || !selectedRoadmap.topics || selectedRoadmap.topics.length === 0) {
      console.log("No selected roadmap or topics");
      setFilteredData([]);
      setTotalTopics(0);
      setCompletedTopics(0);
      setInsights(["📚 Select a roadmap to see analytics"]);
      return;
    }

    try {
      // Extract topic names from roadmap topics (they're objects with a 'topic' field)
      const roadmapTopicNames = Array.isArray(selectedRoadmap.topics)
        ? selectedRoadmap.topics.map((t) => {
            // Handle both string and object formats
            if (typeof t === "string") return t;
            if (t && typeof t === "object" && t.topic) return t.topic;
            return null;
          }).filter(Boolean)
        : [];

      console.log("Extracted roadmap topic names:", roadmapTopicNames);
      console.log("All progress data:", allProgressData);

      setTotalTopics(roadmapTopicNames.length);

      // Filter progress data to only include topics from this roadmap
      const filtered = allProgressData
        .filter((item) => {
          const match = roadmapTopicNames.includes(item.topic);
          console.log(`Topic "${item.topic}" - Match: ${match}`);
          return match;
        })
        .reduce((acc, item) => {
          const existing = acc.find((a) => a.topic === item.topic);
          if (!existing) {
            acc.push({
              topic: item.topic,
              before: item.knowledgeBefore || 0,
              after: item.knowledgeAfter || 0,
              improvement: (item.knowledgeAfter || 0) - (item.knowledgeBefore || 0),
              date: item.createdAt || new Date().toISOString(),
            });
          } else {
            // Update with latest data
            existing.before = item.knowledgeBefore || 0;
            existing.after = item.knowledgeAfter || 0;
            existing.improvement = (item.knowledgeAfter || 0) - (item.knowledgeBefore || 0);
            existing.date = item.createdAt || new Date().toISOString();
          }
          return acc;
        }, []);

      console.log("Filtered data:", filtered);
      setFilteredData(filtered);

      // Calculate progress for this roadmap
      const completed = filtered.filter((item) => item.after >= 7).length;
      setCompletedTopics(completed);

      // Calculate insights
      calculateInsights(filtered, allProgressData, roadmapTopicNames);
    } catch (err) {
      console.error("Error filtering data:", err);
      setFilteredData([]);
    }
  }, [selectedRoadmap, allProgressData]);

  const calculateInsights = (data, rawData, topicNames) => {
    try {
      if (!data || data.length === 0) {
        setInsights(["📚 Start tracking topics to see insights"]);
        setOverallProgress(0);
        setCurrentStreak(0);
        setWeakAreas([]);
        setStrongAreas([]);
        return;
      }

      // Overall Progress
      const totalImprovement = data.reduce((sum, item) => sum + (item.improvement || 0), 0);
      const avgImprovement = Math.round(totalImprovement / data.length) || 0;
      const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
      setOverallProgress(progressPercent);

      // Weak Areas
      const weak = data
        .filter((item) => item.after < 5)
        .sort((a, b) => a.after - b.after)
        .slice(0, 3);
      setWeakAreas(weak);

      // Strong Areas (topics with high knowledge)
      const strong = data
        .filter((item) => item.after >= 7)
        .sort((a, b) => b.after - a.after)
        .slice(0, 2);
      setStrongAreas(strong);

      // Streak Calculation - for this roadmap
      const validDates = rawData
        .filter((item) => topicNames.includes(item.topic))
        .map((item) => {
          try {
            if (item.createdAt) {
              return item.createdAt.split("T")[0];
            }
            return null;
          } catch (e) {
            return null;
          }
        })
        .filter((date) => date !== null);

      const sortedDates = [...new Set(validDates)].sort((a, b) => new Date(b) - new Date(a));

      let streak = 0;
      if (sortedDates.length > 0) {
        const today = new Date().toISOString().split("T")[0];
        let checkDate = new Date(today);

        for (let date of sortedDates) {
          const checkDateStr = checkDate.toISOString().split("T")[0];

          if (date === checkDateStr) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }
      setCurrentStreak(streak);
      setLastActiveDate(sortedDates[0] || "N/A");

      // Generate Smart Insights
      const insightsList = [];

      if (avgImprovement > 5) {
        insightsList.push("🎉 Excellent progress! You're improving significantly.");
      } else if (avgImprovement > 3) {
        insightsList.push("📈 Good improvement! Keep maintaining this momentum.");
      } else if (avgImprovement > 0) {
        insightsList.push("⚡ You're making progress. Push harder!");
      }

      if (streak > 7) {
        insightsList.push(`🔥 Amazing! ${streak}-day learning streak!`);
      } else if (streak > 3) {
        insightsList.push(`🔥 Great streak! Keep it going (${streak} days).`);
      } else if (streak === 0 && data.length > 0) {
        insightsList.push("💪 Start practicing today to build your streak!");
      }

      if (weak.length > 0) {
        insightsList.push(
          `⚠️ Focus on: ${weak.map((w) => w.topic).join(", ")}`
        );
      }

      if (progressPercent === 100) {
        insightsList.push("🏆 Mastered this roadmap! Great achievement!");
      } else if (progressPercent > 75) {
        insightsList.push("🎯 Almost there! Complete the remaining topics.");
      } else if (progressPercent > 50) {
        insightsList.push("📊 Halfway through! Keep up the good work.");
      }

      setInsights(insightsList);
    } catch (error) {
      console.error("Error calculating insights:", error);
      setInsights(["📊 Analytics loading..."]);
    }
  };

  // Handle roadmap selection
  const handleRoadmapChange = (e) => {
    const roadmapId = e.target.value;
    console.log("Roadmap selection changed to:", roadmapId);
    setSelectedRoadmapId(roadmapId);
  };

  // Prepare data for charts
  const timelineData = (allProgressData || [])
    .filter((item) => selectedRoadmap?.topics?.includes(item.topic) && item.createdAt)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .reduce((acc, item) => {
      try {
        const date = item.createdAt?.split("T")[0] || "Unknown";
        const existing = acc.find((d) => d.date === date);
        if (existing) {
          existing.avgAfter = (existing.avgAfter + (item.knowledgeAfter || 0)) / 2;
        } else {
          acc.push({ date, avgAfter: item.knowledgeAfter || 0 });
        }
        return acc;
      } catch (e) {
        console.error("Error processing timeline data:", e);
        return acc;
      }
    }, []);

  const donutData = [
    {
      name: "Completed",
      value: filteredData.filter((item) => item.after >= 7).length,
      fill: "#22c55e",
    },
    {
      name: "In Progress",
      value: filteredData.filter((item) => item.after >= 4 && item.after < 7).length,
      fill: "#f59e0b",
    },
    {
      name: "To Learn",
      value: filteredData.filter((item) => item.after < 4).length,
      fill: "#ef4444",
    },
  ].filter((item) => item.value > 0);

  const radarData = filteredData.slice(0, 6).map((item) => ({
    subject: item.topic.substring(0, 12),
    A: item.after,
    fullName: item.topic,
  }));

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {/* Debug Info - Remove in production */}
        <div style={{
          background: "var(--bg-tertiary)",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          border: "1px solid var(--border-color)"
        }}>
          <details>
            <summary style={{ cursor: "pointer", fontWeight: "600" }}>📊 Debug Info</summary>
            <div style={{ marginTop: "0.5rem", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              <div>✅ Roadmaps loaded: {roadmaps.length}</div>
              <div>✅ Selected Roadmap ID: {selectedRoadmapId}</div>
              <div>✅ Progress entries: {allProgressData.length}</div>
              <div>Filtered data: {filteredData.length > 0 ? `✅ ${filteredData.length}` : `❌ ${filteredData.length}`}</div>

              <hr style={{ margin: "1rem 0", opacity: 0.3 }} />
              <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>📋 ALL ROADMAPS OVERVIEW:</div>
              {roadmaps.map((rm, idx) => (
                <div key={idx} style={{ marginBottom: "1rem", padding: "0.5rem", background: "var(--bg-secondary)", borderRadius: "4px" }}>
                  <div>🔹 Roadmap {idx + 1}: {rm.mainTopic} (ID: {rm._id || rm.id})</div>
                  <div style={{ marginLeft: "1rem", fontSize: "0.8rem" }}>
                    <div>Topics count: {rm.topics?.length || 0}</div>
                    <div>Topics first 2: {JSON.stringify(rm.topics?.slice(0, 2)?.map(t => typeof t === "string" ? t : t?.topic))}</div>
                  </div>
                </div>
              ))}

              <hr style={{ margin: "1rem 0", opacity: 0.3 }} />
              <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>📍 SELECTED ROADMAP DETAILS:</div>
              {selectedRoadmap && (
                <div style={{ background: "var(--bg-secondary)", padding: "0.5rem", borderRadius: "4px" }}>
                  <div>Roadmap: {selectedRoadmap.mainTopic}</div>
                  <div>Total Topics: {selectedRoadmap.topics?.length || 0}</div>
                  <div style={{ marginTop: "0.5rem" }}>
                    Sample topics:
                    <pre>{JSON.stringify(selectedRoadmap.topics?.slice(0, 3), null, 2)}</pre>
                  </div>
                </div>
              )}

              <hr style={{ margin: "1rem 0", opacity: 0.3 }} />
              <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>📊 PROGRESS DATA (All 6 entries):</div>
              {allProgressData.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "0.5rem", padding: "0.5rem", background: "var(--bg-secondary)", borderRadius: "4px", fontSize: "0.8rem" }}>
                  <strong>{idx + 1}. {item.topic}</strong>
                  <div>Before: {item.knowledgeBefore} → After: {item.knowledgeAfter}</div>
                </div>
              ))}
            </div>
          </details>
        </div>
        {/* Header with Roadmap Selector */}
        <div className="analytics-header">
          <div className="analytics-title-section">
            <h2 className="dashboard-welcome">🎯 Learning Insights</h2>
            {selectedRoadmap && (
              <p className="roadmap-subtitle">
                Analyzing: <strong>{selectedRoadmap.mainTopic}</strong>
              </p>
            )}
          </div>
          <div className="analytics-controls">
            <select
              value={selectedRoadmapId || ""}
              onChange={handleRoadmapChange}
              className="roadmap-selector"
            >
              <option value="">-- Select a Roadmap --</option>
              {roadmaps.map((roadmap) => (
                <option key={roadmap._id || roadmap.id} value={roadmap._id || roadmap.id}>
                  {roadmap.mainTopic}
                </option>
              ))}
            </select>
            <button
              className="refresh-btn"
              onClick={() => loadData(true)}
              disabled={refreshing}
              title="Refresh analytics data"
            >
              {refreshing ? "⟳ Refreshing..." : "⟳ Refresh"}
            </button>
          </div>
        </div>

        {loading && <div className="dashboard-loading">📊 Loading analytics...</div>}

        {error && <div className="dashboard-error">❌ {error}</div>}

        {!loading && !error && filteredData.length === 0 && (
          <div className="dashboard-empty">
            <h3>📚 No progress tracked yet</h3>
            <p>
              Track your learning progress in <strong>{selectedRoadmap?.mainTopic}</strong> to see
              analytics
            </p>
          </div>
        )}

        {!loading && !error && filteredData.length > 0 && (
          <>
            {/* Smart Insights Panel */}
            <section className="analytics-insights-panel">
              <h3>💡 Smart Insights</h3>
              <div className="insights-grid">
                {insights.map((insight, idx) => (
                  <div key={idx} className="insight-card">
                    {insight}
                  </div>
                ))}
              </div>
            </section>

            {/* AI Recommendations - Simple Banner */}
            {(weakAreas.length > 0 || strongAreas.length > 0) && (
              <section className="ai-recommendations-banner">
                <div className="recommendations-content">
                  {weakAreas.length > 0 && (
                    <div className="rec-item focus">
                      <span className="rec-label">⚠️ Focus on:</span>
                      <span className="rec-topics">{weakAreas.slice(0, 2).map(t => t.topic).join(", ")}</span>
                    </div>
                  )}
                  {strongAreas.length > 0 && (
                    <div className="rec-item strong">
                      <span className="rec-label">🔥 Strong in:</span>
                      <span className="rec-topics">{strongAreas.slice(0, 2).map(t => t.topic).join(", ")}</span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Key Metrics */}
            <section className="analytics-metrics">
              <div className="metric-card progress-metric-card">
                <div className="metric-value">{overallProgress}%</div>
                <div className="metric-label">Roadmap Progress</div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{ width: `${overallProgress}%` }}
                  >
                    {overallProgress > 5 && <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "white" }}>{overallProgress}%</span>}
                  </div>
                  {overallProgress <= 5 && <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--accent-primary)", marginLeft: "0.5rem" }}>{overallProgress}%</span>}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-value">🔥 {currentStreak}</div>
                <div className="metric-label">Learning Streak</div>
                <div className="metric-sub">Last active: {lastActiveDate}</div>
              </div>

              <div className="metric-card">
                <div className="metric-value">
                  {completedTopics}/{totalTopics}
                </div>
                <div className="metric-label">Topics Completed</div>
                <div className="metric-sub">
                  {totalTopics - completedTopics} remaining
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-value">
                  {filteredData.length > 0
                    ? Math.round(
                        filteredData.reduce((sum, item) => sum + item.improvement, 0) /
                          filteredData.length
                      )
                    : 0}
                </div>
                <div className="metric-label">Avg Improvement</div>
                <div className="metric-sub">Per topic</div>
              </div>
            </section>

            {/* Charts Grid */}
            <div className="analytics-charts-grid">
              {/* Donut Chart */}
              <section className="chart-card">
                <h3>📊 Progress Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {donutData.map((item) => (
                    <div key={item.name} className="legend-item">
                      <span
                        className="legend-color"
                        style={{ backgroundColor: item.fill }}
                      ></span>
                      {item.name}: {item.value}
                    </div>
                  ))}
                </div>
              </section>

              {/* Radar Chart - Skill Distribution */}
              {radarData.length > 0 && (
                <section className="chart-card">
                  <h3>🎯 Skill Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} />
                      <Radar
                        name="Knowledge Level"
                        dataKey="A"
                        stroke="var(--accent-primary)"
                        fill="var(--accent-primary)"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </section>
              )}
            </div>

            {/* Learning Trend */}
            {timelineData.length > 0 && (
              <section className="chart-card full-width">
                <h3>📈 Learning Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis
                      label={{ value: "Knowledge Level", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avgAfter"
                      stroke="var(--accent-primary)"
                      strokeWidth={2}
                      name="Average Knowledge"
                      dot={{ fill: "var(--accent-primary)", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </section>
            )}

            {/* Bar Chart - Topic Performance */}
            <section className="chart-card full-width">
              <h3>📚 Topic Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
                  <YAxis
                    label={{
                      value: "Knowledge Level",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" fill="var(--text-secondary)" name="Before" />
                  <Bar dataKey="after" fill="var(--color-success)" name="After" />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Weak Areas Alert */}
            {weakAreas.length > 0 && (
              <section className="analytics-weak-areas">
                <h3>⚠️ Areas Needing Attention</h3>
                <div className="weak-areas-list">
                  {weakAreas.map((item) => (
                    <div key={item.topic} className="weak-area-item">
                      <div className="weak-area-name">{item.topic}</div>
                      <div className="weak-area-score">
                        <div className="score-bar">
                          <div
                            className="score-fill"
                            style={{
                              width: `${(item.after / 10) * 100}%`,
                              backgroundColor:
                                item.after < 3
                                  ? "#ef4444"
                                  : item.after < 5
                                  ? "#f59e0b"
                                  : "#22c55e",
                            }}
                          ></div>
                        </div>
                        <span className="score-text">{item.after}/10</span>
                      </div>
                      <div className="improvement-suggestion">
                        💡 Progress: {item.before} → {item.after} (Improvement: +{item.improvement})
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ProgressAnalytics;
