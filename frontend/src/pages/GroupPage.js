// src/pages/GroupPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';
import { getGroupPosts, getCurrentUser, setAuthHeader } from '../services/api'; // Correct API calls and setAuthHeader
import Layout from '../components/Layout';  // Import Layout component
import './style.css';

// Get the token from localStorage
const token = localStorage.getItem('authToken');

// Set the Authorization header if the token exists
if (token) {
  setAuthHeader(token);  // This will set the auth token for API requests
}

const GroupPage = () => {
  const { groupId } = useParams(); // Get groupId from URL params
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message

  
  // Fetch posts for the group
  useEffect(() => {
    const fetchGroupPosts = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const response = await getGroupPosts(groupId); // Fetch posts
          setPosts(response.data);
        } else {
          setError("You must be logged in to see posts.");
        }
      } catch (err) {
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupPosts();
  }, [groupId],'/posts');

  // Handle button click (Like, Share, Follow)
  const handleAction = (action) => {
    setAlertMessage(`You have successfully ${action} this post!`); // Set the alert message
    setTimeout(() => setAlertMessage(''), 3000); // Clear alert after 3 seconds
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
  }

  if (error) {
    return <div className="text-center mt-5"><Alert variant="danger">{error}</Alert></div>;
  }

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Group Posts</h2>

        {/* Show Alert Message */}
        {alertMessage && <Alert variant="success" className="mt-3">{alertMessage}</Alert>}

        <div className="row">
          {posts.length === 0 ? (
            <div className="col-12">
              <Alert variant="info">No posts available in this group yet.</Alert>
            </div>
          ) : (
            posts.map((post) => (
              <div className="col-md-4 mb-3" key={post.id}>
                <Card className="post-card">
                  <Card.Body>
                    <p>{post.content || 'No content available.'}</p>
                    {post.media_url && <img src={post.media_url} alt="Post Media" className="img-fluid mb-3" />}
                    <div className="button-group">
                      <Button 
                        variant="primary" 
                        className="action-button" 
                        onClick={() => handleAction('liked')}
                      >
                        Like
                      </Button>
                      <Button 
                        variant="success" 
                        className="action-button" 
                        onClick={() => handleAction('shared')}
                      >
                        Share
                      </Button>
                      <Button 
                        variant="warning" 
                        className="action-button" 
                        onClick={() => handleAction('followed')}
                      >
                        Follow
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GroupPage;
