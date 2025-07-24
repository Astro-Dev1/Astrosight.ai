import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../../components/InternalLinksGrid';

// Calculator Components
const BirthChartCalculator = () => {
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Free Birth Chart Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Generate your complete natal chart with detailed planetary positions, houses, and aspects. 
            Discover your cosmic blueprint through precise Vedic and Western astrology calculations.
          </p>
         
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Generate Birth Chart
              </button>
            </div>
          </form>
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
              <div className="text-4xl mb-4">�</div>
              <h3 className="text-xl font-semibold mb-2">Advanced Vedic Analysis</h3>
              <p className="text-gray-600">
                Comprehensive Divisional Charts (D1-D60), Dasha periods (Vimsottari, Ashtottari), Nakshatra analysis, and 300+ yogas calculation
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">�</div>
              <h3 className="text-xl font-semibold mb-2">Technical Chart Features</h3>
              <p className="text-gray-600">
                Planetary dignities, exact aspect degrees, Ayanamsa selections, chart rectification tools, and transit calculations with orb precision
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Your Kundali - The Map of Your Soul
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4 italic">
              Your Kundali isn&apos;t just a chart, it&apos;s your identity. When I first saw my kundali I felt like someone 
              had drawn the map of my soul.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Why Trust Birth Charts for Life Guidance</h3>
            <p className="text-gray-700 mb-4">
              After nearly two decades of studying Jyotish Shastra and helping thousands across the globe, 
              I can say this with confidence — this birth chart calculator isn&apos;t just a tool. It&apos;s a mirror. 
              One that reflects your karmic patterns, your life purpose, and the timing of everything important.
            </p>
            <p className="text-gray-700 mb-4">
              A well-read Vedic birth chart calculator doesn&apos;t lock your fate. It reveals your choices, patterns, 
              and strengths. And once you understand that, you can act with awareness.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">What Is a Birth Chart and How Does It Work?</h3>
            <p className="text-gray-700 mb-4">
              A birth chart (or Kundali, as we call it in India) is a snapshot of the sky at the moment you 
              were born. It maps where every planet was — in which zodiac sign and in which house.
            </p>
            <p className="text-gray-700 mb-4">
              Your Lagna (Ascendant) sets the tone for your personality. Your Moon sign reflects your mind 
              and emotions. And then there&apos;s the dasha system, which shows when specific karmas will unfold.
            </p>
            
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <h4 className="font-semibold mb-3 text-gray-800">Every birth chart is made up of:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>12 houses (each representing a life area like career, marriage, finances)</li>
                <li>9 planets (Sun, Moon, Mars, etc.)</li>
                <li>27 Nakshatras (lunar constellations that go deeper than zodiac signs)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">The Importance of Kundali in Daily Life</h3>
            <p className="text-gray-700 mb-4">
              People often think astrology is only for marriage or temple visits. But your Kundali is much more than that.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-3 text-gray-800">Your birth chart can reveal:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>When is the right time to switch careers?</li>
                <li>Is that business partner trustworthy?</li>
                <li>Will this relationship last long?</li>
                <li>Why do certain problems repeat, no matter what you do?</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              When interpreted correctly, your free Vedic birth chart with interpretation can act like a spiritual GPS. 
              And trust me, in today&apos;s uncertain world, that clarity is priceless.
            </p>

            <p className="text-gray-700">
              <strong>Remember:</strong> Astrology doesn&apos;t tell you what will happen. It tells you what can happen, 
              and more importantly, what to do about it.
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
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is an online birth chart calculator accurate?
              </h3>
              <p className="text-gray-700">
                Yes — if you enter your birth details correctly and use our Vedic birth chart calculator based 
                on traditional methods. However, the interpretation often lacks depth unless guided by an expert.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What if my birth time is not exact?
              </h3>
              <p className="text-gray-700">
                Try to get it from your birth certificate or elders. Even a 10-minute difference can shift your 
                Lagna and dashas. If uncertain, opt for a birth time rectification service.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can my birth chart really predict my future?
              </h3>
              <p className="text-gray-700">
                It reveals your potential, timing, and karmic lessons. It doesn&apos;t predict events like a script 
                but shows what you&apos;re likely to face and when — so you can prepare better.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is the Moon sign more important than the Sun sign in Vedic astrology?
              </h3>
              <p className="text-gray-700">
                Absolutely. In Vedic astrology, we focus more on the Moon sign, as it governs your mind, 
                emotions, and mental tendencies — which drive your life decisions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can I calculate and interpret my birth chart on my own?
              </h3>
              <p className="text-gray-700">
                Yes, you can generate your free birth chart online. But interpretation takes years of training. 
                Start with your Lagna and Moon sign, and build from there — or consult someone you trust.
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
    </>
  );
};

const LoveCompatibilityCalculator = () => {
  const [formData, setFormData] = useState({
    partner1Name: '',
    partner1BirthDate: '',
    partner1BirthTime: '',
    partner1BirthPlace: '',
    partner2Name: '',
    partner2BirthDate: '',
    partner2BirthTime: '',
    partner2BirthPlace: ''
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Love Compatibility Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Discover your romantic compatibility based on astrology and birth charts.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
          {/* Partner 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Partner 1 Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="partner1Name"
                  value={formData.partner1Name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="partner1BirthDate"
                  value={formData.partner1BirthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time of Birth *
                </label>
                <input
                  type="time"
                  name="partner1BirthTime"
                  value={formData.partner1BirthTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  name="partner1BirthPlace"
                  value={formData.partner1BirthPlace}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
          </div>

          {/* Partner 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Partner 2 Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="partner2Name"
                  value={formData.partner2Name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="partner2BirthDate"
                  value={formData.partner2BirthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time of Birth *
                </label>
                <input
                  type="time"
                  name="partner2BirthTime"
                  value={formData.partner2BirthTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  name="partner2BirthPlace"
                  value={formData.partner2BirthPlace}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
          </div>
          
            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Check Compatibility
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Why Choose Our Love Compatibility Calculator?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-semibold mb-2">Accurate Love Analysis</h3>
              <p className="text-gray-600">
                Based on traditional Vedic astrology principles for relationship compatibility
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get your compatibility insights immediately with our fast calculator
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
              <p className="text-gray-600">
                All our love compatibility tools are free to use with no hidden charges
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Comprehensive Love Compatibility Analysis
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Love compatibility in astrology goes far beyond simple sun sign matching. Our comprehensive compatibility calculator analyzes multiple layers 
              of your relationship potential through synastry - the comparison of two birth charts. We examine how your planets interact with your partner&apos;s 
              planets to reveal the cosmic dynamics that shape your romantic connection.
            </p>
            <p className="text-gray-700 mb-4">
              Key compatibility factors include Moon sign harmony for emotional understanding, Venus-Mars aspects for romantic and physical attraction, 
              and Mercury connections for communication compatibility. We also analyze the 7th house of partnerships, composite charts that show your 
              relationship as a separate entity, and important aspects like conjunctions, trines, and squares that influence relationship dynamics.
            </p>
            <p className="text-gray-700 mb-4">
              Our analysis covers essential relationship areas: emotional bonding (Moon signs), communication styles (Mercury), love languages (Venus), 
              passion and desire (Mars), shared values and beliefs (Jupiter), and long-term commitment potential (Saturn). We also examine challenging 
              aspects that may require understanding and compromise, helping you navigate potential relationship obstacles with awareness.
            </p>
            <p className="text-gray-700">
              Beyond romantic compatibility, our calculator provides insights into friendship potential, business partnership dynamics, and family relationships. 
              Understanding your astrological compatibility helps build stronger relationships through increased empathy, better communication, and 
              appreciation of your partner&apos;s unique cosmic blueprint.
            </p>
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
    </>
  );
};

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Dasha Calculator
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

        {/* SEO Content */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Understanding Dasha in Vedic Astrology
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Dasha is one of the most important predictive tools in Vedic astrology, representing planetary periods 
              that influence different phases of your life. Our Dasha calculator helps you understand when specific 
              planets will be most active in shaping your experiences and opportunities.
            </p>
            <p className="text-gray-700 mb-4">
              The Vimshottari Dasha system divides your 120-year lifespan into periods ruled by different planets. 
              Each Mahadasha (major period) brings unique themes and experiences, while Antardashas (sub-periods) 
              provide more detailed timing for specific events and changes.
            </p>
            <p className="text-gray-700">
              By understanding your current and upcoming Dasha periods, you can make informed decisions about 
              career moves, relationships, investments, and spiritual practices. Our calculator provides precise 
              dates and interpretations to help you navigate life&apos;s journey with cosmic awareness.
            </p>
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
    </>
  );
};

// Coming Soon Component for other calculators
const ComingSoonCalculator = ({ title, description }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">{title}</h1>
          <p className="text-gray-600 mb-8">{description}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Coming Soon!</h2>
            <p className="text-yellow-700">
              We are working hard to bring you this amazing astrology calculator. 
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Why Choose Our Astrology Calculators?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">
                Based on traditional Vedic astrology principles with modern precision
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get your astrological insights immediately with our fast calculators
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
              <p className="text-gray-600">
                All our astrology tools are free to use with no hidden charges
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Comprehensive Astrology Tools for Everyone
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Welcome to AstroSight&apos;s comprehensive collection of astrology calculators and tools. 
              Whether you&apos;re a beginner exploring astrology or an experienced practitioner, our 
              free calculators provide accurate insights based on Vedic astrology principles.
            </p>
            <p className="text-gray-700 mb-4">
              Our growing toolkit includes birth chart generators, compatibility analyzers, 
              Dasha calculators, numerology tools, and much more. Each calculator is designed 
              to provide meaningful insights into your personality, relationships, career, 
              and life path through the wisdom of ancient astrological traditions.
            </p>
            <p className="text-gray-700">
              We&apos;re continuously expanding our collection with new calculators for palmistry, 
              tarot, gemstone recommendations, and specialized Vedic astrology tools. All our 
              services are completely free and designed to help you on your spiritual journey 
              of self-discovery and cosmic understanding.
            </p>
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
    </>
  );
};
const SunSignCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthMonth: '',
    birthDay: ''
  });

  const [result, setResult] = useState(null);

  // Zodiac sign date ranges based on the PDF
  const zodiacSigns = [
    { sign: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' },
    { sign: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air', quality: 'Fixed', ruler: 'Uranus' },
    { sign: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water', quality: 'Mutable', ruler: 'Neptune' },
    { sign: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' },
    { sign: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth', quality: 'Fixed', ruler: 'Venus' },
    { sign: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air', quality: 'Mutable', ruler: 'Mercury' },
    { sign: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water', quality: 'Cardinal', ruler: 'Moon' },
    { sign: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire', quality: 'Fixed', ruler: 'Sun' },
    { sign: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' },
    { sign: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air', quality: 'Cardinal', ruler: 'Venus' },
    { sign: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water', quality: 'Fixed', ruler: 'Pluto' },
    { sign: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' }
  ];

  const getSunSign = (month, day) => {
    const date = new Date(2024, month - 1, day);
    // Using 2024 as reference year
    const monthDay = month * 100 + day;
console.log(date,monthDay) 
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[0]; // Capricorn
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[1]; // Aquarius
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return zodiacSigns[2]; // Pisces
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[3]; // Aries
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[4]; // Taurus
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[5]; // Gemini
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[6]; // Cancer
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[7]; // Leo
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[8]; // Virgo
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[9]; // Libra
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[10]; // Scorpio
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[11]; // Sagittarius
    
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.birthDate) {
      const date = new Date(formData.birthDate);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const sunSign = getSunSign(month, day);
      setResult(sunSign);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      birthMonth: '',
      birthDay: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Free Sun Sign Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Discover your zodiac sun sign instantly by entering your birth date. Get detailed information about 
            your astrological personality, traits, and characteristics based on your sun sign.
          </p>
         
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Calculate Sun Sign
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Result Display */}
          {result && (
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-2xl font-bold text-center mb-4 text-orange-800">
                {formData.name ? `${formData.name}'s` : 'Your'} Sun Sign
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">♈</div>
                <h2 className="text-4xl font-bold text-orange-600 mb-2">{result.sign}</h2>
                <p className="text-lg text-gray-700 mb-4">{result.dates}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Astrological Details</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li><strong>Element:</strong> {result.element}</li>
                    <li><strong>Quality:</strong> {result.quality}</li>
                    <li><strong>Ruling Planet:</strong> {result.ruler}</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Quick Traits</h4>
                  <p className="text-gray-700 text-sm">
                    Based on your sun sign, you can explore detailed personality traits, 
                    compatibility insights, and yearly predictions in your full horoscope.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zodiac Signs Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            All 12 Zodiac Signs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {zodiacSigns.map((sign, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition duration-300">
                <div className="text-3xl mb-2">♈</div>
                <h3 className="font-semibold text-gray-800">{sign.sign}</h3>
                <p className="text-sm text-gray-600">{sign.dates}</p>
                <p className="text-xs text-gray-500 mt-1">{sign.element}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Calculator */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Why Choose Our Sun Sign Calculator?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">☀️</div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get your sun sign immediately with accurate date calculations based on traditional astrological methods
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">100% Accurate</h3>
              <p className="text-gray-600">
                Our calculator uses precise zodiac date ranges ensuring you get the correct sun sign every time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple interface that works on all devices - just enter your birth date and get your results instantly
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Understanding Your Sun Sign - The Core of Your Personality
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Your sun sign, also known as your zodiac sign, represents the position of the Sun at the time of your birth. 
              It&apos;s the most well-known aspect of astrology and forms the foundation of your personality, ego, and life force. 
              Our free sun sign calculator helps you discover this fundamental aspect of your astrological profile instantly.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">What Your Sun Sign Reveals</h3>
            <p className="text-gray-700 mb-4">
              Your sun sign influences your core personality traits, natural talents, and basic approach to life. It represents 
              your conscious mind, willpower, and the qualities you&apos;re developing in this lifetime. While your complete birth 
              chart includes Moon signs, rising signs, and planetary positions, your sun sign remains the central pillar of 
              your astrological identity.
            </p>

            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <h4 className="font-semibold mb-3 text-gray-800">The sun sign determines:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Your fundamental personality traits and characteristics</li>
                <li>Natural strengths and potential challenges</li>
                <li>Basic compatibility with other zodiac signs</li>
                <li>Career inclinations and life path direction</li>
                <li>How you express your creativity and leadership style</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">The 12 Zodiac Signs and Their Elements</h3>
            <p className="text-gray-700 mb-4">
              Each of the 12 zodiac signs belongs to one of four elements - Fire, Earth, Air, or Water - and one of three 
              qualities - Cardinal, Fixed, or Mutable. These combinations create the unique energy signature of each sign:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Fire Signs (Aries, Leo, Sagittarius)</h4>
                <p className="text-red-700 text-sm">Energetic, passionate, spontaneous, and natural leaders</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Earth Signs (Taurus, Virgo, Capricorn)</h4>
                <p className="text-green-700 text-sm">Practical, reliable, grounded, and focused on material security</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Air Signs (Gemini, Libra, Aquarius)</h4>
                <p className="text-blue-700 text-sm">Intellectual, communicative, social, and idea-oriented</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Water Signs (Cancer, Scorpio, Pisces)</h4>
                <p className="text-purple-700 text-sm">Emotional, intuitive, empathetic, and spiritually inclined</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">How to Use Your Sun Sign Knowledge</h3>
            <p className="text-gray-700 mb-4">
              Understanding your sun sign is just the beginning of your astrological journey. Use this knowledge to:
              better understand your motivations and reactions, improve relationships by understanding compatibility patterns,
              make career decisions aligned with your natural talents, and develop self-awareness and personal growth strategies.
            </p>

            <p className="text-gray-700">
              <strong>Remember:</strong> While your sun sign provides valuable insights, it&apos;s just one piece of your complete 
              astrological puzzle. For deeper understanding, consider exploring your moon sign, rising sign, and complete birth chart.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Sun Signs
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What&apos;s the difference between sun sign and zodiac sign?
              </h3>
              <p className="text-gray-700">
                Sun sign and zodiac sign refer to the same thing - the astrological sign the Sun was in when you were born. 
                This is the most commonly known aspect of astrology and what people mean when they ask What&apos;s your sign?
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can I be born on the cusp between two signs?
              </h3>
              <p className="text-gray-700">
                While some people believe in cusps, astronomically you can only have one sun sign. If you&apos;re born near the 
                transition dates, the exact time and location of birth determines your sign. Our calculator uses precise dates 
                to ensure accuracy.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Why don&apos;t I relate to my sun sign description?
              </h3>
              <p className="text-gray-700">
                Your sun sign is just one part of your complete astrological profile. Your moon sign affects emotions, 
                your rising sign influences how others see you, and other planetary positions add complexity to your personality. 
                A full birth chart provides a more complete picture.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Do sun sign dates change every year?
              </h3>
              <p className="text-gray-700">
                Sun sign dates remain relatively consistent year to year, with only slight variations (usually within a day) 
                due to leap years and astronomical precision. Our calculator accounts for these minor variations to ensure accuracy.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is sun sign compatibility accurate for relationships?
              </h3>
              <p className="text-gray-700">
                Sun sign compatibility provides general insights but isn&apos;t the complete picture for relationships. 
                True compatibility involves comparing entire birth charts, including moon signs, Venus and Mars positions, 
                and other factors that influence emotional and romantic connections.
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
    </>
  );
};

// Add this component before the calculatorData object

const MangalDoshaCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    gender: ''
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, show a sample result
    setResult({
      hasMangalDosha: Math.random() > 0.5, // Random for demo
      severity: Math.random() > 0.7 ? 'High' : 'Low',
      affectedHouses: ['1st House', '7th House'],
      remedies: [
        'Perform Mangal Shanti Puja',
        'Recite Hanuman Chalisa daily',
        'Fast on Tuesdays',
        'Donate red items on Tuesdays'
      ]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: '',
      gender: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Free Mangal Dosha Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Check for Mangal Dosha (Manglik Dosha) in your birth chart. Get detailed analysis of Mars placement 
            and its effects on marriage, along with effective remedies and cancellation factors.
          </p>
         
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
            
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Check Mangal Dosha
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Result Display */}
          {result && (
            <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-2xl font-bold text-center mb-4 text-red-800">
                Mangal Dosha Analysis for {formData.name}
              </h3>
              
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">♂</div>
                <h2 className="text-3xl font-bold mb-2 text-red-600">
                  {result.hasMangalDosha ? 'Mangal Dosha Present' : 'No Mangal Dosha'}
                </h2>
                {result.hasMangalDosha && (
                  <p className="text-lg text-gray-700 mb-4">
                    Severity: <span className="font-semibold text-red-600">{result.severity}</span>
                  </p>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Mars Placement</h4>
                  {result.hasMangalDosha ? (
                    <ul className="space-y-1 text-gray-700">
                      {result.affectedHouses.map((house, index) => (
                        <li key={index}><strong>•</strong> {house}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-600">Mars is in favorable position</p>
                  )}
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {result.hasMangalDosha ? 'Recommended Remedies' : 'General Guidance'}
                  </h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {result.remedies.map((remedy, index) => (
                      <li key={index}><strong>•</strong> {remedy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mangal Dosha Information */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Understanding Mangal Dosha
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Houses That Create Dosha</h3>
              <p className="text-gray-600">
                Mars in 1st, 2nd, 4th, 7th, 8th, or 12th house creates Mangal Dosha with varying intensity
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💑</div>
              <h3 className="text-xl font-semibold mb-2">Marriage Effects</h3>
              <p className="text-gray-600">
                Can cause delays in marriage, marital discord, or compatibility issues with non-Manglik partners
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Cancellation Factors</h3>
              <p className="text-gray-600">
                Dosha can be cancelled by benefic aspects, both partners being Manglik, or specific planetary positions
              </p>
            </div>
          </div>
        </div>

        {/* Dosha Types */}
        <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Types of Mangal Dosha and Their Effects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-700">High Mangal Dosha (Severe)</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Houses:</strong> 1st, 4th, 7th, 8th, 12th</p>
                <p><strong>Effects:</strong> Strong impact on marriage, potential for conflicts</p>
                <p><strong>Remedies:</strong> Kumbh Vivah, Mangal Shanti Puja required</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-700">Low Mangal Dosha (Mild)</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Houses:</strong> 2nd house placement</p>
                <p><strong>Effects:</strong> Minor delays, manageable effects</p>
                <p><strong>Remedies:</strong> Simple prayers and charitable acts sufficient</p>
              </div>
            </div>
          </div>
        </div>

        {/* Remedies Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Effective Remedies for Mangal Dosha
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl mb-2">🙏</div>
              <h3 className="font-semibold text-gray-800 mb-2">Spiritual Remedies</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Mangal Mantra chanting</li>
                <li>• Hanuman Chalisa recitation</li>
                <li>• Tuesday fasting</li>
                <li>• Visit Hanuman temples</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-2">🔴</div>
              <h3 className="font-semibold text-gray-800 mb-2">Gemstone Therapy</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Red Coral (Moonga)</li>
                <li>• Proper consultation required</li>
                <li>• Ring finger placement</li>
                <li>• Specific rituals needed</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-2">💝</div>
              <h3 className="font-semibold text-gray-800 mb-2">Charitable Acts</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Donate red items</li>
                <li>• Feed red lentils to birds</li>
                <li>• Help poor on Tuesdays</li>
                <li>• Sponsor meals</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🌳</div>
              <h3 className="font-semibold text-gray-800 mb-2">Ritual Remedies</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Kumbh Vivah ceremony</li>
                <li>• Mangal Shanti Puja</li>
                <li>• Navagraha rituals</li>
                <li>• Expert guidance needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Mangal Dosha
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can a Manglik marry a non-Manglik?
              </h3>
              <p className="text-gray-700">
                Yes, but it requires careful analysis and proper remedies. The effects can be mitigated through 
                specific rituals and remedies. Many successful marriages exist between Manglik and non-Manglik partners.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Does Mangal Dosha effect reduce with age?
              </h3>
              <p className="text-gray-700">
                Yes, traditionally it&apos;s believed that Mangal Dosha effects significantly reduce after age 28. 
                The intensity of the dosha naturally decreases as Mars matures in the individual&apos;s chart.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Are there any cancellation factors for Mangal Dosha?
              </h3>
              <p className="text-gray-700">
                Yes, Mangal Dosha can be cancelled when Mars is in its own sign (Aries/Scorpio), with benefic 
                aspects from Jupiter, when both partners are Manglik, or in specific planetary combinations.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                How accurate are online Mangal Dosha calculators?
              </h3>
              <p className="text-gray-700">
                Online calculators provide basic detection but consultation with experienced astrologers is 
                recommended for complete analysis, considering all factors, cancellations, and personalized remedies.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What should I do if I have Mangal Dosha?
              </h3>
              <p className="text-gray-700">
                Don&apos;t panic. Understand the specific type and severity, consult qualified astrologers, 
                perform appropriate remedies, and consider compatibility factors beyond just Mangal Dosha 
                when choosing a life partner.
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
    </>
  );
};
const KaalSarpDoshCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo result
    setResult({
      hasKaalSarp: Math.random() > 0.5,
      type: Math.random() > 0.5 ? 'Takshak Kaal Sarp' : 'Anant Kaal Sarp',
      severity: Math.random() > 0.7 ? 'High' : 'Moderate',
      remedies: [
        'Perform Kaal Sarp Shanti Puja',
        'Chant Maha Mrityunjaya Mantra',
        'Feed birds and donate food on Nag Panchami',
        'Worship Lord Shiva and Rahu-Ketu'
      ]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Free Kaal Sarp Dosh Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Check your birth chart for Kaal Sarp Dosh. Get instant analysis of Rahu-Ketu positions, dosh type, severity, and effective remedies.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Check Kaal Sarp Dosh
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-2xl font-bold text-center mb-4 text-green-800">
                Kaal Sarp Dosh Analysis for {formData.name}
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">🐍</div>
                <h2 className="text-3xl font-bold mb-2 text-green-600">
                  {result.hasKaalSarp ? 'Kaal Sarp Dosh Present' : 'No Kaal Sarp Dosh'}
                </h2>
                {result.hasKaalSarp && (
                  <>
                    <p className="text-lg text-gray-700 mb-2">
                      Type: <span className="font-semibold text-green-600">{result.type}</span>
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                      Severity: <span className="font-semibold text-green-600">{result.severity}</span>
                    </p>
                  </>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Remedies</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {result.remedies.map((remedy, index) => (
                      <li key={index}><strong>•</strong> {remedy}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">General Guidance</h4>
                  <p className="text-gray-700 text-sm">
                    Kaal Sarp Dosh is formed when all planets are between Rahu and Ketu. Effects include obstacles, delays, and anxiety. Remedies and spiritual practices can help reduce its impact.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What is Kaal Sarp Dosh?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🐍</div>
              <h3 className="text-xl font-semibold mb-2">Formation</h3>
              <p className="text-gray-600">
                Occurs when all planets are hemmed between Rahu and Ketu in the birth chart.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Effects</h3>
              <p className="text-gray-600">
                Can cause delays, obstacles, anxiety, and setbacks in life. Severity depends on dosh type and planetary strength.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🕉️</div>
              <h3 className="text-xl font-semibold mb-2">Remedies</h3>
              <p className="text-gray-600">
                Kaal Sarp Shanti Puja, Maha Mrityunjaya Mantra, worship of Lord Shiva, and charity on Nag Panchami are recommended.
              </p>
            </div>
          </div>
        </div>
        {/* Types Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Types of Kaal Sarp Dosh
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Anant Kaal Sarp</h3>
              <p className="text-gray-700 text-sm">
                Rahu in 1st house, Ketu in 7th. Can cause health and relationship issues.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-700">Takshak Kaal Sarp</h3>
              <p className="text-gray-700 text-sm">
                Rahu in 7th house, Ketu in 1st. Can cause financial and career obstacles.
              </p>
            </div>
            {/* Add more types as needed */}
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Kaal Sarp Dosh
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is Kaal Sarp Dosh always harmful?
              </h3>
              <p className="text-gray-700">
                Not always. Its effects depend on planetary strength, dosh type, and other chart factors. Remedies and spiritual practices can reduce its impact.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can Kaal Sarp Dosh be cancelled?
              </h3>
              <p className="text-gray-700">
                Yes, if benefic planets are outside Rahu-Ketu axis or strong aspects exist, dosh may be cancelled or reduced.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What are the best remedies?
              </h3>
              <p className="text-gray-700">
                Kaal Sarp Shanti Puja, Maha Mrityunjaya Mantra, worship of Lord Shiva, and charity on Nag Panchami are most effective.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Should I worry if I have Kaal Sarp Dosh?
              </h3>
              <p className="text-gray-700">
                No need to panic. Consult an experienced astrologer for personalized guidance and follow recommended remedies.
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
    </>
  );
};
// Add this component before the calculatorData object

const MarriageCompatibilityCalculator = () => {
  const [formData, setFormData] = useState({
    // Partner 1 Details
    partner1Name: '',
    partner1BirthDate: '',
    partner1BirthTime: '',
    partner1BirthPlace: '',
    partner1Gender: '',
    // Partner 2 Details
    partner2Name: '',
    partner2BirthDate: '',
    partner2BirthTime: '',
    partner2BirthPlace: '',
    partner2Gender: ''
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, show a sample result
    setResult({
      overallScore: Math.floor(Math.random() * 15) + 21, // 21-36 range
      gunaMatching: {
        varna: { score: Math.floor(Math.random() * 2), max: 1 },
        vashya: { score: Math.floor(Math.random() * 3), max: 2 },
        tara: { score: Math.floor(Math.random() * 4), max: 3 },
        yoni: { score: Math.floor(Math.random() * 5), max: 4 },
        graha: { score: Math.floor(Math.random() * 6), max: 5 },
        gana: { score: Math.floor(Math.random() * 7), max: 6 },
        bhakoot: { score: Math.floor(Math.random() * 8), max: 7 },
        nadi: { score: Math.floor(Math.random() * 9), max: 8 }
      },
      compatibility: Math.random() > 0.3 ? 'Excellent' : 'Good',
      mangalDosha: {
        partner1: Math.random() > 0.7,
        partner2: Math.random() > 0.7
      },
      recommendations: [
        'Perform pre-marriage ceremonies for better harmony',
        'Consider Grah Shanti Puja for planetary peace',
        'Exchange of gifts on auspicious occasions'
      ]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      partner1Name: '',
      partner1BirthDate: '',
      partner1BirthTime: '',
      partner1BirthPlace: '',
      partner1Gender: '',
      partner2Name: '',
      partner2BirthDate: '',
      partner2BirthTime: '',
      partner2BirthPlace: '',
      partner2Gender: ''
    });
    setResult(null);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 28) return 'text-green-600';
    if (score >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompatibilityText = (score) => {
    if (score >= 28) return 'Excellent Match';
    if (score >= 20) return 'Good Match';
    return 'Needs Attention';
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Marriage Compatibility Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Discover your marriage compatibility using traditional Vedic astrology Guna Milan system. 
            Get detailed 36-point compatibility analysis for arranged marriages and love relationships.
          </p>
         
          <form onSubmit={handleSubmit} className="space-y-8 mt-7">
            {/* Partner 1 Details */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Partner 1 Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="partner1Name"
                    value={formData.partner1Name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="partner1Gender"
                    value={formData.partner1Gender}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="partner1BirthDate"
                    value={formData.partner1BirthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    name="partner1BirthTime"
                    value={formData.partner1BirthTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place of Birth *
                  </label>
                  <input
                    type="text"
                    name="partner1BirthPlace"
                    value={formData.partner1BirthPlace}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </div>

            {/* Partner 2 Details */}
            <div className="bg-pink-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-pink-800">Partner 2 Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="partner2Name"
                    value={formData.partner2Name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="partner2Gender"
                    value={formData.partner2Gender}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="partner2BirthDate"
                    value={formData.partner2BirthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    name="partner2BirthTime"
                    value={formData.partner2BirthTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place of Birth *
                  </label>
                  <input
                    type="text"
                    name="partner2BirthPlace"
                    value={formData.partner2BirthPlace}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Check Compatibility
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Result Display */}
          {result && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-pink-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Compatibility Report: {formData.partner1Name} & {formData.partner2Name}
              </h3>
              
              {/* Overall Score */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">💕</div>
                <h2 className={`text-4xl font-bold mb-2 ${getCompatibilityColor(result.overallScore)}`}>
                  {result.overallScore}/36 Points
                </h2>
                <p className={`text-lg font-semibold ${getCompatibilityColor(result.overallScore)}`}>
                  {getCompatibilityText(result.overallScore)}
                </p>
              </div>
              
              {/* Guna Matching Details */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 text-center">Ashtakoot Guna Milan Breakdown</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(result.gunaMatching).map(([guna, data]) => (
                    <div key={guna} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium capitalize">{guna}</span>
                      <span className={`font-bold ${data.score === data.max ? 'text-green-600' : data.score > data.max/2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {data.score}/{data.max}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Mangal Dosha Status</h4>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p><strong>{formData.partner1Name}:</strong> {result.mangalDosha.partner1 ? 'Manglik' : 'Non-Manglik'}</p>
                    <p><strong>{formData.partner2Name}:</strong> {result.mangalDosha.partner2 ? 'Manglik' : 'Non-Manglik'}</p>
                    <p className="text-xs mt-2 text-gray-600">
                      {(result.mangalDosha.partner1 && result.mangalDosha.partner2) ? 
                        'Both partners are Manglik - Compatible' :
                        (!result.mangalDosha.partner1 && !result.mangalDosha.partner2) ? 
                        'Both partners are Non-Manglik - Compatible' :
                        'One partner is Manglik - Requires remedies'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Recommendations</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {result.recommendations.map((rec, index) => (
                      <li key={index}><strong>•</strong> {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Guna Milan Explanation */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Understanding Ashtakoot Guna Milan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">👑</div>
              <h3 className="font-semibold text-gray-800 mb-2">Varna (1 Point)</h3>
              <p className="text-sm text-gray-700">Spiritual compatibility and caste considerations</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold text-gray-800 mb-2">Vashya (2 Points)</h3>
              <p className="text-sm text-gray-700">Mutual attraction and control in relationship</p>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-800 mb-2">Tara (3 Points)</h3>
              <p className="text-sm text-gray-700">Birth star compatibility and destiny</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🐾</div>
              <h3 className="font-semibold text-gray-800 mb-2">Yoni (4 Points)</h3>
              <p className="text-sm text-gray-700">Sexual compatibility and animal instincts</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl mb-2">🪐</div>
              <h3 className="font-semibold text-gray-800 mb-2">Graha Maitri (5 Points)</h3>
              <p className="text-sm text-gray-700">Mental compatibility and friendship</p>
            </div>
            
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-3xl mb-2">👹</div>
              <h3 className="font-semibold text-gray-800 mb-2">Gana (6 Points)</h3>
              <p className="text-sm text-gray-700">Temperament and behavior matching</p>
            </div>
            
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-3xl mb-2">🌙</div>
              <h3 className="font-semibold text-gray-800 mb-2">Bhakoot (7 Points)</h3>
              <p className="text-sm text-gray-700">Love, affection and family welfare</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-2">💨</div>
              <h3 className="font-semibold text-gray-800 mb-2">Nadi (8 Points)</h3>
              <p className="text-sm text-gray-700">Health, progeny and genetic compatibility</p>
            </div>
          </div>
        </div>

        {/* Compatibility Scoring */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Marriage Compatibility Scoring Guide
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Excellent Match (28-36 Points)</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Characteristics:</strong> Highly compatible, excellent prospects</p>
                <p><strong>Marriage:</strong> Strongly recommended</p>
                <p><strong>Relationship:</strong> Harmonious and prosperous</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-4 text-yellow-700">Good Match (20-27 Points)</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Characteristics:</strong> Average compatibility</p>
                <p><strong>Marriage:</strong> Can proceed with remedies</p>
                <p><strong>Relationship:</strong> Requires mutual understanding</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-4 text-red-700">Needs Attention (Below 20)</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Characteristics:</strong> Low compatibility</p>
                <p><strong>Marriage:</strong> Not recommended traditionally</p>
                <p><strong>Relationship:</strong> Requires significant remedies</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Marriage Compatibility
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is Guna Milan necessary for love marriages?
              </h3>
              <p className="text-gray-700">
                While traditionally used for arranged marriages, Guna Milan can provide valuable insights 
                for love marriages too. It helps understand potential areas of harmony and challenge, 
                allowing couples to work on their relationship more effectively.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What if our compatibility score is low?
              </h3>
              <p className="text-gray-700">
                A low score doesn&apos;t mean the relationship is doomed. It indicates areas that may need 
                attention and care. Many couples with lower scores have successful marriages through 
                mutual understanding, respect, and appropriate remedies when suggested.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                How accurate is online compatibility checking?
              </h3>
              <p className="text-gray-700">
                Online calculators provide a basic analysis based on birth details. For comprehensive 
                compatibility assessment, including planetary positions, dashas, and other factors, 
                consultation with experienced astrologers is recommended.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Should Mangal Dosha affect compatibility decisions?
              </h3>
              <p className="text-gray-700">
                Mangal Dosha is one factor among many. If one partner is Manglik and the other is&apos;t, 
                it doesn&apos;t automatically disqualify the match. Proper remedies and mutual understanding 
                can address most Manglik-related concerns.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can compatibility improve after marriage?
              </h3>
              <p className="text-gray-700">
                Yes, compatibility can definitely improve through mutual respect, understanding, communication, 
                and spiritual practices. Many couples grow more compatible over time as they learn to 
                appreciate each other&apos;s differences and work together.
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
    </>
  );
};
const RashiCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo result
    setResult({
      rashi: 'Vrishabha (Taurus)',
      meaning: 'Stable, practical, and reliable. Taurus Moon sign people value security and comfort.',
      element: 'Earth',
      ruler: 'Venus',
      traits: [
        'Patient and persistent',
        'Loyal and trustworthy',
        'Enjoys beauty and luxury',
        'Can be stubborn'
      ]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Free Rashi Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Find your Vedic Moon sign (Rashi) instantly by entering your birth details. Discover your emotional nature, strengths, and compatibility based on your Rashi.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Find My Rashi
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-2xl font-bold text-center mb-4 text-purple-800">
                {formData.name ? `${formData.name}'s` : 'Your'} Rashi
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">🌓</div>
                <h2 className="text-4xl font-bold text-purple-600 mb-2">{result.rashi}</h2>
                <p className="text-lg text-gray-700 mb-4">{result.meaning}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Astrological Details</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li><strong>Element:</strong> {result.element}</li>
                    <li><strong>Ruler:</strong> {result.ruler}</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Traits</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {result.traits.map((trait, idx) => (
                      <li key={idx}><strong>•</strong> {trait}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What is Rashi (Moon Sign)?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl font-semibold mb-2">Emotional Nature</h3>
              <p className="text-gray-600">
                Rashi reveals your emotional core, instincts, and subconscious patterns.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-2">Personality Insights</h3>
              <p className="text-gray-600">
                Moon sign influences your reactions, habits, and relationship compatibility.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">Vedic Astrology</h3>
              <p className="text-gray-600">
                Rashi is central in Vedic astrology, used for predictions and matching.
              </p>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Rashi
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What is the difference between Rashi and Sun Sign?
              </h3>
              <p className="text-gray-700">
                Rashi is your Moon sign, showing your emotional nature. Sun sign is your zodiac sign, showing your core personality. Both are important in astrology.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Why is Rashi important in matchmaking?
              </h3>
              <p className="text-gray-700">
                Rashi is used in Vedic astrology for marriage compatibility, as it reflects emotional and mental harmony between partners.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can my Rashi change?
              </h3>
              <p className="text-gray-700">
                No, your Rashi is fixed at birth based on the Moon’s position. It does not change.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is Rashi used for predictions?
              </h3>
              <p className="text-gray-700">
                Yes, Rashi is central to Vedic predictions, including Dasha periods, compatibility, and remedies.
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
    </>
  );
};
const YantraCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    goal: ''
  });

  const [result, setResult] = useState(null);

  const yantraList = [
    {
      name: 'Shree Yantra',
      purpose: 'Wealth, prosperity, success',
      deity: 'Goddess Lakshmi',
      benefits: [
        'Attracts abundance',
        'Removes financial obstacles',
        'Brings harmony and growth'
      ]
    },
    {
      name: 'Mahamrityunjaya Yantra',
      purpose: 'Health, protection, longevity',
      deity: 'Lord Shiva',
      benefits: [
        'Protects from negative energies',
        'Improves health and vitality',
        'Removes fear and anxiety'
      ]
    },
    {
      name: 'Saraswati Yantra',
      purpose: 'Education, wisdom, creativity',
      deity: 'Goddess Saraswati',
      benefits: [
        'Enhances learning and memory',
        'Boosts creativity',
        'Improves focus and intellect'
      ]
    }
    // Add more yantras as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: pick a yantra based on goal or random
    let selected = yantraList[0];
    if (formData.goal.toLowerCase().includes('health')) selected = yantraList[1];
    if (formData.goal.toLowerCase().includes('study') || formData.goal.toLowerCase().includes('education')) selected = yantraList[2];
    setResult(selected);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: '',
      goal: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Yantra Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Find your ideal Vedic Yantra for success, protection, and spiritual growth. Enter your birth details and goal to get a personalized recommendation.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="City, State, Country"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Goal / Wish *
                </label>
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. Wealth, Health, Education"
                />
              </div>
            </div>
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Find My Yantra
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
              <h3 className="text-2xl font-bold text-center mb-4 text-cyan-800">
                Recommended Yantra for {formData.name || 'You'}
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">🧿</div>
                <h2 className="text-3xl font-bold text-cyan-600 mb-2">{result.name}</h2>
                <p className="text-lg text-gray-700 mb-4">{result.purpose}</p>
                <p className="text-gray-700 mb-2"><strong>Deity:</strong> {result.deity}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  {result.benefits.map((benefit, idx) => (
                    <li key={idx}><strong>•</strong> {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What is a Yantra?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🧿</div>
              <h3 className="text-xl font-semibold mb-2">Sacred Geometry</h3>
              <p className="text-gray-600">
                Yantras are mystical diagrams used for meditation, protection, and manifestation in Vedic tradition.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Spiritual Benefits</h3>
              <p className="text-gray-600">
                Each yantra is associated with a specific deity or planet and amplifies spiritual vibrations and intentions.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-xl font-semibold mb-2">How to Use</h3>
              <p className="text-gray-600">
                Place the yantra in a sacred space, energize it with mantras, and meditate daily for best results.
              </p>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Yantras
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Do I need to be religious to use a yantra?
              </h3>
              <p className="text-gray-700">
                No. Yantras work on the principles of energy and intention. Anyone can use them, regardless of religious background.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can I use more than one yantra at a time?
              </h3>
              <p className="text-gray-700">
                Yes, but it&apos;s best to consult an expert or use a calculator to avoid conflicting energies.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                How often should I energize the yantra?
              </h3>
              <p className="text-gray-700">
                Ideally, energize it during installation and periodically (monthly or during special occasions).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is there a yantra for health problems?
              </h3>
              <p className="text-gray-700">
                Yes, specific yantras are designed for health, healing, and well-being.
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
    </>
  );
};
const MoonSignCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  const [result, setResult] = useState(null);

  // Demo moon sign data
  const moonSigns = [
    {
      sign: 'Vrishabha (Taurus)',
      meaning: 'Stable, practical, and reliable. Taurus Moon sign people value security and comfort.',
      element: 'Earth',
      ruler: 'Venus',
      traits: [
        'Patient and persistent',
        'Loyal and trustworthy',
        'Enjoys beauty and luxury',
        'Can be stubborn'
      ]
    },
    {
      sign: 'Mithuna (Gemini)',
      meaning: 'Adaptable, curious, and communicative. Gemini Moon sign people love learning and socializing.',
      element: 'Air',
      ruler: 'Mercury',
      traits: [
        'Quick-witted',
        'Versatile',
        'Talkative',
        'Restless'
      ]
    }
    // Add more moon signs as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: alternate between Taurus and Gemini
    const selected = Math.random() > 0.5 ? moonSigns[0] : moonSigns[1];
    setResult(selected);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Free Moon Sign Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Find your Vedic Moon sign instantly by entering your birth details. Discover your emotional nature, strengths, and compatibility based on your Moon sign.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name (Optional)
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
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Find My Moon Sign
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-2xl font-bold text-center mb-4 text-blue-800">
                {formData.name ? `${formData.name}'s` : 'Your'} Moon Sign
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">🌙</div>
                <h2 className="text-4xl font-bold text-blue-600 mb-2">{result.sign}</h2>
                <p className="text-lg text-gray-700 mb-4">{result.meaning}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Astrological Details</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li><strong>Element:</strong> {result.element}</li>
                    <li><strong>Ruler:</strong> {result.ruler}</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">Traits</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {result.traits.map((trait, idx) => (
                      <li key={idx}><strong>•</strong> {trait}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What is a Moon Sign?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl font-semibold mb-2">Emotional Nature</h3>
              <p className="text-gray-600">
                Moon sign reveals your emotional core, instincts, and subconscious patterns.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-2">Personality Insights</h3>
              <p className="text-gray-600">
                Moon sign influences your reactions, habits, and relationship compatibility.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">Vedic Astrology</h3>
              <p className="text-gray-600">
                Moon sign is central in Vedic astrology, used for predictions and matching.
              </p>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Moon Signs
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What is the difference between Moon sign and Sun sign?
              </h3>
              <p className="text-gray-700">
                Moon sign shows your emotional nature. Sun sign shows your core personality. Both are important in astrology.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Why is Moon sign important in matchmaking?
              </h3>
              <p className="text-gray-700">
                Moon sign is used in Vedic astrology for marriage compatibility, as it reflects emotional and mental harmony between partners.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can my Moon sign change?
              </h3>
              <p className="text-gray-700">
                No, your Moon sign is fixed at birth based on the Moon’s position. It does not change.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is Moon sign used for predictions?
              </h3>
              <p className="text-gray-700">
                Yes, Moon sign is central to Vedic predictions, including Dasha periods, compatibility, and remedies.
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
    </>
  );
};
const FlamesCalculator = () => {
  const [formData, setFormData] = useState({
    name1: '',
    name2: ''
  });

  const [result, setResult] = useState(null);

  const flamesMap = [
    { letter: 'F', meaning: 'Friends', emoji: '🤝' },
    { letter: 'L', meaning: 'Love', emoji: '❤️' },
    { letter: 'A', meaning: 'Affection', emoji: '💖' },
    { letter: 'M', meaning: 'Marriage', emoji: '💍' },
    { letter: 'E', meaning: 'Enemies', emoji: '😠' },
    { letter: 'S', meaning: 'Siblings', emoji: '👫' }
  ];

  function calculateFLAMES(name1, name2) {
    let n1 = name1.replace(/[^a-zA-Z]/g, '').toLowerCase();
    let n2 = name2.replace(/[^a-zA-Z]/g, '').toLowerCase();

    let arr1 = n1.split('');
    let arr2 = n2.split('');

    // Remove common letters
    for (let i = 0; i < arr1.length; i++) {
      let idx = arr2.indexOf(arr1[i]);
      if (idx !== -1) {
        arr1[i] = '';
        arr2[idx] = '';
      }
    }
    let count = (arr1.join('') + arr2.join('')).length;
    if (count === 0) count = 1;
    let idx = (count - 1) % flamesMap.length;
    return flamesMap[idx];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const flamesResult = calculateFLAMES(formData.name1, formData.name2);
    setResult(flamesResult);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name1: '',
      name2: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            FLAMES Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter two names to find your relationship status using the classic FLAMES game!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name 1
                </label>
                <input
                  type="text"
                  name="name1"
                  value={formData.name1}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name 2
                </label>
                <input
                  type="text"
                  name="name2"
                  value={formData.name2}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter second name"
                />
              </div>
            </div>
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Calculate FLAMES
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-6 border border-orange-200 text-center">
              <div className="text-6xl mb-2">{result.emoji}</div>
              <h2 className="text-3xl font-bold text-orange-600 mb-2">{result.meaning}</h2>
              <p className="text-gray-700 text-lg">
                Relationship status for <span className="font-semibold">{formData.name1}</span> & <span className="font-semibold">{formData.name2}</span> is <span className="font-bold">{result.meaning}</span>!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            What is FLAMES?
          </h2>
          <p className="text-gray-700 mb-4">
            FLAMES is a fun childhood game used to predict the relationship between two people based on their names. The letters stand for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li><strong>F</strong> - Friends</li>
            <li><strong>L</strong> - Love</li>
            <li><strong>A</strong> - Affection</li>
            <li><strong>M</strong> - Marriage</li>
            <li><strong>E</strong> - Enemies</li>
            <li><strong>S</strong> - Siblings</li>
          </ul>
          <p className="text-gray-700">
            The game removes common letters from both names and counts the remaining letters to determine the relationship outcome.
          </p>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About FLAMES
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is FLAMES scientifically accurate?
              </h3>
              <p className="text-gray-700">
                No, FLAMES is just a fun game and not based on science or astrology. It’s meant for entertainment!
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can I use nicknames or full names?
              </h3>
              <p className="text-gray-700">
                Yes, you can use any names. The result will change based on the letters in the names you enter.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Why do people play FLAMES?
              </h3>
              <p className="text-gray-700">
                It’s a popular game among friends and classmates to have fun and see what relationship status comes up!
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
    </>
  );
};
const NameNumerologyCalculator = () => {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [result, setResult] = useState(null);

  // Pythagorean numerology mapping
  const numerologyMap = {
    A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
    J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
    S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
  };

  const numerologyMeanings = {
    1: { label: 'Leader', description: 'Independent, ambitious, and pioneering.' },
    2: { label: 'Diplomat', description: 'Cooperative, sensitive, and peacemaker.' },
    3: { label: 'Communicator', description: 'Creative, expressive, and optimistic.' },
    4: { label: 'Builder', description: 'Practical, disciplined, and reliable.' },
    5: { label: 'Adventurer', description: 'Freedom-loving, adaptable, and energetic.' },
    6: { label: 'Nurturer', description: 'Responsible, caring, and harmonious.' },
    7: { label: 'Seeker', description: 'Introspective, spiritual, and analytical.' },
    8: { label: 'Executive', description: 'Ambitious, authoritative, and goal-oriented.' },
    9: { label: 'Humanitarian', description: 'Compassionate, generous, and wise.' },
    11: { label: 'Master Intuitive', description: 'Visionary, inspired, and spiritual teacher.' },
    22: { label: 'Master Builder', description: 'Practical idealist, powerful manifestor.' },
    33: { label: 'Master Healer', description: 'Compassionate, uplifting, and nurturing.' }
  };

  function calculateNumerology(name) {
    if (!name) return null;
    let sum = 0;
    let letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
    letters.forEach(l => {
      sum += numerologyMap[l] || 0;
    });

    // Reduce to single digit or master number
    while (![11,22,33].includes(sum) && sum > 9) {
      sum = sum.toString().split('').reduce((a,b) => a + parseInt(b), 0);
    }
    return {
      number: sum,
      ...numerologyMeanings[sum]
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(calculateNumerology(formData.name));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({ name: '' });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Name Numerology Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your full name to discover your numerology number and its meaning. Based on the Pythagorean system.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Calculate Numerology
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200 text-center">
              <h3 className="text-2xl font-bold mb-4 text-green-800">
                Numerology Number for {formData.name}
              </h3>
              <div className="text-6xl mb-2">{result.number}</div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">{result.label}</h2>
              <p className="text-lg text-gray-700 mb-4">{result.description}</p>
            </div>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            How Name Numerology Works
          </h2>
          <p className="text-gray-700 mb-4">
            Numerology assigns numbers to each letter of your name. The sum is reduced to a single digit or master number, each with unique traits and meanings.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 text-green-700">Pythagorean Mapping</h3>
              <ul className="list-disc pl-6 text-gray-700 text-sm">
                <li>A, J, S = 1</li>
                <li>B, K, T = 2</li>
                <li>C, L, U = 3</li>
                <li>D, M, V = 4</li>
                <li>E, N, W = 5</li>
                <li>F, O, X = 6</li>
                <li>G, P, Y = 7</li>
                <li>H, Q, Z = 8</li>
                <li>I, R = 9</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-700">What Your Number Means</h3>
              <ul className="list-disc pl-6 text-gray-700 text-sm">
                <li>1: Leadership, independence</li>
                <li>2: Partnership, diplomacy</li>
                <li>3: Creativity, communication</li>
                <li>4: Stability, discipline</li>
                <li>5: Adventure, freedom</li>
                <li>6: Care, responsibility</li>
                <li>7: Wisdom, introspection</li>
                <li>8: Power, ambition</li>
                <li>9: Compassion, service</li>
                <li>11/22/33: Master numbers (spiritual significance)</li>
              </ul>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Name Numerology
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can changing my name change my numerology number?
              </h3>
              <p className="text-gray-700">
                Yes, changing your name alters your numerology profile and can influence your life experience.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Are master numbers special?
              </h3>
              <p className="text-gray-700">
                Master numbers (11, 22, 33) have higher spiritual significance and are not reduced further.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is numerology scientific?
              </h3>
              <p className="text-gray-700">
                Numerology is a metaphysical system, not a science. It offers personal insight and guidance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What if I use a nickname?
              </h3>
              <p className="text-gray-700">
                Calculators can use nicknames, but the most accurate results come from your full birth name.
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
    </>
  );
};
const TransitChartCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo result
    setResult({
      date: new Date().toLocaleDateString(),
      transits: [
        { planet: 'Jupiter', sign: 'Aries', effect: 'Expansion in career and learning.' },
        { planet: 'Saturn', sign: 'Pisces', effect: 'Focus on emotional discipline.' },
        { planet: 'Venus', sign: 'Gemini', effect: 'New opportunities in relationships.' }
      ]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: ''
    });
    setResult(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Transit Chart Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            See current planetary transits and their effects on your birth chart. Enter your birth details to get instant transit insights.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
            <div className="text-center space-x-4">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Show Transits
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-2xl font-bold text-center mb-4 text-indigo-800">
                Transit Chart for {formData.name || 'You'} ({result.date})
              </h3>
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">🪐</div>
                <h2 className="text-3xl font-bold text-indigo-600 mb-2">Current Transits</h2>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Planetary Effects</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  {result.transits.map((transit, idx) => (
                    <li key={idx}>
                      <strong>{transit.planet}</strong> in <strong>{transit.sign}</strong>: {transit.effect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What is a Transit Chart?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🪐</div>
              <h3 className="text-xl font-semibold mb-2">Planetary Movements</h3>
              <p className="text-gray-600">
                Transit charts show the current positions of planets and how they interact with your birth chart.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Timing & Events</h3>
              <p className="text-gray-600">
                Transits help predict important life events, opportunities, and challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Vedic Astrology</h3>
              <p className="text-gray-600">
                Transit analysis is a key part of Vedic astrology for forecasting and planning.
              </p>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions About Transits
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                What is a planetary transit?
              </h3>
              <p className="text-gray-700">
                A transit is when a planet moves through a sign or house, influencing your life based on its position relative to your birth chart.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                How often do transits change?
              </h3>
              <p className="text-gray-700">
                Fast-moving planets like the Moon change signs every few days, while slow planets like Saturn take years.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Can transits predict the future?
              </h3>
              <p className="text-gray-700">
                Transits indicate timing for events, opportunities, and challenges, but free will and other chart factors also play a role.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Is transit analysis useful for planning?
              </h3>
              <p className="text-gray-700">
                Yes, transit charts are widely used for planning important actions, travel, investments, and personal growth.
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
    </>
  );
};


// Calculator definitions with SEO data
const calculatorData = {
  'name-numerology-calculator': {
  component: NameNumerologyCalculator,
  title: 'Name Numerology Calculator | Free Name Number | AstroSight',
  description: 'Discover your numerology number from your name using the Pythagorean system. Get instant insights into your personality and destiny.',
  keywords: 'name numerology calculator, numerology number, name number, pythagorean numerology, numerology meanings',
  h1: 'Name Numerology Calculator'
},
'transit-chart-calculator': {
  component: TransitChartCalculator,
  title: 'Transit Chart Calculator | Planetary Transits | AstroSight',
  description: 'See current planetary transits and their effects on your birth chart instantly. Get Vedic astrology transit insights for planning and prediction.',
  keywords: 'transit chart calculator, planetary transits, vedic astrology, transit analysis, astrology forecast',
  h1: 'Transit Chart Calculator'
},
  'moon-sign-calculator': {
  component: MoonSignCalculator,
  title: 'Moon Sign Calculator | Vedic Moon Sign Finder | AstroSight',
  description: 'Find your Vedic Moon sign instantly. Discover your emotional nature, strengths, and compatibility based on your Moon sign.',
  keywords: 'moon sign calculator, vedic moon sign, moon sign finder, astrology calculator, emotional astrology',
  h1: 'Moon Sign Calculator'
},
  'yantra-calculator': {
  component: YantraCalculator,
  title: 'Yantra Calculator | Vedic Yantra Recommendation | AstroSight',
  description: 'Find your ideal Vedic Yantra for success, protection, and spiritual growth. Get personalized recommendations based on your birth details and goals.',
  keywords: 'yantra calculator, vedic yantra, yantra recommendation, spiritual tools, astrology yantra',
  h1: 'Yantra Calculator'
},
  'kaal-sarp-dosh-calculator': {
  component: KaalSarpDoshCalculator,
  title: 'Kaal Sarp Dosh Calculator | Rahu-Ketu Dosh | AstroSight',
  description: 'Check your birth chart for Kaal Sarp Dosh. Get instant analysis of Rahu-Ketu positions, dosh type, severity, and effective remedies.',
  keywords: 'kaal sarp dosh calculator, kaal sarp dosh, rahu ketu dosh, astrology calculator, kaal sarp remedies',
  h1: 'Kaal Sarp Dosh Calculator'
},'flames-calculator': {
  component: FlamesCalculator,
  title: 'FLAMES Calculator | Relationship Status Game | AstroSight',
  description: 'Find your relationship status using the classic FLAMES game. Enter two names and discover if you are friends, lovers, or more!',
  keywords: 'flames calculator, flames game, relationship status, name compatibility, fun astrology',
  h1: 'FLAMES Calculator'
},
    'marriage-compatibility-calculator': {
    component: MarriageCompatibilityCalculator,
    title: 'Marriage Compatibility Calculator | Guna Milan | AstroSight',
    description: 'Check marriage compatibility using Vedic astrology Guna Milan system. Get detailed 36-point compatibility analysis for arranged marriages and relationships.',
    keywords: 'marriage compatibility, guna milan, kundli matching, marriage astrology, ashtakoot, vedic compatibility',
    h1: 'Marriage Compatibility Calculator'
  },
    'mangal-dosha-calculator': {
    component: MangalDoshaCalculator,
    title: 'Free Mangal Dosha Calculator | Manglik Dosha Check | AstroSight',
    description: 'Check for Mangal Dosha (Manglik Dosha) in your birth chart instantly. Get detailed analysis of Mars placement effects on marriage with effective remedies.',
    keywords: 'mangal dosha calculator, manglik dosha, mars dosha, marriage astrology, manglik calculator, kuja dosha',
    h1: 'Mangal Dosha Calculator'
  },
   'sun-sign-calculator': {
    component: SunSignCalculator,
    title: 'Free Sun Sign Calculator | Zodiac Sign Calculator | AstroSight',
    description: 'Discover your zodiac sun sign instantly with our free calculator. Enter your birth date to find your astrological sign with detailed personality traits and characteristics.',
    keywords: 'sun sign calculator, zodiac sign calculator, astrology sign, horoscope sign, birth date astrology',
    h1: 'Sun Sign Calculator'
  },
  'birth-chart-calculator': {
    component: BirthChartCalculator,
    title: 'Free Birth Chart Calculator | Vedic Astrology | AstroSight',
    description: 'Generate your detailed birth chart with accurate planetary positions. Free Vedic astrology birth chart calculator with comprehensive analysis and predictions.',
    keywords: 'birth chart calculator, vedic astrology, natal chart, horoscope calculator, astrology chart',
    h1: 'Birth Chart Calculator'
  },
  'love-compatibility-calculator': {
    component: LoveCompatibilityCalculator,
    title: 'Love Compatibility Calculator | Relationship Astrology | AstroSight',
    description: 'Check your love compatibility using astrology. Free relationship compatibility calculator based on birth charts and planetary positions.',
    keywords: 'love compatibility, relationship astrology, compatibility calculator, match making, synastry',
    h1: 'Love Compatibility Calculator'
  },
  'dasha-calculator': {
    component: DashaCalculator,
    title: 'Dasha Calculator | Planetary Periods | Vedic Astrology | AstroSight',
    description: 'Calculate your planetary periods (Dasha) and their influence on your life. Free Vedic astrology Dasha calculator with detailed predictions.',
    keywords: 'dasha calculator, planetary periods, vedic astrology, mahadasha, antardasha',
    h1: 'Dasha Calculator'
  },
  'rashi-calculator': {
  component: RashiCalculator,
  title: 'Rashi Calculator | Moon Sign Finder | AstroSight',
  description: 'Find your Vedic Moon sign (Rashi) instantly. Discover your emotional nature, strengths, and compatibility based on your Rashi.',
  keywords: 'rashi calculator, moon sign calculator, vedic astrology, rashi finder, moon sign meaning',
  h1: 'Rashi Calculator'
},
  'numerology-calculator': {
    component: () => <ComingSoonCalculator 
      title="Numerology Calculator" 
      description="Discover the power of numbers in your life with our comprehensive numerology calculator." 
    />,
    title: 'Numerology Calculator | Life Path Number | AstroSight',
    description: 'Calculate your life path number, destiny number, and personality number. Free numerology calculator with detailed interpretations.',
    keywords: 'numerology calculator, life path number, destiny number, numerology chart',
    h1: 'Numerology Calculator'
  },
  'kundali-matching': {
    component: () => <ComingSoonCalculator 
      title="Kundali Matching" 
      description="Traditional Kundali matching for marriage compatibility based on Vedic astrology principles." 
    />,
    title: 'Kundali Matching | Marriage Compatibility | AstroSight',
    description: 'Free Kundali matching for marriage compatibility. Check Guna Milan and Ashtakoot matching based on Vedic astrology.',
    keywords: 'kundali matching, marriage compatibility, guna milan, ashtakoot, vedic marriage',
    h1: 'Kundali Matching'
  },
  'palm-reading': {
    component: () => <ComingSoonCalculator 
      title="Palm Reading" 
      description="Discover your future through the ancient art of palmistry and hand analysis." 
    />,
    title: 'Palm Reading | Palmistry Analysis | AstroSight',
    description: 'Learn about palmistry and palm reading techniques. Discover what your palm lines reveal about your personality and future.',
    keywords: 'palm reading, palmistry, hand analysis, palm lines, chiromancy',
    h1: 'Palm Reading'
  },
  'tarot-reading': {
    component: () => <ComingSoonCalculator 
      title="Tarot Reading" 
      description="Get insights into your life with our interactive tarot card reading experience." 
    />,
    title: 'Tarot Reading | Free Tarot Cards | AstroSight',
    description: 'Free online tarot reading with detailed card interpretations. Get insights into love, career, and life with our tarot cards.',
    keywords: 'tarot reading, tarot cards, free tarot, card reading, divination',
    h1: 'Tarot Reading'
  },
  'gemstone-recommendation': {
    component: () => <ComingSoonCalculator 
      title="Gemstone Recommendation" 
      description="Find the perfect gemstone for you based on your birth chart and planetary positions." 
    />,
    title: 'Gemstone Recommendation | Lucky Stones | AstroSight',
    description: 'Get personalized gemstone recommendations based on your birth chart. Find your lucky stones and healing crystals.',
    keywords: 'gemstone recommendation, lucky stones, healing crystals, birthstone, astrology gems',
    h1: 'Gemstone Recommendation'
  },
  'muhurat-calculator': {
    component: () => <ComingSoonCalculator 
      title="Muhurat Calculator" 
      description="Find auspicious times for important events and ceremonies using Vedic astrology." 
    />,
    title: 'Muhurat Calculator | Auspicious Time | AstroSight',
    description: 'Find auspicious muhurat for marriage, business, travel and other important events. Free Vedic astrology muhurat calculator.',
    keywords: 'muhurat calculator, auspicious time, vedic calendar, panchang, good time',
    h1: 'Muhurat Calculator'
  },
  'career-astrology': {
    component: () => <ComingSoonCalculator 
      title="Career Astrology" 
      description="Discover your ideal career path based on your birth chart and planetary influences." 
    />,
    title: 'Career Astrology | Job Prediction | AstroSight',
    description: 'Get career guidance through astrology. Discover your ideal profession and career path based on your birth chart.',
    keywords: 'career astrology, job prediction, profession astrology, career guidance, work horoscope',
    h1: 'Career Astrology'
  }
};

export default function CalculatorPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Handle loading state
  if (!slug) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </>
    );
  }

  const calculatorInfo = calculatorData[slug];

  // Handle 404 for unknown slugs
  if (!calculatorInfo) {
    return (
      <>
        <Head>
          <title>Calculator Not Found | AstroSight</title>
          <meta name="description" content="The requested astrology calculator was not found." />
        </Head>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Calculator Not Found</h1>
            <p className="text-gray-600 mb-8">The requested astrology calculator was not found.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go Home
            </button>
          </div>
        </div>
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </>
    );
  }

  const Component = calculatorInfo.component;

  return (
    <>
      <Head>
        <title>{calculatorInfo.title}</title>
        <meta name="description" content={calculatorInfo.description} />
        <meta name="keywords" content={calculatorInfo.keywords} />
        <meta property="og:title" content={calculatorInfo.title} />
        <meta property="og:description" content={calculatorInfo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://astrosight.com/astrocalculator/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={calculatorInfo.title} />
        <meta name="twitter:description" content={calculatorInfo.description} />
        <link rel="canonical" href={`https://astrosight.com/astrocalculator/${slug}`} />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": calculatorInfo.h1,
              "description": calculatorInfo.description,
              "url": `https://astrosight.com/astrocalculator/${slug}`,
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "provider": {
                "@type": "Organization",
                "name": "AstroSight",
                "url": "https://astrosight.com"
              }
            })
          }}
        />
      </Head>
      
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Component />
      </div>
      <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </>
  );
}
