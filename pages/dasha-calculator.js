import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

const DashaCalculator = () => {
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

  return (
    <>
     <SEOHead
        title="Dasha Calculator – Vedic Astrology Planetary Periods & Predictions | AstroSight"
        description="Calculate your Vimshottari Dasha planetary periods and gain insights into life phases, karmic patterns, and forecasts with AstroSight’s free, accurate Dasha Calculator."
        keywords="dasha calculator, vimshottari dasha, planetary periods calculator, vedic astrology, mahadasha predictions, antardasha, karmic periods, birth chart timing"
        canonical="https://astrosight.ai/dasha-calculator"
        ogImage="https://astrosight.ai/images/dasha-calculator-og.jpg"
        ogType="article"
      />
        {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Dasha Calculator – Vedic Astrology Planetary Periods & Predictions",
            "url": "https://astrosight.ai/dasha-calculator",
            "description": "Calculate your Vimshottari Dasha planetary periods and gain insights into life phases, karmic patterns, and forecasts with AstroSight’s free, accurate Dasha Calculator.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/dasha-calculator-og.jpg"
          })
        }}
      />
      <CustomHeader />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Dasha Calculator & it&apos;s predictions for free
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Calculate your planetary periods (Dasha) and their influence on your life.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time of Birth *
                </label>
                <input
                  type="time"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Calculate Dasha
              </button>
            </div>
          </form>
        </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Why Choose Our Dasha Calculator?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">Precise Timing</h3>
              <p className="text-gray-600">
                Accurate calculation of planetary periods based on authentic Vedic methods
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-2">Life Predictions</h3>
              <p className="text-gray-600">
                Understand different life phases and their planetary influences
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
              <p className="text-gray-600">
                Complete breakdown of Mahadasha, Antardasha, and sub-periods
              </p>
            </div>
          </div>
        </div>

          {/* Main Content from PDF */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
            <p className="text-gray-700 mb-4 font-semibold">
              We all have moments when we wonder—why did something amazing happen at one time, and something tough at another? That&apos;s exactly where the Dasha Calculator comes in. When you start decoding your chart using this ancient timing system, everything begins to make sense. It wasn&apos;t just about good or bad times—it was about understanding why things unfold the way they do, and what to do next.
            </p>
            <p className="text-gray-700 mb-4">
              In this guide, we&apos;ll walk you through what the Dasha system is, how the calculator works (especially the Vimshottari Dasha Calculator, which is the most popular), and what kind of predictions you can actually expect. You&apos;ll also learn how to access a free Dasha Calculator online to get your current Dasha and even explore deeper layers like Antardasha and Pratyantar Dasha.
            </p>
          </div>

          {/* What Is Dasha Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              What Is a Dasha in Vedic Astrology?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                In simple terms, Dasha means a time period ruled by a particular planet. But it&apos;s not just a timer—it&apos;s a karmic window. Each Dasha reveals the kind of energy that dominates your life for a certain period.
              </p>
              <p className="text-gray-700 mb-4">
                When you analyze your own Mahadasha (major period), you might be surprised how clearly it reflects your inner experience—challenges, decisions, opportunities, even emotional shifts.
              </p>
              <p className="text-gray-700 mb-4">
                The Dasha Calculator doesn&apos;t give vague predictions. It calculates which planetary periods you&apos;re going through and gives you insight into how those planets will behave based on your birth chart.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">How the Dasha Calculator Works:</h4>
                <p className="text-gray-700 mb-2">
                  Using a free Dasha calculator with just your birth date, time, and location, you can see your Mahadasha, Antardasha, and even Pratyantar Dasha—each with its own start and end dates within seconds.
                </p>
                <p className="text-gray-700">
                  But more importantly, you&apos;ll see the storyline of your life. For example, during a Moon Mahadasha, everything turns inward. Your mind becomes restless, intuition sharpens, and emotional matters take center stage.
                </p>
              </div>
            </div>
          </div>

          {/* Vimshottari Dasha Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Vimshottari Dasha – The Most Powerful System
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                There are many Dasha systems, but Vimshottari Dasha is by far the most widely used and trusted. It&apos;s based on the position of the Moon at the time of your birth, specifically the Nakshatra (lunar mansion).
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">Planetary Periods in Vimshottari Dasha:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sun:</span>
                      <span className="font-semibold">6 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Moon:</span>
                      <span className="font-semibold">10 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Mars:</span>
                      <span className="font-semibold">7 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Rahu:</span>
                      <span className="font-semibold">18 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Jupiter:</span>
                      <span className="font-semibold">16 years</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Saturn:</span>
                      <span className="font-semibold">19 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Mercury:</span>
                      <span className="font-semibold">17 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Ketu:</span>
                      <span className="font-semibold">7 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Venus:</span>
                      <span className="font-semibold">20 years</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                The Vimshottari Dasha calculator helps you see where you are in this 120-year cycle, and more importantly, which planet is in charge right now.
              </p>
              <div className="bg-yellow-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">Understanding Your Current Dasha:</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Rahu Mahadasha:</strong> Your life might feel unpredictable or fast-paced.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Saturn Mahadasha:</strong> Get ready for lessons, responsibilities—and incredible growth.
                </p>
                <p className="text-gray-700">
                  You can consult with an astrologer if you want a personalized interpretation, but even using the free Dasha Calculator gives you a great starting point.
                </p>
              </div>
            </div>
          </div>

          {/* Results and Analysis Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Results You Can Expect From Dasha Analysis
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Each Mahadasha brings a different mood, flavor, and set of karmic themes. But it doesn&apos;t stop there. Each Mahadasha is broken into Antardashas (sub-periods), and each of those into Pratyantar Dasha (even smaller periods). Like peeling layers of an onion.
              </p>
              <div className="bg-green-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">Real-Life Example:</h4>
                <p className="text-gray-700">
                  A Jupiter Mahadasha might feel overall uplifting. But when you hit Jupiter-Mars Antardasha, there could be a burst of activity—travel, new risks, and a surge of energy. That&apos;s how specific this system can get.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                The Dasha Calculator doesn&apos;t just show dates. It shows patterns:
              </p>
              <div className="space-y-4 mb-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Rahu Dasha:</h5>
                  <p className="text-gray-700">Expect themes like ambition, illusion, sudden changes.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Saturn Mahadasha:</h5>
                  <p className="text-gray-700">Focus, discipline, long-term karma.</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Venus Mahadasha:</h5>
                  <p className="text-gray-700">Love, art, luxury—but also detachment when needed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Planetary Lords Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Effects of Planetary Lords in Mahadasha and Antardasha
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                The magic lies in combining Dasha periods with planetary lordships. This means understanding what each planet rules in your own chart.
              </p>
              <div className="bg-orange-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">Personalized Impact:</h4>
                <p className="text-gray-700">
                  When Mercury Antardasha comes during Jupiter Mahadasha, it plays out completely differently for someone whose Mercury rules their 1st house versus someone whose Mercury rules their 6th or 8th house. That&apos;s why two people going through the same Mahadasha might have wildly different experiences.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                The more you personalize your reading, the more accurate your timeline gets.
              </p>
            </div>
          </div>

          {/* Yogini Dasha Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Yogini Dasha – A Lesser-Known But Revealing Alternative
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Ever heard of Yogini Dasha? This system works differently. It&apos;s rooted in feminine archetypes, and while it&apos;s not as common as Vimshottari, it can be shockingly insightful—especially for emotional and spiritual matters.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">Complementary Perspective:</h4>
                <p className="text-gray-700">
                  When Vimshottari Dasha gives one storyline, the Yogini Dasha Calculator offers another dimension—a soul layer, you could say. It&apos;s a great complementary system.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                You can try both systems and compare using our free Yogini Dasha calculator for a more complete picture.
              </p>
            </div>
          </div>

          {/* Learning from Dasha Timeline */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              What You Can Learn from Your Dasha Timeline
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                If you&apos;re feeling lost, stuck, or even just curious, the Dasha Calculator is one of the most powerful tools in Vedic astrology. It&apos;s not about predictions that scare you—it&apos;s about timelines that empower you.
              </p>
              <p className="text-gray-700 mb-4">
                Because once you know which planet is in charge, you can align your decisions, career, relationships—even your mindset—to match that energy. It&apos;s like syncing your life with cosmic rhythm.
              </p>
              <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
                <h4 className="font-semibold mb-3 text-gray-800">Getting Started:</h4>
                <p className="text-gray-700">
                  You don&apos;t need to be an expert. Just enter your details into a free Dasha calculator, explore your current Mahadasha and Antardasha, and let the insight unfold.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                And if you want clarity on what&apos;s coming next, personalized readings, planetary remedies, and karma decoding sessions are available to help you navigate your journey.
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
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q1: Can I rely on a free online Dasha Calculator?</h3>
                <p className="text-gray-700">Yes—if you enter the correct birth details. Even a few minutes off can shift your Antardasha periods.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q2: What&apos;s more important: Mahadasha or transits?</h3>
                <p className="text-gray-700">Both matter, but Dasha shows the theme, and transits show the timing of events.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q3: How do remedies help during tough Dashas?</h3>
                <p className="text-gray-700">Rudrakshas, gemstones, or even simple mantras can redirect planetary energy. You can explore yantras and remedies for additional support.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q4: Is the Rahu Dasha always bad?</h3>
                <p className="text-gray-700">Not at all. Rahu is intense, yes—but also incredibly rewarding when handled with awareness. Rahu periods can open up new countries, careers, and transformations you never expected.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q5: What if I don&apos;t know my exact birth time?</h3>
                <p className="text-gray-700">Exact birth time gives the best results. If unsure, use the closest possible time or consult for birth time rectification.</p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q6: How can I use Dasha for life planning?</h3>
                <p className="text-gray-700">By knowing your current and upcoming Dasha, you can align major decisions with supportive planetary periods for better outcomes.</p>
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
    </>
  );
};

export default DashaCalculator;