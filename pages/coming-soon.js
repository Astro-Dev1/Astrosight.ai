import React from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
// import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';

export default function ComingSoonCalculatorPage() {
  return (
    <>
      <CustomHeader title="Astrology Calculator - Coming Soon" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Astrology Calculator</h1>
          <p className="text-gray-600 mb-8">We are working hard to bring you this amazing astrology calculator. Stay tuned for updates!</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Coming Soon!</h2>
            <p className="text-yellow-700">We are working hard to bring you this amazing astrology calculator. Stay tuned for updates!</p>
          </div>
        </div>
      </div>
      {/* Additional Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Why Choose Our Astrology Calculators?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* ...existing code... */}
          </div>
        </div>
        {/* SEO Content */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Comprehensive Astrology Tools for Everyone</h2>
          <div className="prose prose-gray max-w-none">
            {/* ...existing SEO content... */}
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
        </div>   
         </>
  );
}
