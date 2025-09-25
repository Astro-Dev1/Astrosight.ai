import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, Clock, Tag } from 'lucide-react';
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { strapiApi } from '../../lib/contentful.js';

// Calculate reading time
function calculateReadingTime(content) {
  if (!content) return 5;
  const text = typeof content === 'string' ? content : JSON.stringify(content);
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return readingTime;
}

// Format date function
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

export default function AuthorPage({ author, posts: initialPosts, totalPosts, hasMore: initialHasMore }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
console.log(totalPosts)
  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Author Not Found</h1>
          <Link href="/blog" className="text-orange-500 hover:text-orange-600">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Render author bio (rich text)
  const renderBioContent = (bioBlocks) => {
    if (!bioBlocks || !Array.isArray(bioBlocks)) return null;

    return bioBlocks.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {block.children?.map((child, childIndex) => {
                if (child.type === 'text') {
                  let textElement = child.text;
                  if (child.bold) {
                    textElement = <strong key={childIndex}>{textElement}</strong>;
                  }
                  if (child.italic) {
                    textElement = <em key={childIndex}>{textElement}</em>;
                  }
                  return textElement;
                }
                return child.text || '';
              })}
            </p>
          );
        default:
          return null;
      }
    });
  };

  // Load more posts function
  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/blog/posts?page=${nextPage}&limit=12&author=${author.slug}`);
      const data = await response.json();
      console.log(response)
      if (data.posts && data.posts.length > 0) {
        setPosts(prev => [...prev, ...data.posts]);
        setCurrentPage(nextPage);
        setHasMore(data.pagination.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = `${author.name} - Author at AstroSight`;
  const pageDescription = `Explore articles by ${author.name}${author.title ? `, ${author.title}` : ''}. Discover insights on Vedic astrology, spirituality, and cosmic wisdom.`;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`${author.name}, astrology author, Vedic astrology, spiritual writer`}
        canonical={`https://astrosight.ai/author/${author.slug}`}
        ogImage={author.avatar?.url || 'https://astrosight.ai/default-author.jpg'}
      />
      
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* Structured Data for Author */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": author.name,
              "jobTitle": author.title || "Astrology Writer",
              "worksFor": {
                "@type": "Organization",
                "name": "AstroSight"
              },
              "url": `https://astrosight.ai/author/${author.slug}`,
              "image": author.avatar?.url || "",
              "description": author.bio ? author.bio.map(block => 
                block.children?.map(child => child.text).join('') || ''
              ).join(' ') : `Expert astrology writer at AstroSight`,
              "sameAs": []
            }),
          }}
        />
      </Head>

      <CustomHeader 
        title="Author"
        showBackButton={true}
        showSideMenu={true}
        onSideMenuPress={() => setIsSideMenuOpen(true)}
      />
      
      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Author Header */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  {author.avatar?.url ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src={author.avatar.url}
                        alt={author.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-4xl">
                        {author.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                    {author.name}
                  </h1>
                  {author.title && (
                    <p className="text-lg text-orange-600 font-medium mb-4">
                      {author.title}
                    </p>
                  )}
                  {author.bio && (
                    <div className="text-gray-700 leading-relaxed">
                      {renderBioContent(author.bio)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Articles Count */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Articles by {author.name}
                </h2>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {totalPosts} article{totalPosts !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Articles Grid */}
            {posts.length > 0 ? (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {/* Cover Image */}
                      {post.coverImage?.url && (
                        <Link href={`/blog/${post.slug}`}>
                          <div className="relative h-48 cursor-pointer">
                            <Image
                              src={post.coverImage.url}
                              alt={post.coverImage.alternativeText || post.Title}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        </Link>
                      )}

                      <div className="p-6">
                        {/* Category */}
                        {post.category && (
                          <Link href={`/category/${post.category.slug}`}>
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full mb-3 hover:bg-orange-200 cursor-pointer">
                              {post.category.name}
                            </span>
                          </Link>
                        )}

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3 hover:text-orange-600 cursor-pointer transition-colors line-clamp-2">
                            {post.Title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        {post.shortSnippet && (
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.shortSnippet}
                          </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <time className="flex items-center" dateTime={post.publishedAt}>
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {formatDate(post.publishedAt)}
                          </time>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {calculateReadingTime(post.contentBlocks)} min
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                          <div className="bg-gray-200 h-4 w-20 rounded-full mb-3"></div>
                          <div className="bg-gray-200 h-6 w-3/4 rounded mb-3"></div>
                          <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                          <div className="bg-gray-200 h-4 w-2/3 rounded mb-4"></div>
                          <div className="flex justify-between">
                            <div className="bg-gray-200 h-4 w-24 rounded"></div>
                            <div className="bg-gray-200 h-4 w-16 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && !isLoading && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMorePosts}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No articles found for this author.</p>
                <Link href="/blog" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
                  ← Back to Blog
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // For now, return empty paths and use fallback: 'blocking'
  // You can optimize this later by fetching all author slugs
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    console.log(`DEBUG: Author page getStaticProps called for slug: ${params.slug}`);
    
    // Get author details from API (still needed for author info)
    const authorResponse = await strapiApi.getAuthorBySlug(params.slug);
    console.log(`DEBUG: Author response:`, authorResponse ? 'Found' : 'Not found');

    if (!authorResponse) {
      return { notFound: true };
    }

    // OPTIMIZATION: Get only first 12 posts from cache to reduce initial payload
    let posts = [];
    let totalPosts = 0;
    try {
      const { getArticlesByAuthor } = await import('../../lib/relatedArticlesCache.js');
      const cacheResult = await getArticlesByAuthor(params.slug);
      const allPosts = cacheResult?.data || [];
      totalPosts = allPosts.length;
      posts = allPosts.slice(0, 12); // Only load first 12 posts initially
      console.log(`DEBUG: Posts from cache for author '${params.slug}': ${posts.length}/${totalPosts}`);
    } catch (cacheError) {
      console.error('Cache error for author posts:', cacheError);
      // Fallback to API if cache fails
      const postsResponse = await strapiApi.getBlogPostsByAuthor(params.slug);
      const allPosts = postsResponse?.data || [];
      totalPosts = allPosts.length;
      posts = allPosts.slice(0, 12);
      console.log(`DEBUG: Fallback posts from API: ${posts.length}/${totalPosts}`);
    }

    return {
      props: {
        author: authorResponse,
        posts: posts,
        totalPosts: totalPosts,
        hasMore: totalPosts > 12,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching author page:', error);
    return { notFound: true };
  }
}