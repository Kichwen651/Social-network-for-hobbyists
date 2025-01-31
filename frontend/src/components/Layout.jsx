// src/components/Layout.jsx

import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
  

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Navbar Section */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">HobbyHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/groups">Groups</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer Section */}
      <footer className="footer text-center py-3 mt-5 bg-dark text-white">
        <p>&copy; 2025 HobbyHub | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Layout;
