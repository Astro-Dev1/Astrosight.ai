const siteUrl = 'https://astrosight.ai';

const horoscopeSigns = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

async function getDynamicPosts() {
  // Replace with your actual blog fetching logic
  return [
    { slug: 'first-post', updatedAt: new Date() },
    { slug: 'second-post', updatedAt: new Date() },
  ];
}

function getXmlUrl({ url, lastModified }) {
  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastModified.toISOString()}</lastmod>
    </url>
  `;
}

export async function getServerSideProps({ res }) {
  // Blog posts
  const posts = await getDynamicPosts();
  const postUrls = posts.map((post) =>
    getXmlUrl({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })
  );

  // Horoscope pages
  const horoscopeUrls = horoscopeSigns.map((sign) =>
    getXmlUrl({
      url: `${siteUrl}/horoscope/${sign}`,
      lastModified: new Date(),
    })
  );

  // Compatibility pages (all pairs)
  const compatibilityUrls = [];
  for (let i = 0; i < horoscopeSigns.length; i++) {
    for (let j = 0; j < horoscopeSigns.length; j++) {
      if (i !== j) {
        compatibilityUrls.push(
          getXmlUrl({
            url: `${siteUrl}/compatibility/${horoscopeSigns[i]}-${horoscopeSigns[j]}`,
            lastModified: new Date(),
          })
        );
      }
    }
  }

  // Static pages
  const staticUrls = [
    getXmlUrl({ url: siteUrl, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/about`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/contact`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/astrocalculator`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/horoscope`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/blog`, lastModified: new Date() }),
  ];

  // Combine all
  const allUrls = [
    ...staticUrls,
    ...horoscopeUrls,
    ...compatibilityUrls,
    ...postUrls,
  ].join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  // getServerSideProps will handle the response
  return null;
}