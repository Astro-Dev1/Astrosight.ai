import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { format } from "date-fns";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star,  TrendingUp, Heart, Briefcase, Activity, Gift, Send } from 'lucide-react';
import CustomHeader from "../../components/CustomHeader";
import LanguageSelector from "../../components/LanguageSelector";
import { getDailyHoroscope } from "../../services/centralApi";
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../../components/InternalLinksGrid';
import Footer from '../../components/Footer';

// Import translations for SSR compatibility
import enTranslations from '../../locales/en.json';
import hiTranslations from '../../locales/hi.json';
import knTranslations from '../../locales/kn.json';

const translations = {
  en: enTranslations,
  hi: hiTranslations,
  kn: knTranslations,
};

// AI Companions data
const aiCompanions = [
  {
    id: 1,
    name: 'Jaimini',
    type: 'Expert',
    imageUrl: '/ai-avatars/jaimini.png', // Update with actual path
    persona: 'expert',
  },
  {
    id: 2,
    name: 'Avi',
    type: 'Youth',
    imageUrl: '/ai-avatars/avi.png', // Update with actual path
    persona: 'youth',
  },
  {
    id: 3,
    name: 'Auro',
    type: 'Balanced',
    imageUrl: '/ai-avatars/auro.png', // Update with actual path
    persona: 'balanced',
  },
];

// Period selection component - now navigates to different URLs
const PeriodSelector = ({ currentPeriod = 'daily', sign }) => {
  const router = useRouter();
  
  const periods = [
    { id: 'daily', name: 'Daily', icon: '📅', path: `/horoscope/${sign}` },
    { id: 'weekly', name: 'Weekly', icon: '📊', path: `/horoscope/${sign}/weekly` },
    { id: 'monthly', name: 'Monthly', icon: '🗓️', path: `/horoscope/${sign}/monthly` },
    { id: 'yearly', name: 'Yearly', icon: '🔮', path: `/horoscope/${sign}/yearly` },
  ];

  const handlePeriodClick = (path) => {
    router.push(path);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="grid grid-cols-4 gap-2 p-2 bg-white/70 rounded-lg backdrop-blur-sm">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => handlePeriodClick(period.path)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              currentPeriod === period.id
                ? 'bg-[#FF9933] text-black'
                : 'text-black/80 hover:bg-white/10 hover:text-black'
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

// Progress Bar Component
const ProgressBar = ({ label, value, color = "bg-gray-500" }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-white text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-white/90 rounded-full h-2">
        <div 
          className={`h-2 rounded-3xl ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating, label, color = "text-yellow-400" }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
      <span className="text-black font-medium">{label}</span>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= (rating || 0) ? color + ' fill-current' : 'text-gray-400'}`}
          />
        ))}
        <span className="text-black ml-2 text-sm">{rating}/5</span>
      </div>
    </div>
  );
};
console.log(StarRating)
const HoroscopePage = () => {
  const router = useRouter();
  const { sign } = router.query;
  
  const [horoscope, setHoroscope] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLanguage') || 'en';
    }
    return 'en';
  });
  const [selectedTab, setSelectedTab] = useState('dos');
  const [inputValue, setInputValue] = useState('');

  const capitalizedSign = sign ? sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase() : "";
  const signKey = sign?.toLowerCase();

  // Determine current period from URL
  const getCurrentPeriod = () => {
    const path = router.asPath;
    if (path.includes('/weekly')) return 'weekly';
    if (path.includes('/monthly')) return 'monthly';
    if (path.includes('/yearly')) return 'yearly';
    return 'daily';
  };

  const currentPeriod = getCurrentPeriod();

  // Translation function
  const t = (key, defaultValue = key) => {
    try {
      const keys = key.split('.');
      let value = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || defaultValue;
    } catch (error) {
      console.error('Translation error:', error);
      return defaultValue;
    }
  };

  useEffect(() => {
    if (sign) {
      fetchDailyHoroscope();
      setCurrentDate(format(new Date(), "MMMM d, yyyy"));
    }
  }, [sign, language]);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const fetchDailyHoroscope = async () => {
    if (!sign) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const today = new Date();
      const formattedDate = format(today, 'yyyy-MM-dd');
      
      const response = await getDailyHoroscope({
        type: 'daily',
        lang: language === 'hi' ? 'hn' : language,
        sign: capitalizedSign,
        date: formattedDate
      });
      
      if (response && response.success && response.data) {
        setHoroscope(response.data.horoscope);
      } else {
        setHoroscope({
          "Overall": `Today brings new opportunities for ${capitalizedSign}. Stay focused on your goals and trust your intuition.`,
          "Daily Wisdom & Suggestions": "Embrace the day with positivity and openness to new experiences.",
        });
      }
    } catch (error) {
      console.error('Error fetching daily horoscope:', error);
      setError(error.message);
      setHoroscope({
        "Overall": `Today brings new opportunities for ${capitalizedSign}. Stay focused on your goals and trust your intuition.`,
        "Daily Wisdom & Suggestions": "Embrace the day with positivity and openness to new experiences.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAiCompanionPress = (persona, input) => {
    // Navigate to chatbot page with persona and input
    router.push(`/chatbot?persona=${persona}&input=${encodeURIComponent(input || `Tell me more about ${capitalizedSign} for today`)}`);
  };

  if (!sign) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFF4EA] relative pb-16 font-inter">
        <CustomHeader 
          title={`${capitalizedSign} Horoscope`}
          showBackButton={true}
        />
        <div className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-black">Loading your horoscope...</p>
          </div>
        </div>
      </div>
    );
  }

  const detailedPredictions = horoscope?.['Detailed Predictions'];
  const luckyElements = horoscope?.lucky_elements;
  const dailyTimeline = horoscope?.daily_timeline || [];
  const personalizedRecommendations = horoscope?.personalized_recommendations;

  return (
    <>
      <Head>
        <title>{capitalizedSign} {currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1)} Horoscope | AstroSight</title>
        <meta name="description" content={`Discover your ${capitalizedSign} ${currentPeriod} horoscope. Get predictions for love, career, health, and more at AstroSight.`} />
        <link rel="canonical" href={`https://astrosight.ai/horoscope/${sign}${currentPeriod !== 'daily' ? '/' + currentPeriod : ''}`} />
      </Head>

      {error && (
        <div className="fixed top-20 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p className="text-sm">
            <strong>Notice:</strong> Unable to fetch live horoscope data. Showing sample content.
          </p>
        </div>
      )}

      <div className="flex flex-col min-h-screen bg-[#FFF4EA] relative pb-16 font-inter">
        <CustomHeader 
          title={`${capitalizedSign} Horoscope`}
          showBackButton={true}
        />

        <div className="flex-1 pt-16">
          <div className="px-4 pb-20 max-w-5xl mx-auto">
            {/* Language Selector */}
            <div className="mt-4 mb-6 flex justify-end">
              <LanguageSelector 
                variant="default"
                onLanguageChange={setLanguage}
              />
            </div>

            {/* Zodiac Sign Section */}
            <div className="mt-6 mb-8 flex flex-col items-center">
              <Image
                src={`/zodicimg/${capitalizedSign.toLowerCase()}.webp`}
                width={150}
                height={150}
                alt={`${capitalizedSign} Symbol`}
                className="mb-3 rounded-full"
              />
              <p className="text-black/80 text-sm">{currentDate}</p>
            </div>

            {/* Period Selector */}
            <PeriodSelector 
              currentPeriod={currentPeriod}
              sign={signKey}
            />

            {/* Daily Content - Same for all periods */}
            {/* Daily Overview Card */}
            <Card className="bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-5 rounded-xl shadow-lg mb-6 border-0">
              <h3 className="text-black text-xl font-semibold mb-3">
                {currentPeriod === 'daily' ? t('daily_overview', 'Daily Overview') : 
                 currentPeriod === 'weekly' ? 'Weekly Overview' :
                 currentPeriod === 'monthly' ? 'Monthly Overview' : 'Yearly Overview'}
              </h3>
              <p className="text-black leading-relaxed text-sm">
                {horoscope?.Overall || horoscope?.["Daily Wisdom & Suggestions"] || t('no_overview', "No overview available.")}
              </p>
            </Card>

            {/* Auspicious/Inauspicious Times */}
            {(horoscope?.['Auspicious Time'] || horoscope?.['Inauspicious Time']) && (
              <div className="mb-6">
                <div className="flex gap-3">
                  {horoscope?.['Auspicious Time'] && (
                    <Card className="flex-1 bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-4 rounded-xl border-0">
                      <h4 className="text-black font-semibold mb-1">{t('auspicious_time', 'Auspicious Time')}</h4>
                      <p className="text-black text-sm">{horoscope['Auspicious Time']}</p>
                    </Card>
                  )}
                  {horoscope?.['Inauspicious Time'] && (
                    <Card className="flex-1 bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-4 rounded-xl border-0">
                      <h4 className="text-black font-semibold mb-1">{t('inauspicious_time', 'Inauspicious Time')}</h4>
                      <p className="text-black text-sm">{horoscope['Inauspicious Time']}</p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Daily Wisdom */}
            {horoscope?.['Daily Wisdom & Suggestions'] && (
              <Card className="bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-5 rounded-xl shadow-lg mb-6 border-0">
                <h3 className="text-black text-lg font-semibold mb-3">{t('daily_wisdom', 'Daily Wisdom')}</h3>
                <p className="text-black leading-relaxed text-sm">
                  {horoscope['Daily Wisdom & Suggestions']}
                </p>
              </Card>
            )}

            {/* Detailed Predictions */}
            {detailedPredictions && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">{t('detailed_predictions', 'Detailed Predictions')}</h3>
                {Object.entries(detailedPredictions).map(([key, detail]) => {
                  const iconMap = {
                    'Love & Relationships': { icon: Heart, color: 'from-pink-600 to-red-600' },
                    'Career & Money': { icon: Briefcase, color: 'from-blue-600 to-indigo-600' },
                    'Health & Wellness': { icon: Activity, color: 'from-green-600 to-teal-600' },
                    'Personal Growth': { icon: TrendingUp, color: 'from-purple-600 to-indigo-600' },
                  };
                  const config = iconMap[key] || { icon: Star, color: 'from-gray-600 to-gray-700' };
                  const IconComponent = config.icon;
                  
                  return (
                    <Card key={key} className={`bg-gradient-to-r from-[#FF9933] to-[#FF5733] rounded-xl shadow-sm mb-3 p-4 border-0`}>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-medium text-white">{key}</h4>
                      </div>
                      <p className="text-white/90 text-sm mb-3">{detail.Text}</p>
                      <ProgressBar className="text-white" label="Compatibility" value={parseInt(detail.percentage)} />
                    </Card>
                  );
                })}
              </div>
            )}

            {/* AI Companions Section */}
            <div className="mb-8">
              <h3 className="text-black text-xl font-semibold mb-4">{t('need_more_clarity', 'Need More Clarity?')}</h3>
              <Card className="bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-lg border-0">
                <div className="flex justify-around mb-6">
                  {aiCompanions.map((companion) => (
                    <button
                      key={companion.id}
                      className="flex flex-col items-center"
                      onClick={() => handleAiCompanionPress(companion.persona, inputValue)}
                    >
                      <div className="h-20 w-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center mb-2">
                        <span className="text-black font-bold text-lg">{companion.name[0]}</span>
                      </div>
                      <span className="text-orange-300 font-medium text-center text-xs">{companion.name}</span>
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    placeholder={t('ask_anything', 'Ask anything...')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full pr-12 bg-white/20 border-white/30 text-black placeholder:text-black/60"
                  />
                  <Button
                    size="sm"
                    className="absolute right-1 top-1 bottom-1 bg-[#FF9933] hover:bg-[#FF7700] text-black"
                    onClick={() => handleAiCompanionPress('expert', inputValue)}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Lucky Elements */}
            {luckyElements && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">{t('lucky_elements', 'Lucky Elements')}</h3>
                <div className="flex gap-3">
                  {luckyElements.lucky_numbers && (
                    <Card className="flex-1 bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-4 rounded-xl shadow-sm border-0">
                      <div className="flex items-center justify-center mb-3">
                        <Gift className="w-6 h-6 text-black" />
                      </div>
                      <h4 className="font-medium text-black mb-2 text-center">{t('lucky_numbers', 'Lucky Numbers')}</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {luckyElements.lucky_numbers.map(num => (
                          <Badge key={num} className="bg-white/20 text-black border-0">
                            {num}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  )}
                  {luckyElements.lucky_colors && (
                    <Card className="flex-1 bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-4 rounded-xl shadow-sm border-0">
                      <div className="flex items-center justify-center mb-3">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-white mb-2 text-center">{t('lucky_colors', 'Lucky Colors')}</h4>
                      <div className="flex flex-wrap justify-center gap-3 mt-2">
                        {luckyElements.lucky_colors.map((color, index) => (
                          <div 
                            key={index} 
                            className="h-8 w-8 rounded-full shadow-sm border-2 border-white"
                            style={{ backgroundColor: color.toLowerCase() }}
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
                <h3 className="text-black text-xl font-semibold mb-4">{t('daily_timeline', 'Daily Timeline')}</h3>
                <Card className="bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-lg border-0">
                  {dailyTimeline.map((item, index) => (
                    <div key={index} className={`mb-4 flex ${index === dailyTimeline.length - 1 ? 'mb-0' : ''}`}>
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-4 h-4 rounded-full border-2 border-white ${
                          item?.favorability === 'favorable' ? 'bg-green-500' :
                          item?.favorability === 'unfavorable' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        {index < dailyTimeline.length - 1 && (
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
                <Card className="bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-lg border-0">
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/20">
                      <TabsTrigger value="dos" className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-black">Do&apos;s</TabsTrigger>
                      <TabsTrigger value="donts" className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-black">Don&apos;ts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="dos" className="mt-4">
                      {personalizedRecommendations.dos && (
                        <div className="space-y-3">
                          {personalizedRecommendations.dos.map((tip, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <span className="text-green-400 text-sm">✓</span>
                              </div>
                              <p className="text-black/90 text-sm flex-1">{tip}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="donts" className="mt-4">
                      {personalizedRecommendations.donts && (
                        <div className="space-y-3">
                          {personalizedRecommendations.donts.map((tip, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <span className="text-red-400 text-sm">✕</span>
                              </div>
                              <p className="text-black/90 text-sm flex-1">{tip}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            )}
            
            {/* Internal Links Section */}
            <div className="mt-12 space-y-8">
              <InternalLinksGrid sign={sign} />
              <HoroscopeNavigation />
              <CompatibilityLinksGrid />
              <ReportLinksGrid />
              <RecentBlogLinks />
            </div>
          </div>
        </div>
      </div>
      
<div className="bg-[#f46434]  mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>    </>
  );
};

export default HoroscopePage;
