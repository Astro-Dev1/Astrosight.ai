import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchMyProfile, updateQuestion } from '../services/centralApi';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeBanner, setActiveBanner] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Optimized banner data with better structure
  const banners = [
    { 
      id: 1, 
      imageUrl: '/compatibility-banner.jpg',
      title: 'Discover Your Compatibility',
      description: 'Find your perfect cosmic match'
    },
    { 
      id: 2, 
      imageUrl: '/compatibility-banner.jpg',
      title: 'Daily Guidance',
      description: 'Get personalized astrological insights'
    },
    { 
      id: 3, 
      imageUrl: '/compatibility-banner.jpg',
      title: 'Spiritual Growth',
      description: 'Transform your life with Vedic wisdom'
    },
  ];

  // Enhanced AI companions with better personas
  const aiCompanions = [
    { 
      id: 1, 
      name: 'Balanced', 
      imageUrl: '/AIAvatar/Auro.png',
      persona: "balanced",
      description: 'Perfect mix of depth and clarity'
    },
    { 
      id: 2, 
      name: 'Youth', 
      imageUrl: '/AIAvatar/Avi.png', 
      persona: "youth",
      description: 'Fun and easy to understand'
    },
    { 
      id: 3, 
      name: 'Expert', 
      imageUrl: '/AIAvatar/Jaimini.png',
      persona: "expert",
      description: 'Deep traditional knowledge'
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetchMyProfile();
        if (response.success && response.data?.astroProfile?.name) {
          setIsLoggedIn(true);
          setUserName(response.data.astroProfile.name);

          // Update question status
          await updateQuestion('placeholder_id').catch((error) => {
            console.error('Failed to update question status:', error);
          });
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Profile fetch failed:', error);
        setIsLoggedIn(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="" style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}>
      <div className="">
        {isLoggedIn ? (
          <div className=" text-center font-poppins lg:text-left">
            <div className="">
              <h1 className="text-[#FF6D3F] text-center mt-2 text-2xl mb-4 font-semibold" style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}>Welcome <span className='text-[#070707]'>{userName}</span> </h1>
            </div>
            {/* Banner Section */}
            <div className="relative  rounded-xl overflow-hidden shadow-sm">
              <div className="w-full h-[120px] lg:h-[280px] bg-gray-200 rounded-xl overflow-hidden">
                <Image
                  src={banners[activeBanner].imageUrl}
                  width={1200}
                  height={1200}

                  alt="Astrology Banner"
                  className="w-full h-full object-cover object-top rounded-xl"
                />
              </div>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {banners.map((banner, index) => (
                  <button
                    key={banner.id}
                    onClick={() => setActiveBanner(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === activeBanner ? 'bg-[#FF6D3F]' : 'bg-[#FFE5CC]'
                    } cursor-pointer`}
                  />
                ))}
              </div>
            </div>
            {/* AI Companions Section */}
            <div className="mb-6">
              <h2 className="text-black text-xl font-semibold mt-5 mb-3" style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}>Our AI Companions</h2>

                <Card className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex justify-between mb-6">
                    {aiCompanions.map((companion) => (
                      <div key={companion.id} className="flex flex-col items-center">
                  <Link
                href={`/chatbot?persona=${companion.persona}`}
                data-readdy="true"
              >                        <Avatar className="h-20 w-20 mb-2">
                          <AvatarImage src={companion.imageUrl} alt={companion.name} />
                          <AvatarFallback className="bg-[#FFE5CC]">
                            {companion.name[0]}
                          </AvatarFallback>
                        </Avatar>
              </Link>

                        <span className="text-[#FF9960] font-medium" style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}>{companion.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                         value={inputValue}
                             onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask Anything"
                      className="w-full py-3 px-4 rounded-full bg-[#FFE5CC] text-gray-700 border-none focus:outline-none"
                      style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}
                    />
                             <Link
                href={`/chatbot?persona=expert&&input=${inputValue}`}
                data-readdy="true"
              >  
                    <Button className="absolute right-1 top-1 rounded-full bg-[#FF9933] hover:bg-[#FF9933]/90 w-10 h-10 p-0 cursor-pointer">
                      <i className="fas fa-paper-plane text-white"></i>
                    </Button>
                    </Link>
                  </div>
                </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-6 animate-fade-in text-center text-[25.4px] lg:text-left">
              <div className="text-2xl/9 text-[#3A3026] px-auto font-bold" style={{ fontFamily: 'Kohinoor Devanagari, Noto Sans Devanagari, Arial, sans-serif' }}>
                <span className="text-[#fd9474] text-2xl font-bold">AstroSight</span>, Transforming Ancient Astrological Wisdom Into Actionable Modern Guidance
              </div>
              <div className="md:flex md:flex-row md:items-start md:justify-between">
                <p className="text-base/5 sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  Receive AI-Powered Horoscopes, Unlock Your Cosmic Blueprint, and Find Answers to Life&apos; Burning Questions
                </p>
                <div className="hidden md:flex relative -top-3 flex-col items-center lg:items-center md:mt-0 md:ml-6">
                  <img
                    src="/chat_assistant__1_-removebg-preview.png"
                    alt="QR Code for App Download"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <p className="text-gray-600 text-center text-[12px]">Scan to download</p>
                </div>
              </div>
              <div className="flex flex-row lg:hidden items-center justify-center gap-4">
                <Link href="https://AstroSight.com/download" passHref>
                  <div className="flex mt-3 md:w-48 md:h-14 w-[150px] h-[45px] bg-black text-white rounded-lg items-center justify-center cursor-pointer hover:shadow-xl">
                    <div className="mr-3">
                      <svg viewBox="30 336.7 120.9 129.2" width="20">
                        <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path>
                        <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path>
                        <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path>
                        <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="md:text-xs text-[12px] uppercase">Download on</div>
                      <div className="md:text-xl text-sm font-semibold font-sans -mt-1">Play Store</div>
                    </div>
                  </div>
                                    <spam className="text-xs text-green-400">coming soon </spam>
                </Link>
                <Link href="https://AstroSight.com/download" passHref>
                  <div className="flex mt-3 md:w-48 md:h-14 w-[150px] h-[45px] bg-black text-white rounded-lg items-center justify-center cursor-pointer hover:shadow-xl">
                    <div className="mr-3">
                      <svg viewBox="0 0 384 512" width="20">
                        <path
                          fill="currentColor"
                          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="md:text-xs text-[12px] uppercase">Download on</div>
                      <div className="md:text-xl text-sm font-semibold font-sans -mt-1">App Store</div>
                    </div>
                  </div>
                                    <spam className="text-xs text-green-400">coming soon </spam>

                </Link>
              </div>
            </div>
            {/* Right column - Image */}
            <div className="flex justify-center items-center lg:justify-end lg:items-end lg:mt-0 p-2 -mt-20 -mb-9">
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet="/Untitled design (5) (1).webp"
                  width={328}
                  height={516}
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet="/Untitled design (6) (1).webp"
                  width={328}
                  height={299.88}
                />
                <Image
                  src="/chat_assistant__1_-removebg-preview.png"
                  alt="Guidance Report Preview"
                  width={386.9}
                  height={299}
                  className="w-[586.9px] h-[499px] rounded-2xl object-contain mx-auto"
                  priority
                  sizes="386.9px"
                />
              </picture>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
