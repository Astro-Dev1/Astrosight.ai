import { createClient } from 'contentful';

export const client = createClient({
  space: 'qpbo5573cm0y',
  accessToken: 'W3Yzxr97aiBwRMEuCErc8ni33JAn8--lkvNeicCwI5U',
}); 

// In-memory cache with TTL
const cache = new Map();
const CACHE_TTL = 3600000; // 1 hour

// Cache helper function
export async function getCachedData(key, fetchFunction) {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log(`Cache HIT for ${key}`);
    return cached.data;
  }
  
  console.log(`Cache MISS for ${key}, fetching...`);
  const data = await fetchFunction();
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}

// Optimized fetch for blog index page
export async function fetchBlogIndex(limit = 12) {
  const cacheKey = `blog-index-${limit}`;
  
  return getCachedData(cacheKey, async () => {
    const entries = await client.getEntries({
      content_type: 'astroanswerBlog',
      order: '-sys.createdAt',
      limit: limit,
      include: 1 // Minimal includes for index - removed select to avoid field errors
    });
    
    return entries.items;
  });
}

// Optimized fetch for individual blog post
export async function fetchBlogBySlug(slug) {
  const cacheKey = `blog-${slug}`;
  
  return getCachedData(cacheKey, async () => {
    // Single optimized call for main post
    const { items } = await client.getEntries({
      content_type: 'astroanswerBlog',
      'fields.slug': slug,
      include: 2, // Reduced from 10
      limit: 1
    });

    if (!items.length) return null;

    return items[0];
  });
}

// Fetch related posts with minimal data
export async function fetchRelatedPosts(currentSlug, limit = 3) {
  const cacheKey = `related-${currentSlug}-${limit}`;
  
  return getCachedData(cacheKey, async () => {
    const { items } = await client.getEntries({
      content_type: 'astroanswerBlog',
      limit: limit,
      'fields.slug[nin]': [currentSlug],
      include: 1
      // Removed select to avoid field errors for now
    });

    return items;
  });
}

// Get all slugs for static generation (minimal data)
export async function getAllBlogSlugs() {
  const cacheKey = 'all-slugs';
  
  return getCachedData(cacheKey, async () => {
    const { items } = await client.getEntries({
      content_type: 'astroanswerBlog',
      limit: 1000, // Maximum for static generation
      select: 'fields.slug,sys.id'
    });

    return items;
  });
}

// Debug function to see available fields
export async function debugContentfulFields() {
  try {
    const { items } = await client.getEntries({
      content_type: 'astroanswerBlog',
      limit: 1
    });
    
    if (items.length > 0) {
      console.log('Available fields:', Object.keys(items[0].fields));
      return Object.keys(items[0].fields);
    }
    return [];
  } catch (error) {
    console.error('Error debugging fields:', error);
    return [];
  }
}

// Legacy function for backward compatibility
export async function fetchEntries(limit = 12, includeLevel = 1) {
  return fetchBlogIndex(limit);
}
