import React from 'react';

import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import Footer from '../../components/Footer';
import Panchanga from '../../components/panchanga';
import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import {TodayPanchangArticle} from '../../components/DailySignArticle';
import Head from 'next/head';

// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import Image from 'next/image';
// import Link from 'next/link';
export default function PanchangaPage() {
  // State for side menu
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  
  // const blurDataURL = '../../public/'
  return (
    <>
      <SEOHead
        title="Panchanga - Daily Hindu Calendar & Auspicious Timings"
        description="Access daily Panchanga calculations for Tithi, Nakshatra, Yoga, Karana, and Vara. Get accurate Hindu calendar timings, muhurat, and auspicious periods for your location."
        keywords="Panchanga, Hindu calendar, Tithi, Nakshatra, Yoga, Karana, Vara, muhurat, auspicious timing, Vedic astrology, Hindu astronomy"
        canonical="https://astrosight.ai/panchanga"
        ogImage="https://astrosight.ai/images/panchanga-cover.jpg"
      />
      

      <Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://astrosight.ai/panchanga",
        "name":  "Daily Panchanga - AstroSight",
        "description": "Check today's Panchanga – Tithi, Nakshatra, Yoga, and more on AstroSight.",
        "publisher": {
          "@type": "Organization",
          "name": "AstroSight",
          "url": "https://astrosight.ai",
          "logo": {
            "@type": "ImageObject",
            "url": "https://astrosight.ai/logo.png"
          }
        },
        "image": "https://astrosight.ai/images/panchanga-cover.jpg",
       "datePublished": new Date().toISOString().split('T')[0],
        "dateModified": new Date().toISOString().split('T')[0],
        "inLanguage": "en",
        "mainEntity": {
          "@type": "Article",
          "headline":  "Daily Panchanga - AstroSight",
          "description":  "Get accurate Panchanga updates – Tithi, Nakshatra, Yoga, Karana, and more.",
          "image": "https://astrosight.ai/images/panchanga-cover.jpg",
          "author": {
            "@type": "Person",
            "name": "AstroSight Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "AstroSight",
            "logo": {
              "@type": "ImageObject",
              "url": "https://astrosight.ai/logo.png"
            }
          },
          "datePublished": new Date().toISOString().split('T')[0],
          "dateModified": new Date().toISOString().split('T')[0],
          "inLanguage": "en"
        }
      }),
    }}
  />
</Head>


      <CustomHeader 
        title="Panchanga"
        showBackButton={true}
        showSideMenu={true}
        onSideMenuPress={() => setIsSideMenuOpen(true)}
      />
      
      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)}
      />

      <div className="max-w-7xl mx-auto pt-16 bg-orange-50">
        <main className="flex-grow">
          <Panchanga />
        </main>
        <TodayPanchangArticle/>
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}