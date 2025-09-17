// // const siteUrl = 'https://astrosight.ai';
// import { client } from '../lib/contentful';

// const horoscopeSigns = [
//   'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
//   'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
// ];

// const calculators = [
//   {
//     slug: 'birth-chart-calculator',

//   },
//   {
//     slug: 'love-compatibility-calculator',
   
//   },
//   {
//     slug: 'dasha-calculator',
 
//   },
//   {
//     slug: 'numerology-calculator',

//   },
  
//     {
//     slug: 'sun-sign-calculator',
  
//   },
//     {
//     slug: 'mangal-dosha-calculator',
 
//   },
//     {
//     slug: 'marriage-compatibility-calculator',

//   },
//   {
//   slug: 'kaal-sarp-dosh-calculator',

// },
// {
//   slug: 'rashi-sign-calculator',

// },{
//   slug: 'flames-calculator',
 
// },{
//   slug: 'yantra-calculator',

// },
// {
//   slug: 'moon-sign-calculator',

// },
// {
//   slug: 'transit-chart-calculator',
 
// },
// {
//   slug: 'name-numerology-calculator',

// },
  
// ];
// async function getAllDynamicPosts() {
//   const allItems = [];
//   let skip = 0;
//   const limit = 100; // Fetch in batches of 100
//   let fetchMore = true;

//   while (fetchMore) {
//     try {
//       const entries = await client.getEntries({
//         content_type: 'astroanswerBlog',
//         select: 'fields.slug,sys.updatedAt', // Only fetch the data you need!
//         limit: limit,
//         skip: skip,
//         order: '-sys.updatedAt',
//       });

//       if (entries.items.length > 0) {
//         allItems.push(...entries.items);
//         skip += limit;
//       } else {
//         fetchMore = false; // No more items to fetch, exit the loop
//       }

//       // Safety break to prevent infinite loops with very large datasets
//       if (skip > 10000) { 
//          fetchMore = false;
//       }

//     } catch (error) {
//       console.error("Error fetching sitemap posts from Contentful:", error);
//       fetchMore = false; // Stop on error
//     }
//   }

//   return allItems.map(item => ({
//     slug: item.fields.slug,
//     updatedAt: new Date(item.sys.updatedAt),
//   }));
// }

// function getXmlUrl({ url, lastModified }) {
//   return `
//     <url>
//       <loc>${url}</loc>
//       <lastmod>${lastModified.toISOString()}</lastmod>
//     </url>
//   `;
// }

// // export async function getServerSideProps({ res }) {
// //   // Blog posts
// //   const posts = await getAllDynamicPosts();
// //   const postUrls = posts.map((post) =>
// //     getXmlUrl({
// //       url: `${siteUrl}/blog/${post.slug}`,
// //       lastModified: post.updatedAt,
// //     })
// //   );
// //  const slug = calculators.map((post) =>
// //     getXmlUrl({
// //       url: `${siteUrl}/${post.slug}`,
// //       lastModified: new Date(),
// //     })
// //   );
// //   // Horoscope pages
// //   const types = ['today', 'weekly', 'monthly', 'yearly'];
// //   const horoscopeUrls = horoscopeSigns.map((sign) =>
// //      types.map(type =>
// //     getXmlUrl({
// //       url: `${siteUrl}/horoscope/${type}-horoscope/${sign}`,
// //       lastModified: new Date(),
// //     }))
// //   );

// //   // Compatibility pages (all pairs)
// //   const compatibilityUrls = [];
// //   for (let i = 0; i < horoscopeSigns.length; i++) {
// //     for (let j = 0; j < horoscopeSigns.length; j++) {
// //       if (i !== j) {
// //         compatibilityUrls.push(
// //           getXmlUrl({
// //             url: `${siteUrl}/compatibility/${horoscopeSigns[i]}/${horoscopeSigns[j]}`,
// //             lastModified: new Date(),
// //           })
// //         );
// //       }
// //     }
// //   }

// //   // Static pages
// //   const staticUrls = [
// //     getXmlUrl({ url: siteUrl, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/about-us`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/contact`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/astrology-calculators-tools`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/horoscope/today-horoscope`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/horoscope/weekly-horoscope`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/horoscope/monthly-horoscope`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/horoscope/yearly-horoscope`, lastModified: new Date() }),
// //         getXmlUrl({ url: `${siteUrl}/panchanga`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/compatibility/`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/privacy-policy`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/shop`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/shipping-policy`, lastModified: new Date() }),
// //     getXmlUrl({ url: `${siteUrl}/blog`, lastModified: new Date() }),
// //         getXmlUrl({ url: `${siteUrl}/terms-and-conditions`, lastModified: new Date() }),
// //             getXmlUrl({ url: `${siteUrl}/festival-calendar`, lastModified: new Date() }),
// //   ];

// //   // Combine all
// //   const allUrls = [
// //     ...staticUrls,
// //     ...horoscopeUrls,
// //     ...compatibilityUrls,
// //     ...postUrls,
// //     ...slug
// //   ].join('');

// //   const xml = `<?xml version="1.0" encoding="UTF-8"?>
// //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// //     ${allUrls}
// //   </urlset>`;

// //   res.setHeader('Content-Type', 'text/xml');
// //   res.write(xml);
// //   res.end();

// //   return { props: {} };
// // }

// export default function Sitemap() {
//   // getServerSideProps will handle the response
//   return null;
// }


// export async function getServerSideProps({ res }) {
//   // Fetch all blog posts using the paginated function
//   const posts = await getAllDynamicPosts();
//   const postUrls = posts.map((post) =>
//     getXmlUrl({
//       url: `${siteUrl}/blog/${post.slug}`,
//       lastModified: post.updatedAt,
//     })
//   );

//   // Renamed for clarity
//   const calculatorUrls = calculators.map((calc) =>
//     getXmlUrl({
//       url: `${siteUrl}/${calc.slug}`,
//       lastModified: new Date(),
//     })
//   );

//   // Horoscope pages
//   const types = ['today', 'weekly', 'monthly', 'yearly'];
//   const horoscopeUrls = horoscopeSigns.flatMap((sign) => // Using flatMap for cleaner code
//     types.map(type =>
//       getXmlUrl({
//         url: `${siteUrl}/horoscope/${type}-horoscope/${sign}`,
//         lastModified: new Date(),
//       })
//     )
//   );

//   // Compatibility pages
//   const compatibilityUrls = [];
//   for (let i = 0; i < horoscopeSigns.length; i++) {
//     for (let j = 0; j < horoscopeSigns.length; j++) {
//       if (i !== j) {
//         compatibilityUrls.push(
//           getXmlUrl({
//             url: `${siteUrl}/compatibility/${horoscopeSigns[i]}/${horoscopeSigns[j]}`,
//             lastModified: new Date(),
//           })
//         );
//       }
//     }
//   }

//   // Static pages
//   const staticUrls = [
//     getXmlUrl({ url: siteUrl, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/about-us`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/contact`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/astrology-calculators-tools`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/horoscope/today-horoscope`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/horoscope/weekly-horoscope`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/horoscope/monthly-horoscope`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/horoscope/yearly-horoscope`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/panchanga`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/compatibility/`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/privacy-policy`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/shop`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/shipping-policy`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/blog`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/terms-and-conditions`, lastModified: new Date() }),
//     getXmlUrl({ url: `${siteUrl}/festival-calendar`, lastModified: new Date() }),
//   ];

//   // Combine all URL sets
//   const allUrls = [
//     ...staticUrls,
//     ...postUrls,
//     ...horoscopeUrls,
//     ...compatibilityUrls,
//     ...calculatorUrls,
//   ].join('');

//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${allUrls}
//   </urlset>`;

//   // ✨ THE ONLY CHANGE IS HERE: Caching for 24 hours (86400 seconds)
//   res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
//   res.setHeader('Content-Type', 'text/xml');
//   res.write(xml);
//   res.end();

//   return { props: {} };
// }
const siteUrl = 'https://astrosight.ai'; // ✅ Added missing siteUrl
import { client } from '../lib/contentful';

const horoscopeSigns = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const calculators = [
  { slug: 'birth-chart-calculator' },
  { slug: 'love-compatibility-calculator' },
  { slug: 'dasha-calculator' },
  { slug: 'numerology-calculator' },
  { slug: 'sun-sign-calculator' },
  { slug: 'mangal-dosha-calculator' },
  { slug: 'marriage-compatibility-calculator' },
  { slug: 'kaal-sarp-dosh-calculator' },
  { slug: 'rashi-sign-calculator' },
  { slug: 'flames-calculator' },
  { slug: 'yantra-calculator' },
  { slug: 'moon-sign-calculator' },
  { slug: 'transit-chart-calculator' },
  { slug: 'name-numerology-calculator' },
];

async function getAllDynamicPosts() {
  const allItems = [];
  let skip = 0;
  const limit = 100;
  let fetchMore = true;

  while (fetchMore) {
    try {
      const entries = await client.getEntries({
        content_type: 'astroanswerBlog',
        select: 'fields.slug,sys.updatedAt',
        limit: limit,
        skip: skip,
        order: '-sys.updatedAt',
      });

      if (entries.items.length > 0) {
        allItems.push(...entries.items);
        skip += limit;
      } else {
        fetchMore = false;
      }

      if (skip > 10000) { 
        fetchMore = false;
      }

    } catch (error) {
      console.error("Error fetching sitemap posts from Contentful:", error);
      fetchMore = false;
    }
  }

  return allItems.map(item => ({
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

// ✅ KEEP ONLY THIS VERSION (the better one)
export async function getServerSideProps({ res }) {
  try {
    // Fetch all blog posts using the paginated function
    const posts = await getAllDynamicPosts();
    const postUrls = posts.map((post) =>
      getXmlUrl({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
      })
    );

    // Calculator URLs
    const calculatorUrls = calculators.map((calc) =>
      getXmlUrl({
        url: `${siteUrl}/${calc.slug}`,
        lastModified: new Date(),
      })
    );

    // Horoscope pages
    const types = ['today', 'weekly', 'monthly', 'yearly'];
    const horoscopeUrls = horoscopeSigns.flatMap((sign) =>
      types.map(type =>
        getXmlUrl({
          url: `${siteUrl}/horoscope/${type}-horoscope/${sign}`,
          lastModified: new Date(),
        })
      )
    );

    // Compatibility pages
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
      getXmlUrl({ url: `${siteUrl}/astrology-calculators-tools`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/horoscope/today-horoscope`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/horoscope/weekly-horoscope`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/horoscope/monthly-horoscope`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/horoscope/yearly-horoscope`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/panchanga`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/compatibility/`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/privacy-policy`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/shop`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/shipping-policy`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/blog`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/terms-and-conditions`, lastModified: new Date() }),
      getXmlUrl({ url: `${siteUrl}/festival-calendar`, lastModified: new Date() }),
    ];

    // Combine all URL sets
    const allUrls = [
      ...staticUrls,
      ...postUrls,
      ...horoscopeUrls,
      ...compatibilityUrls,
      ...calculatorUrls, // ✅ Fixed variable name
    ].join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls}
    </urlset>`;

    // ✅ Proper caching headers
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();

    return { props: {} };

  } catch (error) {
    console.error('Sitemap generation failed:', error);
    
    // Fallback minimal sitemap
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${getXmlUrl({ url: siteUrl, lastModified: new Date() })}
    </urlset>`;
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(fallbackXml);
    res.end();
    
    return { props: {} };
  }
}

export default function Sitemap() {
  return null;
}
