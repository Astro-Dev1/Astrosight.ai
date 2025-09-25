// Use fetch instead of Strapi SDK to avoid import issues
const STRAPI_URL =  'https://accessible-feast-d2287c033e.strapiapp.com';
const STRAPI_TOKEN = '42b9d0f310f06989b5110919a2021a557d58468e21e7fb9828869c81f6a7a83768fbab54e3285498e267c2cefa1685c5df697bb3e65a8a65a2618cf7532d18266b1c508bf99b662185a6c7ede5b31359adc59d2567a732c4fb5f517e032e635af0677adccdadadced0ed57963f552322733de45720d1943080de571d501ae3f0';

const fetchFromStrapi = async (endpoint, options = {}) => {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const config = {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from Strapi: ${url}`, error);
    throw error;
  }
};

export const strapiApi = {
  // Get all blog posts for listing (now using cache)
  async getBlogPosts(limit = 10, page = 1) {
    try {
      // console.log('DEBUG: getBlogPosts called with limit:', limit, 'page:', page);
      
      // Try to get from cache first
      try {
        const { getAllArticles } = await import('./relatedArticlesCache.js');
        const allArticles = await getAllArticles();
        
        if (allArticles && allArticles.length > 0) {
          // Sort by publishedAt desc
          const sortedArticles = allArticles.sort((a, b) => {
            const dateA = new Date(a.publishedAt || a.createdAt);
            const dateB = new Date(b.publishedAt || b.createdAt);
            return dateB - dateA;
          });
          
          // Calculate pagination
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedArticles = sortedArticles.slice(startIndex, endIndex);
          
          // console.log(`DEBUG: Serving ${paginatedArticles.length} posts from cache (page ${page}, limit ${limit})`);
          
          return {
            data: paginatedArticles,
            meta: {
              pagination: {
                page,
                pageSize: limit,
                pageCount: Math.ceil(sortedArticles.length / limit),
                total: sortedArticles.length
              }
            }
          };
        }
      } catch (cacheError) {
        console.log('DEBUG: Cache error, falling back to API:', cacheError);
      }
      
      // Fallback to API if cache fails
      // console.log('DEBUG: Falling back to direct API call');
      const response = await fetchFromStrapi(`astro-sight-blogs?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}&sort[0]=publishedAt:desc`);
      return response;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { data: [] };
    }
  },

    // Get single blog post by slug (3 API calls: content + SEO + relations)
  async getBlogPostBySlug(slug) {
    // console.log('DEBUG: getBlogPostBySlug called with slug:', slug);
    try {
      // First call: Get content with content blocks
      const contentResponse = await fetchFromStrapi(`astro-sight-blogs?populate[contentBlocks][populate]=*&filters[slug][$eq]=${slug}`);
      let post = contentResponse.data?.[0];
      
      if (!post) {
        throw new Error(`Post with slug "${slug}" not found`);
      }

      // Second call: Get SEO data with FAQ - try both methods to handle different Strapi versions
      try {
        const seoResponse = await fetchFromStrapi(`astro-sight-blogs?populate[seo][populate][faq]=*&filters[slug][$eq]=${slug}`);
        const seoData = seoResponse.data?.[0];
        if (seoData && seoData.seo) {
          post.seo = seoData.seo;
        }
      } catch (seoError) {
        try {
          const basicSeoResponse = await fetchFromStrapi(`astro-sight-blogs?populate[seo]=*&filters[slug][$eq]=${slug}`);
          const basicSeoData = basicSeoResponse.data?.[0];
          if (basicSeoData && basicSeoData.seo) {
            post.seo = basicSeoData.seo;
          }
        } catch (basicSeoError) {
          console.log('Could not fetch SEO data:', basicSeoError);
        }
      }

      // Third call: Get relations (coverImage, author, category) - fetch fresh for individual articles
      try {
        const relationsResponse = await fetchFromStrapi(`astro-sight-blogs?populate=*&filters[slug][$eq]=${slug}`);
        const relationsData = relationsResponse.data?.[0];
        if (relationsData) {
          post.coverImage = relationsData.coverImage;
          post.author = relationsData.author;
          post.category = relationsData.category;
          // console.log('DEBUG: Relations data fetched from API:', {
          //   coverImage: !!post.coverImage,
          //   author: !!post.author,
          //   category: !!post.category,
          //   authorAvatar: !!post.author?.avatar
          // });
          // console.log('DEBUG: Author details:', JSON.stringify(post.author, null, 2));
          // console.log('DEBUG: Cover image details:', JSON.stringify(post.coverImage, null, 2));
        } else {
          console.log('DEBUG: No relations data found in response');
        }
      } catch (relError) {
        console.log('DEBUG: Relations API call failed:', relError);
      }
      
      // Get related articles from cache (automatically generated)
      try {
        // Dynamic import for server-side only
        const { getRelatedArticles } = await import('./relatedArticlesCache.js');
        const cachedRelatedArticles = await getRelatedArticles(slug);
        post.relatedArticles = cachedRelatedArticles;
        // console.log('DEBUG: Set relatedArticles from cache:', post.relatedArticles.length);
      } catch (cacheError) {
        console.log('DEBUG: Cache error, falling back to empty array:', cacheError);
        post.relatedArticles = [];
      }
      
      // Log the structures we care about
      console.log('Key-links blocks found:', JSON.stringify(
        post.contentBlocks?.filter(block => block.__component === 'blog-components.key-links-block'),
        null, 2
      ));
      // console.log('SEO FAQ data:', JSON.stringify(post.seo?.faq, null, 2));
      // console.log('DEBUG: Final post.relatedArticles before return:', JSON.stringify(post.relatedArticles, null, 2));
        
      return post;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  },

  // Get all slugs for static generation
  async getAllBlogSlugs() {
    try {
      const queryParams = new URLSearchParams({
        'fields[0]': 'slug',
        'pagination[pageSize]': '1000'
      });
      
      const response = await fetchFromStrapi(`astro-sight-blogs?${queryParams}`);
      return response.data?.map(post => post.slug) || [];
    } catch (error) {
      console.error('Error fetching blog slugs:', error);
      return [];
    }
  },

  // Get posts by category (now using cache)
  async getBlogPostsByCategory(categorySlug) {
    try {
      // console.log(`DEBUG: Fetching posts for category slug: ${categorySlug}`);
      
      // Try to get from cache first
      try {
        const { getArticlesByCategory } = await import('./relatedArticlesCache.js');
        const categoryArticles = await getArticlesByCategory(categorySlug);
        
        if (categoryArticles && categoryArticles.length > 0) {
          // console.log(`DEBUG: Found ${categoryArticles.length} posts for category slug: ${categorySlug} from cache`);
          
          return {
            data: categoryArticles,
            meta: {
              pagination: {
                page: 1,
                pageSize: categoryArticles.length,
                pageCount: 1,
                total: categoryArticles.length
              }
            }
          };
        }
      } catch (cacheError) {
        console.log('DEBUG: Cache error for category, falling back to API:', cacheError);
      }
      
      // Fallback to API if cache fails
      // console.log(`DEBUG: Falling back to direct API call for category: ${categorySlug}`);
      const response = await fetchFromStrapi(`astro-sight-blogs?filters[category][slug][$eq]=${categorySlug}&populate=*&sort[0]=publishedAt:desc`);
      // console.log(`DEBUG: Found ${response.data?.length || 0} posts for category slug: ${categorySlug}`);
      
      return response;
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return { data: [] };
    }
  },

  // Get posts by author (now using cache)
  async getBlogPostsByAuthor(authorSlug) {
    try {
      console.log(`DEBUG: Fetching posts for author slug: ${authorSlug}`);
      
      // Try to get from cache first
      try {
        const { getArticlesByAuthor } = await import('./relatedArticlesCache.js');
        const authorArticles = await getArticlesByAuthor(authorSlug);
        
        if (authorArticles && authorArticles.length > 0) {
          // console.log(`DEBUG: Found ${authorArticles.length} posts for author slug: ${authorSlug} from cache`);
          
          return {
            data: authorArticles,
            meta: {
              pagination: {
                page: 1,
                pageSize: authorArticles.length,
                pageCount: 1,
                total: authorArticles.length
              }
            }
          };
        }
      } catch (cacheError) {
        console.log('DEBUG: Cache error for author, falling back to API:', cacheError);
      }
      
      // Fallback to API if cache fails
      // console.log(`DEBUG: Falling back to direct API call for author: ${authorSlug}`);
      const response = await fetchFromStrapi(`astro-sight-blogs?filters[author][slug][$eq]=${authorSlug}&populate=*&sort[0]=publishedAt:desc`);
      return response;
    } catch (error) {
      console.error('Error fetching posts by author:', error);
      return null;
    }
  },

  // Get author by slug
  async getAuthorBySlug(slug) {
    try {
      const response = await fetchFromStrapi(`authors?filters[slug][$eq]=${slug}&populate=*`);
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching author:', error);
      return null;
    }
  },

  // Get category by slug
  async getCategoryBySlug(slug) {
    try {
      const response = await fetchFromStrapi(`categories?filters[slug][$eq]=${slug}&populate=*`);
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }
};

export default strapiApi;
