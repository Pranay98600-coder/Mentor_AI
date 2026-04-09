import React from "react";
import { motion } from "framer-motion";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "🤖",
      title: "AI Roadmap Generation",
      description: "Generate personalized learning roadmap using AI based on your goals, time, and experience level.",
    },
    {
      id: 2,
      icon: "🧠",
      title: "Smart AI Mentor Chat",
      description: "Ask doubts anytime and get instant help. AI guides your learning step-by-step with personalized explanations.",
    },
    {
      id: 3,
      icon: "📈",
      title: "Progress Tracking",
      description: "Track your knowledge before and after learning with visual progress bars and detailed analytics.",
    },
    {
      id: 4,
      icon: "🎯",
      title: "Custom Learning Preferences",
      description: "Guide the AI using custom instructions for more personalized results tailored to your learning style.",
    },
    {
      id: 5,
      icon: "🎥",
      title: "YouTube Integration",
      description: "Auto-fetch the best learning videos for each topic to complement your learning journey.",
    },
    {
      id: 6,
      icon: "🔄",
      title: "Regenerate Roadmap",
      description: "Modify and improve your roadmap anytime based on your progress and changing goals.",
    },
    {
      id: 7,
      icon: "📊",
      title: "Dashboard & Analytics",
      description: "View comprehensive learning statistics and track all completed topics in one place.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="features" className="features-section">
      <motion.div
        className="features-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <h2 className="features-title">Features That Make Learning Smarter</h2>
        <p className="features-subtitle">
          Everything you need to learn efficiently with AI guidance
        </p>
      </motion.div>

      <motion.div
        className="features-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="feature-card"
            variants={cardVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
