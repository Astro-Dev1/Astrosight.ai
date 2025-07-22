import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';

const BirthChartCalculator = () => {
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
      <CustomHeader />
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Birth Chart Calculator - Free astrology birth chart
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Generate your complete natal chart with detailed planetary positions, houses, and aspects. 
            Discover your cosmic blueprint through precise Vedic and Western astrology calculations.
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
            {/* You may want to add other form fields here, such as birthDate, birthTime, birthPlace */}
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
                Generate Birth Chart
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Why Choose Our Birth Chart Calculator?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Swiss Ephemeris Precision</h3>
              <p className="text-gray-600">
                Calculations accurate to 0.01 arc-seconds using Swiss Ephemeris astronomical data, ensuring precise planetary positions and aspects for your birth moment
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🕉️</div>
              <h3 className="text-xl font-semibold mb-2">Advanced Vedic Analysis</h3>
              <p className="text-gray-600">
                Comprehensive Divisional Charts (D1-D60), Dasha periods (Vimsottari, Ashtottari), Nakshatra analysis, and 300+ yogas calculation
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Technical Chart Features</h3>
              <p className="text-gray-600">
                Planetary dignities, exact aspect degrees, Ayanamsa selections, chart rectification tools, and transit calculations with orb precision
              </p>
            </div>
          </div>
        </div>

          {/* Main Content from PDF */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Your Kundali - The Map of Your Soul
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4 font-semibold">
              I promise to keep it real, relatable, and rooted in Vedic astrology — the system I’ve devoted my life to.
            <p className="text-gray-700 mb-4">
              Let&apos;s break it down.
            </p>
            <p className="text-gray-700 mb-4 italic">
              Your Kundali isn&apos;t just a chart, it&apos;s your identity. When I first saw my kundali I felt like someone 
              had drawn the map of my soul.
            </p>
            
            <p className="text-gray-700 mb-4">
              Fast forward to today, after nearly two decades of studying Jyotish Shastra and helping thousands across the globe, 
              I can say this with confidence — this birth chart calculator isn&apos;t just a tool. It&apos;s a mirror. 
              One that reflects your karmic patterns, your life purpose, and the timing of everything important.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Why I Trust Birth Charts for Life Guidance</h3>
            <p className="text-gray-700 mb-4">
              I didn&apos;t become an astrologer because it was trendy or mystical. I was drawn in because it worked.
            </p>
            <p className="text-gray-700 mb-4">
              When I looked back at major events in my life — a tough breakup, my overseas education, my decision to leave 
              corporate life and fully embrace astrology — all of them were reflected in my chart. Right there. 
              Planetary periods (dashas) were screaming the truth, and I had missed the signs earlier.
            </p>
            <p className="text-gray-700 mb-4">
              It&apos;s not about fatalism. A well-read Vedic birth chart calculator doesn&apos;t lock your fate. It reveals your choices, patterns, 
              and strengths. And once you understand that, you can act with awareness.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">What Is a Birth Chart and How Does It Work?</h3>
            <p className="text-gray-700 mb-4">
              A birth chart (or Kundali, as we call it here, in India) is a snapshot of the sky at the moment you 
              were born. It maps where every planet was — in which zodiac sign and in which house.
            </p>
            <p className="text-gray-700 mb-4">
              But it&apos;s not just planets and signs. Your Lagna (Ascendant) sets the tone for your personality. 
              Your Moon sign reflects your mind and emotions. And then there&apos;s the dasha system, which shows when specific karmas will unfold.
            </p>
            
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <h4 className="font-semibold mb-3 text-gray-800">Every birth chart is made up of:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>12 houses (each representing a life area like career, marriage, finances)</li>
                <li>9 planets (Sun, Moon, Mars, etc.)</li>
                <li>27 Nakshatras (lunar constellations that go deeper than zodiac signs)</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              The power lies in the interactions — aspects, conjunctions, yogas, and divisional charts. 
              It&apos;s like decoding a divine formula tailored only for you.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Online Birth Chart Calculator</h3>
            <p className="text-gray-700 mb-4">
              Now, I get it. Not everyone has access to an astrologer instantly. And that&apos;s where a free birth chart calculator comes in handy.
            </p>
            <p className="text-gray-700 mb-4">
              It&apos;s quick. It&apos;s free. And it gives you a starting point.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-3 text-gray-800">If you&apos;ve never seen your chart before, here&apos;s what to do:</h4>
              <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                <li>Visit our Free Birth Chart Tool (or the one you trust)</li>
                <li>Enter your date, exact time, and place of birth</li>
                <li>Hit generate — and voilà, your chart is ready!</li>
              </ol>
            </div>

            <p className="text-gray-700 mb-4">
              But let me add a word of caution. Many websites offer free birth chart analysis, but most give generic, pre-written interpretations. 
              They don&apos;t consider your unique dasha, transits, or karmic cycles. That&apos;s why I recommend using it as a base — and then taking expert help for deeper clarity.
            </p>
            <p className="text-gray-700 mb-4">
              If you&apos;re ready to explore further, you can book a 1-on-1 consultation with us or choose from our topic-specific reports that go deep into areas like marriage, career, or finances.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">The Importance of Kundali in Daily Life</h3>
            <p className="text-gray-700 mb-4">
              People often think astrology is only for marriage or temple visits. But your Kundali is much more than that.
            </p>
            
            <div className="bg-yellow-50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-3 text-gray-800">Here&apos;s what it can actually reveal:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>When is the right time to switch careers?</li>
                <li>Is that business partner trustworthy?</li>
                <li>Will this relationship last long?</li>
                <li>Why do certain problems repeat, no matter what you do?</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              I&apos;ve helped clients uncover deep-rooted karmic blocks, understand why their health flares up during specific months, 
              and even discover their true spiritual purpose — all through the lens of their Kundali.
            </p>

            <p className="text-gray-700 mb-4">
              When interpreted correctly, your free Vedic birth chart with interpretation can act like a spiritual GPS. 
              And trust me, in today&apos;s uncertain world, that clarity is priceless.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Why I Recommend Trying a Birth Chart Calculator</h3>
            <p className="text-gray-700 mb-4">
              There&apos;s a reason ancient seers spent lifetimes preserving this knowledge. Jyotish Shastra is called the eye of the Vedas — 
              because it helps you see what&apos;s otherwise invisible.
            </p>
            <p className="text-gray-700 mb-4">
              If you&apos;re curious about your karmic blueprint, start with a free birth chart calculator today. Then go deeper with guidance.
            </p>
            
            <p className="text-gray-700">
              <strong>Remember:</strong> Astrology doesn&apos;t tell you what will happen. It tells you what can happen, 
              and more importantly, what to do about it.
            </p>
            <p className="text-gray-700 mb-4">
              And if you feel drawn to explore your destiny with intention, I invite you to book a personal consultation, or explore our handpicked Rudrakshas, Gemstones, and Yantras — tools that enhance specific planetary energies, as per your chart.
            </p>
            </p>
          </div>
        </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Birth Charts
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">1. Is an online birth chart calculator accurate?</h3>
              <p className="text-gray-700">
                Yes — if you enter your birth details correctly and use our Vedic birth chart calculator based on traditional methods. However, the interpretation often lacks depth unless guided by an expert.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">2. What if my birth time is not exact?</h3>
              <p className="text-gray-700">
                Try to get it from your birth certificate or elders. Even a 10-minute difference can shift your Lagna and dashas. If uncertain, opt for a birth time rectification service — we offer that too.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">3. Can my birth chart really predict my future?</h3>
              <p className="text-gray-700">
                It reveals your potential, timing, and karmic lessons. It doesn’t predict events like a script but shows what you’re likely to face and when — so you can prepare better.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">4. Is the Moon sign more important than the Sun sign in Vedic astrology?</h3>
              <p className="text-gray-700">
                Absolutely. In Vedic astrology, we focus more on the Moon sign, as it governs your mind, emotions, and mental tendencies — which drive your life decisions.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">5. Can I calculate and interpret my birth chart on my own?</h3>
              <p className="text-gray-700">
                Yes, you can generate your free birth chart online. But interpretation takes years of training. Start with your Lagna and Moon sign, and build from there — or consult someone you trust.
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
        </div>      </div>
    </>
  );
}
export default BirthChartCalculator;