import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HoroscopePage from '../../components/Horoscopepage';
import { fetchMyProfile } from '../../services/centralApi'; // Import the API service

export default function HoroscopeIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldDisplayPage, setShouldDisplayPage] = useState(false);
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

  // Display a loading state while fetching the profile
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-orange-50 font-inter">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <p className="text-lg text-gray-700">Loading...</p>
        </main>
        <Footer />
      </div>
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
        <link rel="icon" href="/logo.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <title>Daily Horoscope Predictions | Zodiac Signs & Astrology Insights | AstroAnswer</title>
        <meta
          name="description"
          content="Discover daily, weekly, and monthly horoscopes for all zodiac signs. Explore personalized astrological insights with AstroAnswer."
        />
        <meta
          name="keywords"
          content="daily horoscope, zodiac signs, astrology predictions, Aries horoscope, Taurus horoscope, Gemini horoscope, Cancer horoscope, Leo horoscope, Virgo horoscope, Libra horoscope, Scorpio horoscope, Sagittarius horoscope, Capricorn horoscope, Aquarius horoscope, Pisces horoscope"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Daily Horoscope Predictions | AstroAnswer" />
        <meta
          property="og:description"
          content="Get daily, weekly, and monthly horoscope predictions for all zodiac signs. Discover your astrological insights today with AstroAnswer."
        />
        <meta property="og:url" content="https://astroanswer.co/horoscope" />
        <meta property="og:image" content="https://astroanswer.co/horoscope-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Daily Horoscope Predictions | AstroAnswer" />
        <meta
          property="twitter:description"
          content="Explore personalized daily, weekly, and monthly horoscopes for all zodiac signs at AstroAnswer."
        />
        <meta property="twitter:image" content="https://astroanswer.co/horoscope-image.jpg" />
        <link rel="canonical" href="https://astroanswer.co/horoscope" />
      </Head>

      <div className="flex flex-col min-h-screen  bg-orange-50 font-inter">
        <Header />

        <main className="container mx-auto px-4 mt-14 py-8 flex-grow">
          {/* Page Header */}
          <section className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-orange-600">
              Daily Horoscope Predictions for All Zodiac Signs
            </h1>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-2">
              Discover Daily, Weekly, and Monthly Astrological Insights
            </h2>
          </section>

          {/* Horoscope Cards */}
          <HoroscopePage />

          {/* Call-to-Action Section (Commented Out) */}
          {/* <section className="text-center mt-8">
            <CustomLinkButton
              headline="Discover More Astrological Insights"
              buttonText="Explore More"
              buttonPath="/blog"
            />
          </section> */}
        </main>

        <Footer />
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AstrologicalService",
            "name": "AstroAnswer Daily Horoscope",
            "description": "Get personalized daily, weekly, and monthly horoscopes for all zodiac signs.",
            "url": "https://astroanswer.co/horoscope",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://astroanswer.co/horoscope",
            },
            "provider": {
              "@type": "Organization",
              "name": "AstroAnswer",
            },
            "potentialAction": {
              "@type": "ReadAction",
              "target": "https://astroanswer.co/horoscope/{zodiac_sign}",
              "query-input": "required name=zodiac_sign",
            },
          }),
        }}
      />
    </>
  );
}