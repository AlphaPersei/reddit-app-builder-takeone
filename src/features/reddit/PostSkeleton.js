import React from 'react';
import './PostSkeleton.css';

const PostSkeleton = () => {
  return (
    <div className="post-card skeleton-card">
      <div className="post-votes-container skeleton-votes"></div>
      <div className="post-container">
        <div className="skeleton-title"></div>
        <div className="skeleton-image"></div>
        <div className="skeleton-footer"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;