'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cards = [
  {
    title: 'Free Report',
    content: 'Unlock your cosmic blueprint!',
    image: '/free_report.png',
    link: '#freereport',
  },
  {
    title: 'Horoscopes',
    content: 'Dive into daily, weekly, and monthly horoscopes.',
    image: '/horoscope.png',
    link: '/horoscope',
  },
  {
    title: 'Panchanga',
    content: "Explore today's astrological almanac.",
    image: '/panchanga.png',
    link: '/panchanga',
  },
  {
    title: '2024 Festivals',
    content: 'Discover a comprehensive cultural calendar.',
    image: '/festivals.png',
    link: '/festivals',
  },
  {
    title: 'Compatibility',
    content: 'Find your cosmic match!',
    image: '/compatibility.png',
    link: '/compatibility',
  },
];

export default function ScrollingCardUI() {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction) => {
    const cardWidth = scrollRef.current?.firstChild?.offsetWidth || 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full  py-8">
      <h2 className="text-xl text-center font-bold mb-6">
        Our Astrology <span className="text-[#FF6D3F]">Services</span>
      </h2>

      {/* Chevron Buttons (Desktop Only) */}
      {!isMobile && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="text-gray-500 w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition"
          >
            <ChevronRight className="text-gray-500 w-6 h-6" />
          </button>
        </>
      )}

      {/* Card Scroll Area */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 scrollbar-hide"
      >
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="flex-shrink-0 snap-center"
            style={{
              width: isMobile ? '43%' : '23.5%',
              minWidth: isMobile ? '40%' : '250px',
              maxWidth: '280px',
            }}
          >
            <Card className="border-b-4  rounded-xl bg-[#FFFBF8] shadow-lg hover:shadow-xl transition duration-300 h-full">
              <CardHeader className="flex items-center justify-center p-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Image src={card.image} alt={card.title} width={40} height={40} />
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-sm  font-semibold text-gray-900 mb-2">
                  {card.title}
                </CardTitle>
                <p className="text-xs hidden lg:flex text-gray-600">{card.content}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}