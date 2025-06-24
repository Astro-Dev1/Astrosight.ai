import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Panchanga from '../../components/panchanga';
import Head from 'next/head';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import Image from 'next/image';
// import Link from 'next/link';
export default function PanchangaPage() {
  // const blurDataURL = '../../public/'
  return (
    <>
      <Head>
      <link rel="icon" href="/logo.png" />
        <title>Panchanga - Daily Hindu Calendar & Auspicious Timings | Astro Answer</title>
        <meta name="description" content="Access daily Panchanga calculations for Tithi, Nakshatra, Yoga, Karana, and Vara. Get accurate Hindu calendar timings, muhurat, and auspicious periods for your location." />
        <meta name="keywords" content="Panchanga, Hindu calendar, Tithi, Nakshatra, Yoga, Karana, Vara, muhurat, auspicious timing, Vedic astrology, Hindu astronomy" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Daily Panchanga Calendar & Auspicious Timings" />
        <meta property="og:description" content="Get accurate Panchanga calculations including Tithi, Nakshatra, and auspicious timings. Plan your activities according to Vedic astrology principles." />
        <meta property="og:url" content="https://astroanswer.co/panchanga" />
        <meta property="og:image" content="https://astroanswer.co/images/panchanga-cover.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Daily Panchanga & Hindu Calendar Calculations" />
        <meta name="twitter:description" content="Access precise Panchanga calculations and auspicious timings based on Vedic astrology. Plan your day according to cosmic alignments." />
        <meta name="twitter:image" content="https://astroanswer.co/images/panchanga-cover.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://astroanswer.co/panchanga" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Panchanga Calculator",
            "applicationCategory": "Astrology Tool",
            "operatingSystem": "Web Browser",
            "description": "Daily Panchanga calculations and Hindu calendar timings",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Daily Tithi calculations",
              "Nakshatra timings",
              "Yoga periods",
              "Karana calculations",
              "Vara (weekday) information",
              "Auspicious muhurat timings"
            ],
            "provider": {
              "@type": "Organization",
              "name": "Astro Answer",
              "url": "https://astroanswer.co"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://astroanswer.co/panchanga"
            },
            "about": {
              "@type": "Thing",
              "name": "Panchanga",
              "description": "Traditional Hindu almanac used for determining auspicious timings and dates"
            }
          })}
        </script>
      </Head>
      <Header />
      <div className="max-w-4xl mx-auto pt-2 bg-orange-50">
        
        <main className="flex-grow">
          <Panchanga />

        </main>
        <Footer />

      </div>
    </>
  );
}