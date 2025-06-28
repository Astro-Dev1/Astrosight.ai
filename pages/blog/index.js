import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { fetchEntries } from '../../lib/contentful';
// import { t } from '../../locales/i18n';

const POSTS_PER_PAGE = 8;

export default function Blog({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
  const loadMoreContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1500);
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'astrology', name: 'Astrology' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'crystals', name: 'Crystals' },
    { id: 'spirituality', name: 'Spirituality' },
    { id: 'numerology', name: 'Numerology' },
    { id: 'palmistry', name: 'Palmistry' },
    { id: 'tarot', name: 'Tarot' },
  ];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.fields.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.fields.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginate posts
  const currentPosts = filteredPosts.slice(0, currentPage * POSTS_PER_PAGE);
  const hasMorePosts = filteredPosts.length > currentPosts.length;

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
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17273163672"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17273163672');
          `
        }}></script>
        <link rel="icon" href="/logo.png" />
        <title>Astro Answer Blog - Explore Vedic Astrology Articles and Insights</title>
        <meta name="description" content="Discover insightful Vedic astrology articles, horoscopes, planetary influences, and remedies. Learn how astrology shapes your life journey with expert guidance from Astro Answer." />
        <meta name="keywords" content="Vedic astrology, horoscopes, zodiac signs, planetary aspects, astrology remedies, birth charts, Guna Milan, astrology predictions, cosmic insights" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Astro Answer Blog - Vedic Astrology Insights and Horoscopes" />
        <meta property="og:description" content="Explore expert articles on Vedic astrology, horoscopes, planetary influences, and life-changing astrological remedies at Astro Answer." />
        <meta property="og:url" content="https://astrosight.co/blog" />
        <meta property="og:image" content="https://astrosight.co/images/blog-cover.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Astro Answer Blog - Vedic Astrology Wisdom" />
        <meta name="twitter:description" content="Dive into Vedic astrology articles, horoscopes, and cosmic insights. Discover how celestial bodies influence your life path." />
        <meta name="twitter:image" content="https://astrosight.co/images/blog-cover.jpg" />
        <link rel="canonical" href="https://astrosight.co/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Astro Answer Blog",
            "description": "Expert Vedic astrology articles, horoscopes, and astrological remedies.",
            "url": "https://astrosight.co/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Astro Answer",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.co/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://astrosight.co/blog"
            },
            "blogPost": currentPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.fields.title,
              "description": post.fields.description,
              "datePublished": post.fields.publishDate,
              "image": post.fields.coverImage ? post.fields.coverImage.fields.file.url : undefined,
              "author": {
                "@type": "Person",
                "name": post.fields.author.name
              }
            }))
          })}
        </script>
      </Head>

      <div className="flex flex-col min-h-screen bg-[#FFF2E2]">
        <main className="flex-1 px-4 pb-20">
          {/* Page Title */}
          <div className="mb-6">
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
            <div className="grid gap-5 mb-8">
              {currentPosts.map((post) => (
<Link key={post.sys.id} href={post.fields.slug ? `/blog/${post.fields.slug}` : `/blog/${post.fields.slug}`}>
                  <Card className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={post.fields.coverImage?.fields?.file?.url || '/images/default-blog-image.jpg'}
                          alt={post.fields.title}
                          width={500}
                          height={200}
                          className="w-full h-full object-cover object-top transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className="bg-[#FFE5CC] text-[#FF9933] border-none text-xs">
                            {post.fields.category}
                          </Badge>
                          <div className="flex items-center text-gray-500 text-xs">
                            <i className="far fa-clock mr-1"></i>
                            <span>{post.fields.readTime}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{post.fields.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.fields.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={post.fields.author.avatar} alt={post.fields.author.name} />
                              <AvatarFallback>{post.fields.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-700">{post.fields.author.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{post.fields.publishDate}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
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
          {hasMorePosts && !isLoading && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={loadMoreContent}
                variant="outline"
                className="border-[#FF9933] text-[#FF9933] hover:bg-[#FFE5CC] hover:text-[#FF9933] !rounded-button cursor-pointer"
              >
                Load More
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
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Fetch blog posts using fetchEntries
  const posts = await fetchEntries('astrosightBlog');

  // Sanitize the posts
  const sanitizedPosts = posts.map((post) => {
    console.log(post.fields)
    return {
      sys: { id: post.sys.id },
      fields: {
        title: post.fields.title || '',
        description: post.fields.metaDescription || '',
        category: post.fields.category || 'Uncategorized',
         slug: post.fields.slug ,
        publishDate: post.fields.publishDate
          ? new Date(post.fields.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: post.fields.readTime || '5 min',
        author: {
          name: post.fields.author?.fields?.name || 'Unknown Author',
          avatar: post.fields.author?.fields?.avatar?.fields?.file?.url
            ? `https:${post.fields.author.fields.avatar.fields.file.url}`
            : '/images/default-avatar.jpg',
        },
        coverImage: {
          fields: {
            file: {
              url: post.fields.coverImage?.fields?.file?.url
                ? `https:${post.fields.coverImage.fields.file.url}`
                : '/images/default-blog-image.jpg',
            },
            title: post.fields.coverImage?.fields?.title || post.fields.title || '',
          },
        },
      },
    };
  });

  return {
    props: {
      posts: sanitizedPosts,
    },
    revalidate: 10,
  };
}