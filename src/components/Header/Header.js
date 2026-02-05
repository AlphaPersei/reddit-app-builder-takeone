import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/reddit/redditSlice';
import SearchBar from '../../features/reddit/SearchBar';
import SubredditSelect from '../../features/reddit/SubredditSelect';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  // Get the current subreddit from state so we know what to refresh
  const selectedSubreddit = useSelector((state) => state.reddit.selectedSubreddit);

  const onRefreshClick = () => {
    dispatch(fetchPosts(selectedSubreddit));
  };

  return (
    <header className="app-header">
      <div className="logo">
        <h1>Mini-Reddit</h1>
      </div>
      <div className="nav-controls">
        <SearchBar />
        <SubredditSelect />
        <button 
          className="refresh-button" 
          onClick={onRefreshClick}
          aria-label="Refresh posts"
        >
          🔄
        </button>
      </div>
    </header>
  );
};

export default Header;