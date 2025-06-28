"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SideMenu from "./SideMenu";
import CustomHeader from "./CustomHeader";
import Cookies from "js-cookie";
import { fetchMyProfile } from "../services/centralApi";
import {  setLanguage, getLanguage, useForceUpdate } from "../locales/i18n";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "Guest",
    id: "",
    profileImage: "/default-profile.png",
    phone: "",
  });
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const currentLang = getLanguage();
    const langMap = { en: "English", hi: "हिंदी", kn: "ಕನ್ನಡ" };
    return langMap[currentLang] || "English";
  });

  const forceUpdate = useForceUpdate();
  const router = useRouter();

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      const user = Cookies.get("user");

      if (token && user) {
        setIsLoggedIn(true);
        const parsedUser = JSON.parse(user);
        setUserData({
          name: parsedUser.name || "User",
          id: parsedUser.id || "",
          profileImage: parsedUser.profileImage || "/default-profile.png",
          phone: parsedUser.phone || "",
        });

        // Fetch latest profile data
        try {
          const profileResponse = await fetchMyProfile();
          if (profileResponse?.success && profileResponse.data) {
            const profileData = profileResponse.data;
            setUserData(prev => ({
              ...prev,
              name: profileData.name || prev.name,
              profileImage: profileData.profileImage || prev.profileImage,
              phone: profileData.phone || prev.phone,
            }));
            
            // Update cookie with latest data
            Cookies.set("user", JSON.stringify({
              ...parsedUser,
              name: profileData.name || parsedUser.name,
              profileImage: profileData.profileImage || parsedUser.profileImage,
              phone: profileData.phone || parsedUser.phone,
            }));
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setIsLoggedIn(false);
        setUserData({
          name: "Guest",
          id: "",
          profileImage: "/default-profile.png",
          phone: "",
        });
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (langCode, langName) => {
    setLanguage(langCode);
    setSelectedLanguage(langName);
    forceUpdate();
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserData({
      name: "Guest",
      id: "",
      profileImage: "/default-profile.png",
      phone: "",
    });
    router.push("/");
  };

  // Handle login
  const handleLogin = () => {
    router.push("/User/login");
  };

  // Toggle side menu
  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageUpdate = () => {
      const currentLang = getLanguage();
      const langMap = { en: "English", hi: "हिंदी", kn: "ಕನ್ನಡ" };
      setSelectedLanguage(langMap[currentLang] || "English");
      forceUpdate();
    };

    // Listen for custom language change events
    window.addEventListener('languageChanged', handleLanguageUpdate);
    return () => window.removeEventListener('languageChanged', handleLanguageUpdate);
  }, [forceUpdate]);

  return (
    <>
      {/* Custom Header */}
      <CustomHeader
        isLoggedIn={isLoggedIn}
        userData={userData}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onLoginPress={handleLogin}
        onLogout={handleLogout}
        onMenuPress={toggleSideMenu}
      />

      {/* Side Menu */}
      <SideMenu
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        userData={userData}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onLoginPress={handleLogin}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
