import React, { useState, useEffect } from "react";
import Head from "next/head";
import { format, startOfWeek, endOfWeek } from "date-fns";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";

// Import translations directly to avoid SSR issues
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import knTranslations from '../locales/kn.json';

const translations = {
  en: enTranslations,
  hi: hiTranslations,
  kn: knTranslations,
};
console.log(translations)
// Horoscope data, zodiacImages, and compatibilityData (unchanged for brevity)

// const compatibilityData = {
//   Aries: [ /* ... your compatibility data ... */ ],
//   Taurus: [ /* ... partial data ... */ ],
//   Gemini: [], // Placeholder
//   Cancer: [], // Placeholder
//   Leo: [], // Placeholder
//   Virgo: [], // Placeholder
//   Libra: [], // Placeholder
//   Scorpio: [], // Placeholder
//   Sagittarius: [], // Placeholder
//   Capricorn: [], // Placeholder
//   Aquarius: [], // Placeholder
//   Pisces: [], // Placeholder
// };

// Valid zodiac signs for validation
const validSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const HoroscopePage = ({ sign }) => {
  const capitalizedSign = sign && validSigns.includes(sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase())
    ? sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase()
    : "";
  const signKey = capitalizedSign.toLowerCase();

  const [horoscope, setHoroscope] = useState(null);
  console.log(horoscope)
  const [weeklyHoroscope, setWeeklyHoroscope] = useState(null);
  const [monthlyHoroscope, setMonthlyHoroscope] = useState(null);
  const [yearlyHoroscope, setYearlyHoroscope] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  console.log(currentDate)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sign || !validSigns.includes(capitalizedSign)) {
      setError(t('horoscope.invalid_sign'));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchHoroscopes = async () => {
      try {
        // Fetch weekly horoscope for main section
        await fetchWeeklyHoroscope();
        setCurrentDate(
          `${t('horoscope.week_of')} ${format(startOfWeek(new Date(), { weekStartsOn: 1 }), "MMMM d")} - ${format(
            endOfWeek(new Date(), { weekStartsOn: 1 }),
            "MMMM d"
          )}`
        );
        // Fetch all horoscopes for "Also Check" section
        await Promise.all([
          fetchWeeklyHoroscope(true),
          fetchMonthlyHoroscope(true),
          fetchYearlyHoroscope(true),
        ]);
      } catch (err) {
        console.error("Error in fetchHoroscopes:", err);
        setError(err.message);
        setHoroscope({ text: [t('horoscope.horoscope_unavailable')], dateRange: t('horoscope.loading_data') });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoroscopes();
  }, [sign]);

  const fetchWeeklyHoroscope = async (forAlsoCheck = false) => {
    const today = new Date();

    const weekStart = format(startOfWeek(today), 'yyyy-MM-dd');
    const weekEnd = format(endOfWeek(today), 'yyyy-MM-dd');

    try {
      const response = await fetch(`/api/horoscopes/weekly-horoscopes-${weekStart}.json`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const horoscopeData =
        data.weekStart === weekStart && data.weekEnd === weekEnd
          ? data.horoscopes[capitalizedSign] || { text: [t('horoscope.weekly_not_available')] }
          : { text: [t('horoscope.weekly_not_available')] };
      console.log("Weekly horoscope:", horoscopeData);

      const formattedData = {
        ...horoscopeData,
        dateRange: `${format(startOfWeek(today, { weekStartsOn: 1 }), "d MMM")} - ${format(
          endOfWeek(today, { weekStartsOn: 1 }),
          "d MMM"
        )}`,
      };
console.log("Formatted weekly horoscope data:", formattedData);
      if (forAlsoCheck) {
        setWeeklyHoroscope(formattedData);
      } else {
        setHoroscope(formattedData);
      }
    } catch (error) {
      console.error("Error fetching weekly horoscope:", error);
      const fallbackData = {
        text: [t('horoscope.weekly_not_available')],
        dateRange: `${format(startOfWeek(today, { weekStartsOn: 1 }), "d MMM")} - ${format(
          endOfWeek(today, { weekStartsOn: 1 }),
          "d MMM"
        )}`,
      };
      if (forAlsoCheck) {
        setWeeklyHoroscope(fallbackData);
      } else {
        setHoroscope(fallbackData);
      }
    }
  };

  const fetchMonthlyHoroscope = async (forAlsoCheck = false) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");

    try {
      const response = await fetch(`/api/horoscopes/monthly-horoscopes-${year}-${month}.json`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const horoscopeData =
        data?.[`${year}-${month}`]?.[capitalizedSign] || { text: [t('horoscope.monthly_not_available')] };
      console.log("Monthly horoscope:", horoscopeData);

      const formattedData = {
        ...horoscopeData,
        dateRange: format(today, "MMMM yyyy"),
      };
console.log("Formatted monthly horoscope data:", formattedData);
      if (forAlsoCheck) {
        setMonthlyHoroscope(formattedData);
      }
    } catch (error) {
      console.error("Error fetching monthly horoscope:", error);
      const fallbackData = {
        text: [t('horoscope.monthly_not_available')],
        dateRange: format(today, "MMMM yyyy"),
      };
      if (forAlsoCheck) {
        setMonthlyHoroscope(fallbackData);
      }
    }
  };

  const fetchYearlyHoroscope = async (forAlsoCheck = false) => {
    const year = new Date().getFullYear();

    try {
      const response = await fetch(`/api/horoscopes/yearly-horoscopes-${year}.json`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const horoscopeData = data?.[year]?.[capitalizedSign] || { text: [t('horoscope.yearly_not_available')] };
      console.log("Yearly horoscope:", horoscopeData);

      const formattedData = {
        ...horoscopeData,
        dateRange: year.toString(),
      };

      if (forAlsoCheck) {
        setYearlyHoroscope(formattedData);
      }
    } catch (error) {
      console.error("Error fetching yearly horoscope:", error);
      const fallbackData = {
        text: ["Yearly horoscope unavailable."],
        dateRange: year.toString(),
      };
      if (forAlsoCheck) {
        setYearlyHoroscope(fallbackData);
      }
    }
  };

  // const capitalizeFirstLetter = (string) =>
  //   string ? string.charAt(0).toUpperCase() + string.slice(1) : "";

  // const renderStars = (rating) => (
  //   <div className="flex">
  //     {[...Array(5)].map((_, i) => (
  //       <i
  //         key={i}
  //         className={`${i < rating ? "fas fa-star text-yellow-400" : "far fa-star text-gray-300"} text-xs`}
  //       ></i>
  //     ))}
  //   </div>
  // );

  if (isLoading) {
    return <div className="text-center py-10">{t('horoscope.loading')}</div>;
  }

  if (error || !capitalizedSign) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{t('horoscope.error')}: {error || t('horoscope.invalid_sign')}</p>
        <Link href="/" className="text-blue-500 underline">
          {t('horoscope.return_home')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <title>
          {t('horoscope.meta.title', { sign: capitalizedSign })}
        </title>
        <meta
          name="description"
          content={t('horoscope.meta.description', { sign: capitalizedSign })}
        />
        <meta
          name="keywords"
          content={t('horoscope.meta.keywords', { sign: capitalizedSign })}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('horoscope.meta.og_title', { sign: capitalizedSign })} />
        <meta
          property="og:description"
          content={t('horoscope.meta.og_description', { sign: capitalizedSign })}
        />
        <meta property="og:url" content={`https://AstroSight.co/horoscope/${signKey}`} />
        <meta property="og:image" content={`https://AstroSight.co/${signKey}.jpg`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('horoscope.meta.twitter_title', { sign: capitalizedSign })} />
        <meta
          property="twitter:description"
          content={t('horoscope.meta.twitter_description', { sign: capitalizedSign })}
        />
        <link rel="canonical" href={`https://AstroSight.co/horoscope/${signKey}`} />
      </Head>

      <div className="flex flex-col min-h-screen bg-[#FFF2E2] relative pb-16 font-inter">
        {/* Header */}
        <header className="fixed top-0 w-full bg-[#FF9960] z-50 px-4 py-4 flex justify-between items-center shadow-sm">
          <Link href="/" className="text-white cursor-pointer">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <div className="text-white font-bold text-xl">{t('horoscope.horoscope_title', { sign: t(capitalizedSign.toLowerCase()) })}</div>
          <div className="flex items-center space-x-3">
            <LanguageSelector variant="header" />
            <button className="text-white cursor-pointer">
              <i className="fas fa-share-alt text-xl"></i>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 pt-16 h-[calc(100vh-64px)]">
          <main className="px-4 pb-20 max-w-5xl mx-auto">
            {/* Zodiac Sign Section */}
    

            {/* Weekly Horoscope Content */}
          


   

       

      

            {/* Also Check Section */}
            <div className="mb-20">
              <h3 className="text-black text-xl font-semibold mb-4">{t('horoscope.also_check')}</h3>
              <div className="w-full">
                
<div className="grid w-full grid-cols-3 gap-2 px-4">
        {["weekly", "monthly", "yearly"].map((t_type) => (
          <Link
            key={t_type}
            href={`/horoscope/${sign}/${t_type}`}
            className="text-center text-sm py-2 rounded-md border transition-colors bg-orange-100 text-orange-600 font-semibold border-orange-400 hover:bg-orange-50"
          >
            {t(`horoscope.${t_type}`)}
          </Link>
        ))}
      </div>
                <div>
                  <div className="bg-white p-5 rounded-xl shadow-lg">
                    <div className="text-center mb-4">
                      <p className="text-gray-500">{weeklyHoroscope?.dateRange || t('horoscope.loading_data')}</p>
                    </div>
                    <div className="space-y-4 text-gray-700">
                        <p className="text-sm">
                          <strong>{t('horoscope.career_education')}:</strong> {weeklyHoroscope?.sections?.["Career & Education"] || t('horoscope.weekly_not_available')}
                        </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white p-5 rounded-xl shadow-lg">
                    <div className="text-center mb-4">
                      <p className="text-gray-500">{monthlyHoroscope?.dateRange || t('horoscope.loading_data')}</p>
                    </div>
                    <div className="space-y-4 text-gray-700">
                        <p className="text-sm">
                          <strong>{t('horoscope.career_education')}:</strong> {monthlyHoroscope?.sections?.["Career & Education"] || t('horoscope.monthly_not_available')}
                        </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white p-5 rounded-xl shadow-lg">
                    <div className="text-center mb-4">
                      <p className="text-gray-500">{yearlyHoroscope?.dateRange || t('horoscope.loading_data')}</p>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      {(yearlyHoroscope?.text || [t('horoscope.yearly_not_available')]).map((paragraph, index) => (
                        <p key={index} className="text-sm">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HoroscopePage;