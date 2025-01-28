import React, { createContext, useState, useEffect } from 'react';

// Create a context to share user state across components
export const UserContext = createContext();

// UserProvider manages user state and logic
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage if present
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));  // Save user to localStorage
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');  // Remove user from localStorage
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
