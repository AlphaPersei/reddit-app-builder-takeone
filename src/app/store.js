import { configureStore, combineReducers } from "@reduxjs/toolkit";
import redditReducer from '../features/reddit/redditSlice';


//configureStore() sets up the Redux store with reducers.

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
  },
});
export default store;