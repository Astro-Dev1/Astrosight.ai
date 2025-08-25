import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

const MoonSignCalculator = () => {
  const [formData, setFormData] = useState({
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

  return (
    <>
      <SEOHead
        title="Moon Sign Calculator by Date of Birth – Free Vedic Astrology Moon Sign | AstroSight"
        description="Discover your Moon sign with our free Vedic astrology calculator. Get accurate Chandra Rashi, Nakshatra, and emotional insights based on your birth details."
        keywords="moon sign calculator, chandra rashi calculator, vedic moon sign, nakshatra calculator, lunar sign astrology, vedic astrology moon sign, emotional astrology"
        canonical="https://astrosight.ai/moon-sign-calculator"
        ogImage="https://astrosight.ai/images/moon-sign-og.jpg"
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Moon Sign Calculator by Date of Birth – Free Vedic Astrology Moon Sign",
            "url": "https://astrosight.ai/moon-sign-calculator-by-dob",
            "description": "Discover your Moon sign with our free Vedic astrology calculator. Get accurate Chandra Rashi, Nakshatra, and emotional insights based on your birth details.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/moon-sign-og.jpg"
          })
        }}
      />
      <CustomHeader />
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Moon Sign Calculator by Date of Birth
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Discover your Chandra Rashi (Moon Sign) and Nakshatra with precise Vedic calculations. 
              Understand your emotional patterns, mental nature, and inner world through your lunar placement.
            </p>
           
            <div className="space-y-6 mt-7">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date *
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your birth date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Time *
                  </label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your birth time"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Place *
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your birth place"
                />
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>💡 Pro Tip:</strong> Keep your birth time as accurate as possible. Even a 15-minute difference can 
                  change your Moon sign or Nakshatra.
                </p>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                >
                  Calculate Moon Sign
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Why Use Our Moon Sign Calculator?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌙</div>
                <h3 className="text-xl font-semibold mb-2">Authentic Vedic Calculations</h3>
                <p className="text-gray-600">
                  Based on classical Jyotish principles with accurate lunar positions and Nakshatra calculations for precise Moon sign determination
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2">Emotional Intelligence Insights</h3>
                <p className="text-gray-600">
                  Understand your emotional patterns, mental nature, subconscious reactions, and inner psychological makeup
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💫</div>
                <h3 className="text-xl font-semibold mb-2">Complete Lunar Analysis</h3>
                <p className="text-gray-600">
                  Get your Chandra Rashi, specific Nakshatra placement, and detailed interpretations of your lunar influences
                </p>
              </div>
            </div>
          </div>

          {/* Main Content from PDF */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Discover Your True Emotional Nature
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4 italic">
                Have you ever felt like your sun sign doesn&quot;t really capture you?
              </p>
              <p className="text-gray-700 mb-4">
                I&quot;ve been there too. For years, I called myself a Gemini and followed all the usual horoscopes. 
                But something never quite clicked. It wasn&quot;t until I discovered my Moon sign that things finally made sense. 
                It felt like someone had pulled back the curtain on my emotional world.
              </p>
              <p className="text-gray-700 mb-4">
                As a Vedic astrologer with over 18 years of experience, I&quot;ve seen this moment of recognition happen with 
                hundreds of clients. And today, I want to help you experience it too—with a tool I swear by: the Moon Sign Calculator.
              </p>
              <p className="text-gray-700 mb-4">
                Let&quot;s explore what a Moon sign really is, why it matters, and how you can discover yours today.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">What Is a Moon Sign?</h3>
              <p className="text-gray-700 mb-4">
                Your Moon sign (or Chandra Rashi, as we call it in Vedic astrology) is the zodiac sign the Moon was placed in 
                at the time of your birth. Unlike your Sun sign, which represents your outer identity, the Moon governs your 
                emotions, habits, and subconscious reactions.
              </p>
              <p className="text-gray-700 mb-4">
                Think of it this way: your Sun is your public self. But your Moon? That&quot;s your inner voice. It&quot;s how you respond 
                when no one&quot;s watching. How you nurture, love, cry, and retreat when things get overwhelming.
              </p>
              <p className="text-gray-700 mb-4">
                In Vedic astrology, the Moon holds even more weight than the Sun. It moves quickly—spending only about two and 
                a half days in each sign—making it extremely personal and specific to you.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">How to Know Your Moon Sign</h3>
              <p className="text-gray-700 mb-4">
                Finding your Moon sign is easier than you might think. But you do need some exact information:
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Your date of birth</li>
                  <li>Your time of birth</li>
                  <li>Your place of birth</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                That&quot;s it! Once you have these, simply use a Moon Sign Calculator by Date of Birth. Ours here at AstroSight 
                is completely free and based on authentic Vedic calculations. No gimmicks, no fluff—just clear, personalized results.
              </p>
              <p className="text-gray-700 mb-4">
                When you enter your details, you&quot;ll get your Moon sign, your Nakshatra (lunar constellation), and a quick 
                overview of what it means for your emotional life.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">What&quot;s Better—Moon Sign or Sun Sign?</h3>
              <p className="text-gray-700 mb-4">
                Let me say this honestly: both matter, but they serve very different purposes.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-gray-800">Sun Sign: Your Ego & Expression</h4>
                  <p className="text-gray-700">
                    Your Sun sign reflects your outward personality. It&quot;s your drive, willpower, and how you project yourself 
                    to others. Think of it like the actor on the stage.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-gray-800">Moon Sign: Your Emotions & Reactions</h4>
                  <p className="text-gray-700">
                    But your Moon sign? That&quot;s what&quot;s going on behind the curtain. It governs your mind, moods, fears, 
                    attachments, and even how you process childhood memories.
                  </p>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3 text-gray-800">So… Which One Should You Follow?</h4>
              <p className="text-gray-700 mb-4">
                In Vedic astrology, the Moon sign takes the lead, especially when it comes to:
              </p>
              
              <div className="bg-indigo-50 rounded-lg p-6 mb-4">
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Daily horoscopes</li>
                  <li>Kundli matching for marriage</li>
                  <li>Mental and emotional health predictions</li>
                  <li>Understanding karmic cycles and past-life patterns</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                In my consultations, I always start with the Moon before anything else. It&quot;s that important.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">Why Is Your Moon Sign So Important?</h3>
              <p className="text-gray-700 mb-4">
                I can&quot;t stress this enough: your Moon sign is the foundation of your inner world. Here&quot;s why it matters deeply:
              </p>

              <div className="space-y-6 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-3 text-gray-800">1. Emotional Intelligence</h4>
                  <p className="text-gray-700">
                    Your Moon sign tells you how you feel, what makes you feel safe, and how you instinctively react. 
                    It&quot;s like emotional shorthand. Knowing it can help you stop repeating toxic patterns.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold mb-3 text-gray-800">2. Relationship Dynamics</h4>
                  <p className="text-gray-700">
                    Whether it&quot;s love, parenting, or friendship—your Moon sign reveals your emotional compatibility with others. 
                    In fact, in Kundli matching, Moon signs are the first thing we match, especially for lifelong relationships.
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    Curious about your compatibility? Book a 1-on-1 consultation or try our Deep-Dive Relationship Report.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500">
                  <h4 className="font-semibold mb-3 text-gray-800">3. Accurate Daily Forecasts</h4>
                  <p className="text-gray-700">
                    The Moon changes signs every 2.25 days, influencing your mood and intuition. That&quot;s why our daily horoscopes 
                    at AstroSight are based on Moon signs, not Sun signs.
                  </p>
                  <p className="text-gray-700 mt-2">
                    If you&quot;ve ever felt like general horoscopes don&quot;t match your vibe for the day, this is probably why.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">Use the Moon Sign Calculator (Free!)</h3>
              <p className="text-gray-700 mb-4">
                Our Free Moon Sign Calculator is easy to use and backed by classical Jyotish principles. You&quot;ll get:
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Your Moon sign & Nakshatra</li>
                  <li>A brief interpretation</li>
                  <li>Insight into your emotional patterns and mental nature</li>
                  <li>Links to remedies, gemstones, yantras, and rudrakshas suited for your sign</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                Want to go deeper? We offer personalized reports and 1-on-1 consultations to help you understand your karmic 
                patterns based on your Moon and planetary periods.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">Thoughts from My Practice</h3>
              <p className="text-gray-700 mb-4">
                Over the years, I&quot;ve come to believe that your Moon sign holds the key to emotional self-awareness and spiritual growth. 
                While your Sun sign shows how you shine outside, the Moon reveals your internal climate—the part of you that truly feels.
              </p>
              <p className="text-gray-700 mb-4">
                Using a Moon sign calculator is more than just an astrological exercise. It&quot;s a step toward knowing yourself more 
                deeply—and living in tune with your emotional truth.
              </p>
              <p className="text-gray-700 mb-4">
                Start with the free Moon Sign Calculator, and if you&quot;re ready to explore more, consider our curated gemstones, 
                energized yantras, and soul-specific rudrakshas to harmonize your Moon energy. You can also chat with us personally 
                for tailored guidance through our consultation services.
              </p>
              <p className="text-gray-700 font-semibold">
                Your birth chart isn&quot;t just about destiny. It&quot;s a map for conscious transformation.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q1: Can two people have the same Moon sign?</h3>
                <p className="text-gray-700">
                  Yes—but if they were born in different Nakshatras, their inner worlds will still be quite different. 
                  Your Moon house and aspects also play a big role.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q2: How often does the Moon sign change?</h3>
                <p className="text-gray-700">
                  Roughly every 2.25 days. That&quot;s why accurate birth time is crucial to calculate it correctly.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q3: Is Moon sign more important than Sun sign in marriage?</h3>
                <p className="text-gray-700">
                  Absolutely. In Vedic matchmaking, we always match the Moon sign first—especially to assess mental harmony 
                  and emotional rhythm.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q4: Can knowing my Moon sign help me heal?</h3>
                <p className="text-gray-700">
                  Definitely. I&quot;ve had clients use their Moon sign awareness to change how they process grief, manage anxiety, 
                  and even break relationship cycles. It&quot;s an emotional compass.
                </p>
              </div>
            </div>
          </div>
        
          {/* Internal Links Section */}
          <div className="mt-16 space-y-8">
            <InternalLinksGrid />
            <HoroscopeNavigation />
            <CompatibilityLinksGrid />
            <ReportLinksGrid />
            <RecentBlogLinks />
          </div>
        </div>
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>      
      </div>
    </>
  );
}

export default MoonSignCalculator;