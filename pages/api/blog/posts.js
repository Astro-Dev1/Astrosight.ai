// API endpoint for loading more blog posts
import { strapiApi } from '../../../lib/contentful';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 10, category, author, search } = req.query;
    
    console.log(`API: Loading posts - page: ${page}, limit: ${limit}, category: ${category}, author: ${author}, search: ${search}`);

    let posts = [];
    
    if (category && category !== 'All') {
      // Load from category-specific cache
      try {
        const { getArticlesByCategory } = await import('../../../lib/relatedArticlesCache.js');
        const cacheResult = await getArticlesByCategory(category);
        posts = cacheResult?.data || [];
      } catch (cacheError) {
        console.error('Cache error for category posts:', cacheError);
        const postsResponse = await strapiApi.getBlogPostsByCategory(category);
        posts = postsResponse?.data || [];
      }
    } else if (author) {
      // Load from author-specific cache
      try {
        const { getArticlesByAuthor } = await import('../../../lib/relatedArticlesCache.js');
        const cacheResult = await getArticlesByAuthor(author);
        posts = cacheResult?.data || [];
      } catch (cacheError) {
        console.error('Cache error for author posts:', cacheError);
        const postsResponse = await strapiApi.getBlogPostsByAuthor(author);
        posts = postsResponse?.data || [];
      }
    } else {
      // Load from main cache
      try {
        const { getAllArticles } = await import('../../../lib/relatedArticlesCache.js');
        const cacheResult = await getAllArticles();
        posts = cacheResult?.data || [];
        console.log(`API: Loaded ${posts.length} posts from cache`);
      } catch (cacheError) {
        console.error('Cache error for main posts:', cacheError);
        const postsResponse = await strapiApi.getBlogPosts(parseInt(limit), parseInt(page));
        posts = postsResponse?.data || [];
      }
    }

    // Apply search filter if provided
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      posts = posts.filter(post => 
        post.Title?.toLowerCase().includes(searchTerm) ||
        post.shortSnippet?.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by published date (most recent first)
    posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limitNum);
    const hasMore = pageNum < totalPages;

    res.status(200).json({
      posts: paginatedPosts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalPosts,
        hasMore,
        postsPerPage: limitNum
      }
    });

  } catch (error) {
    console.error('Error in posts API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}