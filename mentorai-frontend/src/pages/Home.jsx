import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import "../styles/navbar.css";

const Home = () => (
  <div className="home-page">
    <HeroSection />
    <FeaturesSection />
  </div>
);

export default Home;
