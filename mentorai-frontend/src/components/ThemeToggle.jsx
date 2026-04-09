import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

/**
 * ThemeToggle Component
 * Handles switching between light and dark modes
 * Persists user preference in localStorage
 * Applies theme to document root via data-theme attribute
 */
const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme on component mount
  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Use system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      document.documentElement.setAttribute('data-theme', systemTheme);
    }

    setIsLoading(false);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // Update state
    setTheme(newTheme);

    // Update DOM
    document.documentElement.setAttribute('data-theme', newTheme);

    // Persist to localStorage
    localStorage.setItem('theme', newTheme);

    // Optional: Track theme change in analytics
    if (window.gtag) {
      window.gtag('event', 'theme_toggle', { theme: newTheme });
    }
  };

  // Prevent render until theme is loaded to avoid flash
  if (isLoading) {
    return null;
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-label sr-only">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
