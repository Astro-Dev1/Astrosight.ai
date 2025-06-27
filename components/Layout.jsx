"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CustomHeader from './CustomHeader';
import SideMenu from './SideMenu';
import Footer from './Footer';
import { t, useForceUpdate, getLanguage, setLanguage } from '../locales/i18n';

const Layout = ({ 
  children, 
  title, 
  showBackButton = true,
  showSideMenu = true,
  showWallet = true,
  showLanguage = true,
  showProfile = true,
  titleImage = null,
  backgroundColor = "bg-[#FFF2E2]",
  textColor = "text-[#FF6D3F]",
  iconColor = "#FF6D3F"
}) => {
  const router = useRouter();
  const forceUpdateFunction = useForceUpdate();
  
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Initialize component state
  useEffect(() => {
    setSelectedLanguage(getLanguage());
    checkAuthStatus();
    
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setSelectedLanguage(getLanguage());
      forceUpdateFunction();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [forceUpdateFunction]);

  // Authentication check
  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('userToken');
      const storedUserData = localStorage.getItem('userData');
      
      if (token && storedUserData) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(storedUserData));
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      console.log('Fetching user data...');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle language change
  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setSelectedLanguage(languageCode);
    forceUpdateFunction();
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChanged'));
    }
  };

  // Handle login navigation
  const handleLoginPress = () => {
    setSideMenuVisible(false);
    router.push('/User/login');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    setSideMenuVisible(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FFF2E2]">
      {/* Custom Header */}
      <CustomHeader
        title={title}
        titleImage={titleImage}
        showBackButton={showBackButton}
        showSideMenu={showSideMenu}
        showWallet={showWallet}
        showLanguage={showLanguage}
        showProfile={showProfile}
        onSideMenuPress={() => {
          console.log('Side menu button pressed');
          setSideMenuVisible(true);
        }}       
        onWalletPress={() => {
          console.log('Wallet button pressed');
          router.push('/wallet/page');
        }}
        onLanguagePress={() => {
          console.log('Language button pressed');
          setIsLanguageModalOpen(true);
        }}
        onProfilePress={() => {
          console.log('Profile button pressed');
          router.push('/profile/page');
        }}
        backgroundColor={backgroundColor}
        textColor={textColor}
        iconColor={iconColor}
        profileImageUrl={userData?.profileImage || "/default-profile.png"}
      />

      {/* Side Menu */}
      <SideMenu
        isOpen={sideMenuVisible}
        onClose={() => setSideMenuVisible(false)}
        currentUser={{
          name: userData?.name || 'Guest',
          phoneNumber: userData?.phone || '+91-9740854522',
          profileImage: userData?.zodiacSign ? 
            `/zodicimg/${userData?.gender || 'male'}/${userData.zodiacSign.charAt(0).toUpperCase() + userData.zodiacSign.slice(1).toLowerCase()}.webp` : 
            "/default-profile.png",
          zodiacSign: userData?.zodiacSign || 'Leo'            
        }}
        userProfileData={{
          astroProfile: {
            name: userData?.name || 'Guest',
            zodiac: userData?.zodiacSign || 'Leo',
            gender: userData?.gender || 'male'
          },
          userProfile: {
            phone: userData?.phone || '+91-9740854522',
            image: userData?.zodiacSign ? 
              `/zodicimg/${userData?.gender || 'male'}/${userData.zodiacSign.charAt(0).toUpperCase() + userData.zodiacSign.slice(1).toLowerCase()}.webp` : 
              "/default-profile.png"
          }
        }}
      />

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      <Footer />

      {/* Language Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-[200] flex justify-center items-center bg-black/50">
          <div 
            className="absolute inset-0"
            onClick={() => setIsLanguageModalOpen(false)}
          />
          <div className="bg-white rounded-xl mx-6 max-w-[320px] w-full relative z-10">
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center z-10 hover:bg-gray-200 transition-colors"
              onClick={() => setIsLanguageModalOpen(false)}
            >
              <span className="text-gray-600 text-lg">×</span>
            </button>
            
            <div className="p-4 border-b border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{t('language') || 'Language'}</h3>
            </div>
            
            {[
              { code: 'en', label: 'English', flag: '🇺🇸' },
              { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
              { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
            ].map((lang) => (
              <button
                key={lang.code}
                className="w-full p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => {
                  console.log('Language selected:', lang.code);
                  handleLanguageChange(lang.code);
                  setIsLanguageModalOpen(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-base text-gray-700">{lang.label}</span>
                </div>
                {selectedLanguage === lang.code && (
                  <span className="text-orange-500 text-xl">✓</span>
                )}
              </button>
            ))}
            
            <div className="p-4 border-t border-gray-200 text-center bg-gray-50 rounded-b-xl"> 
              <button 
                className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                onClick={() => setIsLanguageModalOpen(false)}
              >
                {t('cancel') || 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
