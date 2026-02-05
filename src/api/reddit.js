
export const API_ROOT = '/reddit-api';

/**
 * Fetches posts from a subreddit
 * Sanitizes the subreddit string to prevent 301 redirects
 */
export const getSubredditPosts = async (subreddit) => {
  // Removes leading and trailing slashes so we don't get // or /.json
  const scrubbedSubreddit = subreddit.replace(/^\/|\/$/g, '');
  
  const response = await fetch(`${API_ROOT}/${scrubbedSubreddit}.json`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const json = await response.json();
  return json.data.children.map((post) => post.data);
};

/**
 * Fetches comments for a specific post
 * Reddit returns an array where index [1] contains the comments
 */
export const getPostComments = async (permalink) => {
  // Removes trailing slash from permalink if it exists
  const scrubbedPermalink = permalink.replace(/\/$/g, '');
  
  const response = await fetch(`${API_ROOT}${scrubbedPermalink}.json`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const json = await response.json();

  // Reddit returns an array: index [0] is the post, index [1] is the comments
  return json[1].data.children.map((comment) => comment.data);

};

/*export const API_ROOT = 'https://reddit.com';

export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${API_ROOT}${subreddit}.json`);
  const json = await response.json();

  // Reddit wraps its posts inside data.children
  return json.data.children.map((post) => post.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json = await response.json();

  // Reddit returns comments in the second object of the response array
  return json[1].data.children.map((subreddit) => subreddit.data);
};
*/


