// utils/auth.js

// Function to check if the user is authenticated by checking if a valid token exists
export const isAuthenticated = () => {
  return !!getAuthToken();  // Check if a token exists
};
// Utility function to retrieve the token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');  // Retrieve token from localStorage
};

// Function to set the token (to store it in localStorage)
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token); // Store the token in localStorage
  } else {
    localStorage.removeItem('authToken'); // Remove the token if it's null or undefined
  }
};

// Utility function to remove the token (for logout purposes)
export const logoutUser = () => {
  localStorage.removeItem('authToken');  // Remove token from localStorage
};
