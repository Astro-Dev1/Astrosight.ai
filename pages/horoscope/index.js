import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import HoroscopePage from '../../components/Horoscopepage';
import { fetchMyProfile } from '../../services/centralApi'; // Import the API service
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';

// COMMENTED OUT FOR NOW: Translation logic
// import enTranslations from '../../locales/en.json';
// import hiTranslations from '../../locales/hi.json';
// import knTranslations from '../../locales/kn.json';

// Translation utilities - simple version for now
const t = (key, fallback = key) => {
  return fallback;
};

export default function HoroscopeIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldDisplayPage, setShouldDisplayPage] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  // const [currentLanguage, setCurrentLanguage] = useState('en');
  const router = useRouter();

  // List of valid zodiac signs
  const validZodiacSigns = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
  ];

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        // Check if user is logged in by retrieving the token
        const token = Cookies.get('token');

        if (!token) {
          // User is not logged in, display the page
          setShouldDisplayPage(true);
          setIsLoading(false);
          return;
        }

        // Fetch user profile using the API
        const profileResponse = await fetchMyProfile();

        // Check if the response contains a zodiac sign
        const userZodiacSign = profileResponse?.data?.astroProfile?.zodiac?.toLowerCase();

        if (userZodiacSign && validZodiacSigns.includes(userZodiacSign)) {
          // Valid zodiac sign found, redirect to Today's horoscope
          router.push(`/horoscope/${userZodiacSign}`);
        } else {
          // No zodiac sign found or profile doesn't exist, display the page
          setShouldDisplayPage(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // On error, display the page
        setShouldDisplayPage(true);
        setIsLoading(false);
      }
    };

    checkUserProfile();
  }, [router]);
  
  // COMMENTED OUT: Language initialization
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedLanguage = localStorage.getItem('language') || 'en';
  //     setCurrentLanguage(storedLanguage);
      
  //     // Listen for language changes
  //     const handleLanguageChange = () => {
  //       const newLanguage = localStorage.getItem('language') || 'en';
  //       setCurrentLanguage(newLanguage);
  //     };
      
  //     window.addEventListener('languageChanged', handleLanguageChange);
      
  //     return () => {
  //       window.removeEventListener('languageChanged', handleLanguageChange);
  //     };
  //   }
  // }, []);

  // Display a loading state while fetching the profile
  if (isLoading) {
    return (
      <>
        <CustomHeader 
          title="Horoscope"
          showBackButton={true}
          showSideMenu={false}
          showWallet={true}
          showLanguage={false}
          showProfile={true}
          onSideMenuPress={() => setIsSideMenuOpen(true)}
        />
        <div className="flex flex-col min-h-screen bg-orange-50 font-inter pt-16">
          <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
            <p className="text-lg text-gray-700">{t('loading', 'Loading...')}</p>
          </main>
        </div>
        
        {/* Side Menu */}
        <SideMenu 
          isOpen={isSideMenuOpen} 
          onClose={() => setIsSideMenuOpen(false)}
        />
      </>
    );
  }

  // If the user has no profile or isn't logged in, display the page
  if (!shouldDisplayPage) {
    return null; // This won't be reached as the router.push will redirect
  }

  return (
    <>
      {/* SEO Metadata */}
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kohinoor+Devanagari:wght@300;400;500;600;700&display=swap" />
        <title>Daily Horoscope Predictions | Zodiac Signs & Astrology Insights | AstroSight</title>
        <meta
          name="description"
          content="Discover daily, weekly, and monthly horoscopes for all zodiac signs. Explore personalized astrological insights with AstroSight."
        />
        <meta
          name="keywords"
          content="daily horoscope, zodiac signs, astrology predictions, Aries horoscope, Taurus horoscope, Gemini horoscope, Cancer horoscope, Leo horoscope, Virgo horoscope, Libra horoscope, Scorpio horoscope, Sagittarius horoscope, Capricorn horoscope, Aquarius horoscope, Pisces horoscope"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Daily Horoscope Predictions | AstroSight" />
        <meta
          property="og:description"
          content="Get daily, weekly, and monthly horoscope predictions for all zodiac signs. Discover your astrological insights today with AstroSight."
        />
        <meta property="og:url" content="https://astrosight.ai/horoscope" />
        <meta property="og:image" content="https://astrosight.ai/horoscope-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Daily Horoscope Predictions | AstroSight" />
        <meta
          property="twitter:description"
          content="Explore personalized daily, weekly, and monthly horoscopes for all zodiac signs at AstroSight."
        />
        <meta property="twitter:image" content="https://astrosight.ai/horoscope-image.jpg" />
        <link rel="canonical" href="https://astrosight.ai/horoscope" />
      </Head>

      {/* Custom Header */}
      <CustomHeader 
        title="Horoscope"
        showBackButton={true}
        showSideMenu={true}
        showWallet={true}
        showLanguage={false}
        showProfile={true}
        onSideMenuPress={() => setIsSideMenuOpen(true)}
      />

      {/* Main Content */}
      <div className="flex flex-col min-h-screen bg-orange-50 font-inter pt-16">
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {/* Page Header */}
          <section className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-orange-600 font-kohinoor">
              Daily Horoscope Predictions for All Zodiac Signs
            </h1>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-2">
              Discover Daily, Weekly, and Monthly Astrological Insights
            </h2>
          </section>

          {/* Horoscope Cards */}
          <HoroscopePage />
        </main>
      </div>

      {/* Side Menu */}
      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)}
      />

      {/* Structured Data */}
      <Script
        id="horoscope-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AstrologicalService",
            "name": "AstroSight Daily Horoscope",
            "description": "Get personalized daily, weekly, and monthly horoscopes for all zodiac signs.",
            "url": "https://astrosight.ai/horoscope",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://astrosight.ai/horoscope",
            },
            "provider": {
              "@type": "Organization",
              "name": "AstroSight",
            },
            "potentialAction": {
              "@type": "ReadAction",
              "target": "https://astrosight.ai/horoscope/{zodiac_sign}",
              "query-input": "required name=zodiac_sign",
            },
          }),
        }}
      />
    </>
  );
}