// File: components/HomeMobileScreen.jsx

'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BlogsSection from '../components/BlogsSection';
// import CompanionsSection from '../components/TodaysPanchang';
import TestimonialsSection from '../components/DailyHoroscope';
import CustomHeader from '../components/CustomHeader';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import Head from 'next/head';
import Cookies from "js-cookie";
import SEOHead from '../components/SEOHead';
import JsonLdSchema from '../components/JsonLdSchema';

const HomeMobileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const user = Cookies.get("user");
    const token = Cookies.get("token");
    if (user && token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (<>
        {/* SEO Optimization */}
        <SEOHead 
          title="AstroSight - Expert Vedic Astrology Consultations & Horoscopes"
          description="Get personalized Vedic astrology readings, accurate horoscopes, and spiritual guidance from experienced astrologers. Discover your life path through ancient astrological wisdom."
          keywords="Vedic astrology, astrology consultation, horoscope reading, birth chart analysis, spiritual guidance, zodiac compatibility, astrological remedies, Indian astrology, AI astrology, online astrologer"
          canonical="https://astrosight.ai"
          ogImage="https://astrosight.ai/images/home-cover.jpg"
          ogType="website"
        />
        
        {/* JSON-LD Structured Data */}
        <JsonLdSchema 
          type="WebApplication"
          data={{
            name: "AstroSight",
            description: "Professional AI-powered Vedic astrology platform for consultations, horoscopes, and spiritual guidance",
            url: "https://astrosight.ai",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              description: "Free horoscope readings and premium consultation services"
            }
          }}
        />
        
        {/* Third-party Scripts */}
        <Head>
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17273163672"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17273163672');
            `
          }}></script>
          
          {/* reCAPTCHA */}
          <script
            src="https://www.google.com/recaptcha/api.js"
            async
            defer
          ></script>
          
          {/* Facebook Pixel */}
          <meta name="facebook-domain-verification" content="v1wzt5pr5bady8hkk5foyu029cgxpr" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1398367034680721');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1398367034680721&ev=PageView&noscript=1"
            />
          </noscript>
        </Head>
  <div>
    <CustomHeader 
      title="AstroSight"
      titleImage="/log.png"
      showBackButton={false}
      showSideMenu={true}
      showWallet={false}
      showProfile={true}
      onSideMenuPress={() => setIsSideMenuOpen(true)}
    />
    
    <SideMenu 
      isOpen={isSideMenuOpen} 
      onClose={() => setIsSideMenuOpen(false)}
    />
    
    <div className=" bg-orange-50 font-poppins min-h-screen pt-16"> {/* Added pt-16 for header spacing */}
 
        <section className="bg-white w-full pt-7 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <HeroSection />
          </div>
        </section>

        <section className="bg-[#FFF2E2] w-full animate-pulse relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ServicesSection />
          </div>
        </section>

        <section className="bg-white animate-pulse w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <BlogsSection />
          </div>
        </section> 

        {/* <section className="animate-pulse w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <CompanionsSection />
          </div>
        </section> */}

        {isLoggedIn && (
          <section className="bg-white animate-pulse w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <TestimonialsSection />
            </div>
          </section>
        )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        
        </div></div></>
  );
};

export default HomeMobileScreen;
