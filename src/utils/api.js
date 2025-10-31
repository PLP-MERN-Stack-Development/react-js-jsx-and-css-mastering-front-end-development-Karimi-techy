/**
 * API utility functions for fetching data
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all posts from JSONPlaceholder API
 * @returns {Promise<Array>} Array of post objects
 */
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Fetch a single post by ID
 * @param {number} id - Post ID
 * @returns {Promise<Object>} Post object
 */
export const fetchPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

/**
 * Search posts by title
 * @param {Array} posts - Array of posts
 * @param {string} query - Search query
 * @returns {Array} Filtered posts
 */
export const searchPosts = (posts, query) => {
  if (!query.trim()) return posts;
  
  const lowerQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.body.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Paginate posts array
 * @param {Array} posts - Array of posts
 * @param {number} page - Current page (1-indexed)
 * @param {number} perPage - Items per page
 * @returns {Object} Paginated data with posts and metadata
 */
export const paginatePosts = (posts, page = 1, perPage = 12) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / perPage);

  return {
    posts: paginatedPosts,
    currentPage: page,
    totalPages,
    totalPosts: posts.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};
