import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

const MarriageCompatibilityCalculator = () => {
  const [formData, setFormData] = useState({
    // Partner 1 Details
    partner1Name: '',
    partner1Gender: '',
    partner1BirthDate: '',
    partner1BirthTime: '',
    partner1BirthPlace: '',
    
    // Partner 2 Details
    partner2Name: '',
    partner2Gender: '',
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

  const gunas = [
    { name: 'Varna', description: 'Spiritual compatibility', points: 1 },
    { name: 'Vashya', description: 'Power dynamics', points: 2 },
    { name: 'Tara', description: 'Health and longevity', points: 3 },
    { name: 'Yoni', description: 'Sexual compatibility', points: 4 },
    { name: 'Graha Maitri', description: 'Intellectual connection', points: 5 },
    { name: 'Gana', description: 'Temperament', points: 6 },
    { name: 'Bhakoot', description: 'Family and prosperity', points: 7 },
    { name: 'Nadi', description: 'Genetic compatibility', points: 8 }
  ];

  return (
    <>
      <SEOHead
        title="Marriage Compatibility Calculator – Free Vedic Kundli Matching & Guna Milan | AstroSight"
        description="Check marriage compatibility through authentic Vedic Kundli matching. Get detailed Guna Milan analysis, compatibility scores, and personalized guidance for your relationship."
        keywords="marriage compatibility calculator, kundli matching, guna milan, horoscope matching, vedic compatibility, marriage astrology, kundli milan, compatibility by date of birth"
        canonical="https://astrosight.ai/marriage-compatibility-calculator"
        ogImage="https://astrosight.ai/images/marriage-compatibility-og.jpg"
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Marriage Compatibility Calculator – Free Vedic Kundli Matching & Guna Milan",
            "url": "https://astrosight.ai/marriage-compatibility-calculator",
            "description": "Check marriage compatibility through authentic Vedic Kundli matching. Get detailed Guna Milan analysis, compatibility scores, and personalized guidance for your relationship.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/marriage-compatibility-og.jpg"
          })
        }}
      />
      <CustomHeader />
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Marriage Compatibility Calculator
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Kundli matching or Horoscope matching plays a vital role at the time of Hindu marriage. This 
              Marriage Compatibility Calculator gives instant insights based on the birth details of both the partners.
            </p>
           
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Partner 1 Details */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Partner 1 Details</h3>
                <div className="space-y-4">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter partner 1 full name"
                        required
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birth Date *
                      </label>
                      <input
                        type="date"
                        name="partner1BirthDate"
                        value={formData.partner1BirthDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birth Time *
                      </label>
                      <input
                        type="time"
                        name="partner1BirthTime"
                        value={formData.partner1BirthTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Place *
                    </label>
                    <input
                      type="text"
                      name="partner1BirthPlace"
                      value={formData.partner1BirthPlace}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter birth place"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Partner 2 Details */}
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Partner 2 Details</h3>
                <div className="space-y-4">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter partner 2 full name"
                        required
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birth Date *
                      </label>
                      <input
                        type="date"
                        name="partner2BirthDate"
                        value={formData.partner2BirthDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birth Time *
                      </label>
                      <input
                        type="time"
                        name="partner2BirthTime"
                        value={formData.partner2BirthTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Place *
                    </label>
                    <input
                      type="text"
                      name="partner2BirthPlace"
                      value={formData.partner2BirthPlace}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter birth place"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-md font-semibold hover:from-pink-600 hover:to-red-600 transition"
                >
                  Check Marriage Compatibility
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Main Content from PDF */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Introduction Section */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Marriage is Sacred. But Compatibility? That&quot;s the Foundation.
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="mb-4">
                With over 18 years of experience in Vedic astrology, I&quot;ve seen thousands of charts, helped 
                countless couples, and guided many through difficult crossroads. Today, I want to talk to you, 
                heart to heart, about something that&quot;s often misunderstood yet deeply important: marriage compatibility.
              </p>
              <p className="mb-4">
                And no, I&quot;m not talking about generic sun-sign apps or vague advice columns. I&quot;m talking about
                the real stuff, the ancient science of Kundli Matching, Guna Milan, and how a proper marriage
                compatibility calculator can bring surprising clarity.
              </p>
            </div>
          </div>

          {/* How Kundli Matching Helps Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              How Kundli Matching Helps People Find the Right Partner
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="mb-4">
                When a client walks in unsure about their partner, one of the first things I ask for is their birth chart.
              </p>
              <p className="mb-4">
                Why? Because Kundli Matching isn&quot;t superstition, it&quot;s a structured, time-tested system. It 
                analyzes the planetary positions at birth, using the Vedic calendar to assess compatibility across 
                physical, emotional, intellectual, and spiritual layers.
              </p>
              <p className="mb-4">
                I&quot;ve seen cases where two people seemed perfect on the surface, but their charts screamed
                conflict. And I&quot;ve seen matches that looked unusual but had deep karmic alignment.
              </p>
              <p className="mb-4 font-semibold">
                With the help of our marriage compatibility calculator, many couples have been able to identify 
                strengths, gaps, and how to consciously work on their relationship, even before tying the knot.
              </p>
            </div>
          </div>

          {/* Guna Milan Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Guna Milan: The Backbone of Marriage Compatibility
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 mb-8">
              <p className="mb-4">
                In Vedic astrology, Guna Milan (Matching of Attributes) plays a key role in the marriage compatibility chart.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">What are Gunas?</h3>
              <p className="mb-6">
                There are eight Gunas, and each represents a crucial aspect of marriage—mental compatibility, 
                sexual harmony, emotional bonding, health, and family stability.
              </p>
            </div>

            {/* Gunas Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {gunas.map((guna, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{guna.name}</h4>
                      <p className="text-sm text-gray-600">{guna.description}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {guna.points} {guna.points === 1 ? 'point' : 'points'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scoring System */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-4 text-gray-800">Guna Milan Scoring System (Total: 36 Points)</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-2">18-24</div>
                  <p className="text-sm text-gray-700">Average but workable</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">24-32</div>
                  <p className="text-sm text-gray-700">Good compatibility</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">32+</div>
                  <p className="text-sm text-gray-700">Excellent match</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                But remember, scores aren&quot;t everything. Sometimes a couple with 18 points lives a joyful,
                conscious marriage because they complement each other spiritually. That&quot;s why we always
                analyze the divisional charts and planetary periods too, which many free sites ignore.
              </p>
            </div>
          </div>

          {/* Why Guna Milan Still Matters Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Why Guna Milan Still Matters in Modern Marriages
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="mb-4">
                Today, many people ask me, Isn&apos;t Kundli Matching outdated?
              </p>
              <p className="mb-4 font-semibold">
                My answer is always the same: If you truly value harmony, why wouldn&quot;t you check the cosmic blueprint first?
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Success Story</h4>
                <p className="text-gray-700 mb-3">
                  Let me share a quick story. A couple I advised last year had only 20 Gunas matched. They were worried. 
                  But their Navamsa charts were beautifully aligned, and both were running strong Venus periods—great for love and marriage.
                </p>
                <p className="text-gray-700">
                  I gave them a go-ahead, with a few suggested Vedic remedies (they wore compatible Rudrakshas and 
                  energized Yantras). Today, they&quot;re thriving.
                </p>
              </div>
              
              <p className="font-semibold">
                This is the power of a marriage compatibility calculator by date of birth, backed by wisdom, not just algorithms.
              </p>
            </div>
          </div>

          {/* How Our Calculator Works Section */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              How Our Marriage Compatibility Calculator Works
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="mb-4">
                If you&quot;re serious about your future, stop relying on generic apps.
              </p>
              <p className="mb-6">
                Our marriage compatibility calculator is built on authentic Guna Milan, using exact birth details, 
                nakshatras, and planetary aspects.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold mb-4 text-gray-800">What You Need:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your name and birth details</li>
                    <li>Your partner&quot;s name and birth details</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold mb-4 text-gray-800">What You&quot;ll Receive:</h4>
                  <ul className="list-none space-y-2">
                    <li>✅ Guna Milan score</li>
                    <li>✅ Explanation of matched and unmatched areas</li>
                    <li>✅ Personalized interpretation</li>
                    <li>✅ Guidance on areas to improve</li>
                    <li>✅ Recommendations (like gemstones, mantras, or rituals)</li>
                  </ul>
                </div>
              </div>
              
              <p className="mt-6">
                You can also consult me directly through our consultation service if you&quot;d like a deeper look.
              </p>
            </div>
          </div>

          {/* Numerology Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Can Numerology Help in Marriage Compatibility?
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="mb-4">
                Absolutely, to an extent.
              </p>
              <p className="mb-4">
                Marriage numerology compatibility calculator tools look at the vibrational energy of birth dates 
                and names. While not as comprehensive as a full Kundli analysis, I do sometimes use numerology 
                to add an extra layer—especially for couples who share name vibrations or life path clashes.
              </p>
              <p className="font-semibold">
                Still, I consider it a supportive tool, not a replacement.
              </p>
            </div>
          </div>

          {/* Why I Recommend Section */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Why I Recommend a Compatibility Check Before Marriage
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="mb-4">
                I&quot;m not saying astrology should replace your intuition.
              </p>
              <p className="mb-4">
                But what I&apos;ve learned over the decades is this: when intuition meets ancient science, magic
                happens. You feel aligned, supported, and aware. You make decisions not out of fear, but from clarity.
              </p>
              <p className="mb-4">
                If you&apos;re getting married..or even thinking about it, please don&apos;t leave it to chance.
              </p>
              <p className="mb-4 font-semibold">
                Use a marriage compatibility calculator, consult an expert, and most importantly, stay open to 
                learning about yourself and your partner.
              </p>
              <p className="mb-4">
                And if you&quot;re looking for real answers, not fluff, I invite you to explore our tools, reports, 
                or book a personal session with us.
              </p>
              <p className="font-bold text-lg text-center">
                May your union be harmonious, karmically aligned, and full of joy!
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Q1: What if my Guna score is low? Should I cancel the marriage?
                </h3>
                <p className="text-gray-700">
                  Not necessarily. I&quot;ve seen many low-score marriages succeed because the couples were 
                  spiritually aware and willing to do the inner work. Remedies like gemstones, fasting, 
                  and guidance through dasha periods often help.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Q2: Can love marriages be matched later?
                </h3>
                <p className="text-gray-700">
                  Yes! Many people use the marriage compatibility calculator by date of birth even after 
                  falling in love, to check long-term prospects.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Q3: How accurate are free kundli matching tools online?
                </h3>
                <p className="text-gray-700">
                  Most are just automated scripts. They miss the nuance of planetary strength, ashtakavarga, 
                  or karmic charts. Our free Kundli matching tool, however, goes much deeper and is verified 
                  by professional astrologers.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Q4: Can compatibility improve after marriage?
                </h3>
                <p className="text-gray-700">
                  With awareness and correct guidance, yes it can be improved after marriage. That&quot;s the
                  beauty of dharmic living. You&apos;re not stuck. You evolve.
                </p>
              </div>
            </div>
          </div>

          {/* Internal Links Section */}
          <div className="space-y-8">
            <InternalLinksGrid />
            <HoroscopeNavigation />
            <CompatibilityLinksGrid />
            <ReportLinksGrid />
            <RecentBlogLinks />
          </div>
        </div>

        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MarriageCompatibilityCalculator;