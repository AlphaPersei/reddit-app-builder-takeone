import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectFilteredPosts } from './redditSlice';
import Post from './Post';
import PostSkeleton from './PostSkeleton';

const Reddit = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const { isLoading, error, selectedSubreddit } = useSelector((state) => state.reddit);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  if (isLoading) {
  return (
    <div className="reddit-feed">
      {/* Creates 5 skeleton cards while loading */}
      {Array(5).fill(0).map((_, i) => <PostSkeleton key={i} />)}
    </div>
  );
}
  if (error) return <p>Error loading posts.</p>;

  return (
    <main>
      {posts.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))}
    </main>
  );
};

export default Reddit;