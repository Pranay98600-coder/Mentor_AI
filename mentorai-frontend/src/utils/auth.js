/**
 * Authentication Utilities
 * Centralized auth logic for the MentorAI frontend
 */

/**
 * Check if user is authenticated by verifying token exists
 * @returns {boolean} True if token exists in localStorage
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Get current user data from localStorage
 * @returns {Object} User object with token, username, email
 */
export const getCurrentUser = () => {
  return {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  };
};

/**
 * Save user authentication data to localStorage
 * @param {Object} userData - User data object with token, username, email
 */
export const saveUserData = (userData) => {
  if (userData.token) {
    localStorage.setItem("token", userData.token);
  }
  if (userData.username) {
    localStorage.setItem("username", userData.username);
  }
  if (userData.email) {
    localStorage.setItem("email", userData.email);
  }
};

/**
 * Clear all authentication data from localStorage
 * UPDATED: Removed email from logout (was missing in some places)
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};

/**
 * Get authorization header for API requests
 * @returns {Object} Authorization header object or empty object if no token
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

// ADDED: Safe date formatting utility
export const formatDate = (dateString) => {
  if (!dateString) {
    return "No date available";
  }

  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "No date available";
    }
    // Format: "Mar 12, 2026, 2:30 PM"
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  } catch (error) {
    return "No date available";
  }
};
