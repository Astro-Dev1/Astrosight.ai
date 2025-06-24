// File: components/HomeMobileScreen.jsx

'use client';

import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BlogsSection from '../components/BlogsSection';
import CompanionsSection from '../components/TodaysPanchang';

import TestimonialsSection from '../components/DailyHoroscope';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

const HomeMobileScreen = () => {
  

  return (<>
        <Head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
  
         <script
    src={`https://www.google.com/recaptcha/api.js`}
    async
    defer
  ></script>
        {/* Page Title and Meta Tags */}
        <title>AstroAnswer - Expert Vedic Astrology Consultations & Horoscopes</title>
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
        <meta property="og:title" content="Astro Answer - Professional Vedic Astrology Services" />
        <meta
          property="og:description"
          content="Transform your life with expert Vedic astrology consultations. Get accurate readings, personalized guidance, and spiritual solutions."
        />
        <meta property="og:url" content="https://astroanswer.co" />
        <meta property="og:image" content="https://astroanswer.co/images/home-cover.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Astro Answer - Expert Vedic Astrology Services" />
        <meta
          name="twitter:description"
          content="Experience transformative Vedic astrology readings with professional consultations and spiritual guidance."
        />
        <meta name="twitter:image" content="https://astroanswer.co/images/home-cover.jpg" />
        <meta name="facebook-domain-verification" content="v1wzt5pr5bady8hkk5foyu029cgxpr" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://astroanswer.co" />

        {/* Structured Data for Homepage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Astro Answer",
            description: "Professional Vedic astrology services and consultations",
            url: "https://astroanswer.co",
            logo: {
              "@type": "ImageObject",
              url: "https://astroanswer.co/logo.png",
            },
            sameAs: [
              "https://facebook.com/astroanswer",
              "https://twitter.com/astroanswer",
              "https://instagram.com/astroanswer",
            ],
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://astroanswer.co",
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
  
    <Header   />
    <div className=" bg-orange-50 font-poppins min-h-screen "> {/* pt-16 = 64px */}
 
        <section className="bg-white w-full pt-7">
          <div className="max-w-auto mx-auto xl:px-[25px] 2xl:px-[350px] py-2">
            <HeroSection />
          </div>
        </section>

         <section className="bg-[#] w-full  relative z-10">
          <div className="max-w-auto mx-auto px-4 sm:px-6 md:px-10 lg:px-[120px] xl:px-[250px] 2xl:px-[350px] py-10">
            <ServicesSection />
          </div>
        </section> 

         <section className="bg-white w-full">
          <div className="max-w-auto mx-auto px-4 sm:px-6 md:px-10 lg:px-[120px] xl:px-[250px] 2xl:px-[350px] py-10">
            <BlogsSection />
          </div>
        </section> 

        <section className=" w-full">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[120px] xl:px-[250px] 2xl:px-[350px] py-10">
            <CompanionsSection />
          </div>
        </section>

        <section className="bg-white w-full">
          <div className="w-full mx-auto  sm:px-6 md:px-10 lg:px-[120px] xl:px-[250px] 2xl:px-[350px] py-10">
            <TestimonialsSection />
          </div>
        </section>

            <Footer />
        
        </div></div></>
  );
};

export default HomeMobileScreen;
