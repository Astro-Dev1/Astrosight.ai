'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Make sure you have this package or replace icons

const cards = [
  { title: "Today's Horoscope", image: '/horoscope.png', link: '/horoscope/today-horoscope' },
  { title: 'Astro Calculator', image: '/free_report.png', link: '/astrology-calculators-tools' },
  { title: 'Compatibility', image: '/compatibility.png', link: '/compatibility' },
  { title: 'Blog', image: '/free_report.png', link: '/blog' },
  { title: 'Today Panchang', image: '/panchanga.png', link: '/panchanga' },
]; 

const CARDS_PER_PAGE_MOBILE = 3;
const CARD_WIDTH_DESKTOP = 180; // Adjust this to exact desktop card width in px

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0); // Used for mobile pagination

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // MOBILE VIEW: prepare current cards and total pages
  const totalPagesMobile = Math.ceil(cards.length / CARDS_PER_PAGE_MOBILE);
  const startIndex = page * CARDS_PER_PAGE_MOBILE;
  const currentCards = isMobile ? cards.slice(startIndex, startIndex + CARDS_PER_PAGE_MOBILE) : cards;

  // DESKTOP SCROLL HANDLERS
  const scrollNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: CARD_WIDTH_DESKTOP * 2, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -CARD_WIDTH_DESKTOP * 2, behavior: 'smooth' });
  };

  // Optional: disable buttons if you want (needs scroll position tracking)
  // For simplicity, buttons are always enabled

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="text-center mb-6">
            <div className="flex items-start p-3 justify-center md:gap-[18px] gap-[9px]">
      
      {/* Left pattern image */}
      <Image
        alt="Heading pattern"
        src="/hed.png"
        width={250}
        height={250}
        loading="lazy"
        decoding="async"
        className="md:w-10 w-[40px] md:h-[40px] h-[30px] -rotate-90"
        style={{ color: 'transparent' }}
      />
      
      {/* Heading text */}
      <h2 className="text-2xl font-bold font-kohinoor lg:text-[36px] text-center mb-5">
        Complimentary <span className="text-[#cf4526] font-kohinoor ">Astrology Services</span>
      </h2>

      {/* Right pattern image rotated 180 degrees */}
      <Image
        alt="Heading pattern"
        src="/hed.png"
        width={250}
        height={250}
        loading="lazy"
        decoding="async"
        className="md:w-10 w-[40px] md:h-[40px] h-[30px] rotate-90"
        style={{ color: 'transparent' }}
      />
    </div>

      </div>

      {isMobile ? (
        // MOBILE: Show only page of 3 cards & dots navigation
        <>
          <div className="flex justify-center gap-3 w-full max-w-lg">
            {currentCards.map((card, idx) => (
              <Link
                key={idx}
                href={card.link}
                className="w-[110px] flex-shrink-0 group"
              >
                <Card className="h-full rounded-xl shadow-lg py-2 hover:shadow-md border-b-4 border-b-orange-500 overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#f5ab3b] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <h3
                      className="text-xs md:text-sm font-medium text-gray-700 leading-tight"
                      style={{ fontFamily: 'Noto Sans Devanagari, system-ui, -apple-system, sans-serif' }}
                    >
                      {card.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPagesMobile }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  page === dotIdx ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                onClick={() => setPage(dotIdx)}
                aria-label={`Show cards ${dotIdx * CARDS_PER_PAGE_MOBILE + 1}-${Math.min((dotIdx + 1) * CARDS_PER_PAGE_MOBILE, cards.length)}`}
              />
            ))}
          </div>
        </>
      ) : (
        // DESKTOP: Horizontal scroll carousel with navigation buttons
        <div className="relative w-full max-w-4xl">
          {/* Scroll left button */}
          <button
            onClick={scrollPrev}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrollable cards container */}
          <div
            ref={scrollRef}
            className="flex gap-3 flex-shrink-0 justify-center items-center scroll-smooth scrollbar-hide "
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {cards.map((card, idx) => (
              <Link
                key={idx}
                href={card.link}
                className="flex-shrink-0  w-[150px] group"
              >
                <Card className="h-full rounded-xl shadow-lg hover:shadow-md border-b-4 border-b-orange-500 overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#f5ab3b] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <h3
                      className="text-sm font-medium text-gray-700 leading-tight"
                      style={{ fontFamily: 'Noto Sans Devanagari, system-ui, -apple-system, sans-serif' }}
                    >
                      {card.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Scroll right button */}
          <button
            onClick={scrollNext}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}
