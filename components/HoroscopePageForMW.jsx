import React, { useState, useEffect } from "react";
import Head from "next/head";
import { format, startOfWeek, endOfWeek } from "date-fns";
import Link from "next/link";

// Import translations directly to avoid SSR issues
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import knTranslations from '../locales/kn.json';
import { getDailyHoroscope } from '../services/centralApi'; // Adjust path as needed

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
 const [language, setLanguage] = useState('en');
  setLanguage(en)
  // Create translation function
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value === 'string' && params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => params[param] || match);
    }
    
    return value || key;
  };


  useEffect(() => {
    console.log('HoroscopePageForMW: useEffect triggered with sign:', sign);
    console.log('HoroscopePageForMW: capitalizedSign:', capitalizedSign);
    console.log('HoroscopePageForMW: validSigns:', validSigns);
    
    if (!sign || !validSigns.includes(capitalizedSign)) {
      console.error('HoroscopePageForMW: Invalid sign detected');
      setError(t('horoscope.invalid_sign'));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchHoroscopes = async () => {
      try {
        console.log('HoroscopePageForMW: Starting fetchHoroscopes');
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
        console.log('HoroscopePageForMW: All horoscopes fetched successfully');
      } catch (err) {
        console.error("Error in fetchHoroscopes:", err);
        setError(err.message);
        setHoroscope({ text: [t('horoscope.horoscope_unavailable')], dateRange: t('horoscope.loading_data') });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoroscopes();
  }, [sign, language, capitalizedSign]);
const fetchWeeklyHoroscope = async (forAlsoCheck = false) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const params = {
      type: 'weekly',
      lang: (language === "hi" ? "hn" : language),
      sign: capitalizedSign.toLowerCase(),
      date: currentDate
    };

    console.log('fetchWeeklyHoroscope: Calling API with params:', params);
    const response = await getDailyHoroscope(params);
    
    if (response.success && response.data) {
      console.log("Weekly horoscope response:", response.data);
      
      const formattedData = {
        ...response.data.horoscope,
        dateRange: `${format(startOfWeek(new Date(), { weekStartsOn: 1 }), "d MMM")} - ${format(
          endOfWeek(new Date(), { weekStartsOn: 1 }),
          "d MMM"
        )}`,
      };
      
      console.log("Formatted weekly horoscope data:", formattedData);
      
      if (forAlsoCheck) {
        setWeeklyHoroscope(formattedData);
      } else {
        setHoroscope(formattedData);
      }
    } else {
      throw new Error('Weekly horoscope not available');
    }
  } catch (error) {
    console.error("Error fetching weekly horoscope:", error);
    const fallbackData = {
      text: [t('horoscope.weekly_not_available')],
      dateRange: `${format(startOfWeek(new Date(), { weekStartsOn: 1 }), "d MMM")} - ${format(
        endOfWeek(new Date(), { weekStartsOn: 1 }),
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
  try {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const params = {
      type: 'monthly',
      lang: (language === "hi" ? "hn" : language),
      sign: capitalizedSign.toLowerCase(),
      date: currentDate
    };

    const response = await getDailyHoroscope(params);
    
    if (response.success && response.data) {
      console.log("Monthly horoscope:", response.data);
      
      const formattedData = {
        ...response.data.horoscope,
        dateRange: format(new Date(), "MMMM yyyy"),
      };
      
      console.log("Formatted monthly horoscope data:", formattedData);
      
      if (forAlsoCheck) {
        setMonthlyHoroscope(formattedData);
      }
    } else {
      throw new Error('Monthly horoscope not available');
    }
  } catch (error) {
    console.error("Error fetching monthly horoscope:", error);
    const fallbackData = {
      text: [t('horoscope.monthly_not_available')],
      dateRange: format(new Date(), "MMMM yyyy"),
    };
    
    if (forAlsoCheck) {
      setMonthlyHoroscope(fallbackData);
    }
  }
};

const fetchYearlyHoroscope = async (forAlsoCheck = false) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const params = {
      type: 'yearly',
      lang: (language === "hi" ? "hn" : language),
      sign: capitalizedSign.toLowerCase(),
      date: currentDate
    };

    const response = await getDailyHoroscope(params);
    
    if (response.success && response.data) {
      console.log("Yearly horoscope:", response.data);
      
      const formattedData = {
        ...response.data.horoscope,
        dateRange: new Date().getFullYear().toString(),
      };

      if (forAlsoCheck) {
        setYearlyHoroscope(formattedData);
      }
    } else {
      throw new Error('Yearly horoscope not available');
    }
  } catch (error) {
    console.error("Error fetching yearly horoscope:", error);
    const fallbackData = {
      text: [t('horoscope.yearly_not_available')],
      dateRange: new Date().getFullYear().toString(),
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
        {/* Main Content */}
        <div className="flex-1 h-[calc(100vh-64px)]">
          <main className="px-4 pb-20 max-w-5xl mx-auto">{/* Zodiac Sign Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {capitalizedSign.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {t(`signs.${capitalizedSign.toLowerCase()}`, capitalizedSign)}
                  </h1>
                  <p className="text-gray-600 text-sm">{currentDate}</p>
                </div>
              </div>
            </div>

            {/* Weekly Horoscope Content */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t('horoscope.weekly_horoscope')}
              </h2>
              {horoscope ? (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-gray-500 text-sm">{horoscope.dateRange}</p>
                  </div>
                  {horoscope.sections && typeof horoscope.sections === 'object' ? (
                    <div className="space-y-4">
                      {Object.entries(horoscope.sections).map(([sectionKey, sectionValue]) => (
                        <div key={sectionKey} className="border-l-4 border-orange-400 pl-4">
                          <h3 className="font-semibold text-gray-700 mb-2">
                            {t(`horoscope.sections.${sectionKey.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')}`, sectionKey)}:
                          </h3>
                          <p className="text-gray-600 text-sm">{sectionValue}</p>
                        </div>
                      ))}
                    </div>
                  ) : horoscope.text ? (
                    <div className="space-y-3">
                      {Array.isArray(horoscope.text) 
                        ? horoscope.text.map((paragraph, index) => (
                            <p key={index} className="text-gray-600 text-sm leading-relaxed">
                              {paragraph}
                            </p>
                          ))
                        : (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {horoscope.text}
                            </p>
                          )
                      }
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">{t('horoscope.no_content_available')}</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="text-gray-500 mt-2">{t('horoscope.loading')}</p>
                </div>
              )}
            </div>

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
                      {Array.isArray(yearlyHoroscope?.text) 
                        ? yearlyHoroscope.text.map((paragraph, index) => (
                            <p key={index} className="text-sm">
                              {paragraph}
                            </p>
                          ))
                        : (
                            <p className="text-sm">
                              {yearlyHoroscope?.text || t('horoscope.yearly_not_available')}
                            </p>
                          )
                      }
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