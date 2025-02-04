import React, { useState } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import cooking from '../assets/cooking.jpg';
import dancing from '../assets/dancing.jpg';
import football from '../assets/football.jpg';
import gaming from '../assets/gaming.jpg';
import yoga from '../assets/yoga.jpg';
import basketball from '../assets/basketball.jpg';
import './style.css'; // Ensure styles are defined here

const HomePage = () => {
  const navigate = useNavigate();

  // Define hobbies and their corresponding images
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

  // State to manage the images and descriptions of each hobby
  const [hobbyImages, setHobbyImages] = useState(
    hobbies.reduce((acc, hobby) => {
      acc[hobby.name] = { imageUrl: '', description: '' };
      return acc;
    }, {})
  );

  const [groupCreated, setGroupCreated] = useState(false);

  // Handle input changes for image URL and description
  const handleInputChange = (hobbyName, field, value) => {
    setHobbyImages((prev) => ({
      ...prev,
      [hobbyName]: {
        ...prev[hobbyName],
        [field]: value,
      },
    }));
  };

  // Add Image URL for a hobby
  const handleAddImage = (hobbyName) => {
    const { imageUrl, description } = hobbyImages[hobbyName];
    if (imageUrl && description) {
      alert(`${hobbyName} image added successfully!`);
      // Reset the form fields for the current hobby
      setHobbyImages((prev) => ({
        ...prev,
        [hobbyName]: { imageUrl: '', description: '' },
      }));
    } else {
      alert('Please provide both image URL and description!');
    }
  };

  // Update Image URL for a hobby
  const handleUpdateImage = (hobbyName) => {
    const { imageUrl, description } = hobbyImages[hobbyName];
    if (imageUrl && description) {
      alert(`${hobbyName} image updated successfully!`);
    } else {
      alert('Please provide both image URL and description!');
    }
  };

  // Delete Image URL for a hobby
  const handleDeleteImage = (hobbyName) => {
    setHobbyImages((prev) => ({
      ...prev,
      [hobbyName]: { imageUrl: '', description: '' },
    }));
    alert(`${hobbyName} image deleted successfully!`);
  };

  // Handle Create Group (simulate group creation)
  const handleCreateGroup = () => {
    alert('Group added successfully!');
    setGroupCreated(true);
    // Navigate to the first hobby's group page after creating a group
    navigate(`/group/${hobbies[0].name.toLowerCase()}`);
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

      {/* Image Management Section */}
      <div className="image-management mt-4">
        <h2 className="fw-bold mb-4">Manage Hobby Image</h2>
        {hobbies.map((hobby) => (
          <div key={hobby.name} className="mb-4">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{hobby.name} Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={hobbyImages[hobby.name].imageUrl}
                  onChange={(e) => handleInputChange(hobby.name, 'imageUrl', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{hobby.name} Image Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image description"
                  value={hobbyImages[hobby.name].description}
                  onChange={(e) => handleInputChange(hobby.name, 'description', e.target.value)}
                />
              </Form.Group>

              <Button variant="success" onClick={() => handleAddImage(hobby.name)}>Add Image</Button>
              <Button variant="warning" onClick={() => handleUpdateImage(hobby.name)} className="ms-2">Update Image</Button>
              <Button variant="danger" onClick={() => handleDeleteImage(hobby.name)} className="ms-2">Delete Image</Button>
            </Form>
          </div>
        ))}
      </div>

      {/* Add Group Button */}
      <div className="mt-4">
        <Button variant="primary" onClick={handleCreateGroup}>
          Add Group
        </Button>
      </div>

      {/* Display Alert after Group Created */}
      {groupCreated && <Alert variant="success" className="mt-3">Group added successfully!</Alert>}
    </div>
  );
};

export default HomePage;
