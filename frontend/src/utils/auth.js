// auth.js

// Function to get the auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');  // Retrieve token from localStorage
};

// Function to check if the user is authenticated (token exists)
export const isAuthenticated = () => {
  const token = getAuthToken();  // Retrieve token from localStorage
  return token !== null;  // If the token exists, the user is authenticated
};

// Function to set the token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);  // Store token in localStorage
  } else {
    localStorage.removeItem('authToken');  // Remove token from localStorage
  }
};

// Function to remove the token and logout the user
export const logout = () => {
  localStorage.removeItem('authToken');  // Remove token from localStorage
};
