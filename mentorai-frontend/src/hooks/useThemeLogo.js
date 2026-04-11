import { useEffect, useState } from "react";
import logoDark from "../assets/logos/logo-dark.jpeg";
import logoLight from "../assets/logos/logo-light.jpeg";
import logoIcon from "../assets/logos/logo-icon.png";

/**
 * Custom hook to get the correct logo based on current theme
 * Returns appropriate logo for dark/light mode and icon
 */
export const useThemeLogo = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Get current theme from localStorage
    const currentTheme = localStorage.getItem("theme") || "dark";
    setTheme(currentTheme);

    // Listen for theme changes
    const handleThemeChange = (e) => {
      setTheme(e.detail?.theme || "dark");
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  return {
    fullLogo: theme === "light" ? logoLight : logoDark,
    iconLogo: logoIcon,
    theme,
  };
};
