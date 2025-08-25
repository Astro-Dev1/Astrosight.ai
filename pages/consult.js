// pages/early-access.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '../components/Footer';
import CustomHeader from '../components/CustomHeader';
import { submitFeedback } from '../services/centralApi';

export default function EarlyAccess() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reportTypes: [],
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const reportOptions = [
    {
      name: 'Career Deep Dive Report',
      icon: '💼',
      description: 'Detailed career path analysis'
    },
    {
      name: 'Advanced Marriage Compatibility Report',
      icon: '💕',
      description: 'Multi-dimensional compatibility analysis'
    },
    {
      name: 'Newborn Baby Astrological Blueprint',
      icon: '👶',
      description: 'Complete birth chart analysis'
    },
    {
      name: 'Wealth & Financial Prosperity Report',
      icon: '💰',
      description: 'Income potential analysis'
    },
    {
      name: 'Relationships Deep Analysis',
      icon: '🤝',
      description: 'Family dynamics interpretation'
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({ 
          ...prev, 
          reportTypes: [...prev.reportTypes, value] 
        }));
      } else {
        setFormData(prev => ({ 
          ...prev, 
          reportTypes: prev.reportTypes.filter(rt => rt !== value) 
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepare feedback data for submission
      const feedback = {
  type: 'Suggestion', // Changed from 'Early Access Registration'
  message: `Early Access Registration Request\n\nReports interested in: ${formData.reportTypes.join(', ')}\n\nBirth Details:\nDate: ${formData.birthDate}\nTime: ${formData.birthTime}\nPlace: ${formData.birthPlace}`,
  email: formData.email,
  username: formData.fullName,
  phoneNumber: formData.phone || 'Not provided',
  zodiacSign: 'Not available',
  timestamp: new Date().toISOString(),
  appVersion: '1.0.0',
  deviceInfo: typeof window !== 'undefined' ? 
    `${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'} Browser` : 
    'Unknown Device'
};

      // Submit feedback using centralApi
      const result = await submitFeedback(feedback);
      
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Head>
          <title>Thank You | AstroSight Early Access</title>
        </Head>
        <div className="min-h-screen font-kohinoor bg-gradient-to-br from-orange-50 via-white to-orange-50">
          <CustomHeader />
          
          <div className="flex flex-col justify-center items-center p-8 py-20">
            <div className="max-w-2xl text-center bg-white rounded-3xl shadow-2xl p-12 border border-orange-100">
              <div className="text-8xl mb-8 animate-bounce">✨</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
                Thank You for Signing Up!
              </h1>
              <p className="text-xl mb-8 text-gray-700 leading-relaxed">
                We ll notify you as soon as the deep dive reports are available. 
                Keep an eye on your inbox for exclusive updates and beta testing opportunities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-orange-600 mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">You re on the early access list!</span>
                </div>
                <Link href="/report" className="inline-flex items-center bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Reports Info
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Early Access Signup | AstroSight Deep Dive Reports</title>
        <meta name="description" content="Sign up for early access to AstroSight's deep dive astrology reports. Be notified when career, marriage, wealth, and relationship reports are available." />
      </Head>

      <div className="min-h-screen font-kohinoor bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <CustomHeader />
        
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <Link href="/report" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 font-medium transition-colors group">
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Reports Info
            </Link>
            
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              Early Access
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 leading-tight">
              Be Among the First to Experience Deep Dive Reports
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Join our exclusive early access list and get notified when these comprehensive reports become available.
            </p>
          </div>

          {/* Rest of the form remains the same */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-100">
              
              {/* Personal Information */}
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="fullName" className="block mb-3 font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      required 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block mb-3 font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="mt-6 group">
                  <label htmlFor="phone" className="block mb-3 font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors">
                    Phone Number (optional)
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Report Interest */}
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Report Type Interest</h2>
                </div>
                <p className="text-gray-600 mb-6 text-lg">Select all reports you re interested in:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportOptions.map((option, idx) => (
                    <label key={idx} className="group flex items-start space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-all duration-300">
                      <input
                        type="checkbox"
                        name="reportTypes"
                        value={option.name}
                        checked={formData.reportTypes.includes(option.name)}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 text-orange-600 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="text-2xl mr-2">{option.icon}</span>
                          <span className="font-semibold text-gray-900 group-hover:text-orange-700 transition-colors">
                            {option.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Birth Details */}
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Birth Details</h2>
                  <span className="ml-3 text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Optional</span>
                </div>
                <p className="text-gray-600 mb-6 text-lg">Provide your birth details for early customization of your reports:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="birthDate" className="block mb-3 font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors">
                      Date of Birth
                    </label>
                    <input 
                      type="date" 
                      id="birthDate" 
                      name="birthDate" 
                      value={formData.birthDate} 
                      onChange={handleChange} 
                      className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="birthTime" className="block mb-3 font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors">
                      Time of Birth
                    </label>
                    <input 
                      type="time" 
                      id="birthTime" 
                      name="birthTime" 
                      value={formData.birthTime} 
                      onChange={handleChange} 
                      className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900"
                    />
                  </div>
                </div>

                <div className="mt-6 group">
                  <label htmlFor="birthPlace" className="block mb-3 font-semibold text-gray-700 group-focus-within:text-orange-600 transition-colors">
                    Place of Birth
                  </label>
                  <input 
                    type="text" 
                    id="birthPlace" 
                    name="birthPlace" 
                    value={formData.birthPlace} 
                    onChange={handleChange} 
                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="City, State/Province, Country"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-400 disabled:to-gray-500 px-12 py-5 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl min-w-[280px]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      🔔 Notify Me When Available
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>

                <p className="text-sm text-gray-500 mt-6 max-w-md mx-auto leading-relaxed">
                  🔒 We respect your privacy. Your information will only be used to notify you about our deep dive reports and will never be shared with third parties.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}