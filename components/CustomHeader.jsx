"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faWallet, 
  faArrowLeft,
  faBell,
  faLanguage
} from "@fortawesome/free-solid-svg-icons";

const CustomHeader = ({ 
  title, 
  // navigation, // Removed unused prop
  showBackButton = true, 
  showNotification = false,
  showSideMenu = false,
  showWallet = false,
  showLanguage = false,
  showProfile = false,
  rightIcon = null,
  titleImage = null,  // Add this prop

  onNotificationPress = () => console.log("Notifications pressed"),
  onSideMenuPress = () => console.log("Side menu pressed"),
  onWalletPress = () => console.log("Wallet pressed"),
  onLanguagePress = () => console.log("Language pressed"),
  onProfilePress = () => console.log("Profile pressed"),
  onRightIconPress = () => console.log("Right icon pressed"),
  backgroundColor = 'bg-[#FFF2E2]',
  textColor = 'text-[#FF6D3F]',
  iconColor = '#FF6D3F',
  profileImageUrl
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  // Handle back navigation
  const handleBackPress = () => {
    if (typeof window !== 'undefined') {
      // Try to go back in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback to home page if no history
        window.location.href = '/';
      }
    }
  };
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${backgroundColor} ${
        isScrolled 
          ? 'shadow-lg border-b border-orange-200' 
          : 'shadow-sm'
      }`}
    >
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left section: Menu button/Back button + Title/Image */}
        <div className="flex items-center">
          {showSideMenu && (
            <button
              onClick={onSideMenuPress}
              className="mr-3 p-2 -ml-2 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" style={{ color: iconColor }} />
            </button>
          )}
          
          {showBackButton && !showSideMenu && (
            <button
              onClick={handleBackPress}
              className="p-2 -ml-2 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" style={{ color: iconColor }} />
            </button>
          )}
          
          {/* Center - Image or Text Title */}
          {titleImage ? (
            <Image
              src={titleImage}
              alt="Title"
              width={160}
              height={132}
              className="h-8 w-40 max-w-40 relative -left-9 object-contain"
            />
          ) : (
            <h1 className={`text-xl font-semibold ${textColor} ${(showBackButton || showSideMenu) ? 'ml-3' : ''}`}>
              {title}
            </h1>
          )}
        </div>

        {/* Right section: Action buttons */}
        <div className="flex items-center gap-3">          {showWallet && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Wallet button clicked!');
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
                console.log('Language button clicked!');
                if (onLanguagePress) onLanguagePress();
              }}
              className="p-1 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faLanguage} className="w-5 h-5" style={{ color: iconColor }} />
            </button>
          )}
            {showProfile && (
            <button 
              onClick={onProfilePress} 
              className=" hover:opacity-80 transition-opacity"
            >
              <Image
                src={profileImageUrl || "/ZodiacSigns/male/Aries.webp"}
                alt="Profile"
                width={40}
                height={40}
                className="h-15 w-15 rounded-full border-2 border-orange-400 object-cover"
              />
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
      </div>
    </header>
  );
};

export default CustomHeader;
