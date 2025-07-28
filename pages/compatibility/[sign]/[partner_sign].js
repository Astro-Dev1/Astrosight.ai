// pages/compatibility/[sign]/[partner_sign].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CustomHeader from '../../../components/CustomHeader';
import Footer from '../../../components/Footer';
// import SEOHead from '../../../components/SEOHead';
// import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Head from 'next/head';
import { InternalLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, HoroscopeBySignNavigation, RecentBlogLinks } from '../../../components/InternalLinksGrid';

// import Image from 'next/image';

// Define zodiac gradients
// const zodiacGradients = {
//   Aries: 'from-red-400 to-orange-500',
//   Taurus: 'from-green-400 to-emerald-500',
//   Gemini: 'from-yellow-400 to-yellow-500',
//   Cancer: 'from-blue-400 to-blue-500',
//   Leo: 'from-purple-400 to-pink-500',
//   Virgo: 'from-teal-400 to-teal-500',
//   Libra: 'from-indigo-400 to-indigo-500',
//   Scorpio: 'from-gray-400 to-gray-500',
//   Sagittarius: 'from-orange-400 to-orange-600',
//   Capricorn: 'from-green-400 to-green-600',
//   Aquarius: 'from-blue-400 to-blue-600',
//   Pisces: 'from-purple-400 to-purple-600',
// };

// CompatibilityBar Component
const CompatibilityBar = ({ type, percentage }) => (
  <div className="mb-4">
    <div className="flex items-center mb-1">
      <span className="w-24 text-gray-700">{type}</span>
      <div className="flex-1 h-6 bg-orange-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-300 to-orange-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="ml-2 font-bold text-orange-800">{percentage}%</span>
    </div>
  </div>
);

// ZodiacSign Component
const ZodiacSign = ({ sign }) => (
  <Image
    src={`/zodicimg/${sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase()}.webp`}
    alt={sign}
    width={200}
    height={200}
    objectFit="cover"
    className=""
  />

);

export default function CompatibilityResultsPage() {
  const router = useRouter();
  const { sign, partner_sign } = router.query;
  const [compatibility, setCompatibility] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);
  
  // const [userSign, setUserSign] = useState('Leo');
  // const [partnerSign, setPartnerSign] = useState('Leo');
  const fetchCompatibilityData = async () => {
    try {
      const response = await fetch(`/api/compatibility/${sign}/${sign}-${partner_sign}.json`);
      if (!response.ok) {
        throw new Error('Compatibility data not found');
      }
      const data = await response.json();
      setCompatibility(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const zodiacSigns = [
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
  ];
  useEffect(() => {
    if (sign && partner_sign) {
      fetchCompatibilityData();
    }
  }, [sign, partner_sign]);

  useEffect(() => {
    if (compatibility) {
      setAnimate(true);
    }
  }, [compatibility]);



  // const handleRefresh = () => {
  //   setLoading(true);
  //   setError(null);
  //   setAnimate(false);
  //   fetchCompatibilityData();
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   router.push(`/compatibility/${userSign.toLowerCase()}/${partnerSign.toLowerCase()}`);
  // };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5E6]">
      <p className="text-xl text-orange-700">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5E6]">
      <p className="text-xl text-red-500">Error: {error}</p>
    </div>
  );

  if (!compatibility) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5E6]">
      <p className="text-xl text-gray-700">No compatibility data available</p>
    </div>
  );

  const capitalizedSign = sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : '';
  const capitalizedPartnerSign = partner_sign ? partner_sign.charAt(0).toUpperCase() + partner_sign.slice(1) : '';
  const pageTitle = `Zodiac Compatibility${capitalizedSign} and ${capitalizedPartnerSign} Compatibility | Zodiac Love Match | AstroSight`;
  const pageDescription = `Discover the compatibility between ${capitalizedSign} and ${capitalizedPartnerSign} in love, friendship, and more. Get insights into your zodiac love match with AstroSight's detailed astrology compatibility analysis.`;
  // const capitalizeFirstLetter = (string) =>
  //   string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  
  return (
    <>
    
    {/* <SEOHead
  title={`${pageTitle} Compatibility `}
  description={`Discover ${pageDescription}'s love compatibility with other zodiac signs.  your astrological match, emotional connection, and relationship insights.`}
  keywords={`${capitalizedSign} compatibility, best match for ${capitalizedSign}, ${capitalizedSign} love horoscope, zodiac compatibility ${capitalizedSign}, astrology partner match`}
  canonical={`https://astrosight.ai/compatibility/${sign}`}
  ogImage={`https://astrosight.ai/zodiacImages/${sign?.toLowerCase()}.png`}
  ogType="article"
  articleAuthor="AstroSight Team"
  articlePublishedTime={null} // Add if you track publish date
  articleModifiedTime={new Date().toISOString()} // Optional
/> */}

     <Head>
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
        <title>
          {`${capitalizedSign} Compatibility | Choose Partner's Zodiac | AstroSight`}
        
        </title>
        <meta
          name="description"
          content={`Discover ${capitalizedSign}'s love compatibility with other zodiac signs. Select your partner's sign to reveal your astrological match and relationship insights.`}
        />
        <meta
          name="keywords"
          content={`${capitalizedSign} compatibility, zodiac love match, astrology relationships, ${capitalizedSign} partner compatibility`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${capitalizedSign} Zodiac Compatibility | Choose Partner's Sign`}
        />
        <meta
          property="og:description"
          content={`Explore ${capitalizedSign}'s romantic compatibility with other zodiac signs. Find your perfect astrological match!`}
        />
        <meta
          property="og:url"
          content={`https://astrosight.ai/compatibility/${sign}`}
        />
        <meta
          property="og:image"
          content={`https://astrosight.ai/zodiacImages/${sign?.toLowerCase()}.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${capitalizedSign} Love Compatibility | AstroSight`}
        />
        <meta
          name="twitter:description"
          content={`Discover how ${capitalizedSign} matches with other zodiac signs in love and relationships. Choose your partner's sign now!`}
        />
        <meta
          name="twitter:image"
          content={`https://astrosight.ai/zodiacImages/${sign?.toLowerCase()}.png`}
        />
        <link
          rel="canonical"
          href={`https://astrosight.ai/compatibility/${sign}`}
        />
       <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": `https://astrosight.ai/compatibility/${sign}/${partner_sign}`,
      "mainEntity": {
        "@type": "Article",
        "name": `${capitalizedSign} and ${capitalizedPartnerSign} Zodiac Compatibility`,
        "author": {
          "@type": "Organization",
          "name": "AstroSight"
        },
        "datePublished": new Date().toISOString().split('T')[0],
        "dateModified": new Date().toISOString().split('T')[0],
        "about": [
          { "@type": "Thing", "name": capitalizedSign },
          { "@type": "Thing", "name": capitalizedPartnerSign }
        ]
      }
    }),
  }}
/>

      </Head> 

      <div className="min-h-screen font-serif bg-[#FFF5E6] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomHeader title={`${capitalizedSign} & ${capitalizedPartnerSign}`} showBackButton={true} />
        <div className="w-full  rounded-3xl font-serif bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-4 text-center mb-4 mt-16">
          <h1 className="text-4xl font-bold text-white font-kohinoor-devanagari mb-2">Zodiac Compatibility</h1>
          <h1 className="text-2xl text-white">
            {capitalizedSign} & {capitalizedPartnerSign}
          </h1>
        </div>

        <main className="container mx-auto px-4 py-8">
          {/* Zodiac Signs Display */}
          <div className="flex flex-row items-center justify-between mb-8 px-2">
            <div className="flex-1 flex justify-center">
              <ZodiacSign sign={capitalizedSign} />
            </div>

          
            <div className="flex-1 flex justify-center">
              <ZodiacSign sign={capitalizedPartnerSign} />
            </div>
          </div>

          {/* Compatibility Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            {/* Love Compatibility Card */}
            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6">
              <h3 className="text-2xl text-center font-semibold text-black mb-4">Love Compatibility</h3>
              <CompatibilityBar type="Love" percentage={compatibility.love.score} />
              <p className="text-lg text-gray-700 mt-2">{compatibility.love.text}</p>
            </div>

            {/* Sexual Compatibility Card */}
            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6">
              <h3 className="text-2xl text-center font-semibold text-black mb-4">Sexual Compatibility</h3>
              <CompatibilityBar type="Sexual" percentage={compatibility.sexual.score} />
              <p className="text-lg text-gray-700 mt-2">{compatibility.sexual.text}</p>
            </div>

            {/* Friendship Compatibility Card */}
            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6 mb-10">
              <h3 className="text-2xl text-center font-semibold text-black mb-4">Friendship Compatibility</h3>
              <CompatibilityBar type="Friendship" percentage={compatibility.friendship.score} />
              <p className="text-lg text-gray-700 mt-2">{compatibility.friendship.text}</p>
            </div>

            {/* Compatibility Description Card */}
            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6 mb-10">
              <h3 className="text-2xl text-center font-bold text-black mb-4">Compatibility Insight</h3>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-lg text-gray-700 leading-relaxed italic">{compatibility.description}</p>
              </div>
            </div>
          </div>

          {/* Compatibility Widget
          <div className="w-full bg-orange-100 rounded-lg shadow-lg p-6 mt-10 mb-20">
            <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">Are You Compatible?</h3>
            <p className="text-lg text-center text-orange-700 mb-4">Choose your and your partner`&apos;`s zodiac sign to check compatibility</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-auto">
                <label htmlFor="userSign" className="block text-orange-700 mb-1">YOUR SIGN</label>
                <select
                  id="userSign"
                  value={userSign}
                  onChange={(e) => setUserSign(e.target.value)}
                  className="w-full sm:w-40 p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {Object.keys(zodiacGradients).map((sign) => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-auto">
                <label htmlFor="partnerSign" className="block text-orange-700 mb-1">PARTNER`&apos;`S SIGN</label>
                <select
                  id="partnerSign"
                  value={partnerSign}
                  onChange={(e) => setPartnerSign(e.target.value)}
                  className="w-full sm:w-40 p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {Object.keys(zodiacGradients).map((sign) => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>
              <div className="pt-0.5">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors duration-300 mt-4 sm:mt-6"
                >
                  Submit
                </button>
              </div>
            </form>
          </div> */}
        </main>
        {/* <div className="max-h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-inner">

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
            {
              zodiacSigns.map((partnerSign) => (
                <Link
                  key={`${sign}-${partnerSign}`}
                  href={`/compatibility/${sign}/${partnerSign}`}
                >
                  <div className="flex flex-col items-center  bg-orange-100 rounded-lg shadow-lg hover:bg-orange-200 transition">
                    <div className='flex items-center flex-col-3'>
                      <Image
                        src={`/${sign.toLowerCase()}.jpg`} // Replace with your image path logic
                        alt={`${sign} compatibility`}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <Image
                        src={`/${partnerSign.toLowerCase()}.jpg`} // Replace with your image path logic
                        alt={`${sign} compatibility`}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </div>
                    <span className="text-sm text-orange-700 font-semibold mt-2">
                      {sign.charAt(0).toUpperCase() + sign.slice(1)} &{" "}
                      {partnerSign.charAt(0).toUpperCase() + partnerSign.slice(1)}
                    </span>
                  </div>
                </Link>
              ))
            }
          </div>
        </div> */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-md">
      {/* Header Section */}
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-bold text-black">
          Explore More Compatibility
        </h2>
        {/* Toggle Icon */}
        {isExpanded ? (
          <FaChevronUp className="text-orange-600 text-xl" />
        ) : (
          <FaChevronDown className="text-orange-600 text-xl" />
        )}
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className=" rounded-2xl ">
          <div className="flex flex-wrap gap-4">
            {zodiacSigns.map((partnerSign) => (
              <Link
                key={`${sign}-${partnerSign}`}
                href={`/compatibility/${sign}/${partnerSign}`}
              >
                <div className="flex flex-col items-center mb-3 justify-center hover:scale-105 transition-transform">
                  {/* Zodiac Images */}
                  <div className="flex items-center gap-1">
                    <Image
                      src={`/zodicimg/${sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase() }.webp`} // Replace with actual image paths
                      alt={`${sign} compatibility`}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <Image
                      src={`/zodicimg/${partnerSign.charAt(0).toUpperCase() + partnerSign.slice(1).toLowerCase()}.webp`} // Replace with actual image paths
                      alt={`${partnerSign} compatibility`}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  {/* Compatibility Text */}
                  <span className="text-sm text-black font-semibold mt-2">
                    {sign.charAt(0).toUpperCase() + sign.slice(1)} &{" "}
                    {partnerSign.charAt(0).toUpperCase() + partnerSign.slice(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    <section className="mt-10  p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-black mb-4 text-center">
            Get Your Personalized Guidance Report
          </h2>
          <p className="text-center mb-4">
            Discover detailed insights and remedies tailored just for you.
            <Link href="/guidance-report" className="text-blue-600 underline">
              Click here to get your personalized report now!
            </Link>
          </p>
        </section>

        {/* Internal Link Components */}
        {/* Compatibility Links for Current Sign */}
        <InternalLinksGrid sign={sign} />
        
        {/* All Compatibility Combinations */}
        <CompatibilityLinksGrid currentSign={sign} currentPartnerSign={partner_sign} />
        
        {/* Horoscope Links for Current Sign */}
        <HoroscopeBySignNavigation currentSign={sign} />
        
        {/* Horoscope Links for Partner Sign */}
        <HoroscopeBySignNavigation currentSign={partner_sign} />
        
        {/* All Horoscope Navigation */}
        <HoroscopeNavigation />
        
        {/* Recent Blog Links */}
        <RecentBlogLinks limit={15} />

        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>

        {/* Refresh Button */}

      </div>
    </>
  );
}

