// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   env: {
//     POSTGRES_URL: process.env.POSTGRES_URL,
//   },
//   images: {
//     remotePatterns: [
//       {source: '/sitemap.xml',
//         destination: '/api/sitemap',
//         protocol: 'https',
//         hostname: 'images.ctfassets.net',
//         pathname: '/qpbo5573cm0y/**',  // Ensure the pattern covers your image URLs
//       },
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
 
  },
  images: {
        domains: ['astroa-api-bucket.s3.ap-south-1.amazonaws.com'],

    remotePatterns: [
      {
        
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/qpbo5573cm0y/**',  // Ensure the pattern covers your image URLs
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml', // The URL to match
        destination: '/api/sitemap', // The destination API route
      },
    ];
  },
};
export default nextConfig;