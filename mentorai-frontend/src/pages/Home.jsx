import React from "react";
import "../styles/navbar.css";

const Home = () => (
  <div className="home-page">
    <div className="hero-section">
      <h1 className="hero-title">MentorAI</h1>
      <p className="hero-tagline">"Your AI-powered personal roadmap to master any technology."</p>
      <p className="hero-desc">
        MentorAI helps learners generate personalized learning roadmaps, discover best learning resources, and track their progress step-by-step.
      </p>
      <div className="hero-cta">
        <a href="/register" className="hero-btn primary">Get Started</a>
        <a href="#features" className="hero-btn secondary">Explore Features</a>
      </div>
    </div>
  </div>
);

export default Home;
