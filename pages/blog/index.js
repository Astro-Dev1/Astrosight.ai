import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { strapiApi } from '../../lib/contentful';
import SEOHead from '../../components/SEOHead';
import {  ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid } from '../../components/InternalLinksGrid';
import Head from 'next/head';
// import { t } from '../../locales/i18n';

const POSTS_PER_PAGE = 10;
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return 'Invalid Date';
  }
};
export default function Blog({ strapiPosts }) {
  const [allPosts, setAllPosts] = useState(strapiPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reset pagination when search or category changes
  useEffect(() => {
    setCurrentPage(1);
    setAllPosts(strapiPosts);
    setHasMore(true);
  }, [searchQuery, activeCategory, strapiPosts]);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load more content
  const loadMoreContent = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/blog/posts?page=${nextPage}&limit=${POSTS_PER_PAGE}&category=${activeCategory}&search=${searchQuery}`);
      const data = await response.json();
      
      if (data.posts && data.posts.length > 0) {
        setAllPosts(prev => [...prev, ...data.posts]);
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

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'astrology', name: 'Astrology' },
    { id: 'spirituality', name: 'Spirituality' },
    { id: 'numerology', name: 'Numerology' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'remedies', name: 'Remedies' },
    { id: 'panchanga', name: 'Panchanga' },
    { id: 'festivals', name: 'Festivals' },
    { id: 'philosophy', name: 'Philosophy' },
    { id: 'crystals', name: 'Crystals' },
    { id: 'yantras', name: 'Yantras' },
    { id: 'gems', name: 'Gems' },
  ];

  // Filter posts
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.shortSnippet?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || (post.category?.name === activeCategory);
    return matchesSearch && matchesCategory;
  });

  // For client-side filtering, show all filtered posts
  const currentPosts = filteredPosts;

  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <>
      <CustomHeader 
        title={ 'Blog'}
        showBackButton={true}
      />
      <SideMenu 
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
      />
<SEOHead
  title="AstroSight Blog - Explore Astrological Wisdom and Insights"
  description="Discover insightful blogs on Vedic astrology, zodiac signs, planetary influences, and spiritual guidance at AstroSight."
  keywords="Vedic astrology, astrology blogs, zodiac signs, spiritual insights, horoscope articles"
  canonical="https://astrosight.ai/blog"
  ogImage="https://astrosight.ai/images/blog-cover.jpg"
  ogType="website"
  articleAuthor="AstroSight Team"
  articlePublishedTime={null}  // or a date-string if applicable
  articleModifiedTime={new Date().toISOString()}  // update as needed
/>
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "AstroSight Blog",
          "url": "https://astrosight.ai/blog",
          "description": "Insightful blogs on Vedic astrology, zodiac signs, planetary influences, and spiritual guidance.",
          "publisher": {
            "@type": "Organization",
            "name": "AstroSight",
            "logo": {
              "@type": "ImageObject",
              "url": "https://astrosight.ai/logo.png"
            }
          },
          "image": "https://astrosight.ai/images/blog-cover.jpg",
          "inLanguage": "en",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://astrosight.ai/blog"
          },
          "datePublished": new Date().toISOString().split('T')[0],
          "dateModified": new Date().toISOString().split('T')[0]
        }),
      }}
    />
  </Head>


      <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto">
        <main className="flex-1 px-4 mt-16 pb-20">
          {/* Page Title */}
          <div className="mb-6 text-center font-kohinoor-latin">
            <h1 className="text-2xl font-bold text-gray-900">{ 'Spiritual Blogs'}</h1>
            <p className="text-gray-600">{ 'Explore our collection of insightful articles'}</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-5">
            <Input
              type="text"
              placeholder={'Search blogs...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-3 rounded-full bg-white border-none shadow-sm text-sm"
            />
            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          {/* Categories */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                    activeCategory === category.name
                      ? 'bg-[#FF9933] text-white'
                      : 'bg-white text-gray-700 hover:bg-[#FFE5CC]'
                  } cursor-pointer transition-colors`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {currentPosts.length > 0 ? (
            <div className="grid gap-5 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post) => {
                // Strapi data structure - image URL is direct from the API response
                const coverImageUrl = post.coverImage?.url 
                  ? post.coverImage.url
                  : '/images/default-blog-image.jpg';

                return (
                  <div key={post.id}>
                    <Card className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-col">
                        {/* Cover Image - Clickable to post */}
                        <Link href={`/blog/${post.slug}`} className="block group">
                          <div className="h-48 overflow-hidden">
                            <Image
                              src={coverImageUrl}
                              alt={post.Title}
                              width={500}
                              height={200}
                              className="w-full h-full object-cover object-top transition-transform group-hover:scale-105 duration-300"
                            />
                          </div>
                        </Link>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            {/* Category Badge - Clickable to category page */}
                            {post.category?.slug ? (
                              <Link href={`/category/${post.category.slug}`}>
                                <Badge variant="outline" className="bg-[#FFE5CC] text-[#FF9933] border-none text-xs hover:bg-[#FFD7B3] cursor-pointer transition-colors">
                                  {post.category.name}
                                </Badge>
                              </Link>
                            ) : (
                              <Badge variant="outline" className="bg-[#FFE5CC] text-[#FF9933] border-none text-xs">
                                {post.category?.name || 'Astrology'}
                              </Badge>
                            )}
                            
                            <div className="flex items-center text-gray-500 text-xs">
                              <i className="far fa-clock mr-1"></i>
                              <span>5 min</span>
                            </div>
                          </div>
                          
                          {/* Title - Clickable to post */}
                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-[#FF9933] cursor-pointer transition-colors">{post.Title}</h3>
                          </Link>
                          
                          {/* Excerpt */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.shortSnippet}</p>
                          
                          <div className="flex items-center justify-between">
                            {/* Author - Clickable to author page */}
                            <div className="flex items-center">
                              {post.author?.slug ? (
                                <Link href={`/author/${post.author.slug}`} className="flex items-center hover:text-[#FF9933] transition-colors cursor-pointer">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarFallback>
                                      {post.author.name?.[0] || 'A'}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-700">
                                    {post.author.name}
                                  </span>
                                </Link>
                              ) : (
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarFallback>
                                      {post.author?.name?.[0] || 'A'}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-700">
                                    {post.author?.name || 'AstroSight Team'}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <span className="text-xs text-gray-500">
                              {formatDate(post.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          ):(
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <Image
                src="/images.png"
                alt="No results found"
                width={500}
                height={200}
                className="w-40 h-40 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you&apos;re looking for.</p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setCurrentPage(1);
                  setAllPosts(strapiPosts);
                  setHasMore(true);
                }}
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white !rounded-button cursor-pointer"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid gap-5 mb-8 animate-pulse">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="bg-gray-200 h-5 w-20 rounded-full"></div>
                      <div className="bg-gray-200 h-4 w-16 rounded-full"></div>
                    </div>
                    <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-2/3 rounded mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-200 h-6 w-6 rounded-full mr-2"></div>
                        <div className="bg-gray-200 h-4 w-24 rounded"></div>
                      </div>
                      <div className="bg-gray-200 h-4 w-16 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !isLoading && (searchQuery === '' && activeCategory === 'All') && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={loadMoreContent}
                variant="outline"
                className="border-[#FF9933] text-[#FF9933] hover:bg-[#FFE5CC] hover:text-[#FF9933] !rounded-button cursor-pointer"
              >
                Load More Posts
              </Button>
            </div>
          )}

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-20 right-4 bg-[#FF9933] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer z-40"
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          )}

          {/* Internal Link Components */}
          <section className="mt-8">
            {/* All Compatibility Combinations */}
            <CompatibilityLinksGrid />
            
            {/* All Horoscope Navigation */}
            <HoroscopeNavigation />
            
            {/* Report Links */}
            <ReportLinksGrid />
          </section>
        </main>

        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  console.log('getStaticProps called - Strapi only');
  
  let strapiPosts = [];

  // Fetch only first page of posts (20 posts instead of 800)
  try {
    const strapiResponse = await strapiApi.getBlogPosts(20, 1);
    strapiPosts = strapiResponse?.data || [];
    
    // Sort by published date (most recent first)
    strapiPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    console.log('Strapi posts loaded:', strapiPosts.length);
  } catch (error) {
    console.error('Error fetching Strapi posts:', error);
  }

  return {
    props: {
      strapiPosts: strapiPosts,
    },
    revalidate: 3600,
  }
}