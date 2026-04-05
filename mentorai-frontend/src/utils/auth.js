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
 */
export const logout = () => {
  localStorage.clear();
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
