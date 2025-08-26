
import React, { useState, useEffect } from "react"
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import SEOHead from "../../components/SEOHead";
import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomHeader from '../../components/CustomHeader';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../../components/InternalLinksGrid';
import Footer from '../../components/Footer';

const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 - Apr 19", imageUrl: "/zodiacImages/aries.png" },
  { name: "Taurus", dates: "Apr 20 - May 20", imageUrl: "/zodiacImages/taurus.png" },
  { name: "Gemini", dates: "May 21 - Jun 20", imageUrl: "/zodiacImages/gemini.png" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", imageUrl: "/zodiacImages/cancer.png" },
  { name: "Leo", dates: "Jul 23 - Aug  imageUrl: 22", imageUrl: "/zodiacImages/leo.png" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", imageUrl: "/zodiacImages/virgo.png" },
  { name: "Libra", dates: "Sep 23 - Oct 22", imageUrl: "/zodiacImages/libra.png" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", imageUrl: "/zodiacImages/scorpio.png" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", imageUrl: "/zodiacImages/sagittarius.png" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", imageUrl: "/zodiacImages/capricorn" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", imageUrl: "/zodiacImages/aquarius.png" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", imageUrl: "/zodiacImages/pisces.png" },
];

const bestMatches = [
  "Aries & Sagittarius",
  "Aries & Leo",
  "Sagittarius & Aries",
  "Sagittarius & Leo",
  "Sagittarius & Gemini",
  "Sagittarius & Libra",
  "Scorpio & Pisces",
  "Pisces & Capricorn",
  "Libra & Gemini",
  "Leo & Aquarius",
  "Gemini & Cancer",
  "Capricorn & Cancer",
];

const worstMatches = [
  "Gemini & Capricorn",
  "Capricorn & Aquarius",
  "Scorpio & Scorpio",
  "Capricorn & Aries",
  "Virgo & Sagittarius",
  "Leo & Taurus",
  "Pisces & Aries",
  "Libra & Cancer",
  "Gemini & Scorpio",
  "Capricorn & Libra",
  "Aquarius & Cancer",
  "Aries & Virgo",
];

export default function PartnerSignPage() {
  const [isBestExpanded, setIsBestExpanded] = useState(false);
  const [isWorstExpanded, setIsWorstExpanded] = useState(false);
  const [isHoroscopeExpanded, setIsHoroscopeExpanded] = useState(false);
  const [signInfo, setSignInfo] = useState({});
  const [userSign, setUserSign] = useState(null);
  const [partnerSign, setPartnerSign] = useState(null);
  const [showZodiacGrid, setShowZodiacGrid] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStage, setCalculationStage] = useState("");
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [calculationError, setCalculationError] = useState(false);
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const router = useRouter();
  const { sign } = router.query;
  const capitalizedSign = sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : "";

  useEffect(() => {
    if (sign) {
      const foundSign = zodiacSigns.find(
        (s => s.name.toLowerCase() === sign.toLowerCase()),
      );
      if (foundSign) {
        setUserSign(foundSign);
      }
      fetchSignInfo();
    }
  }, [sign]);

  const fetchSignInfo = async () => {
    try {
      const response = await fetch(
        "/api/compatibility/compatibility_sign_information.json",
      );
      const data = await response.json();
      setSignInfo(data[capitalizedSign] || {});
    } catch (error) {
      console.error("Error fetching sign information:", error);
      setSignInfo({});
    }
  };

  const selectPartnerSign = (selectedSign) => {
    setPartnerSign(selectedSign);
    setShowZodiacGrid(false);
    // Removed navigation to stay on page
  };

  const fetchCompatibilityData = async (userSign, partnerSign) => {
    try {
      const response = await fetch(
        `/api/compatibility/${userSign.toLowerCase()}/${userSign.toLowerCase()}-${partnerSign.toLowerCase()}.json`,
      );
      if (!response.ok) {
        throw new Error("Compatibility data not found");
      }
      const data = await response.json();
      return {
        overallScore: Math.round(
          (data.love.score + data.sexual.score + data.friendship.score+data.communication.score) / 4,
        ),
        emotional: data.love.score || 0,
        emotionalDescription: data.love.text || "No description available.",
        physical: data.sexual.score || 0,
        physicalDescription: data.sexual.text || "No description available",
        intellectual: data.friendship.score || 0,
        intellectualDescription:data.friendship.text || "No description available.",
           communication: data.communication.score || 0,
       communicationDescription:data.communication.text || "No description available.",
        description: data.description || "No overall description available.",
      };
    } catch (error) {
      console.error("Error fetching compatibility data:", error);
      throw error;
    }
  };

  const calculateCompatibility = async () => {
    
    setIsCalculating(true);
    setCalculationError(false);
    setCalculationStage("Analyzing signs...");
    setCalculationProgress(0);

    const stages = [
      { stage: "Analyzing signs...", progress: 20 },
      { stage: "Comparing elements...", progress: 50 },
      { stage: "Evaluating compatibility...", progress: 80 },
      { stage: "Finalizing results...", progress: 100 },
    ];

    let index = 0;
    const interval = setInterval(async () => {
      if (index < stages.length) {
        setCalculationStage(stages[index].stage);
        setCalculationProgress(stages[index].progress);
        index++;
      } else {
        clearInterval(interval);
        setIsCalculating(false);
        if (userSign && partnerSign) {
          try {
                router.push(`/compatibility/${userSign.name.toLowerCase()}/${partnerSign.name.toLowerCase()}`);

            const result = await fetchCompatibilityData(
              userSign.name,
              partnerSign.name,
            );
            console.log("Compatibility Result:", result);
            setCompatibilityResult(result);
          } catch (error) {
            setCalculationError(true);
          }
        }
      }
    }, 1000);
  };

  return (
    <>
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
      "name": `${capitalizedSign} Zodiac Compatibility Calculator`,
      "description": `Explore ${capitalizedSign}s love compatibility with other zodiac signs.`,
      "url": `https://astrosight.ai/compatibility/${sign}`,
      "provider": {
        "@type": "Organization",
        "name": "AstroSight",
        "url": "https://astrosight.ai"
      },
      "datePublished": new Date().toISOString().split('T')[0],
      "dateModified": new Date().toISOString().split('T')[0],
      "about": [
        {
          "@type": "Thing",
          "name": capitalizedSign
        }
      ]
    }),
  }}
/>

      </Head>
<SEOHead
  title={`${capitalizedSign} Compatibility | Choose Partner's Zodiac`}
  description={`Discover ${capitalizedSign}'s love compatibility with other zodiac signs. Select your partner sign to reveal your astrological match, emotional connection, and relationship insights.`}
  keywords={`${capitalizedSign} compatibility, best match for ${capitalizedSign}, ${capitalizedSign} love horoscope, zodiac compatibility ${capitalizedSign}, astrology partner match`}
  canonical={`https://astrosight.ai/compatibility/${sign}`}
  ogImage={`https://astrosight.ai/zodiacImages/${sign?.toLowerCase()}.png`}
  ogType="article"
  articleAuthor="AstroSight Team"
  articlePublishedTime={null} // Add if you track publish date
  articleModifiedTime={new Date().toISOString()} // Optional
/>

      <div className="flex flex-col  bg-[#FFF2E2] relative font-kohinoor-latin max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Header */}
        <CustomHeader 
          title={`${capitalizedSign} Compatibility`}
          showBackButton={true}
        />

        {/* Main Content */}
        <main className="flex-1 pt-20 px-4 ">
          <ScrollArea className="">
            <h1 className="text-3xl text-center font-kohinoor font-bold ">{capitalizedSign} Compatibility | Choose Partner&apos;s Zodiac </h1>
            {/* Banner Image */}
            <div className="w-full h-[120px] bg-gray-200 rounded-xl overflow-hidden mb-6">
              <Image
                src="/compatibility-banner.jpg"
                alt="Compatibility Banner"
                width={500}
                height={180}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Zodiac Signs Selection Section */}
            {userSign && (
              <Card className="bg-white p-6 rounded-xl shadow-md mb-6">
                <div className="flex items-center justify-between gap-4">
                  {/* Your Sign */}
                  <div className="flex-1 text-center">
                    <h2 className="text-black text-lg font-semibold mb-4">
                      Your Zodiac Sign
                    </h2>
                    <div
                      className="relative w-24 h-24 mx-auto mb-2 rounded-full  p-3 cursor-pointer"
                      onClick={() => setShowZodiacGrid(true)}
                    >
                      <Image
                        src={`/zodicimg/${capitalizedSign}.webp`}
                        alt={userSign.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                      <button className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF9933] rounded-full flex items-center justify-center text-white shadow-md">
                        <i className="fas fa-edit text-xs"></i>
                      </button>
                    </div>
                    <h3 className="text-[#FF9933] font-medium">
                      {userSign.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{userSign.dates}</p>
                  </div>
                  {/* Heart Icon */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <i className="fas fa-heart text-3xl text-[#FF9933]"></i>
                    </div>
                  </div>
                  {/* Partner's Sign */}
                  <div className="flex-1 text-center">
                    <h2 className="text-black text-lg font-semibold mb-4">
                      Partner&apos;s Zodiac Sign
                    </h2>
                    {partnerSign ? (
                      <div>
                        <div
                          className="relative w-24 h-24 mx-auto mb-2 rounded-full  p-3 cursor-pointer"
                          onClick={() => setShowZodiacGrid(true)}
                        >
                          <Image
                            src={`/zodicimg/${partnerSign.name}.webp`}
                            alt={partnerSign.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain"
                          />
                          <button className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF9933] rounded-full flex items-center justify-center text-white shadow-md">
                            <i className="fas fa-edit text-xs"></i>
                          </button>
                        </div>
                        <h3 className="text-[#FF9933] font-medium">
                          {partnerSign.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {partnerSign.dates}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="w-24 h-24 mx-auto mb-2 rounded-full bg-[#FFE5CC] flex items-center justify-center cursor-pointer"
                        onClick={() => setShowZodiacGrid(true)}
                      >
                        <i className="fas fa-plus text-[#FF9933] text-2xl"></i>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Zodiac Grid Selection */}
            {showZodiacGrid && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <Card className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-medium">Select Partner&apos;s Sign</h3>
                    <button
                      className="text-gray-500 cursor-pointer"
                      onClick={() => setShowZodiacGrid(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <ScrollArea className="max-h-[60vh] p-4 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4">
                      {zodiacSigns.map((sign) => (
                        <div
                          key={sign.name}
                          className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-[#FF9933] cursor-pointer"
                          onClick={() => selectPartnerSign(sign)}
                        >
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-[#FFE5CC] p-2 mb-2">
                            <Image
                              src={`/zodicimg/${sign.name}.webp`}
                              alt={sign.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h2 className="text-sm font-medium text-center">
                            {sign.name}
                          </h2>
                          <p className="text-xs text-gray-500 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                            {sign.dates}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            )}

            {/* Calculate Button */}
            <div className="mb-8">
              <div className="relative">
                <Button
                  className={`w-full py-6 text-lg rounded-xl ${
                    !partnerSign || isCalculating ? "opacity-70" : ""
                  }`}
                  disabled={!partnerSign || isCalculating}
                  onClick={calculateCompatibility}
                  style={{ backgroundColor: "#FF9933" }}
                >
                  {isCalculating ? (
                    <div className="flex flex-col items-center w-full">
                      <span className="flex items-center mb-1">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        {calculationStage}
                      </span>
                      <div className="w-full bg-white/20 h-1 rounded-full">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300"
                          style={{ width: `${calculationProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : calculationError ? (
                    <span className="flex items-center">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      Try Again
                    </span>
                  ) : (
                    "Calculate Compatibility"
                  )}
                </Button>
                {!isCalculating && !calculationError && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Calculation typically takes a few seconds
                  </div>
                )}
              </div>
            </div>

            {/* Compatibility Results */}
            {compatibilityResult && (
              <div className="mb-8 space-y-6">
                <Card className="bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-5 rounded-xl shadow-lg text-white">
                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    Compatibility Results
                  </h2>
                  <div className="text-center mb-6">
                    <h3 className="text-1xl font-bold mb-2">
                      Overall Compatibility Score
                    </h3>
                    <div className="text-5xl font-bold mb-4">
                      {compatibilityResult.overallScore}%
                    </div>
                    <p className="text-white/90 text-[10px]">
                      {compatibilityResult.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Love Compatibility</span>
                        <span>{compatibilityResult.emotional}%</span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${compatibilityResult.emotional}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Sexual Compatibility</span>
                        <span>{compatibilityResult.physical}%</span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${compatibilityResult.physical}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Friendship Compatibility</span>
                        <span>{compatibilityResult.intellectual}%</span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${compatibilityResult.intellectual}%` }}
                        ></div>
                      </div>
                    </div>
                          <div>
                      <div className="flex justify-between mb-1">
                        <span>Communication Compatibility</span>
                        <span>{compatibilityResult.communication}%</span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${compatibilityResult.communication}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
                {/* Detailed Analysis */}
                <Card className="bg-white p-5 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-[#FF9933]">
                    Detailed Analysis
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-medium mb-2">Love Connection</h2>
                      <p className="text-gray-600">
                        {compatibilityResult.emotionalDescription}
                      </p>
                    </div>
                    <div>
                      <h2 className="font-medium mb-2">Sexual Chemistry</h2>
                      <p className="text-gray-600">
                        {compatibilityResult.physicalDescription}
                      </p>
                    </div>
                    <div>
                      <h2 className="font-medium mb-2">Friendship Bond</h2>
                      <p className="text-gray-600">
                        {compatibilityResult.intellectualDescription}
                      </p>
                    </div>
                      <div>
                      <h2 className="font-medium mb-2">Communication Bond</h2>
                      <p className="text-gray-600">
                        {compatibilityResult.communicationDescription}
                      </p>
                    </div>
                  </div>
                </Card>
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="bg-[#FFE5CC] text-[#FF9933] hover:bg-[#FFE5CC]/90 rounded-lg"
                    onClick={() => alert("Share functionality not implemented yet.")}
                  >
                    <i className="fas fa-share-alt mr-2"></i>
                    Share Results
                  </Button>
                  <Button
                    className="bg-[#FFE5CC] text-[#FF9933] hover:bg-[#FFE5CC]/90 rounded-lg"
                    onClick={() =>
                      alert("Save functionality not implemented yet.")
                    }
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save to Profile
                  </Button>
                </div>
              </div>
            )}

            {/* Zodiac Sign Information */}
            <Card className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h2 className="text-2xl font-bold text-black mb-4">
                {capitalizedSign} in Love and Relationships
              </h2>
              <p className="text-gray-600 mb-4">{signInfo?.loveStyle}</p>
              <p className="text-gray-600 mb-4">{signInfo?.compatibilityTraits}</p>
              <p className="text-gray-600 mb-4">{signInfo?.challengesInLove}</p>
              <p className="text-gray-600 mb-4">{signInfo?.idealPartner}</p>
              <p className="text-gray-600 mb-4">
                To discover how {capitalizedSign} matches with other zodiac signs,
                select your partner&apos;s sign below:
              </p>
            </Card>

            {/* Best Compatibility Section */}
            <Card className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsBestExpanded(!isBestExpanded)}
              >
                <h2 className="text-xl font-bold text-black">
                  Best Compatibility Matches
                </h2>
                {isBestExpanded ? (
                  <FaChevronUp className="text-[#FF9933]" />
                ) : (
                  <FaChevronDown className="text-[#FF9933]" />
                )}
              </div>
              {isBestExpanded && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {bestMatches.map((pair) => (
                    <Link
                      key={pair}
                      href={`/compatibility/${pair
                        .replace(" & ", "/")
                        .toLowerCase()}`}
                      className="flex flex-col items-center justify-center hover:scale-105 transition-transform"
                    >
                      <span className="text-sm font-semibold">{pair}</span>
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            {/* Worst Compatibility Section */}
            <Card className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsWorstExpanded(!isWorstExpanded)}
              >
                <h2 className="text-xl font-bold text-black">
                  Worst Compatibility Matches
                </h2>
                {isWorstExpanded ? (
                  <FaChevronUp className="text-[#FF5733]" />
                ) : (
                  <FaChevronDown className="text-[#FF5733]" />
                )}
              </div>
              {isWorstExpanded && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {worstMatches.map((pair) => (
                    <Link
                      key={pair}
                      href={`/compatibility/${pair
                        .replace(" & ", "/")
                        .toLowerCase()}`}
                      className="flex flex-col items-center justify-center hover:scale-105 transition-transform"
                    >
                      <span className="text-sm font-semibold">{pair}</span>
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            {/* Horoscope Section */}
            <Card className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsHoroscopeExpanded(!isHoroscopeExpanded)}
              >
                <h2 className="text-xl font-bold text-black">
                  Horoscopes of {capitalizedSign}
                </h2>
                {isHoroscopeExpanded ? (
                  <FaChevronUp className="text-[#FF9933]" />
                ) : (
                  <FaChevronDown className="text-[#FF9933]" />
                )}
              </div>
              {isHoroscopeExpanded && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {["monthly", "tomorrow", "weekly", "today"].map((day) => (
                    <Link
                      key={day}
                      href={`/horoscope/${day}/${capitalizedSign.toLowerCase()}`}
                      className="text-[#FF9933] hover:underline"
                    >
                      {`${capitalizedSign} ${
                        day.charAt(0).toUpperCase() + day.slice(1)
                      } Horoscope`}
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            {/* Guidance Report Section */}
            <Card className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold text-black mb-4 text-center">
                Get Your Personalized Guidance Report
              </h2>
              <p className="text-center text-gray-600">
                Discover detailed insights and remedies tailored just for you.{" "}
                <Link
                  href="/guidance-report"
                  className="text-blue-600 underline"
                >
                  Click here to get your personalized report now!
                </Link>
              </p>
            </Card>

            {/* About Zodiac Compatibility */}
            <Card className="bg-white p-5 rounded-xl shadow-md mb-8">
              <h3 className="text-lg font-semibold mb-3 text-[#FF9933]">
                About Zodiac Compatibility
              </h3>
              <p className="text-gray-600 mb-4">
                Zodiac compatibility is based on the positions of stars and
                planets at the time of birth. It analyzes how different elements,
                qualities, and planetary rulers interact to create harmony or
                tension between two individuals.
              </p>
              <p className="text-gray-600">
                While compatibility scores can provide insights into relationship
                dynamics, remember that every relationship is unique.
                Communication, mutual respect, and understanding are key factors
                that can overcome any astrological challenges.
              </p>
            </Card>
          </ScrollArea>
          
          {/* Internal Links Section */}
          <div className="mt-12 space-y-8">
            <InternalLinksGrid sign={sign} />
            <HoroscopeNavigation />
            <CompatibilityLinksGrid />
            <ReportLinksGrid />
            <RecentBlogLinks />
          </div>
        </main>

        
      </div>
      
<div className="bg-[#f46434]  mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>    </>
  );
}
