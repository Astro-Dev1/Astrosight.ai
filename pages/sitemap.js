
// This is a placeholder for a function that would fetch your dynamic content.
// Replace this with your actual data fetching logic (e.g., from a database or CMS).
async function getDynamicPosts() {
  // Example:
  // const posts = await fetch('https://.../posts').then((res) => res.json());
  // return posts;
  return [
    { slug: 'first-post', updatedAt: new Date() },
    { slug: 'second-post', updatedAt: new Date() },
  ];
}

export default async function sitemap() { 
   const siteUrl = 'https://astrosight.ai';

  // Get dynamic routes, like blog posts
  const posts = await getDynamicPosts();
  const postUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  // Define your static routes
  const staticUrls = [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
    },
  ];

  // Combine static and dynamic URLs
  return [...staticUrls, ...postUrls];
}