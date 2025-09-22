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
  // Get all blog posts for listing
  async getBlogPosts(limit = 100, page = 1) {
    try {
      // Include populate to get images and related data
      const response = await fetchFromStrapi(`astro-sight-blogs?populate=*`);
      return response;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { data: [] };
    }
  },

  // Get single blog post by slug
  async getBlogPostBySlug(slug) {
    try {
      const response = await fetchFromStrapi(`astro-sight-blogs?populate=*&filters[slug][$eq]=${slug}`);
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
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

  // Get posts by category
  async getBlogPostsByCategory(categorySlug) {
    try {
      const queryParams = new URLSearchParams({
        'filters[category][slug][$eq]': categorySlug,
        'populate[coverImage]': '*',
        'populate[author]': '*',
        'populate[category]': '*',
        'sort[0]': 'publishedAt:desc'
      });
      
      const response = await fetchFromStrapi(`astro-sight-blogs?${queryParams}`);
      return response;
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return null;
    }
  }
};

export default strapiApi;
