import React from 'react';
import Head from 'next/head';
import Header from '../Header';
// import HeroSection from './components/HeroSection';
import TrustBuildingSection from './components/TrustBuildingSection';
import ConversationExamplesSection from './components/ConversationExamplesSection';
import CTASection from './components/CTASection';
// import Footer from '../Footer';

const AIChatHomepage = () => {
  return (
    <>
      <Head>
        <title>AstroSight AI - AI That Actually Gets You | Personalized Astrology</title>
        <meta name="description" content="Experience the first AI astrology platform that truly understands you. Get personalized cosmic insights through intelligent conversations. Ancient wisdom meets modern AI." />
        <meta name="keywords" content="AI astrology, personalized horoscope, cosmic guidance, astrological AI, birth chart analysis, spiritual AI" />
        <meta property="og:title" content="AstroSight AI - AI That Actually Gets You" />
        <meta property="og:description" content="Revolutionary AI astrology platform offering personalized cosmic guidance through intelligent conversations." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/ai-chat-homepage" />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* <HeroSection /> */}
          <TrustBuildingSection />
          <ConversationExamplesSection />
          <CTASection />
        </main>
        
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default AIChatHomepage;