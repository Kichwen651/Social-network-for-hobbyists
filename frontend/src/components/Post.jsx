import React from 'react';

const Post = ({ post }) => {
  // Ensure post object is valid before rendering
  if (!post) return null;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title || 'No Title'}</h5>
        <p className="card-text">{post.content || 'No content available.'}</p>
        <small className="text-muted">{post.createdAt || 'Date not available'}</small>
      </div>
    </div>
  );
};

export default Post;
