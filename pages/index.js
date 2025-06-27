// AstroSight Homepage - Expert Vedic Astrology Services (HomeScreen Pattern)

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BlogsSection from '../components/BlogsSection';
import CompanionsSection from '../components/TodaysPanchang';
import TestimonialsSection from '../components/DailyHoroscope';
import Layout from '../components/Layout';
import Head from 'next/head';
import Script from 'next/script';
import { t } from '../locales/i18n';

const HomePage = () => {
  const router = useRouter();

  return (
    <Layout 
      titleImage="/logo.png"
      showBackButton={false}
      showSideMenu={true}
      showWallet={true}
      showLanguage={true}
      showProfile={true}
    >
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
        
        {/* Google Fonts - Devanagari */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Kohinoor+Devanagari:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Google reCAPTCHA */}
        {/* Moved to Script components below */}
        
        {/* Primary Meta Tags */}
        <title>{t('homepage.title')}</title>
        <meta
          name="description"
          content={t('homepage.description')}
        />
        <meta
          name="keywords"
          content={t('homepage.keywords')}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('homepage.og_title')} />
        <meta
          property="og:description"
          content={t('homepage.og_description')}
        />
        <meta property="og:url" content="https://astrosight.co" />
        <meta property="og:image" content="https://astrosight.co/images/home-cover.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('homepage.twitter_title')} />
        <meta
          property="twitter:description"
          content={t('homepage.twitter_description')}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AstroSight - Expert Vedic Astrology Services" />
        <meta
          name="twitter:description"
          content="Experience transformative Vedic astrology readings with professional consultations and spiritual guidance at AstroSight."
        />
        <meta name="twitter:image" content="https://astrosight.co/images/home-cover.jpg" />
        <meta name="facebook-domain-verification" content="v1wzt5pr5bady8hkk5foyu029cgxpr" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://astrosight.co" />

        {/* Structured Data for Homepage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AstroSight",
            description: "Professional Vedic astrology services and consultations",
            url: "https://astrosight.co",
            logo: {
              "@type": "ImageObject",
              url: "https://astrosight.co/logo.png",
            },
            sameAs: [
              "https://facebook.com/astrosight",
              "https://twitter.com/astrosight",
              "https://instagram.com/astrosight",
            ],
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://astrosight.co",
            },
          })}
        </script>
        
        {/* Facebook Pixel - Moved to Script component below */}
      </Head>

      <div className="min-h-screen bg-[#FFF2E2]" style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}>
        <main className="bg-[#FFF2E2] font-poppins" style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}>
          {/* Hero Section - HomeScreen Pattern */}
          <section className="bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <HeroSection />
            </div>
          </section>

          {/* Services Section - HomeScreen Pattern */}
          <section className="bg-[#FFF2E2] w-full relative z-10">
            <div className="">
              <ServicesSection />
            </div>
          </section> 

          {/* Blogs Section */}
          <section className="bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <BlogsSection />
            </div>
          </section> 

          {/* Panchang Section */}
          <section className="bg-[#FFF2E2] w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <CompanionsSection />
            </div>
          </section>

          {/* Daily Horoscope Section */}
          <section className="bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <TestimonialsSection />
            </div>
          </section>
        </main>
      </div>

      {/* External Scripts using Next.js Script component */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="afterInteractive"
      />
      
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
      >
        {`
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
        `}
      </Script>
      
      {/* Facebook Pixel NoScript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1398367034680721&ev=PageView&noscript=1"
        />
      </noscript>
    </Layout>
  );
};

export default HomePage;
