// ../pages/blog/[slug].js

import Script from 'next/script';
import { client } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { CalendarIcon, Clock, Tag } from 'lucide-react';
import Head from 'next/head';
import {  ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../../components/InternalLinksGrid';

// Custom rendering options for Contentful rich text - Enhanced for Medium style with better spacing
const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text) => (
      <code className="font-mono text-sm bg-gray-100 rounded px-1 py-0.5">{text}</code>
    ),
    [MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      // Check if this is the first paragraph to apply a special style
      const isFirstParagraph = node.content && node.content[0] &&
        !node.content[0].marks?.some(mark => mark.type === 'code');

      // Check for alignment in the node data (if extended in Contentful)
      const textAlign = node.data?.textAlign || 'left';

      return (
        <p className={`font-serif text-lg leading-normal text-gray-800 mb-5 ${isFirstParagraph ? 'text-xl leading-relaxed' : ''
          } text-${textAlign}`}>
          {children}
        </p>
      );
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      const textAlign = node.data?.textAlign || 'left';
      return <h1 className={`font-serif text-4xl md:text-5xl font-bold mt-10 text-center mb-6 text-gray-900 text-${textAlign}`}>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      const textAlign = node.data?.textAlign || 'left';
      return <h2 className={`font-serif text-3xl font-bold mt-8 mb-4 text-center text-gray-900 text-${textAlign}`}>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      const textAlign = node.data?.textAlign || 'left';
      return <h3 className={`font-serif text-2xl font-semibold mt-6 mb-3 text-center text-gray-900 text-${textAlign}`}>{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      const textAlign = node.data?.textAlign || 'left';
      return <h4 className={`font-serif text-xl font-semibold mt-5 mb-3 text-gray-900 text-${textAlign}`}>{children}</h4>;
    },
    [BLOCKS.HR]: () => (
      <div className="flex justify-center my-8">
        <div className="w-16 h-0.5 bg-gray-300"></div>
      </div>
    ),
    [BLOCKS.QUOTE]: (node, children) => {
      return (
        <blockquote className="border-l-4 border-orange-500 pl-6 py-1 my-6 italic font-serif text-xl text-gray-700">
          {children}
        </blockquote>
      );
    },
    [BLOCKS.UL_LIST]: (node, children) => {
      return <ul className="list-disc pl-8 mb-6 font-serif text-lg leading-normal text-gray-800">{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (node, children) => {
      return <ol className="list-decimal pl-8 mb-6 font-serif text-lg leading-normal text-gray-800">{children}</ol>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return <li className="mb-2">{children}</li>;
    },
    // Enhanced image handling with alignment options like in first code sample
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title, description } = node.data.target.fields;
      const imageUrl = file.url;
      const alignment = node.data?.alignment || 'center'; // Default to center

      const alignmentClasses = {
        'left': 'float-left mr-6 mb-4',
        'right': 'float-right ml-6 mb-4',
        'center': 'mx-auto'
      };

      return (
        <figure className={`my-6 ${alignmentClasses[alignment]}`}>
          <div className="relative aspect-video max-w-2xl overflow-hidden rounded-lg">
            <Image
              src={`https:${imageUrl}`}
              alt={title || 'Blog image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-cover"
              priority
            />
          </div>
          {description && (
            <figcaption className="mt-2 text-center text-gray-600 text-sm italic">
              {description}
            </figcaption>
          )}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      return (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-500 border-b border-orange-200 hover:border-orange-500 transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
    // Add support for tables
    [BLOCKS.TABLE]: (node, children) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
          {children}
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_CELL]: (node, children) => {
      const isHeader = node.data?.isHeader || false;
      if (isHeader) {
        return (
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50">
            {children}
          </th>
        );
      }
      return <td className="px-4 py-3 text-sm text-gray-700">{children}</td>;
    },
    // Add support for code blocks
    [BLOCKS.CODE]: (node) => {
      return (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm font-mono">
          <code>{node.content[0].value}</code>
        </pre>
      );
    },
  },
};

// Estimate reading time
function calculateReadingTime(content) {
  const text = JSON.stringify(content);
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
  return readingTime;
}

export default function Post({ post, relatedPosts }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  
  const {
    title,
    publishDate,
    introduction,
    bodyContent,
    conclusion,
    metaTitle,
    metaDescription,
    primaryKeyword,
    secondaryKeywords,
    slug,
    // internalLinks,
    coverImage,
  } = post.fields;
  // console.log(internalLinks)  
  // Calculate estimated reading time
  const readingTime = calculateReadingTime([ bodyContent]);

  const keywords = [primaryKeyword, ...(secondaryKeywords || [])].join(', ');
  const fullUrl = `https://astrosight.ai/blog/${slug}`;
  const imageUrl = coverImage ? `https:${coverImage.fields.file.url}` : 'https://astrosight.ai/default-blog-image.jpg';

  return (
    <>
         <SEOHead
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={`https://astrosight.ai/blog/${slug}`}
        // ogImage={ogImage}
        publishDate={publishDate}
        modifiedDate={post.sys.updatedAt}
      />
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={post.sys.updatedAt} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Canonical URL */}
        {/* <link rel="canonical" href={fullUrl} /> */}

        {/* Note: Google Fonts should be moved to _document.js */}

        {/* Structured Data for Article */}
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title || "",
      "image": [imageUrl || ""],
      "datePublished": publishDate || "",
      "dateModified": post?.sys?.updatedAt || "",
      "author": {
        "@type": "Organization",
        "name": "AstroSight",
        "url": "https://astrosight.ai/about-us",
      },
      "publisher": {
        "@type": "Organization",
        "name": "AstroSight",
        "logo": {
          "@type": "ImageObject",
          "url": "https://astrosight.ai/log.png",
        },
      },
      "description": metaDescription || "",
      "keywords": keywords || "",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullUrl || "",
      },
    }),
  }}
></script>


        {/* Custom typography styles */}
        <style jsx global>{`
          /* Tailwind CSS classes for Medium-style typography with improved spacing */
          
          /* Better spacing for content */
          .prose-medium {
            max-width: 680px;
            margin: 0 auto;
          }
          
          .prose-medium p {
            margin-bottom: 1.25rem;
            line-height: 1.6;
          }
          
          .prose-medium h2 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-size: 1.875rem;
            line-height: 1.3;
          }
          
          .prose-medium h3 {
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
            font-size: 1.5rem;
            line-height: 1.3;
          }
          
          /* First paragraph styling like Medium */
          .prose-medium p:first-of-type {
            font-size: 1.25rem;
            line-height: 1.5;
          }
          
          /* Drop caps for first paragraph if desired */
          .drop-cap:first-letter {
            float: left;
            font-size: 4rem;
            line-height: 1;
            font-weight: 700;
            margin-right: 0.5rem;
            margin-top: 0.25rem;
          }
          
          /* Pull quote styling */
          .pull-quote {
            font-size: 1.5rem;
            font-style: italic;
            border-left: 3px solid #ef8e38;
            padding-left: 1.5rem;
            margin: 1.75rem 0;
            font-weight: 500;
            color: #333;
          }
          
          /* Image caption styling */
          figcaption {
            text-align: center;
            font-size: 0.875rem;
            color: #6b7280;
            margin-top: 0.5rem;
            font-style: italic;
          }
          
          /* Highlighted text */
          .highlight {
            background-color: rgba(255, 226, 143, 0.5);
            padding: 0 0.25rem;
          }
          
          /* List styling */
          .prose-medium ul, .prose-medium ol {
            margin: 1.25rem 0;
          }
          
          .prose-medium li {
            margin-bottom: 0.4rem;
          }
          
          /* Link styling */
          .prose-medium a {
            color: #f97316;
            text-decoration: none;
            border-bottom: 1px solid rgba(249, 115, 22, 0.3);
            transition: border-color 0.2s ease;
          }
          
          .prose-medium a:hover {
            border-color: #f97316;
          }
        `}</style>
      </Head>
      
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17273163672"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17273163672');
          `
        }}
      />
      
      {/* Custom Header and Side Menu */}
      <CustomHeader 
        title={"Blog"} 
        showBackButton={true}
        showSideMenu={true}
        onSideMenuPress={() => setIsSideMenuOpen(true)}
      />
      
      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)}
      />

      <div className="min-h-screen bg-white">
        {/* Content */}

        {/* Hero Section with Cover Image */}
        {coverImage && (
          <div className="relative w-full mt-9 h-96 md:h-[500px] ">
            <Image
              src={`https:${coverImage.fields.file.url}`}
              alt={coverImage.fields.title || title}
              fill
              priority
              sizes="200vw"
              className="cvertical object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        {/* Article Container */}
        <article className={`container mx-auto px-4 ${coverImage ? '-mt-32' : 'mt-24'} relative z-10`}>
          <div className="max-w-3xl mx-auto bg-white px-6 md:px-12 py-8 md:py-12 rounded-lg shadow-lg">
            {/* Title & Meta Section */}
            <div className="mb-10 text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                {title}
              </h1>

              <div className="flex flex-wrap justify-center items-center text-gray-600 text-lg gap-4 mb-5">
                <time className="flex items-center" dateTime={publishDate}>
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {publishDate ? new Date(publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'No publish date'}
                </time>

                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {readingTime} min read
                </span>

                {primaryKeyword && (
                  <span className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    {primaryKeyword}
                  </span>
                )}
                {/* Author link */}
                {post.fields.author && post.fields.author.fields && (
                  <Link href={`/blog/${encodeURIComponent(post.fields.author.fields.name)}`} className="flex items-center hover:underline">
                    <span className="ml-2">By {post.fields.author.fields.name}</span>
                  </Link>
                )}
              </div>

              {/* Divider */}
              <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            </div>

            {/* Article Content */}
            <div className="prose-medium">
              {/* Introduction */}
              <div className="mb-8">
                {documentToReactComponents(introduction, renderOptions)}
              </div>

              {/* Main Content */}
              <div className="mb-8">
                {documentToReactComponents(bodyContent, renderOptions)}
              </div>

              {/* Conclusion */}
              <div>
                {documentToReactComponents(conclusion, renderOptions)}
              </div>
            </div>
{/* Related Posts */}
<section className="bg-orange-50 py-12 mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              You Might Also Enjoy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  href={`/blog/${relatedPost.fields.slug}`}
                  key={relatedPost.sys.id}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 h-full flex flex-col">
                    {relatedPost.fields.coverImage && (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={`https:${relatedPost.fields.coverImage.fields.file.url}`}
                          alt={relatedPost.fields.coverImage.fields.title || relatedPost.fields.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-grow">
                      <h3 className="font-serif font-semibold text-xl text-gray-900 group-hover:text-orange-700 transition-colors duration-300 mb-2">
                        {relatedPost.fields.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {relatedPost.fields.metaDescription}
                      </p>
                    </div>
                    <div className="px-5 pb-5">
                      <span className="inline-block text-orange-600 font-medium group-hover:text-orange-700">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>

              ))}
              
            </div>
          </div>
        </section>
            {/* Tags */}
            {post.fields.faq && (
              <section className="mt-10">
                {/* <h2 className="font-serif text-4xl md:text-5xl text-center font-bold mt-10 mb-6 text-gray-900">Frequently Asked Questions</h2> */}
                <div className="space-y-4">
                  {documentToReactComponents(post.fields.faq, renderOptions)}
                </div>
              </section>
            )}

          </div>
        </article>

        
        {post.fields.internalLinks && post.fields.internalLinks.length > 0 && (
  <section className="mt-10 pt-6 border-t border-gray-200">
    <h3 className="text-xl font-serif font-semibold text-center text-gray-900 mb-4">Related Topics</h3>
    <div className="">
      {post.fields.internalLinks.map((link, index) => (
        <Link 
          href={`/blog/${link.fields.slug}`} 
          key={`internal-link-${index}`}
          className="inline-block px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-full transition-colors duration-300 mb-2"
        >
          {link.fields.title}
        </Link>
      ))}
    </div>
  </section>
)}

        {/* Internal Link Components */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* All Compatibility Combinations */}
          <CompatibilityLinksGrid />
          
          {/* All Horoscope Navigation */}
          <HoroscopeNavigation />
          
          {/* Report Links */}
          <ReportLinksGrid />
          
          {/* Recent Blog Links */}
          <RecentBlogLinks limit={20} />
        </section>

        {/* Footer */}
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const entries = await client.getEntries({
    content_type: 'astroanswerBlog',
  });

  const paths = entries.items.map((post) => ({
    params: { slug: post.fields.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // Fetch the main blog post with increased include depth
try{  
  const { items } = await client.getEntries({
    content_type: 'astroanswerBlog',
    'fields.slug': params.slug,
    include: 10  // Increase from default of 1-2
  });

  const post = items[0];

  // Fetch ALL blog posts to supplement internal links
  const allPosts = await client.getEntries({
    content_type: 'astroanswerBlog',
    limit: 100, // Maximum allowed by Contentful
    'fields.slug[nin]': [params.slug], // Exclude current post
    select: 'fields.title,fields.slug,sys.id' // Only get what we need for links
  });

  // Create a merged array of internal links
  let allInternalLinks = [];
  
  // First, add existing internal links
  if (post.fields.internalLinks && Array.isArray(post.fields.internalLinks)) {
    // Keep track of IDs we already have
    const existingIds = post.fields.internalLinks.map(link => link.sys.id);
    allInternalLinks = [...post.fields.internalLinks];
    
    // Add more links up to 10 total
    const additionalLinksNeeded = 10 - allInternalLinks.length;
    
    if (additionalLinksNeeded > 0) {
      // Add links from allPosts that aren't already included
      const additionalLinks = allPosts.items
        .filter(item => !existingIds.includes(item.sys.id))
        .slice(0, additionalLinksNeeded);
      
      allInternalLinks = [...allInternalLinks, ...additionalLinks];
    }
  } else {
    // If no internal links at all, use some from allPosts
    allInternalLinks = allPosts.items.slice(0, 10);
  }

  // Create a modified post with expanded links
  const postWithMoreLinks = {
    ...post,
    fields: {
      ...post.fields,
      internalLinks: allInternalLinks
    }
  };

  // Fetch related posts for display in "You Might Also Enjoy" section
  const relatedPosts = await client.getEntries({
    content_type: 'astroanswerBlog',
    limit: 3,
    'fields.slug[nin]': [params.slug],
  });

  // Sanitization function
  const sanitizeContentfulEntry = (item) => {
    // Process internalLinks if they exist
    const internalLinksToProcess = item.fields.internalLinks || [];
    
    // Process internalLinks
    let sanitizedInternalLinks = internalLinksToProcess.map(link => {
      // Handle both direct entries and references
      const fields = link.fields || link;
      return {
        fields: {
          title: fields.title,
          slug: fields.slug
        }
      };
    });
    console.log(item.fields.bodyContent)
    return {
      sys: { id: item.sys.id, updatedAt: item.sys.updatedAt },
      fields: {
        title: item.fields.title || '',
        slug: item.fields.slug || '',
        publishDate: item.fields.publishDate || null,
        introduction: item.fields.introduction || null,
        bodyContent: item.fields.bodyContent || null,
        conclusion: item.fields.conclusion || null,
        metaTitle: item.fields.metaTitle || '',
        metaDescription: item.fields.metaDescription || '',
        primaryKeyword: item.fields.primaryKeyword || '',
        secondaryKeywords: item.fields.secondaryKeywords || [],
        internalLinks: sanitizedInternalLinks,
        coverImage: item.fields.coverImage
          ? {
            fields: {
              file: {
                url: item.fields.coverImage.fields.file.url,
              },
              title: item.fields.coverImage.fields.title,
            },
          }
          : null,
        faq: item.fields.faQs || null,
      },
    };
  };

  // Use the enhanced post with more links
  const sanitizedPost = sanitizeContentfulEntry(postWithMoreLinks);
  const sanitizedRelatedPosts = relatedPosts.items.map(sanitizeContentfulEntry);

  return {
    props: {
      post: sanitizedPost,
      relatedPosts: sanitizedRelatedPosts,
    },
    revalidate: 60,
};
}
 catch (error) {
    console.error('Error fetching blog post:', error);      
    return {
      notFound: true,
    };
  }
}

