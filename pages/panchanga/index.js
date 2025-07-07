import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import SideMenu from '../../components/SideMenu';
import Footer from '../../components/Footer';
import Panchanga from '../../components/panchanga';
import Head from 'next/head';
import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import JsonLdSchema from '../../components/JsonLdSchema';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import Image from 'next/image';
// import Link from 'next/link';
export default function PanchangaPage() {
  // State for side menu
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  
  // const blurDataURL = '../../public/'
  return (
    <>
      {/* SEO Optimization */}
      <SEOHead 
        title="Panchanga - Daily Hindu Calendar & Auspicious Timings"
        description="Access daily Panchanga calculations for Tithi, Nakshatra, Yoga, Karana, and Vara. Get accurate Hindu calendar timings, muhurat, and auspicious periods for your location."
        keywords="Panchanga, Hindu calendar, Tithi, Nakshatra, Yoga, Karana, Vara, muhurat, auspicious timing, Vedic astrology, Hindu astronomy, daily panchanga, Hindu panchang"
        canonical="https://astrosight.ai/panchanga"
        ogImage="https://astrosight.ai/images/panchanga-cover.jpg"
        ogType="website"
      />
      
      {/* JSON-LD Structured Data */}
      <JsonLdSchema 
        type="WebApplication"
        data={{
          name: "Panchanga Calculator",
          description: "Daily Panchanga calculations and Hindu calendar timings",
          applicationCategory: "Astrology Tool",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR"
          },
          featureList: [
            "Daily Tithi calculations",
            "Nakshatra timings", 
            "Yoga periods",
            "Karana calculations",
            "Vara (weekday) information",
            "Auspicious muhurat timings"
          ],
          provider: {
            "@type": "Organization",
            name: "AstroSight",
            url: "https://astrosight.ai"
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
        <Footer />
      </div>
    </>
  );
}