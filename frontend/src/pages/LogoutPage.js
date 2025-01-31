import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LogoutPage = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Are you sure you want to log out?</h2>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default LogoutPage;
