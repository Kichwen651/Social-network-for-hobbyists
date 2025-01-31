import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContextProvider';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const { currentUser, updateUser } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const navigate = useNavigate();

  const handleSave = () => {
    updateUser({ name: username, email });
    navigate('/profile'); // Redirect back to profile page after update
  };

  if (!currentUser) {
    return <div>Please log in to edit your profile.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Form>
    </div>
  );
};

export default EditProfilePage;
