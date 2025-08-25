import { Calculator, Star,  Clock, MapPin, User, Calendar } from 'lucide-react';
import React, { useState } from 'react';
// import Head from 'next/head';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import {
  InternalLinksGrid,
  ReportLinksGrid,
  HoroscopeNavigation,
  CompatibilityLinksGrid,
  RecentBlogLinks
} from '../components/InternalLinksGrid';
const SunSignCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Coming Soon! We are working on this feature.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sunSignRanges = [
    { sign: 'Aries', dates: 'March 21 – April 19', element: 'Fire', traits: 'Bold, action-driven, pioneering' },
    { sign: 'Taurus', dates: 'April 20 – May 20', element: 'Earth', traits: 'Stable, practical, determined' },
    { sign: 'Gemini', dates: 'May 21 – June 20', element: 'Air', traits: 'Curious, adaptable, communicative' },
    { sign: 'Cancer', dates: 'June 21 – July 22', element: 'Water', traits: 'Nurturing, emotional, protective' },
    { sign: 'Leo', dates: 'July 23 – August 22', element: 'Fire', traits: 'Confident, generous, natural leader' },
    { sign: 'Virgo', dates: 'August 23 – September 22', element: 'Earth', traits: 'Analytical, helpful, perfectionist' },
    { sign: 'Libra', dates: 'September 23 – October 22', element: 'Air', traits: 'Diplomatic, balanced, harmony-seeking' },
    { sign: 'Scorpio', dates: 'October 23 – November 21', element: 'Water', traits: 'Intense, mysterious, transformative' },
    { sign: 'Sagittarius', dates: 'November 22 – December 21', element: 'Fire', traits: 'Adventurous, optimistic, philosophical' },
    { sign: 'Capricorn', dates: 'December 22 – January 19', element: 'Earth', traits: 'Grounded, ambitious, focused' },
    { sign: 'Aquarius', dates: 'January 20 – February 18', element: 'Air', traits: 'Independent, innovative, humanitarian' },
    { sign: 'Pisces', dates: 'February 19 – March 20', element: 'Water', traits: 'Intuitive, compassionate, creative' }
  ];

  const faqs = [
    {
      question: "Is sun sign the same as zodiac sign?",
      answer: "Yes, in most casual conversations, they're used interchangeably. But technically, the zodiac refers to the entire celestial belt, while your sun sign is where the Sun was in that belt at your birth."
    },
    {
      question: "Can I have different sun signs in Western and Vedic systems?",
      answer: "Absolutely. That's because Western astrology doesn't account for the precession of the equinoxes, while Vedic astrology does. It's why I always encourage checking both using our sun sign calculator."
    },
    {
      question: "Is sun sign or moon sign more important?",
      answer: "Both matter! The sun sign is your outer self, purpose, and personality. Your moon sign is your emotional self and mind. You can read about moon signs here to go deeper."
    },
    {
      question: "What if I don't relate to my sun sign?",
      answer: "This is more common than you'd think. That's often because your moon, ascendant, or even planetary aspects modify your sun's energy. A full astrology consultation can give you that deeper insight."
    }
  ];

  return (<>
  <SEOHead
  title="Sun Sign Calculator – Discover Your Zodiac Sun Sign | AstroSight"
  description="Find your sun sign based on date of birth using AstroSight's free zodiac sun sign calculator. Learn the traits and meaning of your sign through Vedic and Western astrology."
  keywords="sun sign calculator, zodiac sign calculator, find my sun sign, vedic astrology sun sign, western zodiac finder, birth chart analysis, horoscope sign by date of birth"
  canonical="https://astrosight.ai/sun-sign-calculator"
  ogImage="https://astrosight.ai/images/sun-sign-og.jpg"
  ogType="article"
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sun Sign Calculator",
      "url": "https://astrosight.ai/sun-sign-calculator",
      "description": "Find your zodiac sun sign using your date of birth. Powered by accurate Vedic and Western astrology guidance.",
      "publisher": {
        "@type": "Organization",
        "name": "AstroSight",
        "url": "https://astrosight.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://astrosight.ai/log.png"
        }
      },
      "image": "https://astrosight.ai/images/sun-sign-og.jpg"
    })
  }}
/>

    <div className="min-h-screen ">
      {/* Header */}
  <CustomHeader/>

      {/* Calculator Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-yellow-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Sun Sign Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Discover your zodiac Sun sign by date of birth (and optionally time & place for deeper insights)
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-purple-600" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                  Place of Birth (Optional)
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="City, State, Country"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                <Star className="inline h-5 w-5 mr-2" />
                Find My Sun Sign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        
        {/* Opening Anecdote */}
        <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl p-8 border-l-4 border-yellow-400">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            A Memorable Moment
          </h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            There&apos;s a beautiful moment I remember—when a client once asked me, Is my sun sign really me? And I smiled. Because yes, in many ways, your sun sign is a radiant key to your true personality.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            As a Vedic astrologer with over 18 years of practice, I&apos;ve guided people through life&apos;s biggest questions—relationships, career, health, and inner purpose. And everything, almost always, starts with the sun. So in this post, I want to walk you through what your sun sign truly means, how to find it using a sun sign calculator, and why it matters more than you think.
          </p>
        </div>

        {/* What is a Sun Sign */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">What is a Sun Sign?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Your sun sign, also called your zodiac sun sign, is determined by the position of the Sun at the exact time of your birth. It represents your core essence—who you are when no one&apos;s watching—your natural personality traits, your ego, and your willpower.
            </p>
            <p className="mb-4">
              Think of it like this: If your whole being was a solar system, the sun sign would be your Sun—bright, central, and powerful.
            </p>
            <p className="mb-4">For example:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>An Aries sun? Bold, action-driven, pioneering.</li>
              <li>A Cancer sun? Nurturing, emotional, protective.</li>
              <li>A Capricorn sun? Grounded, ambitious, focused.</li>
            </ul>
            <p className="font-medium">
              While moon signs and rising signs bring flavor and depth, the sun sign holds your spiritual DNA.
            </p>
          </div>
        </div>

        {/* Sun Sign Date Ranges */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sun Sign Date Ranges (Western)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sunSignRanges.map((sign, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-bold text-gray-800">{sign.sign}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{sign.dates}</p>
                <p className="text-xs text-gray-500">{sign.traits}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <strong>Tip:</strong> If you were born on a cusp day (right when signs change), our calculator will give you the precise sign for your birth year.
          </p>
        </div>

        {/* How to Know Your Sun Sign */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How to Know Your Sun Sign?</h2>
          <div className="space-y-4">
            <p className="text-gray-700 text-lg">
              You don&apos;t need to know your birth time (although it helps). A simple Sun Sign Calculator can tell you your sign just from your date of birth.
            </p>
            <p className="text-gray-700">
              Most Western systems follow the fixed chart above. But if you want your Vedic (Sidereal) sun sign too, include time and place for an exact calculation.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Using Our Calculator:</h3>
              <p className="text-blue-700">
                Our free Sun Sign Calculator takes your birth date and gives you accurate results for both Western and Vedic astrology systems.
              </p>
            </div>
          </div>
        </div>

        {/* Why Your Sun Sign is Important */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Your Sun Sign is Important</h2>
          <div className="space-y-4">
            <p className="text-gray-700 text-lg">
              Your sun sign is your inner compass. Even when life pushes you off track, the energy of your sun sign pulls you back to your center. It reveals:
            </p>
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">How you express yourself</h4>
                <p className="text-sm text-yellow-700">Your natural communication style and creativity</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">What energizes you</h4>
                <p className="text-sm text-green-700">Your core motivations and drive</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">How you lead, love, and live</h4>
                <p className="text-sm text-purple-700">Your approach to relationships and life</p>
              </div>
            </div>
            <p className="text-gray-700">
              For example, as a Leo sun, you may shine in leadership roles, crave recognition, and have a natural warmth. But without understanding this, you may suppress it—and feel unfulfilled.
            </p>
            <p className="text-gray-700">
              I often guide clients to choose gemstones, rudrakshas, or yantras based on their sun sign energy to balance these aspects.
            </p>
          </div>
        </div>

        {/* Western vs Vedic */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Western vs. Vedic: What&apos;s the Difference in Sun Signs?
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Great question—and one I&apos;m asked often.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">Western Sun Signs</h3>
              <p className="text-gray-700 mb-2">
                Western astrology uses the <strong>Tropical Zodiac</strong>, based on seasons. It aligns the zodiac signs with the Spring Equinox, not the actual constellations. It&apos;s what you see in magazines and apps.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-2xl font-semibold mb-3 text-orange-800">Vedic Sun Signs</h3>
              <p className="text-gray-700 mb-2">
                Vedic astrology (Jyotish), which I practice, uses the <strong>Sidereal Zodiac</strong>, which aligns more closely with the actual constellations in the sky. This means your Vedic sun sign might be different from your Western one.
              </p>
            </div>
          </div>
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-gray-700 mb-2">
              <strong>Example:</strong> Someone who is a Leo in Western astrology might be a Cancer in Vedic astrology.
            </p>
            <p className="text-gray-700">
              I always recommend checking both. Use our Sun Sign Calculator to explore both versions side by side—and get a more complete view.
            </p>
          </div>
        </div>

        {/* Conclusion & CTA */}
        <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl p-8 border-l-4 border-yellow-400">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Your Sun Sign Is Your Light
          </h2>
          <p className="text-gray-700 mb-4 text-lg">
            Your sun sign isn&apos;t just a label. It&apos;s your light. It&apos;s how you shine in this world—even on cloudy days. Whether you&apos;re a bold Aries or a sensitive Pisces, your sun sign shows you the way back to your authentic self.
          </p>
          <p className="text-gray-700 mb-4">
            Explore it. Understand it. And if you&apos;re curious to go deeper, I&apos;m here to guide you with personal <a href="/contact" className="text-purple-600 underline hover:text-purple-800">chart readings</a>, healing remedies, and <a href="/astrology-calculators-tools" className="text-purple-600 underline hover:text-purple-800">deep-dive reports</a>.
          </p>
          <p className="text-gray-700 font-medium">
            Also, visit our <Link href="/shop" className="text-purple-600 underline hover:text-purple-800">shop</Link> for customized remedies, gemstone sets, and yantras.<br />
            <Link href="/shop" className="text-purple-600 underline hover:text-purple-800">Shop Remedies</Link> • <Link href="/shop" className="text-purple-600 underline hover:text-purple-800">Gemstones</Link> • <Link href="/shop" className="text-purple-600 underline hover:text-purple-800">Yantras</Link>
          </p>
          <div className="mt-6 text-center">
            <span className="text-2xl">🌞</span>
            <p className="text-gray-600 italic mt-2">Let&apos;s uncover the sun within you.</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="font-semibold mb-3 text-gray-800 text-lg">
                  Q{index + 1}: {faq.question}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Internal Links */}
        <div className="space-y-8">
          <InternalLinksGrid />
          <HoroscopeNavigation />
          <CompatibilityLinksGrid />
          <ReportLinksGrid />
          <RecentBlogLinks />
        </div>
      {/* Footer */}
    <div className="bg-[#f46434]  mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>    </div>
          </>
  );
};

export default SunSignCalculator;