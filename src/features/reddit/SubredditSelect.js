//This component provides a dropdown menu to switch feeds

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubreddit } from './redditSlice';

const SubredditSelect = () => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.reddit.selectedSubreddit);

  // List of popular subreddits to choose from
  const subreddits = [
    { name: 'Home', url: '/r/pics/' },
    { name: 'AskReddit', url: '/r/AskReddit/' },
    { name: 'Gaming', url: '/r/gaming/' },
    { name: 'News', url: '/r/news/' },
    { name: 'ReactJS', url: '/r/reactjs/' },
  ];

  const onSelectChange = (e) => {
    dispatch(setSelectedSubreddit(e.target.value));//Synchronized State: Because selectedSubreddit is in the Redux Store, changing this dropdown will automatically trigger the useEffect in Reddit.js component to fetch new posts.
  };//Automatic Search Reset: In redditSlice, the state.searchTerm = '' inside the setSelectedSubreddit reducer. This means when you switch subreddits, the search bar clears itself—providing a much better user experience.

  return (
    <div className="subreddit-select-container">
      <label htmlFor="subreddit-select">Choose a Subreddit: </label>
      <select 
        id="subreddit-select" 
        value={selectedSubreddit} 
        onChange={onSelectChange}
      >
        {subreddits.map((sub) => (
          <option key={sub.url} value={sub.url}>
            {sub.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubredditSelect;