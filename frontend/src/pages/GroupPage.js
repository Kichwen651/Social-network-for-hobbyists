import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGroupContext } from '../contexts/GroupContextProvider'; // Import the hook for group context
import { Spinner, Alert, Card, Button } from 'react-bootstrap'; // Assuming you use Bootstrap for styling

const GroupPage = () => {
  const { groupId } = useParams(); // Get groupId from URL params
  const { groupPosts, loading, error, fetchPostsForGroup } = useGroupContext(); // Get data and actions from context

  useEffect(() => {
    fetchPostsForGroup(groupId); // Fetch group posts when component mounts or groupId changes
  }, [groupId, fetchPostsForGroup]); // Re-run when groupId changes

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Group Posts</h2>
      <div className="row">
        {groupPosts.length === 0 ? (
          <div className="col-12">
            <Alert variant="info">No posts available in this group yet.</Alert>
          </div>
        ) : (
          groupPosts.map((post) => (
            <div className="col-md-4 mb-3" key={post.id}>
              <Card>
                <Card.Body>
                  <p>{post.content || 'No content available.'}</p>
                  {post.media_url && <img src={post.media_url} alt="Post Media" className="img-fluid mb-3" />}
                  <div className="button-group">
                    <Button variant="primary" className="action-button">
                      Like
                    </Button>
                    <Button variant="success" className="action-button">
                      Share
                    </Button>
                    <Button variant="warning" className="action-button">
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
  );
};

export default GroupPage;
