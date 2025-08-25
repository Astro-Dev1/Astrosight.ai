import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

const TransitChartCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
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
        title="Transit Chart Calculator – Free Vedic Transit Chart Astrology | AstroSight"
        description="Check your planetary transits instantly with our free transit chart calculator. Discover how today’s planets affect your birth chart for Vedic astrology insights."
        keywords="transit chart calculator, free transit chart, vedic astrology, planetary transit, jupiter transit, saturn transit, current planetary positions"
        canonical="https://astrosight.ai/transit-chart-calculator"
        ogImage="https://astrosight.ai/images/transit-chart-og.jpg"
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Today’s Transit Chart Calculator for Free",
            "url": "https://astrosight.ai/transit-chart-calculator",
            "description": "Check your planetary transits instantly with our free transit chart calculator. Discover how today’s planets affect your birth chart for Vedic astrology insights.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/transit-chart-og.jpg"
          })
        }}
      />
      <CustomHeader />
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Today’s Transit Chart Calculator - Free Vedic Transit Astrology
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Instantly discover how today’s planetary positions are affecting your birth chart according to authentic Vedic astrology methods.
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
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              {/* Additional form fields */}
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
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                >
                  Generate Transit Chart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article and Explanatory Sections */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Why Try the Transit Chart Calculator?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="text-xl font-semibold mb-2">Instant Cosmic Weather Report</h3>
                <p className="text-gray-600">
                  Get today’s planetary positions overlaid on your birth chart in seconds—no need for manual math or ephemeris tables.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-2">Personalized Vedic Insights</h3>
                <p className="text-gray-600">
                  See real-time transits and how they activate specific areas (houses, signs) of your own chart, rooted in authentic Jyotish wisdom.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-xl font-semibold mb-2">Smart Life Planning</h3>
                <p className="text-gray-600">
                  Use your transit chart as a spiritual “forecast”—to better time actions, rituals, investments, and major decisions based on cosmic currents.
                </p>
              </div>
            </div>
          </div>

          {/* Article Main Content */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              What is a Transit Chart in Astrology?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4 font-semibold">
                “When I first discovered the power of a transit chart, it felt like the Universe had handed me a weather forecast for my mind, emotions, and destiny.”
              </p>
              <p className="text-gray-700 mb-4">
                A transit chart shows <b>where the planets are right now</b> and reveals how their current positions interact with your birth chart—your underlying karmic blueprint.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Natal Chart vs Transit Chart – What&apos;s the Difference?
              </h3>
              <p className="text-gray-700 mb-4">
                Your natal (birth) chart is a map frozen at your first breath. A transit chart shows the moving sky, overlaying today’s planetary alignments onto your base chart to reveal which life areas are getting activated.
              </p>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">
                  How to Use the Transit Chart Calculator
                </h4>
                <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                  <li>Enter your accurate birth details (date, time, and place).</li>
                  <li>Hit generate—your natal chart is set, and today’s sky is mapped instantly over it.</li>
                  <li>See which houses and signs are being influenced by current planetary transits.</li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Why Check Your Transits?
              </h3>
              <p className="text-gray-700 mb-4">
                Transits explain the why behind what you&apos;re feeling and facing: career blocks, energy highs, romance cycles, or spiritual insights. They set the stage, while your own dasha and karma decide your unique experience.
              </p>

              <div className="bg-yellow-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">
                  The Big Players: Key Transiting Planets
                </h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li><b>Saturn:</b> Brings discipline, pressure, or restructuring—especially if transiting core houses (4th, 10th).</li>
                  <li><b>Jupiter:</b> Expansion, wisdom, and blessings—a Jupiter transit to the 11th house can mean more gains and support.</li>
                  <li><b>Rahu/Ketu:</b> Karmic curveballs, obsessions, detachment; major identity or spiritual transformations.</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  (Want a deeper breakdown? Check out our report options.)
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                How is a Transit Chart Drawn?
              </h3>
              <p className="text-gray-700 mb-4">
                The old way: calculate your natal chart, check current planet positions in a Panchanga or ephemeris, overlay by hand. 
                The new way: our calculator does it for you in a click.
              </p>
              <p className="text-gray-700 mb-4">
                <b>Vedic tip:</b> Read transits from both your Moon sign (emotions, subconscious) and Ascendant/Lagna (practical life). Both offer powerful perspectives.
              </p>

              <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
                <h4 className="font-semibold mb-3 text-gray-800">
                  Benefits of Using a Transit Chart Calculator
                </h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Daily and weekly clariy about what to expect</li>
                  <li>Personalized insight into your current hurdles and opportunities</li>
                  <li>Spiritual alignment with cosmic timing</li>
                  <li>Perfect timing for rituals, investments, and launches</li>
                  <li>Decoding karmic events unfolding now</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                <b>My Go-To Ritual:</b> Each morning, I check my transit chart before meetings, pujas, or big actions. Knowledge of today’s “cosmic weather” empowers my day.
              </p>
              <p className="text-gray-700 mb-4">
                Pairing this with gemstones or rudrakshas can help balance strong transit effects. (See our recommended spiritual tools.)
              </p>
              <p className="text-gray-700 mb-4">
                Remember, the right tools—informed by ancient wisdom—help you understand the planetary motion, not fear it.
              </p>
              <p className="text-gray-700 mb-4 font-semibold">
                Need a deeper breakdown? Book a personalized consultation.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions About Transit Charts
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">1. Can transits predict exact events?</h3>
                <p className="text-gray-700">
                  Not always. Transits set the background energy; your personal dasha and karma shape what will actually unfold.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">2. Which is more important – Moon sign or Lagna for reading transits?</h3>
                <p className="text-gray-700">
                  Both matter. The Moon gives emotional perspective. The Lagna (Ascendant) shows how transits impact your outward life and decisions.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">3. How often should I check my transit chart?</h3>
                <p className="text-gray-700">
                  Check daily for fast-moving planets (like the Moon) and weekly for slower planets (like Saturn or Jupiter). Both provide useful context.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">4. Are transit calculators accurate?</h3>
                <p className="text-gray-700">
                  Yes, provided you use a Vedic-based tool and enter your birth details correctly.
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

export default TransitChartCalculator;
