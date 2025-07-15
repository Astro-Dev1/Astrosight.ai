import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import { fetchMyProfile } from '../../services/centralApi';
import { InternalLinksGrid, ReportLinksGrid, CompatibilityLinksGrid, RecentBlogLinks } from '../../components/InternalLinksGrid';
import Footer from '../../components/Footer';

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

// Zodiac Sign Card Component
const ZodiacSignCard = ({ sign, isUserSign }) => {
  return (
    <Link href={`/horoscope/${sign.name.toLowerCase()}`}>
      <div
        className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border cursor-pointer ${
          isUserSign ? 'border-orange-400 bg-orange-50' : 'border-orange-100'
        }`}
      >
        <div className="flex flex-col items-center">
          <Image
            src={`/zodicimg/${sign.name}.webp`}
            alt={`${sign.name} zodiac sign`}
            width={80}
            height={80}
            className="mb-3 rounded-full"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {sign.name}
          </h3>
          <p className="text-3xl mb-2">{sign.symbol}</p>
          <p className="text-sm text-gray-500">{sign.dates}</p>
          {isUserSign && (
            <span className="mt-2 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
              Your Sign
            </span>
          )}
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
  const router = useRouter();
  console.log("Router:", router);

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
      <Head>
        <title>Daily Horoscope | All Zodiac Signs | AstroSight</title>
        <meta name="description" content="Get your daily, weekly, monthly and yearly horoscope for all zodiac signs. Free astrology predictions based on Vedic astrology." />
        <meta name="keywords" content="horoscope, zodiac signs, daily horoscope, weekly horoscope, monthly horoscope, yearly horoscope, astrology" />
        <meta property="og:title" content="Daily Horoscope | All Zodiac Signs | AstroSight" />
        <meta property="og:description" content="Get your daily, weekly, monthly and yearly horoscope for all zodiac signs. Free astrology predictions based on Vedic astrology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://astrosight.ai/horoscope" />
        <link rel="canonical" href="https://astrosight.ai/horoscope" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Horoscope | All Zodiac Signs",
              "description": "Get your daily, weekly, monthly and yearly horoscope for all zodiac signs. Free astrology predictions based on Vedic astrology.",
              "url": "https://astrosight.ai/horoscope",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Zodiac Signs",
                "itemListElement": zodiacSigns.map((sign, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": sign.name,
                  "url": `https://astrosight.ai/horoscope/${sign.name.toLowerCase()}`
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
                Select Your Zodiac Sign
              </h1>
              <p className="text-gray-600 text-lg mb-4">
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
                      href={`/horoscope/${userZodiacSign.toLowerCase()}`}
                      className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm hover:bg-orange-600 transition-colors font-medium"
                    >
                      View Your Daily Horoscope
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {zodiacSigns.map((sign) => (
                <ZodiacSignCard
                  key={sign.name}
                  sign={sign}
                  isUserSign={userZodiacSign?.toLowerCase() === sign.name.toLowerCase()}
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
