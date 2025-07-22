import React, { useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';


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
      <CustomHeader />
      <div>
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

          {/* Main Content from PDF */}
          <div className="mt-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8">
            <p className="text-gray-700 mb-4 font-semibold">
              I promise to keep your relationship analysis real, insightful, and rooted in authentic Vedic astrology — the system trusted for centuries.
            </p>
            <p className="text-gray-700 mb-4">
              Let&apos;s explore what makes your love story unique.
            </p>
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
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <h4 className="font-semibold mb-3 text-gray-800">What Our Compatibility Calculator Reveals:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Emotional bonding (Moon signs)</li>
                <li>Communication styles (Mercury)</li>
                <li>Love languages (Venus)</li>
                <li>Passion and desire (Mars)</li>
                <li>Shared values and beliefs (Jupiter)</li>
                <li>Long-term commitment potential (Saturn)</li>
                <li>Challenging aspects that may require understanding and compromise</li>
              </ul>
            </div>
            <p className="text-gray-700 mb-4">
              Our analysis covers essential relationship areas and helps you navigate potential relationship obstacles with awareness.
            </p>
            <p className="text-gray-700 mb-4">
              Beyond romantic compatibility, our calculator provides insights into friendship potential, business partnership dynamics, and family relationships. 
              Understanding your astrological compatibility helps build stronger relationships through increased empathy, better communication, and 
              appreciation of your partner&apos;s unique cosmic blueprint.
            </p>
            <div className="bg-pink-50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-3 text-gray-800">How to Use the Love Compatibility Calculator:</h4>
              <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                <li>Enter both partners birth details (name, date, time, place)</li>
                <li>Click Check Compatibility</li>
                <li>Review your compatibility report and insights</li>
              </ol>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Remember:</strong> Astrology doesn&apos;t guarantee a perfect relationship, but it helps you understand strengths, challenges, and growth opportunities.
            </p>
            <p className="text-gray-700 mb-4">
              If you want deeper guidance, book a personal consultation or explore our curated relationship reports and remedies.
            </p>
          </div>
          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions About Love Compatibility
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">1. Is astrological love compatibility accurate?</h3>
                <p className="text-gray-700">Yes, if you use correct birth details and a trusted calculator based on Vedic principles. Interpretation is deeper with expert guidance.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">2. Can astrology predict relationship success?</h3>
                <p className="text-gray-700">Astrology reveals compatibility patterns, strengths, and challenges. It doesn&apos;t predict outcomes, but helps you make informed choices.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">3. What if our Moon signs are not compatible?</h3>
                <p className="text-gray-700">Moon sign harmony is important, but other factors (Venus, Mars, Mercury) also matter. Awareness and communication can overcome differences.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">4. Can I use this calculator for friendships or business partnerships?</h3>
                <p className="text-gray-700">Absolutely! The calculator analyzes all types of relationships, not just romantic ones.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">5. Do I need exact birth time for compatibility?</h3>
                <p className="text-gray-700">Exact birth time gives the most accurate results. If unsure, use the closest possible time or consult for birth time rectification.</p>
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
      </div> </div>     <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
    </>
  );
};

export default LoveCompatibilityCalculator;
