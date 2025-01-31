import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContextProvider'; // Assuming UserContext is where user data is managed

const Header = () => {
  const location = useLocation();
  const { currentUser, logout } = useContext(UserContext); // Accessing currentUser and logout from the UserContext

  // Handle logout action
  const handleLogout = () => {
    logout(); // This will clear the user state from the context and localStorage
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Project Power</Link>
        <div className="navbar-nav">
          <Link 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
            to="/"
          >
            Home
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} 
            to="/profile"
          >
            Profile
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`} 
            to="/search"
          >
            Search
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
            to="/about"
          >
            About
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/group/1' ? 'active' : ''}`} 
            to="/group/1"
          >
            Group
          </Link>

          {/* Conditional rendering of SignUp and Logout buttons */}
          {!currentUser ? (
            <Link 
              className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} 
              to="/signup"
            >
              Sign Up
            </Link>
          ) : (
            <button 
              className="btn btn-danger nav-link" 
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
