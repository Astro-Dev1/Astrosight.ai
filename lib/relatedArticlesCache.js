// Related Articles Cache System (Server-side only)
let fs, path, strapiApi;

// Dynamic imports for server-side only
if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
}

const CACHE_FILE = path.join(process.cwd(), '.cache', 'related-articles.json');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Cache rebuild schedule:
// - Automatically rebuilds when cache is older than 24 hours
// - Rebuilds when cache file is missing/corrupted
// - Can be manually triggered via refreshRelatedArticlesCache()
// - Makes API calls to Strapi to fetch ALL articles (current: ~800, scales up to 2,000)

// Ensure cache directory exists
const ensureCacheDir = () => {
  const cacheDir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
};

// Load cache from file
const loadCache = () => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      return cacheData;
    }
  } catch (error) {
    console.log('Error loading related articles cache:', error);
  }
  return null;
};

// Save cache to file
const saveCache = (data) => {
  try {
    ensureCacheDir();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
    console.log('Related articles cache saved successfully');
  } catch (error) {
    console.error('Error saving related articles cache:', error);
  }
};

// Check if cache is expired
const isCacheExpired = (cache) => {
  if (!cache || !cache.timestamp) return true;
  return Date.now() - cache.timestamp > CACHE_DURATION;
};

// Generate related articles based on keywords, categories, and tags
const generateRelatedArticles = (targetArticle, allArticles, maxRelated = 5) => {
  const related = [];
  const targetKeywords = extractKeywords(targetArticle);
  const targetCategory = targetArticle.category?.slug;

  allArticles.forEach(article => {
    if (article.id === targetArticle.id) return; // Skip self

    let score = 0;
    const articleKeywords = extractKeywords(article);

    // Category match (highest weight)
    if (article.category?.slug === targetCategory) {
      score += 10;
    }

    // Keyword matches
    const commonKeywords = targetKeywords.filter(keyword => 
      articleKeywords.includes(keyword)
    );
    score += commonKeywords.length * 3;

    // Title similarity
    const titleSimilarity = calculateTitleSimilarity(targetArticle.Title, article.Title);
    score += titleSimilarity * 2;

    if (score > 0) {
      related.push({ ...article, score });
    }
  });

  // Sort by score and return top articles
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, maxRelated)
    .map(article => ({
      id: article.id,
      Title: article.Title,
      slug: article.slug,
      shortSnippet: article.shortSnippet,
      publishedAt: article.publishedAt,
      coverImage: article.coverImage ? {
        url: article.coverImage.url,
        alternativeText: article.coverImage.alternativeText || article.coverImage.caption
      } : null,
      author: article.author ? {
        id: article.author.id,
        name: article.author.name,
        slug: article.author.slug,
        title: article.author.title
      } : null,
      category: article.category ? {
        id: article.category.id,
        name: article.category.name,
        slug: article.category.slug
      } : null
    }));
};

// Extract keywords from article
const extractKeywords = (article) => {
  const keywords = [];
  
  // From primary keyword
  if (article.primaryKeyword) {
    keywords.push(...article.primaryKeyword.toLowerCase().split(' '));
  }
  
  // From title
  if (article.Title) {
    const titleWords = article.Title.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(' ')
      .filter(word => word.length > 3);
    keywords.push(...titleWords);
  }
  
  // Common astrology keywords to boost relevance
  const astrologyKeywords = ['astrology', 'horoscope', 'zodiac', 'planets', 'houses', 'vedic', 'birth chart'];
  const foundAstrologyKeywords = astrologyKeywords.filter(keyword => 
    article.Title?.toLowerCase().includes(keyword) || 
    article.primaryKeyword?.toLowerCase().includes(keyword)
  );
  keywords.push(...foundAstrologyKeywords);
  
  return [...new Set(keywords)]; // Remove duplicates
};

// Calculate title similarity
const calculateTitleSimilarity = (title1, title2) => {
  const words1 = title1.toLowerCase().split(' ');
  const words2 = title2.toLowerCase().split(' ');
  
  const commonWords = words1.filter(word => 
    words2.includes(word) && word.length > 3
  );
  
  return commonWords.length;
};

// Build related articles cache
const buildRelatedArticlesCache = async () => {
  try {
    console.log('🔄 Building related articles cache...');
    console.log('⏰ Cache rebuilds automatically every 24 hours when expired');
    
    // Use direct fetch instead of dynamic import to avoid ES module issues
    const https = require('https');
    
    // Get Strapi token from environment variables
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
    if (!STRAPI_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is not set');
    }
    
    const fetchFromStrapi = (endpoint) => {
      return new Promise((resolve, reject) => {
        const url = `https://accessible-feast-d2287c033e.strapiapp.com/api/${endpoint}`;
        const options = {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json'
          }
        };
        
        const req = https.get(url, options, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        });
        
        req.on('error', reject);
      });
    };
    
    // Fetch all articles from Strapi with populated fields - get all articles (no limit)
    console.log('Fetching all articles from Strapi...');
    let allArticles = [];
    let page = 1;
    let hasMore = true;
    
    // Fetch all articles with pagination
    let totalApiCalls = 0;
    while (hasMore) {
      totalApiCalls++;
      console.log(`📡 API Call ${totalApiCalls}: Fetching page ${page}...`);
      const response = await fetchFromStrapi(`astro-sight-blogs?populate=*&pagination[pageSize]=100&pagination[page]=${page}&sort[0]=publishedAt:desc`);
      
      if (response.data && response.data.length > 0) {
        allArticles = [...allArticles, ...response.data];
        hasMore = response.data.length === 100; // Continue if we got a full page
        page++;
      } else {
        hasMore = false;
      }
      
      // Safety break to prevent infinite loops (50 pages = 5,000 articles max)
      if (page > 50) {
        console.log('⚠️  Safety break: too many pages (50+ API calls). If you have more than 5,000 articles, increase this limit.');
        break;
      }
    }
    
    console.log(`📊 Total Strapi API calls made: ${totalApiCalls}`);
    console.log(`📝 Articles fetched: ${allArticles.length}`);
    console.log(`⏰ Next cache rebuild: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}`);
    
    if (totalApiCalls > 25) {
      console.log(`⚠️  HIGH API USAGE: ${totalApiCalls} calls made to Strapi. You have ${allArticles.length} articles. Consider optimizing if this runs frequently.`);
    }
    
    console.log(`Fetched ${allArticles.length} articles from Strapi`);
    
    // Log sample of key fields we need
    if (allArticles[0]) {
      const sample = allArticles[0];
      console.log('Sample fields check:');
      console.log('- coverImage:', !!sample.coverImage);
      console.log('- author:', !!sample.author);
      console.log('- category:', !!sample.category);
      console.log('- publishedAt:', !!sample.publishedAt);
      console.log('- shortSnippet:', !!sample.shortSnippet);
      console.log('Sample data keys:', Object.keys(sample));
    }
    
        console.log(`Processing ${allArticles.length} articles for lightweight metadata cache...`);
    
    // Helper function to extract lightweight metadata from full article
    const extractLightweightArticle = (article) => ({
      id: article.id,
      Title: article.Title,
      slug: article.slug,
      shortSnippet: article.shortSnippet,
      publishedAt: article.publishedAt,
      primaryKeyword: article.primaryKeyword,
      
      // Lightweight cover image (only essential fields)
      coverImage: article.coverImage ? {
        id: article.coverImage.id,
        url: article.coverImage.url,
        alternativeText: article.coverImage.alternativeText || article.coverImage.caption
      } : null,
      
      // Lightweight author (only essential fields)
      author: article.author ? {
        id: article.author.id,
        name: article.author.name,
        slug: article.author.slug,
        title: article.author.title
      } : null,
      
      // Lightweight category (only essential fields)
      category: article.category ? {
        id: article.category.id,
        name: article.category.name,
        slug: article.category.slug
      } : null,
      
      // Calculate reading time from content blocks (avoid storing full content)
      readingTime: article.contentBlocks ? 
        Math.ceil(JSON.stringify(article.contentBlocks).split(/\s+/).length / 200) : 5
    });
    
    // Process articles into different organizational structures
    const relatedArticlesMap = {};  // slug -> [lightweight related articles]
    const articlesBySlug = {};       // slug -> lightweight article data  
    const articlesByCategory = {};   // category slug -> [lightweight articles]
    const articlesByAuthor = {};     // author slug -> [lightweight articles]
    const categories = {};           // category slug -> category data
    const authors = {};              // author slug -> author data
    const allArticlesList = [];      // lightweight articles for blog index
    
    allArticles.forEach((article, index) => {
      console.log(`Processing article ${index + 1}/${allArticles.length}: ${article.Title}`);
      
      // Extract lightweight version
      const lightweightArticle = extractLightweightArticle(article);
      
      // Store lightweight article data by slug
      articlesBySlug[article.slug] = lightweightArticle;
      
      // Add to all articles list (lightweight)
      allArticlesList.push(lightweightArticle);
      
      // Process categories
      if (article.category?.slug) {
        if (!articlesByCategory[article.category.slug]) {
          articlesByCategory[article.category.slug] = [];
          categories[article.category.slug] = article.category;
        }
        articlesByCategory[article.category.slug].push(lightweightArticle);
      }
      
      // Process authors  
      if (article.author?.slug) {
        if (!articlesByAuthor[article.author.slug]) {
          articlesByAuthor[article.author.slug] = [];
          authors[article.author.slug] = article.author;
        }
        articlesByAuthor[article.author.slug].push(lightweightArticle);
      }
      
      // Generate related articles for this article (using full articles for analysis, storing lightweight)
      const relatedArticles = generateRelatedArticles(article, allArticles, 5);
      // Convert related articles to lightweight format
      relatedArticlesMap[article.slug] = relatedArticles.map(related => extractLightweightArticle(related));
    });
    
    // Sort all articles by publishedAt desc
    allArticlesList.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB - dateA;
    });
    
    // Sort articles in categories and authors by publishedAt desc
    Object.keys(articlesByCategory).forEach(categorySlug => {
      articlesByCategory[categorySlug].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA;
      });
    });
    
    Object.keys(articlesByAuthor).forEach(authorSlug => {
      articlesByAuthor[authorSlug].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA;
      });
    });
    

    
    // Save comprehensive cache
    const cacheData = {
      timestamp: Date.now(),
      totalArticles: allArticles.length,
      // Related articles mapping (lightweight)
      relatedArticles: relatedArticlesMap,
      // Lightweight articles metadata for individual post relations
      articlesBySlug: articlesBySlug,
      // Articles grouped by category for category pages (lightweight)
      articlesByCategory: articlesByCategory,
      // Articles grouped by author for author pages (lightweight)
      articlesByAuthor: articlesByAuthor,
      // Category and author metadata
      categories: categories,
      authors: authors,
      // All articles for blog index (lightweight, sorted by date)
      allArticles: allArticlesList
    };
    
    // Calculate cache size reduction
    const lightweightSize = JSON.stringify(cacheData).length;
    const estimatedFullSize = allArticles.length * 116 * 1024; // 116KB per article
    const actualSize = lightweightSize;
    const reductionPercentage = Math.round((1 - actualSize / estimatedFullSize) * 100);
    
    console.log(`📊 CACHE OPTIMIZATION RESULTS:`);
    console.log(`   Articles: ${allArticles.length}`);
    console.log(`   Old size (estimated): ${(estimatedFullSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   New size (actual): ${(actualSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   Reduction: ${reductionPercentage}% smaller!`);
    console.log(`   Per article: ~${(actualSize / allArticles.length / 1024).toFixed(1)}KB (was ~116KB)`);
    
    saveCache(cacheData);
    console.log(`✅ Lightweight metadata cache built successfully for ${allArticles.length} articles`);
    
    return cacheData;
  } catch (error) {
    console.error('Error building related articles cache:', error);
    return null;
  }
};

// Get related articles for a specific slug
const getRelatedArticles = async (slug) => {
  // Server-side only
  if (typeof window !== 'undefined') {
    return [];
  }
  
  let cache = loadCache();
  
  // Check if cache needs refresh
  if (!cache || isCacheExpired(cache)) {
    console.log('Related articles cache is expired or missing, rebuilding...');
    cache = await buildRelatedArticlesCache();
  }
  
  if (!cache || !cache.relatedArticles) {
    console.log('No cache available, returning empty array');
    return [];
  }
  
  return cache.relatedArticles[slug] || [];
};

// Get single article by slug from cache
const getArticleBySlug = async (slug) => {
  if (typeof window !== 'undefined') {
    return null;
  }
  
  let cache = loadCache();
  
  if (!cache || isCacheExpired(cache)) {
    console.log('Cache expired, rebuilding...');
    cache = await buildRelatedArticlesCache();
  }
  
  if (!cache || !cache.articlesBySlug) {
    return null;
  }
  
  return cache.articlesBySlug[slug] || null;
};

// Get articles by category from cache
const getArticlesByCategory = async (categorySlug) => {
  if (typeof window !== 'undefined') {
    return { data: [] };
  }
  
  let cache = loadCache();
  
  if (!cache || isCacheExpired(cache)) {
    console.log('Cache expired, rebuilding...');
    cache = await buildRelatedArticlesCache();
  }
  
  if (!cache || !cache.articlesByCategory) {
    return { data: [] };
  }
  
  return { 
    data: cache.articlesByCategory[categorySlug] || [],
    category: cache.categories[categorySlug] || null
  };
};

// Get articles by author from cache
const getArticlesByAuthor = async (authorSlug) => {
  if (typeof window !== 'undefined') {
    return { data: [] };
  }
  
  let cache = loadCache();
  
  if (!cache || isCacheExpired(cache)) {
    console.log('Cache expired, rebuilding...');
    cache = await buildRelatedArticlesCache();
  }
  
  if (!cache || !cache.articlesByAuthor) {
    return { data: [] };
  }
  
  return { 
    data: cache.articlesByAuthor[authorSlug] || [],
    author: cache.authors[authorSlug] || null
  };
};

// Get all articles for blog index from cache
const getAllArticles = async () => {
  if (typeof window !== 'undefined') {
    return [];
  }
  
  let cache = loadCache();
  
  if (!cache || isCacheExpired(cache)) {
    console.log('Cache expired, rebuilding...');
    cache = await buildRelatedArticlesCache();
  }
  
  if (!cache || !cache.allArticles) {
    return [];
  }
  
  return cache.allArticles;
};

// Force refresh cache (can be called manually or via cron)
const refreshRelatedArticlesCache = async () => {
  console.log('Force refreshing related articles cache...');
  return await buildRelatedArticlesCache();
};

// Get cache status
const getCacheStatus = () => {
  const cache = loadCache();
  if (!cache) {
    return { exists: false, expired: true };
  }
  
  return {
    exists: true,
    expired: isCacheExpired(cache),
    timestamp: new Date(cache.timestamp).toISOString(),
    totalArticles: cache.totalArticles || 0
  };
};

// Get articles by page for main blog listing with pagination
const getArticlesByPage = async (limit = 20, page = 1) => {
  try {
    const cache = loadCache();
    if (!cache || !cache.articles) {
      console.log('No cache available for paginated articles');
      return { data: [] };
    }

    // Sort articles by publish date (most recent first)
    const sortedArticles = [...cache.articles].sort((a, b) => 
      new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = sortedArticles.slice(startIndex, endIndex);

    console.log(`Cache: Serving ${paginatedArticles.length} articles for page ${page} (limit: ${limit})`);
    
    return { 
      data: paginatedArticles,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(sortedArticles.length / limit),
        totalArticles: sortedArticles.length,
        hasMore: endIndex < sortedArticles.length
      }
    };
  } catch (error) {
    console.error('Error getting paginated articles from cache:', error);
    return { data: [] };
  }
};

// CommonJS exports
module.exports = {
  getRelatedArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getArticlesByAuthor,
  getArticlesByPage,
  getAllArticles,
  refreshRelatedArticlesCache,
  getCacheStatus
};

// Also export individual functions for ES6 compatibility
exports.getRelatedArticles = getRelatedArticles;
exports.getArticleBySlug = getArticleBySlug;
exports.getArticlesByCategory = getArticlesByCategory;
exports.getArticlesByAuthor = getArticlesByAuthor;
exports.getArticlesByPage = getArticlesByPage;
exports.getAllArticles = getAllArticles;
exports.refreshRelatedArticlesCache = refreshRelatedArticlesCache;
exports.getCacheStatus = getCacheStatus;