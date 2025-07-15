import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
      </div>
    </>
  );
};

// Calculator definitions with SEO data
const calculatorData = {
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
        <meta property="og:url" content={`https://astrosight.com/report/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={calculatorInfo.title} />
        <meta name="twitter:description" content={calculatorInfo.description} />
        <link rel="canonical" href={`https://astrosight.com/report/${slug}`} />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": calculatorInfo.h1,
              "description": calculatorInfo.description,
              "url": `https://astrosight.com/report/${slug}`,
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
