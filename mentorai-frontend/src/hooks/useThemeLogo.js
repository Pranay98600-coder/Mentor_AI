import { useEffect, useState } from "react";
import logoDark from "../assets/logos/logo-dark.jpeg";
import logoLight from "../assets/logos/logo-light.jpeg";
import logoIcon from "../assets/logos/logo-icon.png";

/**
 * Custom hook to get the correct logo based on current theme
 * Returns appropriate logo for dark/light mode and icon
 * Listens for theme changes and updates automatically
 */
export const useThemeLogo = () => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage on initial load
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    // Listen for theme changes from ThemeToggle component
    const handleThemeChange = (e) => {
      const newTheme = e.detail?.theme || localStorage.getItem("theme") || "dark";
      setTheme(newTheme);
    };

    // Also listen for storage changes (in case theme changes in another tab)
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "dark";
      setTheme(newTheme);
    };

    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    fullLogo: theme === "light" ? logoLight : logoDark,
    iconLogo: logoIcon,
    theme,
  };
};
