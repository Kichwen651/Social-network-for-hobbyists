import React, { useContext,  useState } from 'react';
import { UserContext } from '../contexts/UserContext'; // Path to UserContext
import { useNavigate } from 'react-router-dom'; // For redirecting after logout
import { Button, Card, Spinner } from 'react-bootstrap'; // Import Bootstrap components

const ProfilePage = () => {
  const { currentUser, logout, loading } = useContext(UserContext);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [isLoggingOut, setIsLoggingOut] = useState(false); // To track if logout is in progress

  // If still loading, display a spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  // If there's no current user (not logged in), prompt to log in
  if (!currentUser) {
    return (
      <div className="text-center">
        <h2>Please log in to view your profile.</h2>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true); // Set the logout state to show that it's in progress
    await logout(); // Log the user out
    setIsLoggingOut(false); // Reset logout state after completion
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="container mt-4">
      <Card className="mb-4">
        <Card.Body>
          <h2 className="card-title">Welcome, {currentUser.name}!</h2>
          <p className="card-text">Here is your profile page.</p>

          <div className="d-flex justify-content-between align-items-center">
            <Button 
              variant="warning" 
              onClick={handleLogout} 
              disabled={isLoggingOut} // Disable the button if logout is in progress
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
            <Button variant="info" onClick={() => navigate('/edit-profile')}>
              Edit Profile
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
