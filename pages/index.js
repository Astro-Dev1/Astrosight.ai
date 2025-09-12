// File: components/HomeMobileScreen.jsx

'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BlogsSection from '../components/BlogsSection';
import CompanionsSection from '../components/TodaysPanchang';
import TestimonialsSection from '../components/DailyHoroscope';
import CustomHeader from '../components/CustomHeader';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import Head from 'next/head';
import Cookies from "js-cookie";
import { ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import { OnlineAstrologyArticle } from '../components/DailySignArticle';
// import ExpertNetworkHumanConnection from '../components/expert-network-human-connection/index';
import AIChatHomepage from '../components/ai-chat-homepage/index';

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
        <SEOHead 
          title="AstroSight - Expert Vedic Astrology Consultations & Horoscopes"
          description="Get personalized Vedic astrology readings, accurate horoscopes, and spiritual guidance from experienced astrologers. Discover your life path through ancient astrological wisdom."
          canonical="https://astrosight.ai"
        />
        <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17273163672"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17273163672');
          `
        }}></script>
        {/* Favicon */}
        <link rel="icon" href="/4.png" type="image/png" />
  
         <script
    src={`https://www.google.com/recaptcha/api.js`}
    async
    defer
  ></script>
        {/* Page Title and Meta Tags */}
        <title>AstroSight - Expert Vedic Astrology Consultations & Horoscopes</title>
        <meta
          name="description"
          content="Get personalized Vedic astrology readings, accurate horoscopes, and spiritual guidance from experienced astrologers. Discover your life path through ancient astrological wisdom."
        />
        <meta
          name="keywords"
          content="Vedic astrology, astrology consultation, horoscope reading, birth chart analysis, spiritual guidance, zodiac compatibility, astrological remedies, Indian astrology"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Astro Sight - Professional Vedic Astrology Services" />
        <meta
          property="og:description"
          content="Transform your life with expert Vedic astrology consultations. Get accurate readings, personalized guidance, and spiritual solutions."
        />
        <meta property="og:url" content="https://astrosight.ai" />
        <meta property="og:image" content="https://astrosight.ai/images/home-cover.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Astro Sight - Expert Vedic Astrology Services" />
        <meta
          name="twitter:description"
          content="Experience transformative Vedic astrology readings with professional consultations and spiritual guidance."
        />
        <meta name="twitter:image" content="https://astrosight.ai/images/home-cover.jpg" />
        <meta name="facebook-domain-verification" content="v1wzt5pr5bady8hkk5foyu029cgxpr" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://astrosight.ai" />

        {/* Structured Data for Homepage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Astro Sight",
            description: "Professional Vedic astrology services and consultations",
            url: "https://astrosight.ai",
            logo: {
              "@type": "ImageObject",
              url: "https://astrosight.ai/logo.png"
            },
            sameAs: [
              "https://facebook.com/astrosight.ai",
              "https://twitter.com/astrosight.ai",
              "https://instagram.com/astrosight.ai"
            ],
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://astrosight.ai"
            },
          })}
        </script>
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
      isHomePage={true} 
      showSideMenu={true}
      showWallet={false}
      onSideMenuPress={() => setIsSideMenuOpen(true)}
    />
    
    <SideMenu 
      isOpen={isSideMenuOpen} 
      onClose={() => setIsSideMenuOpen(false)}
    />
    
    <div className=" bg font-poppins min-h-screen pt-10"> {/* Added pt-16 for header spacing */}
 
        <section className="bg-white w-full pt-7 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <HeroSection />
          </div>
      
        </section>
        <section className="bg-white w-full pt-7 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <AIChatHomepage />
          </div>
      
        </section>
        <section className="bg-white w-full animate-pulse relative z-10">
          <div className="max-w-7xl mx-auto justify-center  sm:px-6 lg:px-8 py-3">
            <ServicesSection />
          </div>
        </section>

        <section className="bg-white animate-pulse w-full">
          <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-10">
            <BlogsSection />
          </div>
        </section> 
      <section className="animate-pulse w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <CompanionsSection />
          </div>
        </section>
              <section className="animate-pulse w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <OnlineAstrologyArticle/>
        </div>
        </section>
        {/* Internal Link Components */}
        <section className=" w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            {/* All Compatibility Combinations */}
            <CompatibilityLinksGrid />
            
            {/* All Horoscope Navigation */}
            <HoroscopeNavigation />
            
            {/* Recent Blog Links */}
            <RecentBlogLinks limit={20} />
            <ReportLinksGrid/>
          </div>
        </section> 

  

        {isLoggedIn && (
          <section className="bg-white animate-pulse w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <TestimonialsSection />
            </div>
          </section>
        )}

          <div className="bg-[#f46434]  mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        
        </div></div></>
  );
};

export default HomeMobileScreen;
