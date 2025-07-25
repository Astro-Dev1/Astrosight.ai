const siteUrl = 'https://astrosight.ai';
import { client } from '../lib/contentful';

const horoscopeSigns = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const calculators = [
  {
    slug: 'birth-chart-calculator',

  },
  {
    slug: 'love-compatibility-calculator',
   
  },
  {
    slug: 'dasha-calculator',
 
  },
  {
    slug: 'numerology-calculator',

  },
  {
    slug: 'kundali-matching',

  },
    {
    slug: 'sun-sign-calculator',
  
  },
    {
    slug: 'mangal-dosha-calculator',
 
  },
    {
    slug: 'marriage-compatibility-calculator',

  },
  {
  slug: 'kaal-sarp-dosh-calculator',

},
{
  slug: 'rashi-sign-calculator',

},{
  slug: 'flames-calculator',
 
},{
  slug: 'yantra-calculator',

},
{
  slug: 'moon-sign-calculator',

},
{
  slug: 'transit-chart-calculator',
 
},
{
  slug: 'name-numerology-calculator',

},
  {
    slug: 'palm-reading',
  
  },
  {
    slug: 'tarot-reading',
 
  },
  {
    slug: 'gemstone-recommendation',

  },
  {
    slug: 'muhurat-calculator',

  },
  {
    slug: 'career-astrology',

  }
];
async function getDynamicPosts() {
  // Replace with your actual blog fetching logic
     const entries = await client.getEntries({
        content_type: 'astroanswerBlog',
        limit: 1000, // Adjust based on your needs
      });
  return entries.items.map(item => ({
    slug: item.fields.slug,
    updatedAt: new Date(item.sys.updatedAt),
  }));
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
 const slug = calculators.map((post) =>
    getXmlUrl({
      url: `${siteUrl}/${post.slug}`,
      lastModified: new Date(),
    })
  );
  // Horoscope pages
  const types = ['today', 'weekly', 'monthly', 'yearly'];
  const horoscopeUrls = horoscopeSigns.map((sign) =>
     types.map(type =>
    getXmlUrl({
      url: `${siteUrl}/horoscope/${type}-horoscope/${sign}`,
      lastModified: new Date(),
    }))
  );

  // Compatibility pages (all pairs)
  const compatibilityUrls = [];
  for (let i = 0; i < horoscopeSigns.length; i++) {
    for (let j = 0; j < horoscopeSigns.length; j++) {
      if (i !== j) {
        compatibilityUrls.push(
          getXmlUrl({
            url: `${siteUrl}/compatibility/${horoscopeSigns[i]}/${horoscopeSigns[j]}`,
            lastModified: new Date(),
          })
        );
      }
    }
  }

  // Static pages
  const staticUrls = [
    getXmlUrl({ url: siteUrl, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/about-us`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/contact`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/astrocalculator`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/horoscope/`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/privacy-policy`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/shop`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/shipping-policy`, lastModified: new Date() }),
    getXmlUrl({ url: `${siteUrl}/blog`, lastModified: new Date() }),
        getXmlUrl({ url: `${siteUrl}/terms-and-conditions`, lastModified: new Date() }),
            getXmlUrl({ url: `${siteUrl}/festival-calendar`, lastModified: new Date() }),



  ];

  // Combine all
  const allUrls = [
    ...staticUrls,
    ...horoscopeUrls,
    ...compatibilityUrls,
    ...postUrls,
    ...slug
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