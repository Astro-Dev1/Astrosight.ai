import Header from '../components/Header'
import Footer from '../components/Footer'
// import Image from 'next/image'
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { PhoneCall, FileText, Users, Cog, Megaphone, Star } from 'lucide-react'
import Head from 'next/head'
import Section from '../components/Section'
// import Link from 'next/link';
import CustomLinkButton from '../components/CustomContainer';
export default function AboutUs() {
  
  // const achievementImages = [
  //   "/sample_img.jpg",
  //   "/placeholder.svg",
  //   "/placeholder.svg",
  //   "/placeholder.svg",
  // ]
// const blurDataURL = '../../public/'
  return (
    <>
      <Head>
      <link rel="icon" href="/logo.png" />
        <title>About Astro Answer - Our Expert Astrologers & Vedic Astrology Services</title>
        <meta name="description" content="Meet our team of expert Vedic astrologers led by Dr. Ananthapadmanabha. Learn about our mission, services, and approach to providing authentic astrological guidance and remedies." />
        <meta name="keywords" content="Vedic astrologers, Dr. Ananthapadmanabha, astrology consultation, astrological services, birth chart analysis, horoscope reading, Jyotish experts, spiritual guidance" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Astro Answer - Expert Vedic Astrology Team" />
        <meta property="og:description" content="Discover our team of experienced Vedic astrologers and learn how we combine traditional wisdom with modern technology to provide accurate astrological guidance." />
        <meta property="og:url" content="https://astroanswer.co/about-us" />
        <meta property="og:image" content="https://astroanswer.co/images/about-cover.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Astro Answer - Meet Our Expert Astrologers" />
        <meta name="twitter:description" content="Learn about our mission and meet our team of experienced Vedic astrologers providing personalized astrological guidance and remedies." />
        <meta name="twitter:image" content="https://astroanswer.co/images/about-cover.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://astroanswer.co/about-us" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://astroanswer.co/about-us"
            },
            "name": "About Astro Answer",
            "description": "Learn about our expert Vedic astrology team and services",
            "publisher": {
              "@type": "Organization",
              "name": "Astro Answer",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astroanswer.co/logo.png"
              }
            },
            "employee": {
              "@type": "Person",
              "name": "Dr. Ananthapadmanabha",
              "jobTitle": "Chief Astrologer",
              "description": "Ph.D. in Vedic Astrology, honored with Rabindra Ratna Puraskar",
              "knowsAbout": ["Vedic Astrology", "Horoscope Analysis", "Astrological Remedies"],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "doctorate",
                "about": "Vedic Astrology",
                "awardingOrganization": {
                  "@type": "Organization",
                  "name": "Shri Maharishi College of Vedic Astrology, Udaipur"
                }
              }
            },
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                {
                  "@type": "Service",
                  "name": "Video Call Consultations",
                  "description": "1:1 sessions with expert astrologers"
                },
                {
                  "@type": "Service",
                  "name": "Personalized Astrological Reports",
                  "description": "Comprehensive horoscope analysis and remedies"
                }
              ]
            }
          })}
        </script>
      </Head>


      <div className="bg-orange-50 text-gray-900">
        <Header />
        
        
        <div className="bg-orange-50 text-gray-900  ">
          {/* About Section */}
          
          
        
          <Section title="About AstroAnswer">
            <h2 className="text-2xl font-semibold mb-4 text-orange-700">Our Mission</h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto">
            At AstroAnswer, we are passionately committed to unlocking the mysteries of the cosmos to empower individuals on their life journeys. 

Our mission is to provide personalized astrological insights that not only explain the influence of celestial movements on your life but also offer actionable remedies and practical advice. 

We believe that understanding the stars is the first step towards personal growth, clarity in decision-making, and achieving life goals.

Our goal is to make astrology accessible, meaningful, and practical for modern life. Whether you’re seeking guidance for your career, relationships, health, or personal development, AstroAnswer is here to illuminate your path.
            </p>
          </Section>

          {/* Our Services Section */}
          <Section title="Our Services">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-orange-100 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <PhoneCall className="mr-2" />
                    1:1 Call Consultations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700">
                  Experience one-on-one sessions with our expert astrologer, designed to provide you with an in-depth understanding of your birth chart. These sessions offer personalized remedies and insights into the challenges and opportunities that lie ahead of you in your life. Whether it’s a career dilemma, relationship issue, or a general life query, our consultation calls are your gateway to clarity.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-orange-100 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <FileText className="mr-2" />
                    Personalized Astrological Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700">
                  The Guidance Report is much more than a horoscope. It’s a comprehensive, solution-focused document tailored specifically to your unique queries giving you remedies to your particular queries. This report combines the art of traditional Vedic astrology with actionable remedies to address your specific questions that you have.

With detailed advice, simple remedies, and actionable steps, the Guidance Report empowers you to overcome obstacles, harness opportunities, and move forward confidently. Delivered digitally within 24 hours, this report ensures you don’t have to wait to start transforming your life.                  </p>
                </CardContent>
              </Card>
            </div>
          </Section>
          <div className="container mx-auto px-4 py-12">
      <CustomLinkButton
        headline="Welcome to AstroAnswer"
        buttonText="Explore Now"
        buttonPath="/horoscope"
      />
    </div>
          {/* Our Team Section */}
          <Section title="Our Team">
            <Card className="bg-orange-100 border-orange-200 mb-8">
 
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Astrological Team", icon: <Users className="mb-2" />, description: "Our team of experienced astrologers brings diverse expertise to address various life concerns, ensuring tailored guidance for every client." },
                { title: "Technical Team", icon: <Cog className="mb-2" />, description: "Behind the scenes, our technical experts ensure a flawless user experience. From website management to booking systems and data security, they ensure our platform is efficient, reliable, and secure." },
                { title: "Marketing Team", icon: <Megaphone className="mb-2" />, description: "AstroAnswer’s marketing team bridges the gap between ancient wisdom and modern awareness.They create informative content, engaging campaigns, and resources that showcase astrology’s relevance in today’s fast-paced world." },
                { title: "Operations Team", icon: <Star className="mb-2" />, description: "Our operations team is the backbone of our seamless services. They handle bookings, client inquiries, and post-service support to ensure every interaction with AstroAnswer is smooth and satisfactory." }
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

          {/* Our Approach Section */}
          <Section title="Our Approach">
            <Card className="bg-orange-100 border-orange-200">
              <CardContent className="prose prose-orange max-w-none p-6">
                <p className="text-orange-700">
                AstroAnswer combines the timeless wisdom of Vedic astrology with a personalized, client-centric approach. Every report, remedy, and consultation is designed to reflect your unique cosmic blueprint. We prioritize actionable insights over generic predictions, empowering you to take charge of your destiny.

Our process is steeped in tradition but delivered with modern precision. Whether it’s through 1:1 consultations or our digital guidance reports, you receive insights tailored to your life’s challenges and goals.
                </p>
              </CardContent>
            </Card>
          </Section>

          {/* Why Choose Us Section */}
          <Section title="Why Choose AstroAnswer">
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "Expert Astrologers: Benefit from the profound knowledge and experience of a team led by a Ph.D. in Vedic astrology.",
                "Tailored Guidance: Every service is personalized to address your unique challenges and aspirations.",
                "Modern Accessibility: Seamlessly delivered digital reports and consultations ensure astrology fits into your lifestyle.",
                "Affordable Remedies: Our practical remedies are easy to follow and cost-effective, designed for results without stress.",
                "Holistic Support: With a loyal team of astrologers, technical experts, and operations staff, you’re supported every step of the way."
              ].map((reason, index) => (
                <li key={index} className="flex items-center bg-orange-100 p-4 rounded-lg">
                  <Star className="text-orange-500 mr-2 flex-shrink-0" />
                  <span className="text-orange-700">{reason}</span>
                </li>
              ))}
            </ul>
          </Section>
          <div className="container mx-auto px-4 py-12">
          <CustomLinkButton
        headline="Welcome to AstroAnswer"
        buttonText="Explore Now"
        buttonPath="/compatibility"
      />
      </div>
          {/* Contact Us Section */}
          <Section title="Contact Us">
            <Card className="bg-orange-100 border-orange-200">
              <CardContent className="p-6">
                <p className="text-orange-700 text-center mb-4">
                Ready to explore your cosmic path? Let AstroAnswer guide you through the stars with precision, care, and expertise.                </p>
                <div className="flex justify-center">
                  <Button className="bg-green-500 hover:bg-orange-600 text-white">Get in Touch</Button>
                </div>
              </CardContent>
            </Card>
          </Section>
                    {/* Contact Us Section */}
                    <Section title="How to Reach Us">
            <Card className="bg-orange-100 border-orange-200">
              <CardContent className="p-6">
              <ul className="list-disc list-inside text-orange-700 mb-4">
                      <li>WhatsApp: 9964128377.</li>
                      <li>Email: astroanswer.co@gmail.com.</li>

                    </ul>
                <div className="flex justify-center">
                  <Button className="bg-green-500 hover:bg-orange-600 text-white">Get in Touch</Button>
                </div>
              </CardContent>
            </Card>
          </Section>
                    {/* Contact Us Section */}
                    <Section title="Customer Service Hours">
            <Card className="bg-orange-100 border-orange-200">
              <CardContent className="p-6">
                <p className="text-orange-700 text-center mb-4">
                We’re here for you Monday to Saturday, from 9:00 AM to 6:00 PM, to answer your questions and assist you with bookings.
                Discover the wisdom of the cosmos with AstroAnswer. Let’s embark on a transformative journey together!  </p>            
                  <div className="flex justify-center">
                  <Button className="bg-green-500 hover:bg-orange-600 text-white">Get in Touch</Button>
                </div>
              </CardContent>
            </Card>
          </Section>
        </div>
        <Footer />
      </div>
    </>
  )
}