import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContextProvider'; 
import { Button, Card, Spinner } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 
import maleAvatar from '../assets/male.jpeg'; // Male avatar image
import femaleAvatar from '../assets/female.jpeg'; // Female avatar image

const ProfilePage = () => {
  const { currentUser, logout, loading, updateUser } = useContext(UserContext); // Using context to get user data
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar || null); // Avatar state with fallback to currentUser's avatar

  // Show an alert when the user successfully logs in
  useEffect(() => {
    if (currentUser) {
      alert('You have logged in successfully!');
    }
  }, [currentUser]);

  // If no currentUser is found, navigate to login page
  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Navigate to login page if no user is logged in
    }
  }, [currentUser, navigate]);

  // If the user is still loading, display a loading spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  // Handle logout functionality
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout(); // Call logout method from context
    setIsLoggingOut(false);
    navigate('/login'); // Redirect to login page after logout
  };

  // Handle avatar selection logic
  const handleAvatarSelection = (selectedGender) => {
    const newAvatar = selectedGender === 'Male' ? maleAvatar : femaleAvatar;
    setAvatar(newAvatar); // Update selected avatar
    updateUser({ ...currentUser, avatar: newAvatar }); // Update user context and localStorage with new avatar

    // After selecting avatar, navigate to HomePage
    navigate('/home');
  };

  return (
    <div className="container mt-4">
      <Card className="mb-4">
        <Card.Body>
          <h2 className="card-title">Welcome, {currentUser?.name}!</h2>
          <p className="card-text">Here is your profile page. Select your avatar.</p>

          {/* Avatar Selection */}
          <Button variant="primary" onClick={() => handleAvatarSelection('Male')} className="me-2">
            <img 
              src={maleAvatar} 
              alt="Male Avatar" 
              className="img-fluid" 
              style={{ width: 80, height: 80, borderRadius: '50%' }} 
            />
          </Button>
          <Button variant="secondary" onClick={() => handleAvatarSelection('Female')}>
            <img 
              src={femaleAvatar} 
              alt="Female Avatar" 
              className="img-fluid" 
              style={{ width: 80, height: 80, borderRadius: '50%' }} 
            />
          </Button>

          {/* Display Avatar */}
          {avatar && (
            <div className="mt-3">
              <img src={avatar} alt="Selected Avatar" className="img-fluid" />
            </div>
          )}

          {/* Logout and Edit Profile */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button variant="warning" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
            <Button variant="info" onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
