import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import "../styles/navbar.css";

const Home = ({ isAuthenticated }) => (
  <div className="home-page">
    <HeroSection isAuthenticated={isAuthenticated} />
    <FeaturesSection />
  </div>
);

export default Home;
