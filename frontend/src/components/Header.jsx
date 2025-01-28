import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Project Power</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/profile">Profile</Link>
          <Link className="nav-link" to="/search">Search</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/group/1">Group</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
