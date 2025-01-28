import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <small className="text-muted">{post.createdAt}</small>
      </div>
    </div>
  );
};

export default Post;
