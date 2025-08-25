import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import Image from 'next/image';
import Cookies from 'js-cookie';
import CustomHeader from '../../../components/CustomHeader';
import SideMenu from '../../../components/SideMenu';
import { fetchMyProfile } from '../../../services/centralApi';
import { InternalLinksGrid, ReportLinksGrid, CompatibilityLinksGrid, RecentBlogLinks } from '../../../components/InternalLinksGrid';
import Footer from '../../../components/Footer';
import TodayHoroscopeArticle from '../../../components/TodayHoroscopeArticle';
const zodiacSigns = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', image: '/zodicimg/Aries.png' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', image: '/zodicimg/Taurus.png' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', image: '/zodicimg/Gemini.png' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', image: '/zodicimg/Cancer.png' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', image: '/zodicimg/Leo.png' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', image: '/zodicimg/Virgo.png' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', image: '/zodicimg/libra.png' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', image: '/zodicimg/scorpio.png' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', image: '/zodicimg/sagittarius.png' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', image: '/zodicimg/capricorn.png' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', image: '/zodicimg/aquarius.png' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', image: '/zodicimg/pisces.png' },
];

// Zodiac Sign Card Component with async overview
import { getDailyHoroscope } from '../../../services/centralApi';
// import SEOHead from '../../../components/SEOHead';
const ZodiacSignCard = ({ sign, isUserSign, overview }) => {
  // Helper to trim or expand overview to ~160 chars
  const getPreview = (text) => {
    if (!text) return '';
    if (text.length > 160) return text.slice(0, 160) + '...';
    return text;
  };
  return (
    <Link href={`/horoscope/yearly-horoscope/${sign.name.toLowerCase()}`}>
      <div
        className={`bg-white grid-cols-1 rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 border cursor-pointer ${isUserSign ? 'border-orange-400 bg-orange-50' : 'border-orange-100'
          }`}
      >
        <div className="flex flex-row items-center gap-4">
          <Image
            src={`/zodicimg/${sign.name}.webp`}
            alt={`${sign.name} zodiac sign`}
            width={60}
            height={60}
            className="rounded-full flex-shrink-0"
          />
          <div className="flex flex-col items-start flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-0">{sign.name}</h3>
              <span className="text-2xl">{sign.symbol}</span>
            </div>
            <p className="text-xs text-gray-500 mb-1">{sign.dates}</p>
            <div className="w-full">
              {overview && (
                <span className="text-xs text-gray-700 block" title={overview}>{getPreview(overview)}</span>
              )}
              {!overview && (
                <span className="text-xs text-gray-400 block">Loading...</span>
              )}
            </div>
            {isUserSign && (
              <span className="mt-1 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Your Sign</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function HoroscopeIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldDisplayPage, setShouldDisplayPage] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [userZodiacSign, setUserZodiacSign] = useState(null);
  const [signOverviews, setSignOverviews] = useState({});
  // const router = useRouter();
  // Fetch user profile as before
  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          setShouldDisplayPage(true);
          setIsLoading(false);
          return;
        }
        const profileResponse = await fetchMyProfile();
        if (profileResponse?.data?.zodiacSign) {
          setUserZodiacSign(profileResponse.data.zodiacSign);
        }
        setShouldDisplayPage(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setShouldDisplayPage(true);
        setIsLoading(false);
      }
    };
    checkUserProfile();
  }, []);

  // Fetch daily overviews for all signs
 useEffect(() => {
  let isMounted = true;
  const fetchAllOverviews = async () => {
    const results = [];
    for (const sign of zodiacSigns) {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const response = await getDailyHoroscope({
          type: 'yearly',
          lang: 'en',
          sign: sign.name,
          date: formattedDate
        });
        if (response && response.success && response.data && response.data.horoscope) {
          results.push([sign.name, response.data?.horoscope?.Overall || response.data?.horoscope?.text || ""]);
        } else {
          results.push([sign.name, "Unavailable"]);
        }
      } catch {
        results.push([sign.name, "Unavailable"]);
      }
    }
    if (isMounted) {
      setSignOverviews(Object.fromEntries(results));
    }
  };
  fetchAllOverviews();
  return () => { isMounted = false; };
}, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFF2E2] relative pb-16 font-inter">
        <CustomHeader
          title="Loading..."
          showBackButton={true}
        />
        <div className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading horoscope...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!shouldDisplayPage) {
    return null;
  }

  return (
    <>
      <>
        {/* SEO Meta Tags */}
        <SEOHead
          title="Yearly Horoscope for All Zodiac Signs"
          description="Get your yearly horoscope predictions for all 12 zodiac signs. Explore love, career, health and guidance based on authentic Vedic astrology."
          keywords="yearly horoscope, zodiac signs, astrology forecast, Vedic predictions, yearly zodiac reading"
          canonical="https://astrosight.ai/horoscope/yearly-horoscope"
          ogImage="https://astrosight.ai/images/og-zodiac-grid.jpg"
          ogType="website"
        />

        {/* Embedded JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Yearly Horoscope for All Zodiac Signs",
              "url": "https://astrosight.ai/horoscope/yearly-horoscope",
              "description": "Free yearly horoscope forecasts for Aries, Taurus, Gemini and all zodiac signs. Get accurate insights based on Vedic astrology.",
              "publisher": {
                "@type": "Organization",
                "name": "AstroSight",
                "url": "https://astrosight.ai"
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": zodiacSigns.map((sign, i) => ({
                  "@type": "ListItem",
                  "position": i + 1,
                  "name": sign.name,
                  "url": `https://astrosight.ai/horoscope/yearly-horoscope/${sign.name.toLowerCase()}`
                }))
              }
            })
          }}
        />

        {/* Main content continues... */}
      </>

      <Head>
        <title>Yearly Horoscope | All Zodiac Signs | AstroSight</title>
        <meta name="description" content="Get your yearly horoscope predictions for all 12 zodiac signs. Explore love, career, health and guidance based on authentic Vedic astrology." />
        <meta name="keywords" content="yearly horoscope, zodiac signs, astrology forecast, Vedic predictions, yearly zodiac reading" />
        <meta property="og:title" content="Yearly Horoscope | All Zodiac Signs | AstroSight" />
        <meta property="og:description" content="Get your yearly horoscope predictions for all 12 zodiac signs. Explore love, career, health and guidance based on authentic Vedic astrology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://astrosight.ai/horoscope/yearly-horoscope" />
        <link rel="canonical" href="https://astrosight.ai/horoscope/yearly-horoscope" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Yearly Horoscope | All Zodiac Signs",
              "description": "Get your daily, weekly, monthly and yearly horoscope for all zodiac signs. Free astrology predictions based on Vedic astrology.",
              "url": "https://astrosight.ai/horoscope/yearly-horoscope",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Zodiac Signs",
                "itemListElement": zodiacSigns.map((sign, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": sign.name,
                  "url": `https://astrosight.ai/horoscope/yearly-horoscope/${sign.name.toLowerCase()}`
                }))
              }
            })
          }}
        />
      </Head>

      <div className="flex flex-col min-h-screen bg-[#FFF2E2] relative pb-16 font-inter">
        <CustomHeader
          title="Choose Your Zodiac Sign"
          showBackButton={true}
          onMenuPress={() => setIsSideMenuOpen(true)}
        />

        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />

        <div className="flex-1 pt-16">
          <main className="px-4 pb-20 max-w-6xl mx-auto">
            <div className="mt-8 mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Yearly Horoscope
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                Select Your Zodiac Sign
                Discover your daily, weekly, monthly, and yearly horoscope predictions
              </p>
              <p className="text-gray-500 text-sm">
                Click on any zodiac sign to choose your preferred horoscope period
              </p>

              {userZodiacSign && (
                <div className="mt-6 p-4 bg-orange-100 rounded-lg max-w-md mx-auto">
                  <p className="text-orange-800 mb-3">
                    Your zodiac sign: <strong>{userZodiacSign}</strong>
                  </p>
                  <div className="flex justify-center">
                    <Link
                      href={`/horoscope/today-horoscope/${userZodiacSign.toLowerCase()}`}
                      className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm hover:bg-orange-600 transition-colors font-medium"
                    >
                      View Your Daily Horoscope
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {zodiacSigns.map((sign) => (
                <ZodiacSignCard
                  key={sign.name}
                  sign={sign}
                  isUserSign={userZodiacSign?.toLowerCase() === sign.name.toLowerCase()}
                  overview={signOverviews[sign.name]}
                />
              ))}
            </div>

            {/* About Section */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About Our Horoscope Predictions
              </h2>
              <p className="text-gray-700 mb-4">
                Our horoscope predictions are based on authentic Vedic astrology principles,
                providing you with accurate insights into your daily life, relationships,
                career, and spiritual growth.
              </p>
              <p className="text-gray-700">
                Each horoscope is carefully crafted by our expert astrologers to help you
                navigate life&apos;s challenges and opportunities with cosmic wisdom and guidance.
              </p>
            </div>
<TodayHoroscopeArticle/>
            {/* Internal Links Section */}
            <div className="mt-12 space-y-8">
              <InternalLinksGrid />
              <CompatibilityLinksGrid />
              <ReportLinksGrid />
              <RecentBlogLinks />
            </div>
          </main>
        </div>
      </div>

      <div className="bg-[#f46434]  mx-auto px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>    </>
  );
}
