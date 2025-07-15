import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { InternalLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../../components/InternalLinksGrid';

const calculators = [
  {
    slug: 'birth-chart-calculator',
    title: 'Birth Chart Calculator',
    description: 'Generate your detailed birth chart with accurate planetary positions',
    icon: '🌟',
    color: 'blue',
    available: true
  },
  {
    slug: 'love-compatibility-calculator',
    title: 'Love Compatibility Calculator',
    description: 'Check your romantic compatibility using astrology',
    icon: '💕',
    color: 'pink',
    available: true
  },
  {
    slug: 'dasha-calculator',
    title: 'Dasha Calculator',
    description: 'Calculate your planetary periods and their influence',
    icon: '⏰',
    color: 'purple',
    available: true
  },
  {
    slug: 'numerology-calculator',
    title: 'Numerology Calculator',
    description: 'Discover the power of numbers in your life',
    icon: '🔢',
    color: 'green',
    available: false
  },
  {
    slug: 'kundali-matching',
    title: 'Kundali Matching',
    description: 'Traditional marriage compatibility analysis',
    icon: '💍',
    color: 'red',
    available: false
  },
  {
    slug: 'palm-reading',
    title: 'Palm Reading',
    description: 'Discover your future through palmistry',
    icon: '🤚',
    color: 'yellow',
    available: false
  },
  {
    slug: 'tarot-reading',
    title: 'Tarot Reading',
    description: 'Get insights with interactive tarot cards',
    icon: '🃏',
    color: 'indigo',
    available: false
  },
  {
    slug: 'gemstone-recommendation',
    title: 'Gemstone Recommendation',
    description: 'Find your perfect gemstone based on your chart',
    icon: '💎',
    color: 'cyan',
    available: false
  },
  {
    slug: 'muhurat-calculator',
    title: 'Muhurat Calculator',
    description: 'Find auspicious times for important events',
    icon: '📅',
    color: 'orange',
    available: false
  },
  {
    slug: 'career-astrology',
    title: 'Career Astrology',
    description: 'Discover your ideal career path through astrology',
    icon: '💼',
    color: 'teal',
    available: false
  }
];

const colorClasses = {
  blue: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
  pink: 'border-pink-200 hover:border-pink-400 hover:shadow-pink-100',
  purple: 'border-purple-200 hover:border-purple-400 hover:shadow-purple-100',
  green: 'border-green-200 hover:border-green-400 hover:shadow-green-100',
  red: 'border-red-200 hover:border-red-400 hover:shadow-red-100',
  yellow: 'border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100',
  indigo: 'border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100',
  cyan: 'border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-100',
  orange: 'border-orange-200 hover:border-orange-400 hover:shadow-orange-100',
  teal: 'border-teal-200 hover:border-teal-400 hover:shadow-teal-100'
};

export default function ReportIndex() {
  return (
    <>
      <Head>
        <title>Astrology Calculators | Free Tools | AstroSight</title>
        <meta 
          name="description" 
          content="Explore our comprehensive collection of free astrology calculators including birth charts, compatibility, dasha, numerology, and more. Get instant astrological insights." 
        />
        <meta 
          name="keywords" 
          content="astrology calculators, birth chart calculator, compatibility calculator, vedic astrology tools, free astrology software" 
        />
        <meta property="og:title" content="Astrology Calculators | Free Tools | AstroSight" />
        <meta 
          property="og:description" 
          content="Explore our comprehensive collection of free astrology calculators including birth charts, compatibility, dasha, numerology, and more." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://astrosight.com/astrocalculator" />
        <link rel="canonical" href="https://astrosight.com/astrocalculator" />
      </Head>

      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-300 to-orange-500 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl mt-3 md:text-5xl font-bold mb-6">
              AstroSight Calculators & Tools
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover your cosmic blueprint with our comprehensive collection of astrology calculators
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">✨ Free Forever</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🎯 Accurate Results</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">📱 Mobile Friendly</span>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calculator) => (
              <div key={calculator.slug} className="relative">
                <Link href={`/astrocalculator/${calculator.slug}`}>
                  <div className={`
                    bg-white rounded-xl shadow-lg border-2 transition-all duration-300 
                    cursor-pointer transform hover:scale-105 hover:shadow-xl p-6
                    ${colorClasses[calculator.color]}
                    ${!calculator.available ? 'opacity-75' : ''}
                  `}>
                    {/* Coming Soon Badge */}
                    {!calculator.available && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Coming Soon
                      </div>
                    )}

                    {/* Icon */}
                    <div className="text-4xl mb-4 text-center">
                      {calculator.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {calculator.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-4 text-sm leading-relaxed">
                      {calculator.description}
                    </p>

                    {/* CTA */}
                    <div className="text-center">
                      <span className={`
                        inline-block px-6 py-2 rounded-full text-sm font-semibold transition-colors
                        ${calculator.available 
                          ? 'bg-gray-800 text-white hover:bg-gray-700' 
                          : 'bg-gray-300 text-gray-600'
                        }
                      `}>
                        {calculator.available ? 'Try Now →' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
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
          
          {/* Internal Links Section */}
          <div className="mt-16 space-y-8">
            <InternalLinksGrid />
            <HoroscopeNavigation />
            <CompatibilityLinksGrid />
            <RecentBlogLinks />
          </div>
        </div>
      </div>
      <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </>
  );
}
