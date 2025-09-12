"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import SideMenu from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CustomHeader = ({ isHomePage = false }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle login navigation
  const handleLoginClick = () => {
    window.open('https://app.astrosight.ai/auth', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex items-center justify-between">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSideMenuOpen(true)}
                className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-gray-600" />
              </button>
              
              <Link href="/" className="flex items-center">
                <Image
                  src="/log.png"
                  alt="AstroSight Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right: Login Button */}
            <button
              onClick={handleLoginClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Login
            </button>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/log.png"
                alt="AstroSight Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Center: Navigation Menu */}
            <nav className="flex items-center gap-8">
              <Link 
                href="/" 
                className={`font-medium transition-colors hover:text-orange-600 ${
                  router.pathname === '/' ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/compatibility" 
                className={`font-medium transition-colors hover:text-orange-600 ${
                  router.pathname === '/compatibility' ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                Compatibility
              </Link>
              <Link 
                href="/horoscope/today-horoscope" 
                className={`font-medium transition-colors hover:text-orange-600 ${
                  router.pathname.includes('/horoscope') ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                Horoscope
              </Link>
              <Link 
                href="/panchanga" 
                className={`font-medium transition-colors hover:text-orange-600 ${
                  router.pathname === '/panchanga' ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                Panchanga
              </Link>
              <Link 
                href="/blog" 
                className={`font-medium transition-colors hover:text-orange-600 ${
                  router.pathname === '/blog' ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                Blog
              </Link>
            </nav>

            {/* Right: Login Button */}
            <button
              onClick={handleLoginClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Side Menu for Mobile */}
<SideMenu isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />
    </header>
  );
};

export default CustomHeader;
