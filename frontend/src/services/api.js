import axios from 'axios';
import { isAuthenticated, getAuthToken } from '../utils/auth';  // Correct path to auth.js

const apiUrl = 'https://social-network-for-hobbyists.onrender.com/api';  // Your API base URL

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the Authorization header based on authentication status
export const setAuthHeader = () => {
  const token = getAuthToken();  // Get the token from localStorage

  if (isAuthenticated() && token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`; // Add token to request headers if authenticated
  } else {
    delete api.defaults.headers['Authorization']; // Remove the Authorization header if not authenticated
  }
};

// GET: Get posts for a specific group by ID
export const fetchGroupPosts = (groupId) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.get(`/group/${groupId}/posts`)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// POST: Login to get a JWT token
export const login = (email, password) => {
  return api.post('/login', { email, password })
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// POST: Logout the user and invalidate the JWT token
export const logout = () => {
  localStorage.removeItem("authToken");  // Remove token on logout
  return api.post('/logout')
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// POST: Register a new user
export const register = (email, password, username) => {
  return api.post('/register', { email, password, username })
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// GET: Fetch all groups (if applicable)
export const fetchGroups = () => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.get('/groups')
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// PUT: Update user profile (e.g., username, email)
export const updateUser = (userId, data) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.put(`/user/${userId}`, data)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// DELETE: Delete a user by ID
export const deleteUser = (userId) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.delete(`/user/${userId}`)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// DELETE: Delete a group by ID
export const deleteGroup = (groupId) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.delete(`/group/${groupId}`)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// PUT: Update a group by ID
export const updateGroup = (groupId, data) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.put(`/group/${groupId}`, data)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// POST: Create a new post in a specific group
export const addPost = (data) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.post('/posts', data)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// PUT: Update a post by ID
export const updatePost = (postId, data) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.put(`/posts/${postId}`, data)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};

// DELETE: Delete a post by ID
export const deletePost = (postId) => {
  setAuthHeader(); // Ensure the Authorization header is set before the request
  return api.delete(`/posts/${postId}`)
    .then(response => response.data)
    .catch(error => {
      throw error.response ? error.response.data : error.message;
    });
};
