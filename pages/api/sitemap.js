async function getDynamicPosts() {
  // Replace with your actual blog fetching logic
  return [
    { slug: 'first-post', updatedAt: new Date() },
    { slug: 'second-post', updatedAt: new Date() },
  ];
}

const horoscopeSigns = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export default async function sitemap(req, res) {
  const siteUrl = 'https://astrosight.ai';

  // Blog posts
  const posts = await getDynamicPosts();
  const postUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  // Horoscope pages
  const horoscopeUrls = horoscopeSigns.map(sign => ({
    url: `${siteUrl}/horoscope/${sign}`,
    lastModified: new Date(),
  }));

  // Compatibility pages (all pairs, e.g., aries-taurus)
  const compatibilityUrls = [];
  for (let i = 0; i < horoscopeSigns.length; i++) {
    for (let j = 0; j < horoscopeSigns.length; j++) {
      if (i !== j) {
        compatibilityUrls.push({
          url: `${siteUrl}/compatibility/${horoscopeSigns[i]}-${horoscopeSigns[j]}`,
          lastModified: new Date(),
        });
      }
    }
  }

  // Static pages
  const staticUrls = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    { url: `${siteUrl}/contact`, lastModified: new Date() },
    { url: `${siteUrl}/astrocalculator`, lastModified: new Date() },
    { url: `${siteUrl}/horoscope`, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() }
  ];

  // Combine all URLs
  const allUrls = [
    ...staticUrls,
    ...horoscopeUrls,
    ...compatibilityUrls,
    ...postUrls
  ];

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(allUrls);
}