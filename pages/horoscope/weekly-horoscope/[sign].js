// pages/horoscope/today-horoscope/[sign].js

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";
import SEOHead from "../../../components/SEOHead";
import CustomHeader from "../../../components/CustomHeader";
import Footer from '../../../components/Footer';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Briefcase, Activity, TrendingUp, Gift } from 'lucide-react';
import {
  InternalLinksGrid,
  ReportLinksGrid,
  HoroscopeNavigation,
  CompatibilityLinksGrid,
  RecentBlogLinks
} from '../../../components/InternalLinksGrid';
import { MonthlyHoroscopeFull } from '../../../components/DailySignArticle';
import { getDailyHoroscope } from "../../../services/centralApi";

// // Import translations for SSR
// import enTranslations from '../../../locales/en.json';
// import hiTranslations from '../../../locales/hi.json';
// import knTranslations from '../../../locales/kn.json';

// const translations = {
//   en: enTranslations,
//   hi: hiTranslations,
//   kn: knTranslations,
// };

// PeriodSelector Component for navigating between horoscope periods
const PeriodSelector = ({ currentPeriod = 'weekly', sign }) => {
  const router = useRouter();

  const periods = [
    { id: 'today', name: 'Today', icon: '📅', path: `/horoscope/today-horoscope/${sign}` },
    { id: 'weekly', name: 'Weekly', icon: '📊', path: `/horoscope/weekly-horoscope/${sign}` },
    { id: 'monthly', name: 'Monthly', icon: '🗓️', path: `/horoscope/monthly-horoscope/${sign}` },
    { id: 'yearly', name: 'Yearly', icon: '🔮', path: `/horoscope/yearly-horoscope/${sign}` },
  ];

  const handlePeriodClick = (path) => {
    router.push(path);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="grid grid-cols-4 gap-2 p-2 bg-white/90 rounded-lg backdrop-blur-sm">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => handlePeriodClick(period.path)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              currentPeriod === period.id
                ? 'bg-[#FF9933] text-black'
                : 'text-black hover:bg-white/10 hover:text-black'
            }`}
          >
            <span className="text-2xl mb-1">{period.icon}</span>
            <span className="text-sm font-medium">{period.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ProgressBar component to show percentage bars
const ProgressBar = ({ label, value, color = "bg-[#FF9933]" }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-black text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

// Translation helper (very basic, for nested keys)
// const translate = (language, key, defaultValue = key) => {
//   try {
//     const keys = key.split('.');
//     let value = translations[language];
//     for (const k of keys) {
//       value = value?.[k];
//     }
//     return value || defaultValue;
//   } catch {
//     return defaultValue;
//   }
// };

const zodiacSignsList = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Main component
export default function HoroscopePeriodPage({ initialHoroscopeData, signParam, initialLanguage }) {
  const router = useRouter();

  const sign = signParam || router.query.sign || '';
  const capitalizedSign = sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : '';
  // const currentPeriod = 'today';

  const [horoscope, setHoroscope] = useState(initialHoroscopeData || {});
  const [loading, setLoading] = useState(!initialHoroscopeData);
  console.log(loading)
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(initialLanguage || 'en');
  const [selectedTab, setSelectedTab] = useState('dos');
  const [signOverviews, setSignOverviews] = useState({}); // For overview of other signs
  const [currentDate, setCurrentDate] = useState(format(new Date(), "MMMM d, yyyy"));

  // Fetch overviews for other signs (async)
  useEffect(() => {
    let isActive = true;

    const fetchAllOverviews = async () => {
      const results = [];

      for (const zsign of zodiacSignsList) {
        if (zsign.toLowerCase() === sign.toLowerCase()) {
          results.push([zsign, horoscope?.Overall || horoscope?.text || ""]);
          continue;
        }
        try {
          setCurrentDate(format(new Date(), "MMMM d, yyyy"));
          // Make your API call here, you may optimize with batch fetching if possible
          const response = await getDailyHoroscope({
            type: 'weekly',
            lang: language === 'hi' ? 'hn' : language,
            sign: zsign,
            date: format(new Date(), "yyyy-MM-dd")
          });
          if (response?.success && response.data?.horoscope) {
            const overview = response.data.horoscope.Overall || response.data.horoscope.text || "Unavailable";
            results.push([zsign, overview]);
          } else {
            results.push([zsign, "Unavailable"]);
          }
        } catch {
          results.push([zsign, "Unavailable"]);
        }
      }

      if (isActive) {
        setSignOverviews(Object.fromEntries(results));
      }
    };

    fetchAllOverviews();

    return () => {
      isActive = false;
    };
  }, [language, sign, horoscope]);

  // Watch for language changes via custom event 'languageChanged'
  useEffect(() => {
    const onLanguageChange = (event) => {
      setLanguage(event.detail);
    };
    window.addEventListener('languageChanged', onLanguageChange);
    return () => window.removeEventListener('languageChanged', onLanguageChange);
  }, []);

  // Fetch weekly horoscope if missing client-side (fallback)
  useEffect(() => {
    if (!horoscope || !horoscope.text) {
      fetchDaily();
    }
  }, [sign, language]);

  async function fetchDaily() {
    if (!sign) return;
    setLoading(true);
    setError(null);

    try {
      const resp = await getDailyHoroscope({
        type: 'weekly',
        lang: language === 'hi' ? 'hn' : language,
        sign: capitalizedSign,
        date: format(new Date(), "yyyy-MM-dd")
      });
      if (resp?.success && resp.data) {
        setHoroscope(resp.data.horoscope);
      } else {
        setHoroscope({
          text: `Today brings new opportunities for ${capitalizedSign}. Stay focused and trust your intuition.`,
          sections: {},
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weeekly horoscope');
      setHoroscope({
        text: `This month brings new opportunities for ${capitalizedSign}. Stay focused and trust your intuition.`,
        sections: {},
      });
    } finally {
      setLoading(false);
    }
  }

  // Avoid rendering if no `sign` param yet
  if (!sign) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Destructure detailed predictions and other common data to simplify
  const detailedPredictions = horoscope?.['Detailed Predictions'] || horoscope?.sections;
  const luckyElements = horoscope?.lucky_elements;
  const dailyTimeline = horoscope?.daily_timeline || [];
  const personalizedRecommendations = horoscope?.personalized_recommendations;
  const importantDates = horoscope?.importantDates;
  const tipOfThePeriod = horoscope?.tipOfTheMonth;

  return (
    <>
      {/* SEO Head - Using your SEOHead component */}
      <SEOHead
        title={`${capitalizedSign} Weekly Horoscope | AstroSight`}
        description={`Discover ${capitalizedSign}'s weekly horoscope. Get predictions for love, career, health, and more at AstroSight.`}
        keywords={`${capitalizedSign} weekly horoscope, zodiac weekly predictions, astrology weekly insights`}
        canonical={`https://astrosight.ai/horoscope/weekly-horoscope/${sign.toLowerCase()}`}
        ogImage={`https://astrosight.ai/zodiacImages/${capitalizedSign}.png`}
        ogType="article"
        articleAuthor="AstroSight Team"
        articlePublishedTime={new Date().toISOString()}
        articleModifiedTime={new Date().toISOString()}
      />

      <Head>
        <title>{`${capitalizedSign} Weekly Horoscope | AstroSight`}</title>
        <meta name="description" content={`Discover your ${capitalizedSign} weekly horoscope. Get predictions for love, career, health, and more at AstroSight.`} />
        <link rel="canonical" href={`https://astrosight.ai/horoscope/weekly-horoscope/${sign.toLowerCase()}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": `${capitalizedSign} Weekly Horoscope | AstroSight`,
              "headline": `${capitalizedSign} Weekly Horoscope`,
              "description": `Discover ${capitalizedSign}'s weekly horoscope. Get predictions for love, career, health, and more at AstroSight.`,
              "url": `https://astrosight.ai/horoscope/weekly-horoscope/${sign.toLowerCase()}`,
              "provider": {
                "@type": "Organization",
                "name": "AstroSight",
                "url": "https://astrosight.ai"
              },
              "image": `https://astrosight.ai/zodiacImages/${capitalizedSign}.png`,
              "datePublished": new Date().toISOString().split('T')[0],
              "dateModified": new Date().toISOString().split('T')[0],
              "about": [{ "@type": "Thing", "name": capitalizedSign }],
              "inLanguage": language || "en",
            }),
          }}
        />
      </Head>

      {error && (
        <div className="fixed top-20 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p className="text-sm">
            <strong>Notice:</strong> Unable to fetch live horoscope data. Showing sample content.
          </p>
        </div>
      )}

      <div className="flex flex-col min-h-screen bg-[#FFF4EA] relative pb-16 font-inter">
        <CustomHeader title={`${capitalizedSign} Horoscope`} showBackButton={true} />

        <div className="flex-1 pt-16">
          <div className="px-4 pb-20 max-w-5xl mx-auto">

            {/* Zodiac Sign Header */}
            <div className="mt-6 mb-8 flex flex-col items-center">
              <h1 className="text-2xl font-bold text-black mb-2">{capitalizedSign} Today Horoscope</h1>
              <Image
                src={`/zodicimg/${capitalizedSign}.webp`}
                width={150}
                height={150}
                alt={`${capitalizedSign} Symbol`}
                className="mb-3 rounded-full"
              />
              <p className="text-black/80 text-sm">{currentDate}</p>
            </div>

            {/* Period Selector */}
            <PeriodSelector currentPeriod="weekly" sign={sign.toLowerCase()} />

            {/* Overview Card */}
            <Card className="bg-white p-5 rounded-xl shadow-lg mb-6 border border-gray-200">
              <h3 className="text-black text-xl font-semibold mb-3">Weekly Overview</h3>
              <p className="text-black leading-relaxed text-sm">
                {horoscope?.text || horoscope?.Overall || "No overview available."}
              </p>
            </Card>

            {/* Auspicious/Inauspicious Time Cards */}
            {(horoscope?.['Auspicious Time'] || horoscope?.['Inauspicious Time']) && (
              <div className="mb-6">
                <div className="flex gap-3">
                  {horoscope?.['Auspicious Time'] && (
                    <Card className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="text-black font-semibold mb-1">Auspicious Time</h4>
                      <p className="text-black text-sm">{horoscope['Auspicious Time']}</p>
                    </Card>
                  )}
                  {horoscope?.['Inauspicious Time'] && (
                    <Card className="flex-1 bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="text-black font-semibold mb-1">Inauspicious Time</h4>
                      <p className="text-black text-sm">{horoscope['Inauspicious Time']}</p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Daily Wisdom */}
            {horoscope?.['Daily Wisdom & Suggestions'] && (
              <Card className="bg-white p-5 rounded-xl shadow-lg mb-6 border border-gray-200">
                <h3 className="text-black text-lg font-semibold mb-3">Daily Wisdom</h3>
                <p className="text-black leading-relaxed text-sm">{horoscope['Daily Wisdom & Suggestions']}</p>
              </Card>
            )}

            {/* Detailed Predictions */}
            {detailedPredictions && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">Detailed Predictions</h3>
                {Object.entries(detailedPredictions).map(([key, detail]) => {
                  const iconMap = {
                    'Love & Relationships': { icon: Heart },
                    'Love & Relationship': { icon: Heart },
                    'Career & Money': { icon: Briefcase },
                    'Career & Education': { icon: Briefcase },
                    'Health & Wellness': { icon: Activity },
                    'Personal Growth': { icon: TrendingUp },
                    'Money & Finances': { icon: TrendingUp },
                  };
                  const config = iconMap[key] || { icon: Star };
                  const IconComponent = config.icon;
                  const detailText = typeof detail === 'string' ? detail : detail?.Text || "";
                  const percentage = detail?.percentage || null;
                  return (
                    <Card key={key} className="bg-white rounded-xl shadow-sm mb-3 p-4 border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-gray-700" />
                        </div>
                        <h4 className="font-medium text-black">{key}</h4>
                      </div>
                      <p className="text-black text-sm mb-3">{detailText}</p>
                      {percentage && (
                        <ProgressBar label="Compatibility" value={parseInt(percentage)} />
                      )}
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Lucky Elements */}
            {luckyElements && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">Lucky Elements</h3>
                <div className="flex gap-3">
                  {luckyElements.lucky_numbers && (
                    <Card className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-center mb-3">
                        <Gift className="w-6 h-6 text-gray-700" />
                      </div>
                      <h4 className="font-medium text-black mb-2 text-center">Lucky Numbers</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {luckyElements.lucky_numbers.map(num => (
                          <Badge key={num} className="bg-gray-100 text-black border-0">{num}</Badge>
                        ))}
                      </div>
                    </Card>
                  )}
                  {luckyElements.lucky_colors && (
                    <Card className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-center mb-3">
                        <Gift className="w-6 h-6 text-gray-700" />
                      </div>
                      <h4 className="font-medium text-black mb-2 text-center">Lucky Colors</h4>
                      <div className="flex flex-wrap justify-center gap-3 mt-2">
                        {luckyElements.lucky_colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="h-8 w-8 rounded-full shadow-sm border-2 border-gray-200"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Daily Timeline */}
            {dailyTimeline.length > 0 && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">Daily Timeline</h3>
                <Card className="bg-white p-5 rounded-xl shadow-lg border-0 backdrop-blur-sm">
                  {dailyTimeline.map((item, i) => (
                    <div key={i} className={`mb-4 flex ${i === dailyTimeline.length -1 ? 'mb-0' : ''}`}>
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-4 h-4 rounded-full border-2 border-white ${
                          item?.favorability === 'favorable' ? 'bg-green-500' :
                          item?.favorability === 'unfavorable' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        {i < dailyTimeline.length - 1 && (
                          <div className="w-0.5 flex-1 bg-white/20 my-1 min-h-[20px]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">{item?.time || ''}</p>
                        <p className="text-sm text-black/80">{item?.activity || ''}</p>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {/* Personalized Recommendations */}
            {personalizedRecommendations && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">Personalized Recommendations</h3>
                <Card className="bg-white p-5 rounded-xl shadow-lg border-0 backdrop-blur-sm">
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/20">
                      <TabsTrigger value="dos" className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-black">Do&apos;s</TabsTrigger>
                      <TabsTrigger value="donts" className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-black">Don&apos;ts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="dos" className="mt-4">
                      {personalizedRecommendations.dos && personalizedRecommendations.dos.length > 0 ? (
                        <div className="space-y-3">
                          {personalizedRecommendations.dos.map((tip, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <span className="text-green-400 text-sm">✓</span>
                              </div>
                              <p className="text-black/90 text-sm flex-1">{tip}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-black/80 text-sm">No recommendations available.</p>
                      )}
                    </TabsContent>
                    <TabsContent value="donts" className="mt-4">
                      {personalizedRecommendations.donts && personalizedRecommendations.donts.length > 0 ? (
                        <div className="space-y-3">
                          {personalizedRecommendations.donts.map((tip, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <span className="text-red-400 text-sm">✕</span>
                              </div>
                              <p className="text-black/90 text-sm flex-1">{tip}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-black/80 text-sm">No warnings available.</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            )}

            {/* Important Dates */}
            {importantDates && importantDates.length > 0 && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">Important Dates</h3>
                <Card className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {importantDates.map((date, i) => (
                      <div key={i} className="bg-gray-100 rounded-lg px-4 py-2">
                        <span className="text-black font-semibold text-lg">{date}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Tip of the Period */}
            {tipOfThePeriod && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">Daily Tip</h3>
                <Card className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                  <p className="text-black leading-relaxed text-sm font-medium">{tipOfThePeriod}</p>
                </Card>
              </div>
            )}

            {/* Choose Another Sign Section */}
            <div className="mt-12 space-y-8">
              <h3 className="text-black text-xl font-semibold mb-4 text-center">Choose Another Sign</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {zodiacSignsList.map((zodiac) => (
                  <div
                    key={zodiac}
                    className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 p-2 md:p-4 hover:shadow-lg transition-all duration-200 cursor-pointer gap-3 md:gap-4 w-full md:w-auto"
                    onClick={() => router.push(`/horoscope/weekly-horoscope/${zodiac.toLowerCase()}`)}
                  >
                    <Image
                      src={`/zodicimg/${zodiac}.webp`}
                      width={50}
                      height={50}
                      alt={`${zodiac} Symbol`}
                      className="rounded-full border-2 border-gray-200 flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1">
                      <span className="text-black text-base md:text-lg font-semibold mb-1">{zodiac} Monthly Horoscope</span>
                      <span className="text-gray-700 text-xs md:text-sm block">
                        {zodiac.toLowerCase() === sign.toLowerCase()
                          ? (horoscope?.Overall || horoscope?.text || "")
                          : signOverviews[zodiac] || "Loading..."}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Monthly Horoscope Article */}
              <div className="bg-white mx-auto px-4 sm:px-6 lg:px-4 mt-8 rounded-xl shadow-md p-6">
                <MonthlyHoroscopeFull sign={capitalizedSign} />
              </div>

              {/* Internal navigation grids */}
              <InternalLinksGrid sign={sign} />
              <HoroscopeNavigation />
              <CompatibilityLinksGrid />
              <ReportLinksGrid />
              <RecentBlogLinks />
            </div>

          </div>
        </div>

        <footer className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </footer>
      </div>
    </>
  );
}


// Server Side Rendering to fetch initial horoscope data and language
export async function getServerSideProps(context) {
  const { sign } = context.params;
  const language = context.req.cookies?.selectedLanguage || 'en';

  // Capitalize sign for API request
  const capSign = sign ? sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase() : '';

  let initialHoroscopeData = null;

  try {
    const formattedDate = new Date().toISOString().split('T')[0];
    // Call your API or external service
    // For demonstration, assuming getDailyHoroscope exists here or make a fetch call
    const response = await getDailyHoroscope({
      type: 'weekly',
      lang: language === 'hi' ? 'hn' : language,
      sign: capSign,
      date: formattedDate
    });

    if (response && response.success && response.data && response.data.horoscope) {
      initialHoroscopeData = response.data.horoscope;
    }
  } catch (error) {
    // Log error or ignore
  }

  return {
    props: {
      signParam: sign,
      initialHoroscopeData,
      initialLanguage: language,
    },
  };
}
