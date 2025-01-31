import axios from 'axios';

// Base URL for your API
const apiUrl = 'http://localhost:5000/api';  // Replace with your API base URL

// Create an Axios instance
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the Authorization header with a token (if available)
export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];
  }
};

// Get all posts
export const getPosts = () => {
  return api.get('/posts');
};

// Get posts by a specific user
export const getUserPosts = (userId) => {
  return api.get(`/user/${userId}/posts`);
};

// Get posts in a specific group
export const getGroupPosts = (groupId) => {
  return api.get(`/group/${groupId}/posts`);
};

// Fetch all groups (new function)
export const fetchGroups = () => {
  return api.get('/groups');  // Assuming your API has an endpoint to fetch all groups
};

// Login user and get token
export const login = (email, password) => {
  return api.post('/login', { email, password });
};

// Logout user and invalidate token
export const logout = () => {
  return api.post('/logout');
};

// Get current user info (requires JWT token)
export const getCurrentUser = () => {
  return api.get('/current_user');
};

// ================================== UPDATE ==================================

// Update post by ID
export const updatePost = (postId, data) => {
  return api.put(`/posts/${postId}`, data);  // Pass updated content, media_url, or group_id as part of `data`
};

// Update group by ID
export const updateGroup = (groupId, data) => {
  return api.put(`/group/${groupId}`, data);  // Pass updated title, description, etc.
};

// Update user profile (if your API supports it, e.g., email, username, etc.)
export const updateUser = (userId, data) => {
  return api.put(`/user/${userId}`, data);  // Pass updated user information
};

// ================================== DELETE ==================================

// Delete post by ID
export const deletePost = (postId) => {
  return api.delete(`/posts/${postId}`);
};

// Delete group by ID
export const deleteGroup = (groupId) => {
  return api.delete(`/group/${groupId}`);
};

// Delete user account (if supported by your API)
export const deleteUser = (userId) => {
  return api.delete(`/user/${userId}`);
};
