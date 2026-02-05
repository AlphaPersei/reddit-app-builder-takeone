import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments, toggleShowingComments } from './redditSlice';
import './Post.css';
const Post = ({ post, index }) => {
  const dispatch = useDispatch();

  const onToggleComments = () => {
    // 1. Flip the 'showingComments' flag in state
    dispatch(toggleShowingComments(index));
    
    // 2. Only fetch if we are opening it AND comments haven't been loaded yet
    if (!post.showingComments && post.comments.length === 0) {
      dispatch(fetchComments({ index: index, permalink: post.permalink }));
    }
  };

  return (
  <article className="post-card"> {/* Added a class for styling */}
     <div className="post-wrapper">
      {/* 1. THE VOTE SIDEBAR */}
      <div className="post-votes-container">
        <button className="icon-action-button" aria-label="Upvote">
          ⬆️
        </button>
        <p className="post-votes-value">
          {/* Format numbers like 15.2k using a helper if needed */}
          {post.ups > 1000 ? `${(post.ups / 1000).toFixed(1)}k` : post.ups}
        </p>
        <button className="icon-action-button" aria-label="Downvote">
          ⬇️
        </button>
      </div>
      </div>


    <div className="post-container">
      <h3 className="post-title">{post.title}</h3>
      
      <div className="post-image-container">
  {post.url.endsWith('.jpg') || post.url.endsWith('.png') || post.url.endsWith('.gif') ? (
    <img src={post.url} alt={post.title} className="post-image" />
  ) : null}
</div>

      <div className="post-details">
        <span className="author">Posted by {post.author}</span>
        <button className="comment-button" onClick={onToggleComments}>
          {post.showingComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>

      {post.showingComments && (
        <div className="comments-container">
          {post.loadingComments ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : post.errorComments ? (
            <p className="error-message">Failed to load comments. Try again!</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p className="comment-author">{comment.author}</p>
                <p>{comment.body}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  </article>
);
};
export default Post;

