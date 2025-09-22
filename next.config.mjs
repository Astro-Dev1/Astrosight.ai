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
        hostname: 'accessible-feast-d2287c033e.media.strapiapp.com',
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
    eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.ctfassets.net', // Add Contentful's domain
    ],
    unoptimized: true,
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Ignore problematic files during build
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
      '@react-navigation/native': false,
      '@react-native-picker/picker': false,
      'react-native-image-picker': false,
      '@react-native-community/datetimepicker': false,
      'react-native-safe-area-context': false,
      // Removed '@contentful/rich-text-react-renderer': false, as it might block Contentful
      // Removed '@radix-ui/react-avatar': false, to fix Avatar component error
      '@radix-ui/react-radio-group': false,
      '@radix-ui/react-switch': false,
    };
    
    return config;
  },
};
export default nextConfig;