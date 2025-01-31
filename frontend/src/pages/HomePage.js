import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import cooking from '../assets/cooking.jpg';
import dancing from '../assets/dancing.jpg';
import football from '../assets/football.jpg';
import gaming from '../assets/gaming.jpg';
import yoga from '../assets/yoga.jpg';
import basketball from '../assets/basketball.jpg';
import './style.css'; // Make sure your styles are defined here

const HomePage = () => {
  const navigate = useNavigate();

  // Define hobbies and their corresponding images based on gender
  const hobbies = [
    { name: 'Football', image: football },
    { name: 'Basketball', image: basketball },
    { name: 'Gaming', image: gaming },
    { name: 'Yoga', image: yoga },
    { name: 'Dancing', image: dancing },
    { name: 'Cooking', image: cooking },
  ];

  // Check if the user is logged in (for example, check for an auth token in localStorage)
  const isLoggedIn = localStorage.getItem('authToken') !== null;

  // Handle click on Explore button
  const handleExploreClick = (hobbyName) => {
    if (isLoggedIn) {
      navigate(`/group/${hobbyName.toLowerCase()}`);
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="container mt-4 p-8">
      <h1 className="fw-bold mb-6">Welcome to the Hobbyists Network!</h1>

      {/* Meaning of Social Network for Hobbyists */}
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-4">What is a Social Network for Hobbyists?</h2>
        <p className="lead">
          A hobbyist network connects individuals with shared interests, passions, and hobbies. 
          It's a platform for people to come together, share experiences, 
          and collaborate on projects that bring them joy. Whether you're a sports enthusiast, a foodie, 
          or someone who loves crafting, our community allows you to interact with like-minded individuals 
          and take your hobbies to the next level.
        </p>
      </div>

      {/* Hobbies Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Hobbies</h2>
          {hobbies.map((hobby, index) => (
            <div key={index} className="mb-4">
              <Button
                variant="primary"
                onClick={() => handleExploreClick(hobby.name)} 
                style={{ width: '100%' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Explore {hobby.name}</span>
                  <img 
                    src={hobby.image} 
                    alt={`Icon representing ${hobby.name}`} 
                    style={{ width: 150, height: 150, borderRadius: '80%' }} // Increased size of images
                  />
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
