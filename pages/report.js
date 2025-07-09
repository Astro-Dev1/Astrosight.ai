import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';

const ReportsPage = () => {
  const router = useRouter();

  const reports = [
    {
      id: 1,
      title: 'Career Analysis Report',
      description: 'Discover your professional path, ideal career choices, and growth opportunities based on planetary positions.',
      icon: 'briefcase',
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      title: 'Relationship Compatibility',
      description: 'Deep analysis of romantic compatibility, understanding your partner, and relationship dynamics.',
      icon: 'heart',
      color: 'bg-pink-500',
      gradient: 'from-pink-400 to-pink-600'
    },
    {
      id: 3,
      title: 'Marriage Compatibility Report',
      description: 'Comprehensive marriage analysis including timing, partner traits, and marital harmony predictions.',
      icon: 'rings-wedding',
      color: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      title: 'Newborn Child Report',
      description: 'Complete astrological profile for your newborn including personality traits, health, and future prospects.',
      icon: 'baby',
      color: 'bg-green-500',
      gradient: 'from-green-400 to-green-600'
    },
    {
      id: 5,
      title: 'Financial Prosperity Report',
      description: 'Analysis of wealth potential, investment timing, and financial growth opportunities.',
      icon: 'chart-line',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 6,
      title: 'Health & Wellness Report',
      description: 'Insights into health patterns, potential issues, and remedies based on your birth chart.',
      icon: 'heartbeat',
      color: 'bg-red-500',
      gradient: 'from-red-400 to-red-600'
    },
    {
      id: 7,
      title: 'Education & Learning Report',
      description: 'Best study periods, ideal subjects, and educational success predictions for students.',
      icon: 'graduation-cap',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 8,
      title: 'Travel & Relocation Report',
      description: 'Favorable directions, timing for travel, and best locations for relocation based on astrology.',
      icon: 'globe',
      color: 'bg-teal-500',
      gradient: 'from-teal-400 to-teal-600'
    }
  ];

  return (
    <>
      <SEOHead
        title="Astrological Reports - AstroSight | Detailed Life Analysis"
        description="Get comprehensive astrological reports from AstroSight including career analysis, relationship compatibility, marriage reports, and more personalized insights."
        keywords="AstroSight reports, astrology reports, career analysis, relationship compatibility, marriage report, birth chart analysis, horoscope reports"
        canonical="https://astrosight.ai/report"
        ogImage="https://astrosight.ai/images/reports.jpg"
      />
      
      <div className="min-h-screen bg-[#FFF6E9]">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center p-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="p-2 text-gray-600 hover:text-[#FF9D42]"
          >
            <i className="fas fa-arrow-left text-xl" />
          </Button>
          <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Astrological Reports</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FF9D42] to-[#FFB366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Deep Dive Astrological Analysis</h2>
          <p className="text-lg opacity-90 mb-6">
            Unlock profound insights into different aspects of your life with our comprehensive astrological reports
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <i className="fas fa-star" />
            <span>AI-Powered Insights</span>
            <i className="fas fa-circle text-xs mx-2" />
            <i className="fas fa-user-astronaut" />
            <span>Expert Analysis</span>
            <i className="fas fa-circle text-xs mx-2" />
            <i className="fas fa-chart-line" />
            <span>Personalized Reports</span>
          </div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3">
            <i className="fas fa-clock text-2xl" />
            <div>
              <h3 className="text-xl font-semibold">Coming Soon</h3>
              <p className="text-sm opacity-90">Were crafting these detailed reports for you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {reports.map((report) => (
            <Card key={report.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${report.gradient}`} />
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center text-white`}>
                    <i className={`fas fa-${report.icon} text-lg`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {report.description}
                </p>

                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <i className="fas fa-check-circle text-green-500 mr-2" />
                      <span className="font-medium">What you ll get:</span>
                    </div>
                    <ul className="text-xs text-gray-500 space-y-1 ml-6">
                      <li>• Detailed analysis & insights</li>
                      <li>• Personalized recommendations</li>
                      <li>• Remedies & solutions</li>
                      <li>• Future predictions</li>
                    </ul>
                  </div>

                  <Button 
                    className="w-full bg-gray-200 text-gray-500 cursor-not-allowed"
                    disabled
                  >
                    <i className="fas fa-clock mr-2" />
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notify Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FF9D42] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bell text-[#FF9D42] text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Notified When Reports Launch</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Be the first to access our comprehensive astrological reports. We re working hard to bring you the most accurate and insightful analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Button
                onClick={() => router.push('/User/login')}
                className="flex-1 h-12 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-lg"
              >
                <i className="fas fa-user-plus mr-2" />
                Join Waitlist
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="flex-1 h-12 border-[#FF9D42] text-[#FF9D42] hover:bg-[#FFEBD6] font-semibold rounded-lg"
              >
                <i className="fas fa-home mr-2" />
                Back to Home
              </Button>
            </div>

            <div className="mt-6 p-4 bg-[#FFF6E9] rounded-lg">
              <p className="text-sm text-gray-600">
                <i className="fas fa-envelope text-[#FF9D42] mr-2" />
                Questions about our reports? Contact us at{' '}
                <a href="mailto:reports@astrosight.ai" className="text-[#FF9D42] font-medium hover:underline">
                  reports@astrosight.ai
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-12 mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">What Makes Our Reports Special</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-robot text-blue-500 text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Analysis</h4>
              <p className="text-gray-600 text-sm">Advanced algorithms combined with traditional astrology for accurate insights</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-tie text-green-500 text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Expert Validation</h4>
              <p className="text-gray-600 text-sm">Every report reviewed by experienced astrologers for authenticity</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-bar text-purple-500 text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Detailed Insights</h4>
              <p className="text-gray-600 text-sm">Comprehensive analysis with actionable recommendations and remedies</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsPage;