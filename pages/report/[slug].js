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

  return (<>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Birth Chart Calculator
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Generate your personalized birth chart with detailed planetary positions and insights.
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
            <div className="max-w-6xl mx-auto px-4 py-16">

           {/* Additional Info Section */}
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
                <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
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
                      Our birth chart calculator generates detailed natal charts with precise planetary 
                      positions, while our compatibility calculator helps you understand relationship 
                      dynamics. The Dasha calculator reveals your planetary periods and their influence 
                      on different life phases.
                    </p>
                    <p className="text-gray-700">
                      We&apos;re continuously expanding our toolkit with new calculators for numerology, 
                      palmistry, tarot, gemstone recommendations, and more. Each tool is designed 
                      to provide meaningful insights into your personality, relationships, career, 
                      and life path.
                    </p>
                  </div>
                </div>   </div></>
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
            {/* Additional Info Section */}
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
                <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
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
                      Our birth chart calculator generates detailed natal charts with precise planetary 
                      positions, while our compatibility calculator helps you understand relationship 
                      dynamics. The Dasha calculator reveals your planetary periods and their influence 
                      on different life phases.
                    </p>
                    <p className="text-gray-700">
                      We&apos;re continuously expanding our toolkit with new calculators for numerology, 
                      palmistry, tarot, gemstone recommendations, and more. Each tool is designed 
                      to provide meaningful insights into your personality, relationships, career, 
                      and life path.
                    </p>
                  </div>
                </div>
            <Footer />
    </div>
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
  );
};

// Coming Soon Component for other calculators
const ComingSoonCalculator = ({ title, description }) => {
  return (
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
        <Footer />
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
        <Footer />
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
      <Footer />
    </>
  );
}
