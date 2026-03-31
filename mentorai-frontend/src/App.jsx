

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GenerateRoadmap from "./pages/GenerateRoadmap";
import MyRoadmaps from "./pages/MyRoadmaps";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/navbar.css";
import "./styles/dashboard.css";
import "./styles/sidebar.css";
import "./styles/roadmap.css";
import "./styles/auth.css";


// Helper to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/generate"
          element={
            <ProtectedRoute>
              <GenerateRoadmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-roadmaps"
          element={
            <ProtectedRoute>
              <MyRoadmaps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App