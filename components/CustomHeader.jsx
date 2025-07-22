"use client";


import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import SideMenu from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faWallet, 
  faArrowLeft,
  faBell,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const CustomHeader = ({ 
  title, 
  showBackButton = true, 
  showNotification = false,
  showWallet = false,
  showLanguage = false,
  rightIcon = null,
  titleImage = "/log.png",
  isHomePage = false,
  onNotificationPress = () => console.log("Notifications pressed"),
  // onSideMenuPress = () => console.log("Side menu pressed"),
  onWalletPress = () => console.log("Wallet pressed"),
  onLanguagePress = () => console.log("Language pressed"),
  // onProfilePress = () => console.log("Profile pressed"),
  onRightIconPress = () => console.log("Right icon pressed"),
  backgroundColor = 'bg-white/60',
  textColor = 'text-[#FF6D3F]',
  iconColor = '#718096 ',
  profileImageUrl
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [zodiacSign, setZodiacSign] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    // Check login state from cookies
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
    // Optionally, fetch user profile/zodiac from cookies or API
    const img = Cookies.get('profileImageUrl');
    const sign = Cookies.get('zodiacSign');
    if (img) setProfileImg(img);
    if (sign) setZodiacSign(sign);
  }, []);

  // Handle mobile detection and scroll effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle back navigation
  const handleBackPress = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    }
  };

  const handleProfilePress = () => {
    if (isLoggedIn) {
      router.push('/User/profile');
    } else {
      router.push('/User/login');
    }
  };
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        isScrolled 
          ? 'shadow-lg border-b bg-white/85 border-red' 
          : `shadow-sm ${backgroundColor}`
      }`}
    >
      <div className="box-border mx-auto px-4 w-full max-w-[1400px] 2xl:px-8 xl:px-6 lg:px-4 md:px-4 sm:px-3 py-3">
        {/* Mobile Layout */}
      {isMobile && (
        <div className="flex items-center justify-between">
          {/* Left: Hamburger + Logo/Brand (no gap) */}
          <div className="flex items-center">
            <button
              onClick={() => setSideMenuOpen(true)}
              className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" style={{ color: iconColor }} />
            </button>
            {titleImage ? (
              <Image
                src={"/log.png"}
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ) : (
                
              <h1 className={`text-lg font-semibold ${textColor} ml-1`}>
                {"AstroSight"}
              </h1>
            )}
          </div>
          {/* SideMenu Drawer */}
          <SideMenu isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />

          {/* Right: Notification + Login/Profile */}
          <div className="flex items-center gap-2">
            {showNotification && (
              <button
                onClick={onNotificationPress}
                className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faBell} className="w-5 h-5" style={{ color: '#fb923c' }} />
              </button>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleProfilePress}
                className="hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                <Image
                  src={profileImg || profileImageUrl || "/ZodiacSigns/male/Aries.webp"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-orange-400 object-cover"
                />
                {zodiacSign && (
                  <span className="ml-1 text-xs text-orange-500 font-semibold">{zodiacSign}</span>
                )}
              </button>
            ) : (
              <button
                onClick={handleProfilePress}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-1.5 rounded-lg transition-colors text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex items-center justify-between w-full">
          {/* Homepage Layout - Full Navigation */}
          {isHomePage ? (
            <>
              <div className="flex items-center gap-3">
                {titleImage ? (
                  <Image
                    src={"/log.png"}
                    alt="Logo"
                    width={160}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <h1 className={`text-xl font-semibold ${textColor}`}>AstroSight</h1>
                )}
              </div>
              {/* Center: Navigation Menu */}
              <nav className="flex items-center text-white font-kohinoor gap-6">
                <Link href="/" className={`font-medium transition-colors ${router.pathname === '/' ? 'text-orange-600' : 'text-gray-800 hover:text-orange-600'}`}>Home</Link>
                <Link href="/compatibility" className={`font-medium transition-colors flex items-center gap-2 ${router.pathname === '/compatibility' ? 'text-orange-600' : 'text-gray-800 hover:text-orange-600'}`}>Compatibility</Link>
                <Link href="/horoscope/today-horoscope" className={`font-medium transition-colors flex items-center gap-2 ${router.pathname === '/horoscope' ? 'text-orange-600' : 'text-gray-800 hover:text-orange-600'}`}>Horoscope</Link>
                <Link href="/panchanga" className={`font-medium transition-colors ${router.pathname === '/panchanga' ? 'text-orange-600' : 'text-gray-800 hover:text-orange-600'}`}>Panchanga</Link>
                <Link href="/blog" className={`font-medium transition-colors ${router.pathname === '/blog' ? 'text-orange-600' : 'text-gray-800 hover:text-orange-600'}`}>Blog</Link>
              </nav>
              {/* Right: Login/Profile */}
              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleProfilePress}
                    className="hover:opacity-80 transition-opacity flex items-center gap-2"
                  >
                    <Image
                      src={profileImg || profileImageUrl || "/ZodiacSigns/male/Aries.webp"}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-orange-400 object-cover"
                    />
                    {zodiacSign && (
                      <span className="ml-1 text-sm text-orange-500 font-semibold">{zodiacSign}</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleProfilePress}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </>
          ) : (
            // Other Pages Layout - Back Button + Title
            <>
              {/* Left: Back Button + Title/Logo */}
              <div className="flex items-center">
                {showBackButton && (
                  <button
                    onClick={handleBackPress}
                    className="p-2 -ml-2 hover:bg-orange-100 rounded-lg transition-colors mr-3"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" style={{ color: iconColor }} />
                  </button>
                )}
                {titleImage ? (
                  <Image
                    src={"/log.png"}
                    alt="Logo"
                    width={160}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <h1 className={`text-xl font-semibold ${textColor}`}>{title}</h1>
                )}
              </div>
              {/* Right: Action buttons for other pages */}
              <div className="flex items-center gap-3">
                {showWallet && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onWalletPress) onWalletPress();
                    }}
                    className="p-3 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faWallet} className="w-5 h-5" style={{ color: iconColor }} />
                  </button>
                )}
                {showLanguage && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onLanguagePress) onLanguagePress();
                    }}
                    className="p-1 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faLanguage} className="w-5 h-5" style={{ color: iconColor }} />
                  </button>
                )}
                {isLoggedIn ? (
                  <button
                    onClick={handleProfilePress}
                    className="hover:opacity-80 transition-opacity flex items-center gap-2"
                  >
                    <Image
                      src={profileImg || profileImageUrl || "/ZodiacSigns/male/Aries.webp"}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-orange-400 object-cover"
                    />
                    {zodiacSign && (
                      <span className="ml-1 text-sm text-orange-500 font-semibold">{zodiacSign}</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleProfilePress}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    LOGIN
                  </button>
                )}
                {rightIcon && (
                  <button 
                    onClick={onRightIconPress} 
                    className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={rightIcon} className="w-5 h-5" style={{ color: iconColor }} />
                  </button>
                )}
                {showNotification && (
                  <button
                    onClick={onNotificationPress}
                    className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faBell} className="w-5 h-5" style={{ color: '#fb923c' }} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
      </div>
    </header>
  );
};

export default CustomHeader;
