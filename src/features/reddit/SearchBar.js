import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from './redditSlice';
import './SearchBar.css'; // Add some styling for the input

const SearchBar = () => {
  const dispatch = useDispatch();
  
  // 1. Get the current global search term from Redux
  const searchTerm = useSelector((state) => state.reddit.searchTerm);

  // 2. Local state for "immediate" typing feedback
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // 3. Debounce: Wait 300ms after the user stops typing to update Redux
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearchTerm));
    }, 300);

    // Cleanup function: clears the timer if the user types again before 300ms
    return () => clearTimeout(timer);
  }, [localSearchTerm, dispatch]);

  const onSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search posts..."
        value={localSearchTerm}
        onChange={onSearchChange}
        aria-label="Search posts"
      />
      {localSearchTerm && (
        <button 
          type="button" 
          className="clear-button" 
          onClick={() => setLocalSearchTerm('')}
        >
          ✕
        </button>
      )}
    </form>
  );
};

export default SearchBar;
/*Performance (Debouncing): By using setTimeout, the complex filtering logic in your Redux selector only runs once the user pauses.
Controlled Input: The value={localSearchTerm} ensures React is in full control of the input field, which is the standard React pattern.
Accessibility: Adding aria-label ensures screen readers can identify the search box for users with visual impairments.
User Experience: A "clear" button allows users to reset their search with a single click. */