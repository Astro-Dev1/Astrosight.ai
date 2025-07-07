import Head from 'next/head';

const SEOHead = ({
  title = "AstroSight - Expert Vedic Astrology Consultations & Horoscopes",
  description = "Get personalized Vedic astrology readings, accurate horoscopes, and spiritual guidance from experienced astrologers. Discover your life path through ancient astrological wisdom.",
  keywords = "Vedic astrology, astrology consultation, horoscope reading, birth chart analysis, spiritual guidance, zodiac compatibility, astrological remedies, Indian astrology, AI astrology, online astrologer",
  canonical = "https://astrosight.ai",
  ogImage = "https://astrosight.ai/images/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  articleAuthor = null,
  articlePublishedTime = null,
  articleModifiedTime = null,
  noIndex = false
}) => {
  const fullTitle = title.includes('AstroSight') ? title : `${title} | AstroSight`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content="AstroSight" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Article Meta Tags (for blog posts) */}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@astrosight" />
      <meta name="twitter:creator" content="@astrosight" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Favicons and Icons */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" type="image/png" href="/log.png" sizes="192x192" />
      <link rel="apple-touch-icon" sizes="180x180" href="/log.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#FF6D3F" />
      <meta name="msapplication-TileColor" content="#FF6D3F" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="AstroSight" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

export default SEOHead;
