// pages/compatibility/[sign]/[partner_sign].js

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import CustomHeader from '../../../components/CustomHeader';
import Footer from '../../../components/Footer';
import SEOHead from '../../../components/SEOHead';
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
export async function getServerSideProps(context) {
  const { sign, partner_sign } = context.params;

  try {
    const res = await fetch(`https://astrosight.ai/api/compatibility/${sign}/${sign}-${partner_sign}.json`);
    if (!res.ok) throw new Error('Compatibility data not found');
    const compatibility = await res.json();

    return {
      props: { compatibility, sign, partner_sign },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default function CompatibilityResultsPage({ compatibility, sign, partner_sign }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (compatibility) {
      setAnimate(true);
    }
  }, [compatibility]);

  if (!compatibility) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5E6]">
        <p className="text-xl text-gray-700">No compatibility data available</p>
      </div>
    );
  }
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

  const capitalizedSign = sign.charAt(0).toUpperCase() + sign.slice(1);
  const capitalizedPartnerSign = partner_sign.charAt(0).toUpperCase() + partner_sign.slice(1);
  const pageTitle = `Zodiac Compatibility: ${capitalizedSign} and ${capitalizedPartnerSign} | Zodiac Love Match | AstroSight`;
  const pageDescription = `Discover the compatibility between ${capitalizedSign} and ${capitalizedPartnerSign} in love, friendship, and more. Get insights into your zodiac love match with AstroSight's detailed astrology compatibility analysis.`;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`${capitalizedSign} compatibility, best match for ${capitalizedSign}, ${capitalizedSign} love horoscope, zodiac compatibility ${capitalizedSign}, astrology partner match`}
        canonical={`https://astrosight.ai/compatibility/${sign}/${partner_sign}`}
        ogImage={`https://astrosight.ai/zodiacImages/${sign.toLowerCase()}.png`}
        ogType="article"
        articleAuthor="AstroSight Team"
        articleModifiedTime={new Date().toISOString()}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: pageTitle,
              description: pageDescription,
              url: `https://astrosight.ai/compatibility/${sign}/${partner_sign}`,
              mainEntity: {
                "@type": "Article",
                name: `${capitalizedSign} and ${capitalizedPartnerSign} Zodiac Compatibility`,
                author: {
                  "@type": "Organization",
                  name: "AstroSight",
                },
                datePublished: new Date().toISOString().split("T")[0],
                dateModified: new Date().toISOString().split("T")[0],
                about: [
                  { "@type": "Thing", "name": capitalizedSign },
                  { "@type": "Thing", "name": capitalizedPartnerSign },
                ],
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen font-serif bg-[#FFF5E6] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomHeader title={`${capitalizedSign} & ${capitalizedPartnerSign}`} showBackButton={true} />
        <div className="w-full rounded-3xl font-serif bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-4 text-center mb-4 mt-16">
          <h1 className="text-4xl font-bold text-white font-kohinoor-devanagari mb-2">Zodiac Compatibility</h1>
          <h2 className="text-2xl text-white">{capitalizedSign} & {capitalizedPartnerSign}</h2>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-row items-center justify-between mb-8 px-2">
            <div className="flex-1 flex justify-center">
              <ZodiacSign sign={capitalizedSign} />
            </div>
            <div className="flex-1 flex justify-center">
              <ZodiacSign sign={capitalizedPartnerSign} />
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6">
              <h3 className="text-2xl text-center font-semibold text-black mb-4">Love Compatibility</h3>
              <CompatibilityBar type="Love" percentage={compatibility.love.score} />
              <p className="text-lg text-gray-700 mt-2">{compatibility.love.text}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6">
              <h3 className="text-2xl text-center font-semibold text-black mb-4">Sexual Compatibility</h3>
              <CompatibilityBar type="Sexual" percentage={compatibility.sexual.score} />
              <p className="text-lg text-gray-700 mt-2">{compatibility.sexual.text}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6 mb-10">
              <h3 className="text-2xl text-center font-semibold text-black mb-4">Friendship Compatibility</h3>
              <CompatibilityBar type="Friendship" percentage={compatibility.friendship.score} />
              <p className="text-lg text-gray-700 mt-2">{compatibility.friendship.text}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg md:shadow-xl p-6 mb-10">
              <h3 className="text-2xl text-center font-bold text-black mb-4">Compatibility Insight</h3>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-lg text-gray-700 leading-relaxed italic">{compatibility.description}</p>
              </div>
            </div>
          </div>
        </main>
  <div
  className="flex justify-between bg-white rounded-2xl p-4 items-center cursor-pointer"
  onClick={() => setIsExpanded(!isExpanded)}
>
  <h2 className="text-2xl font-bold text-black">
    Explore More Compatibility
  </h2>
  {/* Chevron Icon */}
  <div className="ml-4 text-[#FF6D3F]">
    {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
  </div>
</div>


  {isExpanded && (
    <div className="rounded-2xl ">
      <div className="flex justify-center items-center flex-wrap gap-2">
        {zodiacSigns.map((partnerSign) => (
          <Link
            key={`${sign}-${partnerSign}`}
            href={`/compatibility/${sign}/${partnerSign}`}
          >
            <div className="flex flex-col items-center mb-3 justify-center hover:scale-105 transition-transform">
              {/* Zodiac Images */}
              <div className="flex items-center gap-2">
                <Image
                  src={`/zodicimg/${sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase()}.webp`}
                  alt={`${sign} compatibility`}
                  width={60}
                  height={60}
                  className=""
                />
                <Image
                  src={`/zodicimg/${partnerSign.charAt(0).toUpperCase() + partnerSign.slice(1).toLowerCase()}.webp`}
                  alt={`${partnerSign} compatibility`}
                  width={60}
                  height={60}
                  className=""
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


        {/* Your remaining internal links, footer, etc. */}
        <InternalLinksGrid sign={sign} />
        <CompatibilityLinksGrid currentSign={sign} currentPartnerSign={partner_sign} />
        <HoroscopeBySignNavigation currentSign={sign} />
        <HoroscopeBySignNavigation currentSign={partner_sign} />
        <HoroscopeNavigation />
        <RecentBlogLinks limit={15} />

        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}


