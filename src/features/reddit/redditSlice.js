import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../../api/reddit';

//ASYNC THUNKS (The logic for fetching data)
export const fetchPosts = createAsyncThunk(
  'reddit/fetchPosts',
  async (subreddit) => {
    const posts = await getSubredditPosts(subreddit);
   
    return posts.map((post) => ({
        //returning an object, not starting a block of code. ie (post)
        // the next( is needed before curly braces so java wont get confused)
        //JavaScript thinks those curly braces are the start of the function body. It expects to see logic like if or const, and it will throw an error because ...post looks like gibberish inside a function body without a return keyword.
      // implicit return To return an object immediately (without typing the word return), you wrap the object in parentheses ( )
      //Explicit Return	(post) => { return { name: post.title }; }
//Implicit Return (post) => ({ name: post.title })
//Summary: Using ({ }) is just a shorthand way to write { return { }; }. It keeps your map() functions clean and readable.
      //The parentheses tell the engine: "Everything inside here is a single expression (the object), so just return it automatically." 
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
  }
);

export const fetchComments = createAsyncThunk(
  'reddit/fetchComments',
  async ({ index, permalink }) => { //he curly braces in the async line—that is "destructuring" the object immediately.
    const comments = await getPostComments(permalink);
    return { index, comments };
  }
);


//INITIAL STATE
const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: '/r/pics/',
  };

//THE SLICE
const redditSlice = createSlice({
  name: 'redditPosts',
  initialState,
  reducers: {
    // Standard synchronous reducers for UI interaction
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
    },
  },

  /*action.meta.arg: When a thunk starts (pending), it hasn't finished the API call yet, so there is no payload. However, Redux Toolkit stores the arguments you passed to the thunk (like { index, permalink }) inside meta.arg. This allows you to flip the loadingComments spinner for the specific post the user clicked immediately. Redux Toolkit Docs: Promise Lifecycle Actions
  By using state.posts[index], you are only mutating the specific part of the state tree that changed. Thanks to the Immer library inside createSlice, this remains a safe, immutable update.*/
  extraReducers: (builder) => {
    builder
      // Lifecycle for fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      // Lifecycle for fetchComments
      .addCase(fetchComments.pending, (state, action) => {
        const { index } = action.meta.arg;
        state.posts[index].loadingComments = true;
        state.posts[index].errorComments = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { index, comments } = action.payload;
        state.posts[index].loadingComments = false;
        state.posts[index].comments = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const { index } = action.meta.arg;
        state.posts[index].loadingComments = false;
        state.posts[index].errorComments = true;
      });
  },
});

// 4. EXPORTS
export const { setSearchTerm, setSelectedSubreddit, toggleShowingComments } = redditSlice.actions;
export default redditSlice.reducer;

// 5. SELECTORS
const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);