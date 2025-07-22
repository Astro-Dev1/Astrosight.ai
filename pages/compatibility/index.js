// ../pages/compatibility/index.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {  ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid,  RecentBlogLinks } from '../../components/InternalLinksGrid';

// import CustomLinkButton from '../../components/CustomContainer';

const zodiacSigns = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19' },
  { name: 'Taurus', dates: 'Apr 20 - May 20' },
  { name: 'Gemini', dates: 'May 21 - Jun 21' },
  { name: 'Cancer', dates: 'Jun 22 - Jul 22' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22' },
  { name: 'Libra', dates: 'Sep 23 - Oct 23' },
  { name: 'Scorpio', dates: 'Oct 24 - Nov 21' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20' },
];

export default function CompatibilityPage() {
  const router = useRouter();
   const [isBestExpanded, setIsBestExpanded] = useState(false);
    const [isWorstExpanded, setIsWorstExpanded] = useState(false);
  
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
  // const blurDataURL = '../../public/'
  // const [selectedSign, setSelectedSign] = useState(&lsquo;&lsquo;);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedcopatibility, setIsExpandedcopatibility] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const horoscopeTypes = ["Todays", "Monthly", "Tomorrow", "Weekly"];
  const handleSignSelect = (sign) => {
    // setSelectedSign(sign.toLowerCase());
    // console.log(selectedSign)
    router.push(`/compatibility/${sign.toLowerCase()}`);
  };

  return (
    <>
      <SEOHead
        title="Zodiac Love Compatibility Calculator | AstroSight"
        description="Discover your zodiac love compatibility with our free astrology compatibility calculator. Find out how well you match with other signs for romance, friendship, and more."
        keywords="zodiac compatibility, love compatibility, astrology compatibility, horoscope matching, relationship astrology, astrology calculator"
        canonical="https://astrosight.ai/compatibility"
        ogImage="https://astrosight.ai/compatibility-image.jpg"
      />
      
      <CustomHeader 
        title="Compatibility"
        showBackButton={true}
        showSideMenu={true}
        onSideMenuPress={() => setSideMenuOpen(true)}
      />
      
      <SideMenu 
        isOpen={sideMenuOpen} 
        onClose={() => setSideMenuOpen(false)}
      />
      <div className="min-h-screen pt-14 font-serif max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">


        <header className="w-full  rounded-3xl     p-1 mt-3 text-center ">
          <h1 className="text-3xl font-bold text-black font-kohinoor-devanagari">Zodiac Love Compatibility Calculator</h1>
          <h2 className="text-2xl text-black    font-kohinoor text-center">Discover Your Astrological Match</h2>
        </header>

        <div className="container mx-auto px-0 py-8 ">
          <section className="mb-10 text-justify bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-900 mb-4">
              Welcome to astrosight&lsquo;s Zodiac Love Compatibility Calculator! Unlock the secrets of your relationships through the wisdom of the stars. Our free compatibility tool helps you explore how well you match with other zodiac signs in love, friendship, and more.
            </p>
            <p className="text-lg text-gray-900 mb-4">
              Understanding your astrological compatibility can provide valuable insights into your relationships, helping you navigate the complexities of love and friendship. Whether you&lsquo;re curious about a potential romance or want to strengthen existing bonds, our compatibility calculator is here to guide you.
            </p>
            <h3 className="text-2xl text-center font-bold text-black   ">How to Use the Compatibility Calculator:</h3>
            <ol className="list-decimal list-inside text-gray-900 mb-4">
              <li>Select your zodiac sign from the options below.</li>
              <li>On the next page, choose your partner&lsquo;s or friend&lsquo;s zodiac sign.</li>
              <li>Discover your compatibility score and detailed insights about your relationship dynamics.</li>
            </ol>
            <p className="text-lg text-gray-900 mb-4">
              Remember, while astrology can offer guidance, it doesn&lsquo;t determine the success of a relationship. Open communication, mutual respect, and understanding are key to any strong connection.
            </p>
          </section>
        </div>
        {/* <div className="container text-center px-4 py-8"> 
          <CustomLinkButton
                  headline="Welcome to astrosight"
                  buttonText="Explore Now"
                  buttonPath="/panchanga"
                />
                </div> */}
        <div className="mb-8 bg-white rounded-2xl justify-center items-center ">
          <h2 className="text-2xl mt-5 flex justify-center font-bold  items-center text-black   mb-8">Choose Your Zodiac Sign</h2>


          <div className="mb-8  rounded-3xl  mt-5 justify-center items-center">
            <div className="container  mt-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-1">
              {zodiacSigns.map((sign) => (
                <Card
                  key={sign.name}
                  className="cursor-pointer hover:shadow-lg  mt-8 mb-5 transition-shadow bg-white bg-opacity-20 backdrop-blur-lg p rounded-lg shadow-md"
                  onClick={() => handleSignSelect(sign.name)}
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <Image
                      src={`/${sign.name}.webp`}
                      alt={`${sign.name} zodiac sign`}
                      width={96}
                      height={96}
                      className="rounded-full mb-2"
                    />
                    <h3 className="text-2xl font-semibold text-black  ">{sign.name}</h3>
                    <p className="text-xm text-black  ">{sign.dates}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Best Compatibility Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
        {/* Header with Expand/Collapse Toggle */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsBestExpanded(!isBestExpanded)}
        >
          <h2 className="text-xl font-bold text-black  ">Best Compatibility Matches</h2>
          {isBestExpanded ? (
            <FaChevronUp className="text-gray-900 text-xl" />
          ) : (
            <FaChevronDown className="text-gray-900 text-xl" />
          )}
        </div>

        {/* Expandable Content */}
        {isBestExpanded && (
          <div className=" rounded-2xl ">
            <div className="flex flex-wrap gap-4 ">
              {bestMatches.map((pair) => (
                <Link key={pair} href={`/compatibility/${pair.replace(" & ", "/").toLowerCase()}`}>
                  <div className="flex flex-col hover:underline  hover:scale-105 transition-transform">
                    <span className="text-sm text-gray-900 font-semibold mt-2">{pair} </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

        {/* Worst Compatibility Section */}
        <div className=" mt-8 bg-white rounded-2xl p-6 shadow-md">
        {/* Header with Expand/Collapse Toggle */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsWorstExpanded(!isWorstExpanded)}
        >
          <h2 className="text-xl font-bold text-black  ">Worst Compatibility Matches</h2>
          {isWorstExpanded ? (
            <FaChevronUp className="text-gray-900 text-xl" />
          ) : (
            <FaChevronDown className="text-gray-900 text-xl" />
          )}
        </div>

        {/* Expandable Content */}
        {isWorstExpanded && (
          <div className=" rounded-2xl ">
            <div className="flex flex-wrap gap-4 ">
              {worstMatches.map((pair) => (
                <Link key={pair} href={`/compatibility/${pair.replace(" & ", "/").toLowerCase()}`}>
                  <div className="flex flex-col hover:underline  hover:scale-105 transition-transform">
                    <span className="text-sm text-gray-900 font-semibold ">{pair} </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
        <section className="mt-10 bg-white rounded-2xl p-6 shadow-md">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsExpandedcopatibility(!isExpandedcopatibility)}
          >
            <h2 className="text-xl font-bold text-black  ">More Compatibility</h2>
            {isExpandedcopatibility ? (
              <FaChevronUp className="text-gray-900 text-xl" />
            ) : (
              <FaChevronDown className="text-gray-900 text-xl" />
            )}
          </div>
          {isExpandedcopatibility && (<div className="flex flex-wrap gap-4">
            {[
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
            ].map((sign) => (
              <Link key={sign} href={`/compatibility/${sign.toLowerCase()}}`} className="text-gray-900 hover:underline">{`${sign} Compatibility`}</Link>
            ))}
          </div>)}
        </section>
        <section className="mt-10 bg-white rounded-2xl p-6 shadow-md">
          {/* Header with Expand/Collapse Toggle */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h2 className="text-xl font-bold text-black  ">Explore More Horoscopes</h2>
            {isExpanded ? (
              <FaChevronUp className="text-gray-900 text-xl" />
            ) : (
              <FaChevronDown className="text-gray-900 text-xl" />
            )}
          </div>

          {/* Expandable Content */}
          {isExpanded && (
            <div className="mt-4 flex flex-wrap gap-4">
              {horoscopeTypes.map((type) =>
                zodiacSigns.map((sign) => (
                  <Link
                    key={`${sign.name}-${type}`}
                    href={`/horoscope/${type.toLowerCase()}/${sign.name.toLowerCase()}`}
                    className="text-gray-900 hover:underline text-lg"
                  >
                    {`${sign.name} ${type} Horoscope`}
                  </Link>
                ))
              )}
            </div>
          )}
        </section>
        

        {/* Internal Link Components */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* All Compatibility Combinations */}
          <CompatibilityLinksGrid />
          
          {/* All Horoscope Navigation */}
          <HoroscopeNavigation />
          
          {/* Report Links */}
          <ReportLinksGrid />
          
          {/* Recent Blog Links */}
          <RecentBlogLinks limit={15} />
        </section>

        

      </div>
      <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
    </>
  );
}