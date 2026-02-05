// Use /reddit-api to match the netlify.toml proxy exactly
export const API_ROOT = '/reddit-api';

export const getSubredditPosts = async (subreddit) => {
  const scrubbedSubreddit = subreddit.replace(/^\/|\/$/g, '');
  
  const response = await fetch(`${API_ROOT}/${scrubbedSubreddit}.json`, {
    headers: {
      // Helps prevent the 403 Forbidden errors on live servers
      'User-Agent': 'MiniRedditPortfolio/1.0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const json = await response.json();
  return json.data.children.map((post) => post.data);
};

export const getPostComments = async (permalink) => {
  const scrubbedPermalink = permalink.replace(/\/$/g, '');
  
  const response = await fetch(`${API_ROOT}${scrubbedPermalink}.json`, {
    headers: {
      'User-Agent': 'MiniRedditPortfolio/1.0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const json = await response.json();

  // Array destructuring: gets the second element (comments) safely
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


