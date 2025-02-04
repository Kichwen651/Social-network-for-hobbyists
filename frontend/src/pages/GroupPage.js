import React, { useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { Button, Form, Alert } from 'react-bootstrap';
import { addGroup, updateGroup, deleteGroup } from '../services/api'; // Adjust the import path

const GroupPage = () => {
  const { hobbyName } = useParams(); // Get the hobby name from the URL
  const navigate = useNavigate(); // Hook to navigate to a different page

  // Set up the state for hobby image, description, media URL, and group joining status
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [groupMediaUrl, setGroupMediaUrl] = useState('');
  const [groupJoined, setGroupJoined] = useState(false); // Track if user joined the group
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes for image URL, description, and media URL
  const handleInputChange = (field, value) => {
    if (field === 'imageUrl') {
      setImageUrl(value);
    } else if (field === 'description') {
      setDescription(value);
    } else if (field === 'groupMediaUrl') {
      setGroupMediaUrl(value);
    }
  };

  // Handle Group Update
  const handleUpdateGroup = async () => {
    const data = { description, media_url: groupMediaUrl };
    try {
      await updateGroup(hobbyName, data);
      setSuccess(`${hobbyName} group updated successfully!`);
      setError(null); // Reset error on success
    } catch (error) {
      setError('Failed to update group.');
      setSuccess(null); // Reset success on error
    }
  };

  // Handle Group Add
  const handleAddGroup = async () => {
    const data = { hobby_name: hobbyName, description, media_url: groupMediaUrl, image_url: imageUrl };
    try {
      await addGroup(data);
      setSuccess(`${hobbyName} group added successfully!`);
      setError(null); // Reset error on success
      navigate('/groups'); // Redirect to groups page
    } catch (error) {
      setError('Failed to add group.');
      setSuccess(null); // Reset success on error
    }
  };

  // Handle Group Delete
  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(hobbyName);
      setSuccess(`${hobbyName} group deleted successfully!`);
      setError(null); // Reset error on success
      navigate('/groups'); // Redirect to groups page
    } catch (error) {
      setError('Failed to delete group.');
      setSuccess(null); // Reset success on error
    }
  };

  // Handle Group Join
  const handleJoinGroup = () => {
    setGroupJoined(true); // Update the state to indicate user joined the group
    alert(`${hobbyName} group joined successfully!`); // Show alert on successful join
  };

  return (
    <div className="container mt-4 p-8">
      <h1 className="fw-bold mb-6">Welcome to the {hobbyName} Group!</h1>
      <p className="lead">This is the {hobbyName} group where enthusiasts come together to share their passion!</p>

      {/* Display Success or Error Messages */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Image Management */}
      <Form.Group className="mb-3">
        <Form.Label>Hobby Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter an image URL"
          value={imageUrl}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
        />
      </Form.Group>

      {/* Description Management */}
      <Form.Group className="mb-3">
        <Form.Label>Group Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </Form.Group>

      {/* Media URL for Group */}
      <Form.Group className="mb-3">
        <Form.Label>Media URL (for group image/video)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter media URL"
          value={groupMediaUrl}
          onChange={(e) => handleInputChange('groupMediaUrl', e.target.value)}
        />
      </Form.Group>

      {/* Submit and Join Button */}
      <Button variant="primary" onClick={handleUpdateGroup} className="me-2">
        Update Group
      </Button>

      <Button variant="success" onClick={handleAddGroup} className="me-2">
        Add Group
      </Button>

      <Button variant="danger" onClick={handleDeleteGroup} className="me-2">
        Delete Group
      </Button>

      {/* Join Group Button */}
      {!groupJoined && (
        <Button variant="info" onClick={handleJoinGroup} className="mt-3">
          Join Group
        </Button>
      )}
    </div>
  );
};

export default GroupPage;
