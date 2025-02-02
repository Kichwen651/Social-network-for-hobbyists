import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContextProvider'; // Assuming UserContext is where user data is managed
import { matchPath } from 'react-router-dom'; // For matching dynamic group routes

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(UserContext); // Accessing currentUser and logout from the UserContext

  // Check if the current route matches the group dynamic path (e.g., /group/:groupId)
  const isGroupPage = matchPath("/group/:groupId", location.pathname);

  // Handle logout action
  const handleLogout = () => {
    logout(); // This will clear the user state from the context and localStorage
    navigate('/login'); // Redirect to login page after logout
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
            className={`nav-link ${isGroupPage ? 'active' : ''}`} 
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
