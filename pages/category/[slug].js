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

export default function CategoryPage({ category, posts: initialPosts, totalPosts, hasMore: initialHasMore }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/blog" className="text-orange-500 hover:text-orange-600">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Render category description (rich text)
  const renderDescriptionContent = (descBlocks) => {
    if (!descBlocks || !Array.isArray(descBlocks)) return null;

    return descBlocks.map((block, index) => {
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

  const pageTitle = `${category.name} - AstroSight Blog Category`;
  // Load more posts function
  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/blog/posts?page=${nextPage}&limit=12&category=${category.slug}`);
      const data = await response.json();
      
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

  const pageDescription = category.description ? 
    category.description.map(block => 
      block.children?.map(child => child.text).join('') || ''
    ).join(' ').substring(0, 160) + '...' :
    `Explore articles about ${category.name} on AstroSight. Discover insights on Vedic astrology, spirituality, and cosmic wisdom.`;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`${category.name}, astrology category, Vedic astrology, spiritual guidance`}
        canonical={`https://astrosight.ai/category/${category.slug}`}
        ogImage="https://astrosight.ai/default-category.jpg"
      />
      
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* Add line-clamp utility */}
        <style jsx global>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
        
        {/* Structured Data for Category */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": `${category.name} Articles`,
              "description": pageDescription,
              "url": `https://astrosight.ai/category/${category.slug}`,
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": posts.length,
                "itemListElement": posts.map((post, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "BlogPosting",
                    "headline": post.Title,
                    "url": `https://astrosight.ai/blog/${post.slug}`,
                    "datePublished": post.publishedAt,
                    "author": {
                      "@type": "Person",
                      "name": post.author?.name || "AstroSight Team"
                    }
                  }
                }))
              },
              "publisher": {
                "@type": "Organization",
                "name": "AstroSight",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://astrosight.ai/logo.png"
                }
              }
            }),
          }}
        />
      </Head>

      <CustomHeader 
        title="Category"
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
          {/* Category Header */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8 mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Tag className="w-8 h-8 text-purple-600" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              
              {category.description && (
                <div className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  {renderDescriptionContent(category.description)}
                </div>
              )}
            </div>

            {/* Articles Count */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {category.name} Articles
                </h2>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
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
                        {/* Author */}
                        {post.author && (
                          <Link href={`/author/${post.author.slug}`}>
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full mb-3 hover:bg-gray-200 cursor-pointer">
                              By {post.author.name}
                            </span>
                          </Link>
                        )}

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3 hover:text-purple-600 cursor-pointer transition-colors line-clamp-2">
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
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No articles found in this category.</p>
                <Link href="/blog" className="text-purple-500 hover:text-purple-600 mt-4 inline-block">
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
  // You can optimize this later by fetching all category slugs
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    console.log(`DEBUG: Category page getStaticProps called for slug: ${params.slug}`);
    
    // Get category details from API (still needed for category info)
    const categoryResponse = await strapiApi.getCategoryBySlug(params.slug);
    console.log(`DEBUG: Category response:`, categoryResponse ? 'Found' : 'Not found');

    if (!categoryResponse) {
      return { notFound: true };
    }

    // OPTIMIZATION: Get only first 12 posts from cache to reduce initial payload
    let posts = [];
    let totalPosts = 0;
    try {
      const { getArticlesByCategory } = await import('../../lib/relatedArticlesCache.js');
      const cacheResult = await getArticlesByCategory(params.slug);
      const allPosts = cacheResult?.data || [];
      totalPosts = allPosts.length;
      posts = allPosts.slice(0, 12); // Only load first 12 posts initially
      console.log(`DEBUG: Posts from cache for category '${params.slug}': ${posts.length}/${totalPosts}`);
    } catch (cacheError) {
      console.error('Cache error for category posts:', cacheError);
      // Fallback to API if cache fails
      const postsResponse = await strapiApi.getBlogPostsByCategory(params.slug);
      const allPosts = postsResponse?.data || [];
      totalPosts = allPosts.length;
      posts = allPosts.slice(0, 12);
      console.log(`DEBUG: Fallback posts from API: ${posts.length}/${totalPosts}`);
    }

    return {
      props: {
        category: categoryResponse,
        posts: posts,
        totalPosts: totalPosts,
        hasMore: totalPosts > 12,
      },
      revalidate: 3600, // Revalidate every hour instead of every second
    };
  } catch (error) {
    console.error('Error fetching category page:', error);
    return { notFound: true };
  }
}