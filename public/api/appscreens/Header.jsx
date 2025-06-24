"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { fetchMyProfile } from "../services/centralApi";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faCommentDots,
  faHeart,
  faCalendarDay,
  faStar,
  faFileAlt,
  faBlog,
  faWallet,
  faUser,
  faHistory,
  faCog,
  faQuestionCircle,
  faSync,
  faPlus,
  faArrowRight,
  faMobileAlt,
  faCreditCard,
  faUniversity,
  faMoneyBillWave,
  faPray,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faApple,
  faYoutube,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    id: "",
    profileImage: "/default-profile.png",
    phone: "",
  });
  const [walletOpen, setWalletOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const router = useRouter();

  // Menu items with Font Awesome icons
  const menuItems = [
    { id: 1, title: "Home", path: "/", icon: faHome },
    { id: 2, title: "AI Chat", path: "/chatbot", icon: faCommentDots },
    { id: 3, title: "Compatibility", path: "/compatibility", icon: faHeart },
    { id: 4, title: "Panchang", path: "/panchanga", icon: faCalendarDay },
    { id: 5, title: "Horoscope", path: "/horoscope", icon: faStar },
    { id: 6, title: "Reports", path: "/guidance-report", icon: faFileAlt },
    { id: 7, title: "Blogs", path: "/blog", icon: faBlog },
    ...(isLoggedIn
      ? [
          { id: 8, title: "Wallet", path: "/wallet/page", icon: faWallet },
          { id: 9, title: "Profile", path: "/profile/page", icon: faUser },
          { id: 10, title: "Chat History", path: "/chat-history", icon: faHistory },
          { id: 11, title: "Settings", path: "/settings", icon: faCog },
        ]
      : []),
    { id: 12, title: "FAQs", path: "/faqs", icon: faQuestionCircle },
  ];

  // Social links with brand-specific Font Awesome icons
  const socialLinks = [
    { id: 1, icon: faApple, link: "#", ariaLabel: "Apple" },
    { id: 2, icon: faGlobe, link: "#", ariaLabel: "Website" },
    { id: 3, icon: faYoutube, link: "#", ariaLabel: "YouTube" },
    { id: 4, icon: faFacebook, link: "#", ariaLabel: "Facebook" },
    { id: 5, icon: faInstagram, link: "#", ariaLabel: "Instagram" },
    { id: 6, icon: faLinkedin, link: "#", ariaLabel: "LinkedIn" },
  ];

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      const user = Cookies.get("user");

      if (token && user) {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setUserData({
          username: parsedUser.name || "Guest",
          id: parsedUser.id || "N/A",
          profileImage: "/default-profile.png",
          phone: "",
        });

        try {
          const profileResponse = await fetchMyProfile();
          const zodiacSign = profileResponse?.data?.userProfile?.image;
          const profileImage = zodiacSign || "/default-profile.png";
          const phone = profileResponse?.data?.userProfile?.phone;
          const username= profileResponse?.data?.astroProfile?.name;
          setUserData((prev) => ({
            ...prev,
            username,
            phone: phone || "",
            profileImage,
          }));
        } catch (apiError) {
          console.error("Error fetching profile data:", apiError);
        }
      } else {
        setIsLoggedIn(false);
        setUserData({ name: "", id: "", profileImage: "/default-profile.png", phone: "" });
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setIsLoggedIn(false);
      setUserData({ name: "", id: "", profileImage: "/default-profile.png", phone: "" });
    }
  };

  // Handle scroll effect and user data fetching
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    fetchUserData();

    const handleRouteChange = () => {
      fetchUserData();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    const cookieCheckInterval = setInterval(() => {
      const token = Cookies.get("token");
      const user = Cookies.get("user");
      if ((token && user && !isLoggedIn) || (!token && !user && isLoggedIn)) {
        fetchUserData();
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.events.off("routeChangeComplete", handleRouteChange);
      clearInterval(cookieCheckInterval);
    };
  }, [router.events, isLoggedIn]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const walletButton = document.getElementById("wallet-button");
      const walletDropdown = document.getElementById("wallet-dropdown");
      const languageButton = document.getElementById("language-button");
      const languageDropdown = document.getElementById("language-dropdown");
      if (
        walletOpen &&
        walletButton &&
        walletDropdown &&
        !walletButton.contains(event.target) &&
        !walletDropdown.contains(event.target)
      ) {
        setWalletOpen(false);
      }
      if (
        languageOpen &&
        languageButton &&
        languageDropdown &&
        !languageButton.contains(event.target) &&
        !languageDropdown.contains(event.target)
      ) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [walletOpen, languageOpen]);

  // Handle navigation
  const handleNavigation = (path) => {
    if (path.startsWith("#")) {
      const id = path.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(path);
    }
    setIsOpen(false);
  };

  // Handle login
  const handleLoginClick = () => {
    const currentPath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.hash
        : "/";
    router.push(`/User/login?redirect=${encodeURIComponent(currentPath)}`);
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserData({ name: "", id: "", profileImage: "/default-profile.png", phone: "" });
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 w-full bg-[#FFF2E2] z-50 px-4 py-0 flex justify-between items-center ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex items-center">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="text-black mr-3 cursor-pointer "
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
              <span className="sr-only">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-[#FFF2E2] p-0">
            <div className="flex flex-col h-full">
              {/* User Profile Section */}
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
    <div className="w-[100px] md:w-[240px] relative aspect-[963/512]">
      <Image
        src={userData.profileImage || "/default-profile.png"}
        alt="AstroAnswer Logo"
        fill
        priority
        className="object-contain"
      />
    </div>

                  <div>
                    <h3 className="font-semibold text-lg">{userData.username || "Guest"}</h3>
                    <p className="text-sm text-gray-600">+91-{userData.phone || "Not logged in"}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto ">
                {menuItems.length > 0 ? (
                  menuItems.map((item) =>
                    item.path.startsWith("http") ? (
                      <a href={item.path} key={item.id} aria-label={item.title}>
                        <button className="w-full flex items-center  px-4 py-1 hover:bg-white/50 transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="text-[#FF9933]"
                              size="sm"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="text-gray-800">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2  rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </a>
                    ) : (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.path)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/50 transition-colors cursor-pointer"
                        aria-label={item.title}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="text-[#FF9933]"
                            size="sm"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-gray-800">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  )
                ) : (
                  <p className="px-4 py-3 text-gray-600">No menu items available</p>
                )}
              </div>
              {/* Social Links & Version */}
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Also available on</p>
                <div className="flex gap-4 mb-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.link}
                      className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center"
                      aria-label={social.ariaLabel}
                    >
                      <FontAwesomeIcon
                        icon={social.icon}
                        className="text-[#FF9933]"
                        size="sm"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Version 0.1</p>
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-[#FF9933] to-[#FF5733] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity !rounded-button cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUser} size="sm" aria-hidden="true" />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-[#FF6D3F]"
          >
            <Image
              src="/logo.png"
              alt="AstroAnswer Logo"
              width={340}
              height={340}
              className="rounded-full relative -left-4"
            />
          </Link>
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 ml-6">
          {menuItems
            .filter((item) => !["Wallet", "Profile", "Chat History", "Settings"].includes(item.title))
            .map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="text-gray-800 hover:text-[#FF9933] transition-colors"
              >
                {item.title}
              </Link>
            ))}
        </nav>
      </div>
      {/* Right Side Actions */}
      <div className="flex items-center ">
        {/* Wallet Button and Dropdown */}
        <div className="relative -left-2">
          <Button
            id="wallet-button"
            variant="ghost"
            size="icon"
            className="text-black cursor-pointer"
            onClick={() => setWalletOpen(!walletOpen)}
            aria-label="Wallet"
          >
            <FontAwesomeIcon icon={faWallet} size="lg" aria-hidden="true" />
          </Button>
          {walletOpen && (
            <div
              id="wallet-dropdown"
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
              style={{
                boxShadow: "0 0 0 100vmax rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Available Balance</span>
                  <button
                    className="text-xs text-[#FF9933] cursor-pointer flex items-center gap-1"
                    aria-label="Refresh balance"
                  >
                    <FontAwesomeIcon icon={faSync} size="xs" aria-hidden="true" />
                    Refresh
                  </button>
                </div>
                <div className="text-2xl font-semibold text-gray-900">₹2,450.00</div>
              </div>
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Transactions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                        <FontAwesomeIcon
                          icon={faPray}
                          className="text-[#FF9933]"
                          size="sm"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Pooja Booking</p>
                        <p className="text-xs text-gray-500">May 16, 2025</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-red-500">-₹500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                        <FontAwesomeIcon
                          icon={faMoneyBillWave}
                          className="text-[#FF9933]"
                          size="sm"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Added Money</p>
                        <p className="text-xs text-gray-500">May 15, 2025</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-500">+₹1000</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      id="add-money-button"
                      className="w-full mb-2 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white !rounded-button cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="mr-2"
                        size="sm"
                        aria-hidden="true"
                      />
                      Add Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-gray-900">
                        Add Money to Wallet
                      </DialogTitle>
                      <DialogDescription className="text-sm text-gray-500">
                        Enter amount and select payment method to proceed.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="amount"
                          className="text-sm font-medium text-gray-700"
                        >
                          Amount (₹)
                        </label>
                        <input
                          id="amount"
                          type="number"
                          min="100"
                          step="100"
                          placeholder="Enter amount"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { method: "UPI", icon: faMobileAlt },
                            { method: "Card", icon: faCreditCard },
                            { method: "Net Banking", icon: faUniversity },
                            { method: "Wallet", icon: faMoneyBillWave },
                          ].map(({ method, icon }) => (
                            <div
                              key={method}
                              className="flex items-center justify-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-[#FF9933] hover:bg-[#FFE5CC] transition-colors"
                            >
                              <FontAwesomeIcon
                                icon={icon}
                                className="mr-2 text-[#FF9933]"
                                size="sm"
                                aria-hidden="true"
                              />
                              <span className="text-sm">{method}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => document.querySelector("dialog")?.close()}
                        className="!rounded-button cursor-pointer"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white !rounded-button cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="mr-2"
                          size="sm"
                          aria-hidden="true"
                        />
                        Proceed to Payment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <a
                  href="#"
                  id="view-transactions-link"
                  className="block text-center text-sm text-[#FF9933] hover:underline"
                >
                  View All Transactions
                </a>
              </div>
            </div>
          )}
        </div>
        {/* Language Button and Dropdown */}
        <div className="relative -left-0">
          <Button
            id="language-button"
            variant="ghost"
            size="icon"
            className="text-black cursor-pointer"
            onClick={() => setLanguageOpen(!languageOpen)}
            aria-label="Select language"
          >
            <FontAwesomeIcon icon={faGlobe} size="lg" aria-hidden="true" />
          </Button>
          {languageOpen && (
            <div
              id="language-dropdown"
              className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-700">Select Language</h3>
              </div>
              {[
                { code: "en", name: "English", native: "English" },
                { code: "hi", name: "Hindi", native: "हिंदी" },
                { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  className={`w-full px-4 py-2 text-left hover:bg-[#FFE5CC] flex items-center justify-between ${
                    selectedLanguage === lang.name ? "bg-[#FFE5CC] text-[#FF9933]" : "text-gray-700"
                  } cursor-pointer`}
                  onClick={() => {
                    setSelectedLanguage(lang.name);
                    setLanguageOpen(false);
                  }}
                  aria-label={`Select ${lang.name}`}
                >
                  <span className="text-sm">{lang.name}</span>
                  <span className="text-sm">{lang.native}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {/* User Name or Login Button */}
        <div className="relative -right-1">
          {isLoggedIn ? (
            <Link href="/profile/page" aria-label="User profile">
        <div className=" border-b border-gray-200">
  <div className="flex items-center">
    <Image
      src={userData.profileImage || "/default-profile.png"}
      alt="User Profile"
      width={52}
      height={52}
className="h-12 w-12 rounded-full object-cover border-2 border-[#FF9933] shrink-0 !aspect-square"      onError={() => console.error("Failed to load profile image")} // Debug image loading issues
    />
    <div>
    </div>
  </div>
</div>
            </Link>
          ) : (
            <Button
              onClick={handleLoginClick}
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-medium px-4 py-2 rounded-lg"
            >
              Login / Signup
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;