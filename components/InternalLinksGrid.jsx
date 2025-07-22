// components/InternalLinksGrid.jsx
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchEntries } from "../lib/contentful";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const capitalizeFirstLetter = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const InternalLinksGrid = ({ sign="aries" }) => {
  return (
    <div className="w-full bg-white shadow  rounded-lg mt-8">
      <h2 className="text-lg font-bold mb-4 text-orange-600 text-center">
        Explore More Compatibility
      </h2>

      <div className="flex flex-wrap gap-1 text-sm text-gray-400 ">
        {zodiacSigns.map((partnerSign) => (
          <Link
            key={`${sign}-${partnerSign}`}
            href={`/compatibility/${sign}/${partnerSign.toLowerCase()}`}
            className="hover:underline"
          >
           |{capitalizeFirstLetter(sign)} & {capitalizeFirstLetter(partnerSign)}|
          </Link>
        ))}
      </div>
    </div>
  );
};

export const HoroscopeNavigation = ({ sign }) => {
  console.log("Sign:", sign);
  const types = ["today", "weekly", "monthly","yearly"];
  return (
    <div className="w-full bg-white shadow  rounded-lg mt-8">
      <h2 className="text-lg font-bold mb-4 text-orange-600 text-center">
        Explore Horoscope by Sign & Periods 
      </h2>
      <div className="flex flex-wrap gap-1 text-sm text-gray-400 ">
        {zodiacSigns.map((zodiacSign) =>
          types.map((type) => (
            <Link
              key={`${type}-${zodiacSign}`}
              href={`/horoscope/${type}-horoscope/${zodiacSign.toLowerCase()}`}
              className="hover:underline"
            >
             |{zodiacSign} {type.charAt(0).toUpperCase() + type.slice(1)}|
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export const CompatibilityLinksGrid = ({ currentSign, currentPartnerSign }) => {
  return (
    <div className="w-full bg-white shadow  rounded-lg mt-8">
      <h2 className="text-lg font-bold  text-orange-600 text-center">
        Explore All Compatibility Combinations
      </h2>
      <div className="flex flex-wrap gap-1 text-sm text-gray-400">
        {zodiacSigns.map((sign) =>
          zodiacSigns.map((partnerSign) => {
            // Skip the current combination
            if (sign.toLowerCase() === currentSign?.toLowerCase() && 
                partnerSign.toLowerCase() === currentPartnerSign?.toLowerCase()) {
              return null;
            }
            return (
              <Link
                key={`${sign}-${partnerSign}`}
                href={`/compatibility/${sign.toLowerCase()}/${partnerSign.toLowerCase()}`}
                className="hover:underline "
              >
               |{sign} & {partnerSign}|
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export const HoroscopeBySignNavigation = ({ currentSign }) => {
  const types = ["daily", "weekly", "monthly", "yearly"];

  return (
    <div className="w-full bg-white shadow p-4 rounded-lg mt-8">
      <h2 className="text-lg font-bold mb-4 text-orange-600 text-center">
        Explore {capitalizeFirstLetter(currentSign)} Horoscope
      </h2>
      <div className="flex flex-wrap gap-2 text-sm text-gray-400 ">
        {types.map((type) => (
          <Link
            key={`${currentSign}-${type}`}
            href={`/horoscope/${currentSign.toLowerCase()}${type !== 'daily' ? '/' + type : ''}`}
            className="hover:underline"
          >
           |{capitalizeFirstLetter(currentSign)} {capitalizeFirstLetter(type)} Horoscope |
          </Link>
        ))}
      </div>
    </div>
  );
};

export const RecentBlogLinks = ({ limit = 20 }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchEntries();
        
        // Process and limit the posts
        const processedPosts = posts.slice(0, limit).map(post => ({
          id: post.sys.id,
          title: post.fields.title || 'Untitled',
          slug: post.fields.slug || '',
          category: post.fields.category || 'General',
          publishDate: post.fields.publishDate || post.sys.createdAt,
        }));
        
        setBlogPosts(processedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [limit]);

  if (loading) {
    return (
      <div className="w-full bg-white shadow p-4 rounded-lg mt-8">
        <h2 className="text-lg font-bold mb-4 text-orange-600 text-center">
          Recent Blog Articles
        </h2>
        <div className="text-center text-gray-500">Loading latest articles...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow p-4 rounded-lg mt-8">
      <h2 className="text-lg font-bold mb-4 text-orange-600 text-center">
        Recent Blog Articles
      </h2>
      <div className="flex flex-wrap gap-2 text-sm text-gray-400 ">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="hover:underline"
              title={post.title}
            >
             |{post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}|
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center">No blog posts available</p>
        )}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/blog"
          className="text-orange-600 hover:text-orange-800 font-medium"
        >
          View All Articles →
        </Link>
      </div>
    </div>
  );
};

export const ReportLinksGrid = ({ currentSign }) => {
  const calculators = [
    { slug: 'birth-chart-calculator', name: 'Birth Chart Calculator', available: true },
    { slug: 'love-compatibility-calculator', name: 'Love Compatibility Calculator', available: true },
    { slug: 'dasha-calculator', name: 'Dasha Calculator', available: true },
    { slug: 'numerology-calculator', name: 'Numerology Calculator', available: false },
    { slug: 'kundali-matching', name: 'Kundali Matching', available: false },
    { slug: 'palm-reading', name: 'Palm Reading', available: false },
    { slug: 'tarot-reading', name: 'Tarot Reading', available: false },
    { slug: 'gemstone-recommendation', name: 'Gemstone Recommendation', available: false },
    { slug: 'muhurat-calculator', name: 'Muhurat Calculator', available: false },
    { slug: 'career-astrology', name: 'Career Astrology', available: false }
  ];

  return (
    <div className="w-full bg-white shadow p-4 rounded-lg mt-8">
      <h2 className="text-lg font-bold mb-4 text-orange-600 text-center">
        Astrology Calculators & Reports
      </h2>
      <div className="flex flex-wrap gap-2 text-sm text-gray-400 ">
        {calculators.map((calculator) => (
          <Link
            key={calculator.slug}
            href={`/astrocalculator /${calculator.slug}${currentSign ? '?sign=' + currentSign.toLowerCase() : ''}`}
            className={`hover:underline transition-colors ${
              calculator.available 
                ? 'hover:text-orange-700' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title={calculator.available ? calculator.name : `${calculator.name} (Coming Soon)`}
          >
           |{calculator.name}|
            {!calculator.available && ' (Coming Soon)'}
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/report"
          className="text-orange-600 hover:text-orange-800 font-medium"
        >
          View All Calculators →
        </Link>
      </div>
    </div>
  );
};

export default { InternalLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, HoroscopeBySignNavigation, RecentBlogLinks, ReportLinksGrid };
