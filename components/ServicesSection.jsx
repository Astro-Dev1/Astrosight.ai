'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent,CardTitle } from '@/components/ui/card';
import { t } from '../locales/i18n';

// Service cards matching the exact design from screenshot
const cards = [
  {
    title: "Today's Horoscope",
    image: '/horoscope.png',
    link: '/horoscope'
  },
  {
    title: 'Free Kundli',
    image: '/free_report.png',
    link: '#freereport'
  },
  {
    title: 'Compatibility',
    image: '/compatibility.png',
    link: '/compatibility',
    icon: '�'
  },
  {
    title: 'Kundli Matching',
    image: '/compatibility.png',
    link: '/compatibility'
  },
  {
    title: 'Chinese Horoscope',
    image: '/horoscope.png',
    link: '/horoscope/chinese'
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const cardWidth = isMobile ? 120 : 180; // Smaller cards for mobile 3-card view
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const canScrollLeft = () => {
    return scrollRef.current?.scrollLeft > 0;
  };

  const canScrollRight = () => {
    if (!scrollRef.current) return false;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    return scrollLeft < scrollWidth - clientWidth - 10;
  };

  return (
    <div className="relative w-full py-8 bg-gray-100">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 
          className="text-sm md:text-base font-semibold text-gray-600 tracking-wider uppercase"
          style={{ fontFamily: 'Noto Sans Devanagari, system-ui, -apple-system, sans-serif' }}
        >
          {t('complimentaryAstrologyServices') || 'COMPLIMENTARY ASTROLOGY SERVICES'}
        </h2>
      </div>

      {/* Navigation Buttons (Desktop Only) */}
      {!isMobile && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-500 rounded-full p-2 z-10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
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
      )}

      {/* Services Cards */}
      <div className="relative px-4">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
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
              <Card className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-0 overflow-hidden">
                <CardContent className="p-4 text-center">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 bg-[#FF6D3F] rounded-full flex items-center justify-center mx-auto mb-3">
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
                    {t(`services.${card.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`) || card.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: isMobile ? Math.ceil(cards.length / 3) : Math.ceil(cards.length / 4) }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === 0 ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}