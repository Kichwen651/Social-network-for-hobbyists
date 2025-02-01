// utils/auth.js

// Function to check if the user is authenticated by checking if a valid token exists
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage
  return token ? true : false;  // If a token exists, the user is authenticated
};

// Utility function to retrieve the token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');  // Retrieve token from localStorage
};

// Utility function to remove the token (for logout purposes)
export const logoutUser = () => {
  localStorage.removeItem('authToken');  // Remove token from localStorage
};
