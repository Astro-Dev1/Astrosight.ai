import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchMyProfile, updateQuestion } from '../services/centralApi';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeBanner, setActiveBanner] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

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

  // Sample conversations for animation
  const sampleConversations = [
    {
      id: 1,
      user: "I've been feeling stuck in my career lately...",
      ai: "I see you're a Scorpio rising with Mars in your 7th house - that intense energy you're feeling is actually pointing toward a transformation in how you approach partnerships and collaboration. Tell me, what specific aspect of your work feels most restrictive right now?"
    },
    {
      id: 2,
      user: "My relationship keeps having the same arguments",
      ai: "With your Venus in Gemini and Moon in Cancer, there's a beautiful tension between your need for emotional security and intellectual stimulation. The pattern you're describing often emerges when these two needs aren't being honored equally. What does emotional safety look like for you in communication?"
    },
    {
      id: 3,
      user: "I feel like I'm not living my purpose",
      ai: "Your North Node in Aquarius suggests your soul's journey is about embracing your unique vision and contributing to collective progress. That restless feeling? It's your higher self calling you toward something bigger. What activities make you lose track of time completely?"
    }
  ];

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

  // Animation for conversation examples when not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      const interval = setInterval(() => {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % sampleConversations.length);
          setIsTyping(false);
        }, 1000);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn, sampleConversations.length]);

  return (
    <section className="font-kohinoor">
      <div className="">
        {isLoggedIn ? (
          <div className="text-center lg:text-left font-kohinoor">
            <div className="">
              <h1 className="text-[#FF6D3F] text-center mt-2 text-2xl mb-4 font-semibold font-kohinoor">Welcome <span className='text-[#070707]'>{userName}</span> </h1>
            </div>
            {/* Banner Section */}
            <div className="relative rounded-xl overflow-hidden shadow-sm">
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
            <div className="mb-4">
              <h2 className="text-black text-xl font-semibold mt-5 mb-3 font-kohinoor">Our AI Companions</h2>
              <Card className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex justify-between mb-6">
                  {aiCompanions.map((companion) => (
                    <div key={companion.id} className="flex flex-col items-center">
                      <Link
                        href={`/chatbot?persona=${companion.persona}`}
                        data-readdy="true"
                      >
                        <Avatar className="h-20 w-20 mb-2">
                          <AvatarImage src={companion.imageUrl} alt={companion.name} />
                          <AvatarFallback className="bg-[#FFE5CC]">
                            {companion.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <span className="text-[#FF9960] font-medium font-kohinoor">{companion.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Anything"
                    className="w-full py-3 px-4 rounded-full bg-[#FFE5CC] text-gray-700 border-none focus:outline-none font-kohinoor"
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
          <div className="grid grid-cols-1 font-kohinoor lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left column - Live AI Chat Preview */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF6D3F] to-[#FF9933] p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-sparkles text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">AstroSight AI</h3>
                      <p className="text-white/80 text-sm">Your Cosmic Conversation Partner</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80 text-xs">Live</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4 h-96 overflow-y-auto bg-gray-50">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#FF6D3F] text-white rounded-2xl rounded-br-sm max-w-xs p-4">
                      <p className="text-sm">{sampleConversations[currentMessageIndex]?.user}</p>
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF6D3F] to-[#FF9933] rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-brain text-white text-xs"></i>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm max-w-md p-4 shadow-sm">
                        {isTyping ? (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed text-gray-800">{sampleConversations[currentMessageIndex]?.ai}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="text" 
                      placeholder="Ask about your cosmic journey..."
                      className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6D3F] focus:border-transparent"
                      disabled
                    />
                    <button className="px-4 py-4 bg-[#FF6D3F] text-white rounded-lg text-sm hover:bg-[#e55a2b] transition-colors">
<IoIosSend className='w-6 h-6'/>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Text content */}
            <div className="order-1 lg:order-2 space-y-4 animate-fade-in text-center text-[25.4px] lg:text-left">
              <div className="text-[30px]/9 text-[#3a3026] px-auto lg:text-[42.4px]/10 font-bold font-kohinoor-latin">
                <span className="text-[#cf4526] w-full text-[30px] font-kohinoor-latin lg:text-[42.4px]/10 font-bold">AstroSight</span>, Transforming Ancient Astrological Wisdom Into Actionable Modern Guidance
              </div>
              <div className="md:flex md:flex-row md:items-start md:justify-between">
                <div className="md:flex-1 md:w-1/2 gap-4">
                  <p className="text-base/4 lg:w-1/2 sm:text-lg md:text-sm font-kohinoor-latin text-gray-600 max-w-2xl mx-auto lg:mx-0">
                    Where Ancient Wisdom Meets AI: Unlock Your Cosmic Blueprint and Discover Answers to Life&apos;s Burning Questions
                  </p>
                  <div className="hidden lg:flex relative -top-16 left-28 flex-col items-center lg:items-center md:mt-0 md:ml-6">
                    <Image
                      src="/qrcode.jpeg"
                      alt="QR Code for App Download"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <p className="text-gray-600 text-center text-[12px]">Scan to our download</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="https://app.astrosight.ai/chatbot
                " className="inline-block">
                  <button className="bg-gradient-to-r from-[#FF6D3F] to-[#FF9933] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <i className="fas fa-comments mr-2"></i>
                    Start Your Free Consultation
                  </button>
                </Link>
                {/* <button className="border-2 border-[#FF6D3F] text-[#FF6D3F] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#FF6D3F] hover:text-white transition-all duration-300">
                  <i className="fas fa-play mr-2"></i>
                  See How It Works
                </button> */}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-row items-center justify-center lg:justify-start gap-4 pt-8">
  {/* End-to-End Encrypted */}
  <div className="group flex items-center space-x-2 bg-white hover:bg-green-50 px-4  rounded-full border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
      <i className="fas fa-shield-alt text-white text-xs"></i>
    </div>
    <span className="text-sm text-gray-700 font-medium group-hover:text-green-700 transition-colors">
      End-to-End Encrypted
    </span>
  </div>

  {/* 100K+ Conversations */}
  <div className="group flex items-center space-x-2 bg-white hover:bg-orange-50 px-4  rounded-full border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="w-6 h-6 bg-gradient-to-r from-[#FF6D3F] to-orange-600 rounded-full flex items-center justify-center">
      <i className="fas fa-users text-white text-xs"></i>
    </div>
    <span className="text-sm text-gray-700 font-medium group-hover:text-orange-700 transition-colors">
      100K+ Conversations
    </span>
  </div>

  {/* 4.9/5 Rating */}
  {/* <div className="group flex items-center space-x-2 bg-white hover:bg-yellow-50 px-4 py-2 rounded-full border border-gray-200 hover:border-yellow-300 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
      <i className="fas fa-star text-white text-xs"></i>
    </div>
    <span className="text-sm text-gray-700 font-medium group-hover:text-yellow-700 transition-colors">
      4.9/5 Rating
    </span>
  </div> */}
</div>

              {/* App Download Buttons for Mobile */}
              {/* <div className="flex flex-row lg:hidden items-center justify-center gap-4">
                <Link href="https://play.google.com/store/apps/details?id=com.astrosight" passHref>
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
                </Link>
                
                <Link href="/" passHref>
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
                      <div className="md:text-xs text-[12px] uppercase">coming soon</div>
                      <div className="md:text-xl text-sm font-semibold font-sans -mt-1">App Store</div>
                    </div>
                  </div>
                </Link>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;