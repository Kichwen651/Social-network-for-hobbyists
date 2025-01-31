import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Make sure your styles are defined here

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1 className="about-title">About Our Social Network for Hobbyists</h1>
      <p className="about-text">
        Welcome to the platform where hobbyists can connect, share their passions, and explore new hobbies! Whether you're into sports, cooking, gaming, or arts, this platform is designed to help you discover like-minded individuals and exciting groups. 
        <br />
        Here, you can join various hobby-related groups, create posts, and share your experiences with a supportive community.
      </p>
      <div className="about-actions">
        <Button variant="primary" onClick={() => navigate('/login')}>Login Now</Button>
        <Button variant="secondary" onClick={() => navigate('/home')}>Explore Hobbies</Button>
      </div>
    </div>
  );
};

export default AboutPage;
