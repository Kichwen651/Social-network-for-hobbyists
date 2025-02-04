import axios from 'axios';

// Base URL for API requests
const api = axios.create({
  baseURL: 'https://social-network-for-hobbyists.onrender.com/api', // Update to your API base URL
});

// =============================== AUTHENTICATION ================================

// POST: Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data; // Return token on successful login
  } catch (error) {
    // Throw error if login fails
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

// POST: Create a new user
export const addUser = async (data) => {
  try {
    const response = await api.post('/users', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create user');
  }
};

// =============================== USER MANAGEMENT ================================

// GET: Fetch all users (Admin only)
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch users');
  }
};

// GET: Fetch a user by ID (Self or Admin only)
export const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch user');
  }
};

// PUT: Update user information (Self or Admin only)
export const updateUser = async (userId, data) => {
  try {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update user');
  }
};

// DELETE: Delete a user (Self or Admin only)
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete user');
  }
};

// =============================== GROUPS ================================

// POST: Add a new group
export const addGroup = async (data) => {
  try {
    const response = await api.post('/group/add', data); // Corrected the endpoint to /groups
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add group');
  }
};

// GET: Fetch all groups for the authenticated user
export const fetchGroups = async () => {
  try {
    const response = await api.get('/groups');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch groups');
  }
};

// GET: Fetch a group by ID for the authenticated user
export const fetchGroupById = async (groupId) => {
  try {
    const response = await api.get(`/groups/${groupId}`); // Corrected the endpoint to /groups/:id
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch group');
  }
};

// PUT: Update a group by ID
export const updateGroup = async (groupId, data) => {
  try {
    const response = await api.put(`/groups/${groupId}`, data); // Corrected the endpoint to /groups/:id
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update group');
  }
};

// DELETE: Delete a group by ID
export const deleteGroup = async (groupId) => {
  try {
    const response = await api.delete(`/groups/${groupId}`); // Corrected the endpoint to /groups/:id
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete group');
  }
};

// =============================== POSTS ================================

// GET: Get all posts (removed group filter)
export const fetchAllPosts = async () => {
  try {
    const response = await api.get('/posts'); // Fetch all posts
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch posts');
  }
};

// GET: Fetch a post by ID
export const fetchPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch post');
  }
};

// POST: Create a new post
export const addPost = async (data) => {
  try {
    const response = await api.post('/posts', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create post');
  }
};

// PUT: Update a post by ID
export const updatePost = async (postId, data) => {
  try {
    const response = await api.put(`/posts/${postId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update post');
  }
};

// DELETE: Delete a post by ID
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete post');
  }
};

// =============================== AUTHORIZATION ================================

// Function to set the Authorization header based on authentication status
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set the JWT token in Authorization header
  } else {
    delete api.defaults.headers['Authorization']; // Remove token from headers if no token provided
  }
};

// Export default API instance
export default api;
