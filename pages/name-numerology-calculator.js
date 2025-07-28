import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

// Utility for numerology number reduction
const masterNumbers = [11, 22, 33];
function reduceNumber(num) {
  while (num > 9 && !masterNumbers.includes(num)) {
    num = num.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  }
  return num;
}

// Chaldean & Pythagorean mappings
const chaldeanChart = {
  A:1,B:2,C:3,D:4,E:5,F:8,G:3,H:5,I:1,J:1,K:2,L:3,M:4,N:5,O:7,P:8,Q:1,R:2,S:3,T:4,U:6,V:6,W:6,X:5,Y:1,Z:7
};
const pythagoreanChart = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
};

function calculateDOBNumber(date) {
  if (!date) return '';
  const digits = date.replace(/[^0-9]/g, '').split('').map(Number);
  let total = digits.reduce((a, b) => a + b, 0);
  return masterNumbers.includes(total) ? total : reduceNumber(total);
}

function calculateNameNumber(name, system='chaldean') {
  if (!name) return '';
  const chart = system === 'pythagorean' ? pythagoreanChart : chaldeanChart;
  const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
  let sum = 0;
  for (let char of clean) {
    sum += chart[char] || 0;
  }
  return masterNumbers.includes(sum) ? sum : reduceNumber(sum);
}

const numberTraits = {
  1: "Leader, initiator, ambitious",
  2: "Sensitive, cooperative, peace-loving",
  3: "Expressive, joyful, creative",
  4: "Disciplined, practical, hardworking",
  5: "Adventurous, freedom-loving, quick thinker",
  6: "Nurturer, family-oriented, harmonious",
  7: "Seeker, spiritual, analytical",
  8: "Powerful, goal-driven, karmic",
  9: "Humanitarian, emotional, forgiving",
  11: "Intuitive, visionary, spiritual teacher (master number, holds unique potential)",
  22: "Master builder, practical idealist, manifestor (master number, holds unique potential)",
  33: "Master healer, altruistic, compassionate teacher (master number, holds unique potential)"
};

const NumerologyCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    nameSystem: 'chaldean'
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dobNumber = calculateDOBNumber(formData.birthDate);
    const nameNumber = calculateNameNumber(formData.name, formData.nameSystem);
    setResult({
      dobNumber,
      dobTrait: numberTraits[dobNumber] || 'Unknown',
      nameNumber,
      nameTrait: numberTraits[nameNumber] || 'Unknown'
    });
  };

  return (
    <>
      <SEOHead
        title="Numerology Calculator by Date of Birth & Name | AstroSight"
        description="Discover your ruling number’s traits and life meaning based on your birth date or name using Chaldean or Pythagorean Numerology. Free, accurate, and insightful."
        keywords="numerology calculator, chaldean numerology, pythagorean calculator, name numerology, ruling number, birth date number"
        canonical="https://astrosight.ai/numerology-calculator"
        ogImage="https://astrosight.ai/images/numerology-calculator-og.jpg"
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Numerology Calculator – Ruling Number by Date of Birth & Name",
            "url": "https://astrosight.ai/numerology-calculator",
            "description": "Discover your ruling number trait and life meaning based on your birth date or name. Supports both Chaldean & Pythagorean numerology.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/numerology-calculator-og.jpg"
          }),
        }}
      />
      <CustomHeader />
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Numerology Calculator by Date of Birth
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Find your ruling number using your birth date or name with time-tested Chaldean and Pythagorean methods.
              Learn what your number reveals about your life patterns, career, and relationship destiny.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-500">
                    Name Calculation System
                  </label>
                  <select
                    name="nameSystem"
                    value={formData.nameSystem}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-200 rounded-md"
                  >
                    <option value="chaldean">Chaldean (traditional, preferred)</option>
                    <option value="pythagorean">Pythagorean (Western)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Date
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
              <div className="mt-8 text-center">
                <button type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Calculate My Number
                </button>
              </div>
            </form>
            {/* Display Results */}
            {result && (
              <div className="mt-10 bg-blue-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Your Numerology Results</h3>
                <div className="text-gray-700 mb-2">
                  <span className="font-medium">Date of Birth Number:</span> {result.dobNumber} <br />
                  <span className="italic">{result.dobTrait}</span>
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">Name Number ({formData.nameSystem === 'chaldean' ? "Chaldean" : "Pythagorean"}):</span> {result.nameNumber} <br />
                  <span className="italic">{result.nameTrait}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Additional Info Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Why Try the Numerology Calculator?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔢</div>
                <h3 className="text-xl font-semibold mb-2">Both Chaldean & Pythagorean</h3>
                <p className="text-gray-600">
                  Supports two classic systems, ensuring accurate name and date numerology for life, career, relationships, and spiritual guidance.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-2">Master Number Detection</h3>
                <p className="text-gray-600">
                  Automatically recognizes and explains master numbers (11, 22, 33) for a deeper, more nuanced reading.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                <p className="text-gray-600">
                  Get tailored traits, tips, and spiritual insights—plus recommendations for deeper consultations and remedies in sync with your number.
                </p>
              </div>
            </div>
          </div>
          {/* Main Content from PDF */}
          <div className="mt-16 bg-gradient-to-r from-yellow-50 to-pink-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              The Magic and Meaning of Your Ruling Number
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4 font-semibold">
                Numbers have a strange way of finding us, don’t they?
              </p>
              <p className="text-gray-700 mb-4 italic">
                When I first calculated my ruling number, everything shifted. Patterns in my life suddenly made sense.
              </p>
              <p className="text-gray-700 mb-4">
                In numerology, every number from 1 to 9 (plus master numbers) carries a life theme—shaping ambitions, decisions, relationships, and challenges.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li><b>1:</b> Leader, initiator, ambitious</li>
                <li><b>2:</b> Sensitive, cooperative, peace-loving</li>
                <li><b>3:</b> Expressive, joyful, creative</li>
                <li><b>4:</b> Disciplined, practical, hardworking</li>
                <li><b>5:</b> Adventurous, freedom-loving, quick thinker</li>
                <li><b>6:</b> Nurturer, family-oriented, harmonious</li>
                <li><b>7:</b> Seeker, spiritual, analytical</li>
                <li><b>8:</b> Powerful, goal-driven, karmic</li>
                <li><b>9:</b> Humanitarian, emotional, forgiving</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Master numbers 11, 22, and 33 have their own special spiritual significance and are not reduced like other numbers.
              </p>
              <p className="text-gray-700 mb-4">
                Your ruling number never changes, but adjusting your name (via Chaldean or Pythagorean methods) can shift your energetic field, supporting success and clearing blocks.
              </p>
              <p className="text-gray-700 mb-4">
                For deeper insight, personalized numerology reports can combine your birth and name energies, suggest gemstones, and recommend spiritual remedies.
              </p>
              <p className="text-gray-700">
                <b>Your number is your cosmic signature. Ready to discover yours?</b>
              </p>
            </div>
          </div>
          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions About Numerology
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">1. Is numerology scientific or spiritual?</h3>
                <p className="text-gray-700">
                  Numerology is rooted in ancient symbolic traditions. While not a modern science, it&apos;s a powerful spiritual tool for personal growth.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">2. Can my ruling number change over time?</h3>
                <p className="text-gray-700">
                  Your date of birth number never changes. However, working with name numerology can help shift or harmonize your energetic patterns.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">3. What’s the best system—Pythagorean or Chaldean?</h3>
                <p className="text-gray-700">
                  Both are valid. Chaldean is older and preferred for name analysis. The calculator supports both for your convenience.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">4. Can numerology help choose a business name?</h3>
                <p className="text-gray-700">
                  Absolutely. Adjusting a business name for optimal numbers can bring surprising results!
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">5. How accurate are free online calculators?</h3>
                <p className="text-gray-700">
                  If they&apos;re based on authentic Chaldean or Pythagorean charts and detect master numbers, they&apos;re reliable for general insights.
                </p>
              </div>
            </div>
          </div>
          {/* Internal Links and Footer */}
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
export default NumerologyCalculator;
