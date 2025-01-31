import React, { createContext, useState, useEffect } from 'react';

// Creating the context to store user data globally
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  // Check if user data exists in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setCurrentUser(null); // Handle invalid data by setting `currentUser` to null
      }
    }
    setLoading(false); // Finish loading
  }, []);

  // Function to log in the user
  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage
    setCurrentUser(user); // Update the context with the logged-in user
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setCurrentUser(null); // Update context with null (no user)
  };

  // Function to update the user's profile
  const updateUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated user data to localStorage
    setCurrentUser(updatedUser); // Update the context with the updated user
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
