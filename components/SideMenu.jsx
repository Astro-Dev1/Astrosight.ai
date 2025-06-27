"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faWallet,
  faHistory,
  faCalendar,
  faNewspaper,
  faHeart,
  faFileAlt,
  faOm,
  faShareAlt,
  faTimes,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { t } from '../locales/i18n';

// Create translated menu items
const getTranslatedMenuItems = () => [
  { id: 1, title: t("home") || "Home", icon: faHome, path: "/" },
  { id: 5, title: t("profile") || "Profile", icon: faUser, path: "/profile/page" },
  { id: 4, title: t("wallet") || "Wallet", icon: faWallet, path: "/wallet/page" },
  { id: 14, title: t("order_history") || "Order History", icon: faHistory, path: "/wallet/page" },
  { id: 6, title: t("panchanga") || "Panchanga", icon: faCalendar, path: "/panchanga" },
  { id: 2, title: t("blogs") || "Blogs", icon: faNewspaper, path: "/blog" },
  { id: 3, title: t("compatibility") || "Compatibility", icon: faHeart, path: "/compatibility" },
  { id: 8, title: t("Reports") || "Reports", icon: faFileAlt, badge: t("coming_soon") || "Coming Soon", path: "/reports" },
  { id: 11, title: t("book_pooja") || "Book Pooja", icon: faOm, badge: t("coming_soon") || "Coming Soon", path: "/pooja-booking" },
  { id: 12, title: t("refer_earn") || "Refer & Earn", icon: faShareAlt, badge: t("coming_soon") || "Coming Soon", path: "/refer-earn" },
];

// App config for social links and version
const APP_CONFIG = {
  app: {
    version: "1.0.0"
  },
  socialLinks: [
    { id: 1, icon: "facebook", type: "brand", link: "https://facebook.com/astrosight" },
    { id: 2, icon: "twitter", type: "brand", link: "https://twitter.com/astrosight" },
    { id: 3, icon: "instagram", type: "brand", link: "https://instagram.com/astrosight" },
    { id: 4, icon: "youtube", type: "brand", link: "https://youtube.com/astrosight" },
  ]
};

// Helper function to handle image source (URL string or require object)
const getImageSource = (imageSource) => {
  if (typeof imageSource === 'string') {
    return imageSource;
  }
  return imageSource; // Already a require object or path
};

const SideMenu = ({ 
  isOpen, 
  onClose, 
  // navigation, // Will use useRouter instead
  // activeTab, // Removed unused
  // setActiveTab, // Removed unused
  currentUser = {
    name: "Guest",
    phoneNumber: "+91-9740854522",
    profileImage: "/default-profile.png",
    zodiacSign: "Leo"
  },
  userProfileData = null // New prop for centralized user data
}) => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(currentUser);

  // Update userProfile when currentUser prop changes
  useEffect(() => {
    setUserProfile(currentUser);
  }, [currentUser]);

  // Use centralized user data when available
  useEffect(() => {
    if (userProfileData && userProfileData.astroProfile && userProfileData.userProfile) {
      const centralizedUserProfile = {
        name: userProfileData.astroProfile.name || currentUser.name,
        phoneNumber: userProfileData.userProfile.phone || currentUser.phoneNumber,
        profileImage: userProfileData.userProfile.image || currentUser.profileImage,
        zodiacSign: userProfileData.astroProfile.zodiac || 'Leo'
      };
      setUserProfile(centralizedUserProfile);
      console.log('SideMenu: Using centralized user data:', centralizedUserProfile);
    }
  }, [userProfileData, currentUser]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      onClose();
      router.push('/User/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const renderMenuItem = (item) => (
    <button
      key={item.id}
      className="w-full flex items-center px-4 py-3.5 min-h-[50px] hover:bg-orange-50 transition-colors"
      onClick={() => {
        console.log(`${item.title} pressed, path: ${item.path}`);
        onClose();
        if (item.path) {
          router.push(item.path);
        }
      }}
    >
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 flex-shrink-0">
        <FontAwesomeIcon 
          icon={item.icon} 
          className="w-4 h-4"
          style={{ color: '#f97316' }}
        />
      </div>
      <div className="flex-1 flex items-center justify-between">
        <span className="text-gray-800 text-sm flex-1 pr-2 text-left">
          {item.title}
        </span>
        {item.badge && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0">
            {item.badge}
          </span>
        )}
      </div>
    </button>
  );

  const handleSocialLinkPress = (social) => {
    if (social.link && social.link !== '#') {
      window.open(social.link, '_blank');
    }
  };

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Side Menu */}
      <div 
        className={`fixed top-0 left-0 h-full bg-[#FFF2E2] z-50 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: Math.min(280, window.innerWidth * 0.8) }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-orange-100 rounded-lg transition-colors z-10"
        >
          <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col h-full">
          {/* User Profile Section */}        
          <div className="p-3 border-b border-gray-200 flex items-center">
            <Image
              src={getImageSource(userProfile.profileImage)}
              alt="Profile"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full mr-3 flex-shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-800 truncate">
                {userProfile.name}
              </h3>              <p className="text-sm text-gray-600 truncate">
                {userProfile.phoneNumber}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-2 overflow-y-auto">
            {getTranslatedMenuItems().map(renderMenuItem)}
          </div>

          {/* Footer Section */}
          <div className="p-3 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Also available on</p>
            <div className="flex flex-wrap gap-3 mb-4 justify-center">
              {APP_CONFIG.socialLinks.map((social) => (
                <button 
                  key={social.id} 
                  onClick={() => handleSocialLinkPress(social)}
                  className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                >
                  <FontAwesomeIcon 
                    icon={['fab', social.icon] || social.icon}
                    className="w-4 h-4"
                    style={{ color: '#f97316' }}
                  />
                </button>
              ))}
            </div>          
            
            <p className="text-sm text-gray-500 text-center mb-3 truncate">
              Version {APP_CONFIG.app.version}
            </p>          
            
            <button 
              className="w-full py-3 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 text-white mr-2" />
              <span className="text-white font-semibold text-sm">
                {t('exit') || 'Exit'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
