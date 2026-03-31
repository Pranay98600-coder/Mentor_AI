import React from "react";
import { Link } from "react-router-dom";
import "../components/HeroSection.css";

const HeroSection = () => (
  <section className="hero-section">
    <h1 className="hero-title">MentorAI</h1>
    <p className="hero-tagline">"Your AI-powered personal roadmap to master any technology."</p>
    <p className="hero-desc">
      MentorAI helps learners generate personalized learning roadmaps, discover best learning resources, and track their progress step-by-step.
    </p>
    <div className="hero-cta">
      <Link to="/register" className="hero-btn primary">Get Started</Link>
      <Link to="#features" className="hero-btn secondary">Explore Features</Link>
    </div>
  </section>
);

export default HeroSection;
