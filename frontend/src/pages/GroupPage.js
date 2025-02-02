// pages/GroupPage.js
import { useEffect, useState } from 'react';
import { fetchGroupPosts } from '../services/api'; // Correct import of fetchGroupPosts
import { useParams } from 'react-router-dom';
import { Alert, Spinner, Card, Button } from 'react-bootstrap';
import Layout from '../components/Layout';

const GroupPage = () => {
  const { groupId } = useParams(); // Get groupId from URL params
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  // Fetch posts when the component mounts or groupId changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchGroupPosts(groupId); // Fetch posts for the group
        setPosts(response); // Assuming response is an array of posts
      } catch (err) {
        setError('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [groupId]);

  // Handle actions for posts (Like, Share, Follow)
  const handleAction = (action) => {
    setAlertMessage(`You have successfully ${action} this post!`);
    setTimeout(() => setAlertMessage(''), 3000); // Hide the alert after 3 seconds
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
                      <Button variant="primary" className="action-button" onClick={() => handleAction('liked')}>
                        Like
                      </Button>
                      <Button variant="success" className="action-button" onClick={() => handleAction('shared')}>
                        Share
                      </Button>
                      <Button variant="warning" className="action-button" onClick={() => handleAction('followed')}>
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
