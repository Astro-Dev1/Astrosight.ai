import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

const NameNumerologyCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: ''
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
        title="Name Numerology Calculator – Free Online Name Analysis | AstroSight"
        description="Get your lucky numbers, destiny, soul urge, and personality with our free name numerology calculator. Find out the vibration your name carries using trusted Pythagorean and Chaldean numerology."
        keywords="name numerology calculator, free name analysis, lucky number, pythagorean numerology, chaldean numerology, change name numerology"
        canonical="https://astrosight.ai/name-numerology-calculator"
        ogImage="https://astrosight.ai/images/name-numerology-og.jpg"
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Name Numerology Calculator",
            "url": "https://astrosight.ai/name-numerology-calculator",
            "description": "Get your lucky numbers, destiny, soul urge, and personality with our free name numerology calculator. Find out the vibration your name carries using trusted Pythagorean and Chaldean numerology.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/name-numerology-og.jpg"
          })
        }}
      />
      <CustomHeader />
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Name Numerology Calculator – Free Online Name Analysis
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Discover what your name really means. Check destiny, soul urge, personality, and more using both Pythagorean and Chaldean numerology systems.
            </p>
            <div className="space-y-6 mt-7">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth (optional)
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your date of birth"
                  />
                </div>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                >
                  Calculate Name Numbers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article and Explanatory Sections */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Why Try a Name Numerology Calculator?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔢</div>
                <h3 className="text-xl font-semibold mb-2">Decode Your Name’s Energy</h3>
                <p className="text-gray-600">
                  See how each letter in your name vibrates and contributes to your life path, potential, and first impressions.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-2">Actionable Guidance</h3>
                <p className="text-gray-600">
                  Find out how name changes, minor tweaks, or alternate spellings influence your career, relationships, and success.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Ancient Numerology, Modern Insights</h3>
                <p className="text-gray-600">
                  Our tool uses both Pythagorean and Chaldean methods to give you a full spectrum of accuracy and spiritual depth.
                </p>
              </div>
            </div>
          </div>

          {/* Article Main Content */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              What Is Name Numerology & How Does It Work?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4 font-semibold">
                “Some names just feel lucky, don’t they? I’ve seen people improve their lives, careers, and relationships by realigning the vibration behind their name. It’s not magic—it’s math.”
              </p>
              <p className="text-gray-700 mb-4">
                Name numerology is the art of converting letters into numbers to reveal insights about your personality, gifts, challenges, and even emotional needs. Unlike astrology, which analyzes your birth chart, this system simply examines your name—and sometimes your birth date.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                How Does a Name Numerology Calculator Work?
              </h3>
              <p className="text-gray-700 mb-4">
                Each letter is assigned a numerical value based on ancient systems. For example, in the Pythagorean system:
                <br /><b>A J S = 1, B K T = 2, C L U = 3</b> (and so on up to 9).
              </p>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">
                  How To Use the Name Numerology Calculator
                </h4>
                <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                  <li>Enter your full name as shown on documents, or a name you want to test.</li>
                  <li>(Optional) Add your date of birth for even more tailored results.</li>
                  <li>Click calculate—your name’s hidden numbers and vibrations are revealed!</li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Popular Numerology Systems
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><b>Pythagorean (Western):</b> The most common system, great for checking business and modern names.</li>
                <li><b>Chaldean:</b> An ancient, mystical method, focused on sound vibrations. Often used for spiritual consultation and karmic corrections.</li>
              </ul>
              <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
                <h4 className="font-semibold mb-3 text-gray-800">
                  Key Numbers Calculated
                </h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li><b>Destiny/Expression Number:</b> Your life’s direction and natural talents.</li>
                  <li><b>Soul Urge Number:</b> Your secret desires and emotional needs (from vowels).</li>
                  <li><b>Personality Number:</b> How you are perceived (from consonants).</li>
                  <li><b>Hidden Passion Number:</b> Gifts and habits when a digit appears frequently in your name.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                How Does My Name Number Influence My Life?
              </h3>
              <p className="text-gray-700 mb-4">
                Your name’s numerology can sway career stability, relationship harmony, spiritual growth, and public reputation. Small changes may bring big shifts—especially if they create balance with your date of birth numbers.
              </p>
              <p className="text-gray-700 mb-4">
                Want a personalized, deep-dive report or spiritual tools to support your chosen number? Explore our specialty reports and gemstone/yantra recommendations.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions About Name Numerology
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">1. Is changing my name going to change my destiny?</h3>
                <p className="text-gray-700">
                  Not entirely, but it can shift opportunities and unlock blockages—think of it as switching lanes on the same highway.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">2. What if I use a nickname or initials?</h3>
                <p className="text-gray-700">
                  For self-growth, analyze your full legal name. For professional or public impact, check the most-used name.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">3. Are master numbers (11, 22, 33) special?</h3>
                <p className="text-gray-700">
                  Yes. These numbers aren’t reduced in readings and signal greater responsibility, higher potential, and sometimes deep inner challenges.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">4. Can a name numerology calculator predict my future?</h3>
                <p className="text-gray-700">
                  No. It gives insight into life patterns, but doesn’t predict events—think of it as a roadmap for self-mastery.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">5. Is numerology scientific?</h3>
                <p className="text-gray-700">
                  Numerology is a symbolic science—consistent in its logic, but not empirical like Newtonian physics.
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
};

export default NameNumerologyCalculator;
