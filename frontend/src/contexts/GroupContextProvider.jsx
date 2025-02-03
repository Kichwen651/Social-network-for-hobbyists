import React, { createContext, useState, useContext } from 'react';
import { fetchGroupPosts } from '../services/api'; // Assuming you have an API to fetch group posts

// Create a Context for groups
const GroupContext = createContext();

// GroupContextProvider to manage group data globally
export const GroupProvider = ({ children }) => {
  const [groupPosts, setGroupPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPostsForGroup = async (groupId) => {
    setLoading(true);
    try {
      const posts = await fetchGroupPosts(groupId); // Call API to fetch group posts
      setGroupPosts(posts);
    } catch (err) {
      setError('Failed to load group posts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GroupContext.Provider value={{ groupPosts, loading, error, fetchPostsForGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

// Custom hook to use GroupContext
export const useGroupContext = () => {
  return useContext(GroupContext); // Ensure this is exported correctly
};
