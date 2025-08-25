import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import Section from '../components/Section'
const TermsAndConditions = () => {
  return (
    <>
      <Head>
      <link rel="icon" href="/logo.png" />
        <title>Shipping Policy - Digital Service Delivery | Astro Answer</title>
        <meta name="description" content="Learn about Astro Answer's digital service delivery policy. Our astrological consultations and reports are delivered electronically for instant access." />
        <meta name="keywords" content="digital delivery, service delivery, astrology reports, online consultations, instant access, electronic delivery, digital products" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Digital Service Delivery Policy - Astro Answer" />
        <meta property="og:description" content="Understanding our digital service delivery process. Get instant access to astrological consultations and reports through secure electronic delivery." />
        <meta property="og:url" content="https://astrosight.ai/shipping-policy" />
        <meta property="og:image" content="https://astrosight.ai/images/delivery-cover.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Delivery Policy - Astro Answer" />
        <meta name="twitter:description" content="Learn how we deliver our astrological services digitally for immediate access to your consultations and reports." />
        <meta name="twitter:image" content="https://astrosight.ai/images/delivery-cover.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://astrosight.ai/shipping-policy" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Digital Service Delivery Policy",
            "description": "Information about digital delivery of astrological services and reports",
            "publisher": {
              "@type": "Organization",
              "name": "Astro Answer",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://astrosight.ai/shipping-policy"
            },
            "specialty": "Digital Service Delivery",
            "lastReviewed": new Date().toISOString().split('T')[0],
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                {
                  "@type": "Service",
                  "name": "Digital Astrological Reports",
                  "description": "Instant delivery via email or online platform"
                },
                {
                  "@type": "Service",
                  "name": "Online Consultations",
                  "description": "Direct video call sessions with astrologers"
                }
              ]
            },
            "deliveryMethod": {
              "@type": "DeliveryMethod",
              "name": "Digital Delivery",
              "description": "All services are delivered electronically through secure channels"
            },
            "significantLink": [
              {
                "@type": "WebPage",
                "url": "https://astrosight.ai/terms-and-conditions",
                "name": "Terms and Conditions"
              },
              {
                "@type": "WebPage",
                "url": "https://astrosight.ai/privacy-policy",
                "name": "Privacy Policy"
              }
            ]
          })}
        </script>
      </Head>

      <div className="bg-orange-50 text-gray-900">
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-8">
        <Section title="Shipping Policy">
          <p className="text-lg text-orange-700">
            At AstroSight, we pride ourselves on delivering celestial insights directly to you,
            without any physical shipping required. Our services are entirely digital, ensuring that
            you receive your astrological guidance swiftly and conveniently.
          </p>
        </Section>

        <Section title="Digital Delivery">
          <ul className="list-disc pl-6 text-orange-700">
            <li>All our astrological services, reports, and consultations are delivered electronically.</li>
            <li>You can expect to receive your personalized astrological insights via email or through our secure online platform.</li>
            <li>No physical products are shipped, eliminating any waiting time associated with traditional shipping methods.</li>
          </ul>
        </Section>

        <Section title="Prompt Delivery">
          <p className="text-lg text-orange-700">
          We strive to provide prompt and efficient delivery of our digital services, allowing you to access your astrological guidance within 24-48 hours of the order confirmation.
          </p>
        </Section>
      </div>
      <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </div>
      </>
  );
};

export default TermsAndConditions;
