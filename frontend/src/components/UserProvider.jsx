// Example UserProvider:
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Make sure you're within Router context

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.success) {
        const user = response.data.user;
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/'); // This will work as expected because we're inside Router
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
