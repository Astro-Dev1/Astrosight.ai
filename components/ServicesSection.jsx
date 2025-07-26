'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Import translations directly to avoid SSR issues
// import enTranslations from '../locales/en.json';
// import hiTranslations from '../locales/hi.json';
// import knTranslations from '../locales/kn.json';

// const translations = {
//   en: enTranslations,
//   hi: hiTranslations,
//   kn: knTranslations,
// };

// Service cards matching the exact design from screenshot
const cards = [
  {
    title: "Today's Horoscope",
    image: '/horoscope.png',
    link: '/horoscope/today-horoscope'
  },
  {
    title: 'Astro Calculator',
    image: '/free_report.png',
    link: '/astrology-calculators-articles'
  },
  {
    title: 'Compatibility',
    image: '/compatibility.png',
    link: '/compatibility',
    icon: '�'
  },

  {
    title: 'Festivals',
    image: '/free_report.png',
    link: '/festival-calendar'
  },
  {
    title: 'Today Panchang',
    image: '/panchanga.png',
    link: '/panchanga'
  },
];

export default function ServicesSection() {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  // const [currentLanguage, setCurrentLanguage] = useState('en');

  // Language helper functions
  // const getLanguage = () => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('language') || 'en';
  //   }
  //   return 'en';
  // };

  // const t = (key, fallback = key) => {
  //   const translation = translations[currentLanguage];
    
  //   if (!translation) {
  //     return fallback;
  //   }
    
  //   // Handle nested keys (e.g., "services.title")
  //   const keys = key.split('.');
  //   let value = translation;
    
  //   for (const k of keys) {
  //     if (value && typeof value === 'object' && k in value) {
  //       value = value[k];
  //     } else {
  //       return fallback;
  //     }
  //   }
    
  //   return typeof value === 'string' ? value : fallback;
  // };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialize language
    // setCurrentLanguage(getLanguage());
    
    // Listen for language changes
    // const handleLanguageChange = () => {
    //   setCurrentLanguage(getLanguage());
    // };
    
    if (typeof window !== 'undefined') {
      // window.addEventListener('languageChanged', handleLanguageChange);
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        // window.removeEventListener('languageChanged', handleLanguageChange);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // const scroll = (direction) => {
  //   const container = scrollRef.current;
  //   if (!container) return;
    
  //   const cardWidth = isMobile ? 120 : 180; // Smaller cards for mobile 3-card view
  //   const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    
  //   container.scrollBy({
  //     left: scrollAmount,
  //     behavior: 'smooth',
  //   });
  // };

  // const canScrollLeft = () => {
  //   return scrollRef.current?.scrollLeft > 0;
  // };

  // const canScrollRight = () => {
  //   if (!scrollRef.current) return false;
  //   const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  //   return scrollLeft < scrollWidth - clientWidth - 10;
  // };

  return (
    <div className="relative w-full justify-center items-center">
      {/* Section Header */}
      <div className="text-center mb-6">
        
        <h2 className="text-xl font-bold text-center mb-5">
    COMPLIMENTARY <span className="text-[#FF6D3F]">ASTROLOGY SERVICES</span>
  </h2>
      </div>

      {/* Navigation Buttons (Desktop Only) */}
      {/* {!isMobile && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full p z-10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll left"
            disabled={!canScrollLeft()}
          >
            <ChevronLeft className="text-white w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-500 rounded-full p-2 z-10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll right"
            disabled={!canScrollRight()}
          >
            <ChevronRight className="text-white w-4 h-4" />
          </button>
        </>
      )} */}

      {/* Services Cards */}
      <div className="relative ">
        <div
          ref={scrollRef}
          className="flex justify-start lg:justify-center gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="flex-shrink-0 snap-center group"
              style={{
                width: isMobile ? '110px' : '160px', // 3 cards fit in mobile
                minWidth: isMobile ? '110px' : '160px',
              }}
            >
              <Card className="h-full rounded-xl shadow-lg hover:shadow-md  transition-all duration-200 border-b-4 border-b-orange-500 overflow-hidden">
                <CardContent className="p-4 text-center">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 bg-[#f5ab3b] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Image 
                      src={card.image} 
                      alt={card.title} 
                      width={24} 
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-xs md:text-sm font-medium text-gray-700 leading-tight"
                    style={{ fontFamily: 'Noto Sans Devanagari, system-ui, -apple-system, sans-serif' }}
                  >
                    { card.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {/* <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: isMobile ? Math.ceil(cards.length / 3) : Math.ceil(cards.length / 4) }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === 0 ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}