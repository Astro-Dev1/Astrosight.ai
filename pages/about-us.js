import CustomHeader from '../components/CustomHeader'
import SideMenu from '../components/SideMenu'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import JsonLdSchema from '../components/JsonLdSchema'
import * as React from "react"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PhoneCall, FileText, Users, Cog, Megaphone, Star } from 'lucide-react'
// import Head from 'next/head'
import Section from '../components/Section'
import CustomLinkButton from '../components/CustomContainer'

// Import translations directly to avoid SSR issues
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import knTranslations from '../locales/kn.json';

const translations = {
  en: enTranslations,
  hi: hiTranslations,
  kn: knTranslations,
};

export default function AboutUs() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("Mounted:", mounted,isLoggedIn);
  const [userData, setUserData] = useState(null);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Language helper functions
  const getLanguage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  };

  const setLanguage = (languageCode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', languageCode);
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: languageCode }));
    }
  };

  const t = (key, fallback = key) => {
    const translation = translations[currentLanguage];
    
    if (!translation) {
      return fallback;
    }
    
    // Handle nested keys (e.g., "aboutUs")
    const keys = key.split('.');
    let value = translation;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
    
    return typeof value === 'string' ? value : fallback;
  };

  // Initialize component state
  useEffect(() => {
    setMounted(true);
    setCurrentLanguage(getLanguage());
    checkAuthStatus();
    
    // Listen for language changes
    const handleLanguageChange = () => {
      setCurrentLanguage(getLanguage());
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', handleLanguageChange);
      return () => window.removeEventListener('languageChanged', handleLanguageChange);
    }
  }, []);

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

  // Handle language change
  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setCurrentLanguage(languageCode);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChanged'));
    }
  };

  return (
    <>
      {/* SEO Optimization */}
      <SEOHead 
        title="About AstroSight - Expert Vedic Astrology Team & Services"
        description="Meet AstroSight's expert Vedic astrologers led by Dr. Ananthapadmanabha. Learn about our mission, personalized astrology services, and approach to providing authentic astrological guidance."
        keywords="AstroSight, Vedic astrology, Dr. Ananthapadmanabha, astrology consultation, birth chart analysis, horoscope reading, Jyotish experts, spiritual guidance, astrology services"
        canonical="https://astrosight.ai/about-us"
        ogImage="https://astrosight.ai/images/about-cover.jpg"
        ogType="website"
      />
      
      {/* JSON-LD Structured Data */}
      <JsonLdSchema 
        type="AboutPage"
        data={{
          name: "About AstroSight",
          description: "Learn about our expert Vedic astrology team and services",
          mainEntityOfPage: {"@type": "WebPage", "@id": "https://astrosight.ai/about-us"},
          publisher: {"@type": "Organization", "name": "AstroSight", "logo": {"@type": "ImageObject", "url": "https://astrosight.ai/logo.png"}},
          employee: {"@type": "Person", "name": "Dr. Ananthapadmanabha", "jobTitle": "Chief Astrologer", "description": "Ph.D. in Vedic Astrology, honored with Rabindra Ratna Puraskar"}
        }}
      />
      
      <div className="min-h-screen bg-[#FFF2E2]">
        <main className="pt-16">{/* Content continues... */}
     
   
  {/* Custom Header */}
      <CustomHeader
        title={t('header.about') || 'About Us'}
        showBackButton={true}
        showSideMenu={false}
        showWallet={true}
        showLanguage={true}
        showProfile={true}
        onSideMenuPress={() => setSideMenuVisible(true)}
        onWalletPress={() => router.push('/wallet/page')}
        onLanguagePress={() => setIsLanguageModalOpen(true)}
        onProfilePress={() => router.push('/profile/page')}
        backgroundColor="bg-[#FFF2E2]"
        textColor="text-[#FF6D3F]"
        iconColor="#FF6D3F"
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
      <div className="bg-orange-50 text-gray-900">
        <div className="bg-orange-50 text-gray-900">
          <Section title={t('aboutUs') || 'About AstroSight'}>
            <h2 className="text-2xl font-semibold mb-4 text-orange-700">{t('ourMission') || 'Our Mission'}</h2><p className="text-xl text-orange-700 max-w-3xl mx-auto">
              At AstroSight, we are passionately committed to unlocking the mysteries of the cosmos to empower individuals on their life journeys. 
              Our mission is to provide personalized astrological insights that not only explain the influence of celestial movements on your life but also offer actionable remedies and practical advice. 
              We believe that understanding the stars is the first step towards personal growth, clarity in decision-making, and achieving life goals.
              Our goal is to make astrology accessible, meaningful, and practical for modern life. Whether you&apos;re seeking guidance for your career, relationships, health, or personal development, AstroSight is here to illuminate your path.
            </p>
          </Section>

          <Section title="Our Services">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-orange-100 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <PhoneCall className="mr-2" />1:1 Call Consultations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700">Experience one-on-one sessions with our expert astrologer, designed to provide you with an in-depth understanding of your birth chart. These sessions offer personalized remedies and insights into the challenges and opportunities that lie ahead of you in your life.</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-100 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <FileText className="mr-2" />Personalized Astrological Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700">The Guidance Report is much more than a horoscope. It&apos;s a comprehensive, solution-focused document tailored specifically to your unique queries giving you remedies to your particular queries. This report combines the art of traditional Vedic astrology with actionable remedies.</p>
                </CardContent>
              </Card>
            </div>
          </Section>
          
          <div className="container mx-auto px-4 py-12">
            <CustomLinkButton headline="Welcome to AstroSight" buttonText="Explore Now" buttonPath="/horoscope" />
          </div>
          
          <Section title="Our Team">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Astrological Team", icon: <Users className="mb-2" />, description: "Our team of experienced astrologers brings diverse expertise to address various life concerns, ensuring tailored guidance for every client." },
                { title: "Technical Team", icon: <Cog className="mb-2" />, description: "Behind the scenes, our technical experts ensure a flawless user experience. From website management to booking systems and data security, they ensure our platform is efficient, reliable, and secure." },
                { title: "Marketing Team", icon: <Megaphone className="mb-2" />, description: "AstroSight&apos;s marketing team bridges the gap between ancient wisdom and modern awareness. They create informative content, engaging campaigns, and resources that showcase astrology&apos;s relevance in today&apos;s fast-paced world." },
                { title: "Operations Team", icon: <Star className="mb-2" />, description: "Our operations team is the backbone of our seamless services. They handle bookings, client inquiries, and post-service support to ensure every interaction with AstroSight is smooth and satisfactory." }
              ].map((team, index) => (
                <Card key={index} className="bg-orange-100 border-orange-200 text-center">
                  <CardContent className="pt-6">
                    {team.icon}
                    <h3 className="font-semibold mb-2 text-orange-800">{team.title}</h3>
                    <p className="text-orange-700">{team.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Why Choose AstroSight">
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "Expert Astrologers: Benefit from the profound knowledge and experience of a team led by a Ph.D. in Vedic astrology.",
                "Tailored Guidance: Every service is personalized to address your unique challenges and aspirations.",
                "Modern Accessibility: Seamlessly delivered digital reports and consultations ensure astrology fits into your lifestyle.",
                "Affordable Remedies: Our practical remedies are easy to follow and cost-effective, designed for results without stress.",
                "Holistic Support: With a loyal team of astrologers, technical experts, and operations staff, you&apos;re supported every step of the way."
              ].map((reason, index) => (
                <li key={index} className="flex items-center bg-orange-100 p-4 rounded-lg">
                  <Star className="text-orange-500 mr-2 flex-shrink-0" />
                  <span className="text-orange-700">{reason}</span>
                </li>
              ))}
            </ul>
          </Section>
          
          <Section title="Contact Us">
            <Card className="bg-orange-100 border-orange-200">
              <CardContent className="p-6">
                <p className="text-orange-700 text-center mb-4">Ready to explore your cosmic path? Let AstroSight guide you through the stars with precision, care, and expertise.</p>
                <ul className="list-disc list-inside text-orange-700 mb-4">
                  <li>WhatsApp: 9964128377</li>
                  <li>Email: astrosight.co@gmail.com</li>
                </ul>                <p className="text-orange-700 text-center mb-4">We&apos;re here for you Monday to Saturday, from 9:00 AM to 6:00 PM, to answer your questions and assist you with bookings. Discover the wisdom of the cosmos with AstroSight. Let&apos;s embark on a transformative journey together!</p>
                <div className="flex justify-center">                  <Button className="bg-green-500 hover:bg-orange-600 text-white">{t('getInTouch') || 'Get in Touch'}</Button>
                </div>
              </CardContent>            </Card>
          </Section>
        </div>
      </div>
      </main>

      {/* Footer */}
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
              <h3 className="text-lg font-semibold text-gray-800">Language</h3>
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
                {currentLanguage === lang.code && (
                  <span className="text-orange-500 text-xl">✓</span>
                )}
              </button>
            ))}
            
            <div className="p-4 border-t border-gray-200 text-center bg-gray-50 rounded-b-xl"> 
              <button 
                className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                onClick={() => setIsLanguageModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}
