// pages/deep-dive-reports.js
import Head from 'next/head';
// import Link from 'next/link';
import Footer from '../components/Footer';
import CustomHeader from '../components/CustomHeader';

export default function ComingSoon() {
  const reportTypes = [
    {
      title: 'Career Deep Dive Report',
      description: 'Detailed career path analysis',
      icon: '💼',
      gradient: 'from-blue-500 to-purple-600',
      features: [
        'Detailed career path analysis',
        'Optimal timing for job changes',
        'Industry compatibility assessment',
        'Leadership potential evaluation'
      ]
    },
    {
      title: 'Advanced Marriage Compatibility Report',
      description: 'Multi-dimensional compatibility analysis',
      icon: '💕',
      gradient: 'from-pink-500 to-rose-600',
      features: [
        'Multi-dimensional compatibility analysis',
        'Timing for relationship milestones',
        'Conflict resolution strategies',
        'Long-term relationship forecast'
      ]
    },
    {
      title: 'Newborn Baby Astrological Blueprint',
      description: 'Complete birth chart analysis',
      icon: '👶',
      gradient: 'from-green-500 to-emerald-600',
      features: [
        'Complete birth chart analysis',
        'Personality traits and tendencies',
        'Educational guidance recommendations',
        'Health and wellness insights'
      ]
    },
    {
      title: 'Wealth & Financial Prosperity Report',
      description: 'Income potential analysis',
      icon: '💰',
      gradient: 'from-yellow-500 to-orange-600',
      features: [
        'Income potential analysis',
        'Investment timing guidance',
        'Business venture compatibility',
        'Financial abundance periods'
      ]
    },
    {
      title: 'Relationships Deep Analysis',
      description: 'Family dynamics interpretation',
      icon: '🤝',
      gradient: 'from-indigo-500 to-blue-600',
      features: [
        'Family dynamics interpretation',
        'Friendship compatibility patterns',
        'Social interaction strengths',
        'Communication style insights'
      ]
    }
  ];

  const features = [
    {
      icon: '📊',
      title: '50+ Page Comprehensive Analysis',
      description: 'In-depth charts, calculations, and interpretations',
      color: 'text-blue-600'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Precision',
      description: 'Advanced algorithms ensure accurate calculations',
      color: 'text-purple-600'
    },
    {
      icon: '📚',
      title: 'Traditional Vedic Wisdom',
      description: 'Rooted in authentic astrological principles',
      color: 'text-green-600'
    },
    {
      icon: '📱',
      title: 'Interactive PDF Format',
      description: 'Easy navigation with bookmarks and hyperlinks',
      color: 'text-pink-600'
    },
    {
      icon: '🔄',
      title: 'Regular Updates',
      description: 'Evolving insights as our AI learns and improves',
      color: 'text-indigo-600'
    },
    {
      icon: '🎯',
      title: 'Personalized Insights',
      description: 'Tailored specifically to your unique birth chart',
      color: 'text-orange-600'
    }
  ];

  const timeline = [
    {
      quarter: 'Q4 2025',
      title: 'Beta Testing Phase',
      description: 'Beta testing with select users',
      status: 'upcoming',
      icon: '🧪'
    },
    {
      quarter: 'Q1 2026',
      title: 'Full Launch',
      description: 'Full launch with all report types',
      status: 'primary',
      icon: '🚀'
    },
    {
      quarter: 'Ongoing',
      title: 'Continuous Evolution',
      description: 'Regular feature updates and new report categories',
      status: 'ongoing',
      icon: '🔄'
    }
  ];

  return (
    <>
      <Head>
        <title>Deep Dive Astrology Reports Coming Soon | AstroSight</title>
        <meta name="description" content="Comprehensive Vedic astrology reports coming soon. Career, marriage, wealth, and relationship insights powered by AI. Join early access list." />
        <meta name="keywords" content="Vedic astrology reports, detailed birth chart analysis, astrological insights" />
      </Head>

      <div className="min-h-screen font-kohinoor bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <CustomHeader />

        {/* Hero Section with Enhanced Design */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-orange-200/30"></div>
          <div className="relative container mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              Coming Soon
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 leading-tight">
              Deep Dive Astrological Reports
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 mb-8 leading-relaxed">
              Unlock profound insights with our comprehensive Vedic astrology analysis reports, 
              crafted by advanced AI and traditional wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* <Link href="/early-access" className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="flex items-center">
                  Join Early Access List
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link> */}
              <div className="flex items-center text-gray-600">
                <span className="text-sm">🔔 Get notified when available</span>
              </div>
            </div>
          </div>
        </header>

        {/* Value Proposition with Better Spacing */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              The Most <span className="text-orange-600">Detailed Astrological Insights</span> You have Ever Experienced
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our upcoming deep dive reports combine centuries-old Vedic astrology principles with 
              cutting-edge AI analysis to deliver personalized guidance that goes beyond surface-level predictions.
            </p>
          </div>
        </section>

        {/* Enhanced Reports Grid */}
        <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-gray-50">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Comprehensive Reports in Development
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reportTypes.map((report, idx) => (
              <div key={idx} className="group relative bg-white border border-gray-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${report.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{report.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-orange-700 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{report.description}</p>
                  <ul className="space-y-3">
                    {report.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            What Makes Our Reports <span className="text-orange-600">Special</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div key={idx} className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`text-5xl mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Timeline Section */}
        <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-gray-50 to-white">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Development Roadmap
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-orange-300 to-orange-500"></div>
              
              <div className="space-y-12">
                {timeline.map((item, idx) => (
                  <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    {/* Content */}
                    <div className={`w-5/12 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${
                        item.status === 'primary' ? 'border-orange-500' : 
                        item.status === 'ongoing' ? 'border-green-500' : 'border-blue-500'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{item.icon}</span>
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            item.status === 'primary' ? 'bg-orange-100 text-orange-700' :
                            item.status === 'ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.quarter}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-12 md:p-16 rounded-3xl text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Be Among the First to Experience Deep Dive Reports
              </h2>
              <p className="text-xl mb-8 text-orange-100 leading-relaxed">
                Join our early access list and get notified when these comprehensive reports become available.
              </p>
              {/* <Link href="/early-access" className="group inline-flex items-center bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Early Access
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link> */}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}