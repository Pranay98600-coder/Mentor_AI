import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import "./Landing.css";

const Landing = () => (
  <div className="landing-page">
    <HeroSection />
    <FeaturesSection />
  </div>
);

export default Landing;
