import { Calculator, Star,  Clock, MapPin, User, Calendar, Shield, Heart, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
// import Head from 'next/head';
import SEOHead from '../components/SEOHead';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import {
  InternalLinksGrid,
  ReportLinksGrid,
  HoroscopeNavigation,
  CompatibilityLinksGrid,
  RecentBlogLinks
} from '../components/InternalLinksGrid';
// import SEOHead from '../components/SEOHead';
const YantraCalculator = () => {
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

  const yantraBenefits = [
    { 
      icon: <Heart className="h-6 w-6 text-blue-600" />, 
      title: 'Emotional & Mental Balance', 
      description: 'Certain yantras, like the Chandra Yantra, can calm emotional turbulence. Especially if your moon is weak in the chart, this can feel like a breath of fresh air. Anxiety fades. Sleep improves.',
      yantra: 'Chandra Yantra'
    },
    { 
      icon: <TrendingUp className="h-6 w-6 text-green-600" />, 
      title: 'Career Growth & Opportunities', 
      description: 'The Shree Yantra is widely known for attracting abundance. I personally recommend it to professionals stuck in career stagnation or entrepreneurs looking to break a plateau.',
      yantra: 'Shree Yantra'
    },
    { 
      icon: <Shield className="h-6 w-6 text-purple-600" />, 
      title: 'Spiritual Protection', 
      description: 'Some yantras offer strong protection against negativity. The Baglamukhi Yantra, for instance, is one I keep close whenever I feel energetically drained or exposed to toxic environments.',
      yantra: 'Baglamukhi Yantra'
    }
  ];

  const faqs = [
    {
      question: "Do I need to be religious to use a yantra?",
      answer: "Not at all. Yantras are energetic tools. As long as you approach them with respect and consistency, they'll work for anyone."
    },
    {
      question: "Can I use more than one yantra at a time?",
      answer: "Yes, but they must be compatible. That's why it's safer to use a yantra based on your birth chart rather than picking at random."
    },
    {
      question: "How often should I energize the yantra?",
      answer: "I recommend re-energizing it during Purnima (Full Moon) each month with its mantra and a ghee lamp."
    },
    {
      question: "Is there a yantra for health problems?",
      answer: "Yes! The Mahamrityunjaya Yantra is known for healing and protection from health issues."
    }
  ];

  return (<>
  <SEOHead
  title="Yantra Calculator – Find Your Personalized Spiritual Remedy | AstroSight"
  description="Discover which sacred yantra best supports your energy. Use our birth-chart-based Yantra Calculator to find the divine diagram that aligns with your cosmic purpose."
  keywords="yantra calculator, personalized yantra, vedic yantra for career, chandra yantra, shree yantra, baglamukhi yantra, mahayantra for protection, astrological remedy tool"
  canonical="https://astrosight.ai/yantra-calculator"
  ogImage="https://astrosight.ai/images/yantra-og.jpg"
  ogType="article"
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Yantra Calculator – Personalized Vedic Remedy",
      "description": "Choose the right yantra for health, career, protection or peace, based on your Vedic birth chart using our free online calculator.",
      "url": "https://astrosight.ai/yantra-calculator",
      "publisher": {
        "@type": "Organization",
        "name": "AstroSight",
        "url": "https://astrosight.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://astrosight.ai/log.png"
        }
      },"image": "https://astrosight.ai/images/yantra-og.jpg"
      
    })
  }}
/>

    <div className="min-h-screen ">
      {/* Calculator Form */}
      <CustomHeader/>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-yellow-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Yantra Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Discover your personalized yantra based on your birth chart for spiritual alignment and energy balance
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-purple-600" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  Time of Birth *
                </label>
                <input
                  type="time"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                  Place of Birth *
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="City, State, Country"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                <Star className="inline h-5 w-5 mr-2" />
                Find My Perfect Yantra
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        
        {/* Opening Article */}
        <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl p-8 border-l-4 border-yellow-400">
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Ever felt like something was blocking your path, no matter how hard you tried? I&apos;ve seen this happen with so many people. And often, the solution lies not in doing more, but in aligning better—with your inner energy and the universe around you. That&apos;s exactly where our Yantra Calculator can help.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            I&apos;ve been working with yantras for nearly two decades, and the way they shift energy—subtly but powerfully—still amazes me. Today, with technology, we have tools that calculate the exact yantra suited for your birth chart. This article is a deep dive into how yantras work, how to use them, and why a yantra calculator can be your next spiritual companion.
          </p>
        </div>

        {/* How Can a Yantra Benefit You */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How Can a Yantra Benefit You?</h2>
          <p className="text-gray-700 mb-6 text-lg">
            This is where things get exciting! Depending on the kind of yantra you use, the benefits can be very specific. Over the years, I&apos;ve seen clients experience powerful shifts—emotionally, mentally, and even materially.
          </p>
          
          <div className="grid md:grid-cols-1 gap-6">
            {yantraBenefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start mb-4">
                  <div className="mr-4 mt-1">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-700 mb-2">{benefit.description}</p>
                    <p className="text-sm text-purple-600 font-medium">Recommended: {benefit.yantra}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-gray-700 font-medium">
              And the best part? These benefits don&apos;t demand hours of rituals. A few mindful moments every day can shift your energy over time.
            </p>
          </div>
        </div>

        {/* How Do Yantras Work */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How Do Yantras Work?</h2>
          <p className="text-gray-700 mb-4 text-lg">
            Now let&apos;s demystify this.
          </p>
          <div className="space-y-4">
            <p className="text-gray-700">
              Every yantra vibrates at a specific frequency, aligned with a planet, deity, or cosmic force. When you keep a yantra near you, or meditate on it, your personal energy begins to sync with that vibration.
            </p>
            <p className="text-gray-700">
              This is based on the principle of resonance. Just like tuning forks vibrate in harmony, so does your subtle body respond to the energetic pattern of a yantra.
            </p>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700 mb-2">
                <strong>But here&apos;s the catch:</strong> Not all yantras suit everyone.
              </p>
              <p className="text-gray-700">
                That&apos;s why I always recommend using our Yantra Calculator. It takes your birth date, time, and place to analyze which planetary forces need balancing. Then, it suggests the right yantra for you. It&apos;s personal. Precise. And powerful.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use a Yantra */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How to Use a Yantra</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Using a yantra is simple, but intention matters.
          </p>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Step 1: Cleanse and Energize</h3>
              <p className="text-gray-700">
                When I receive a new yantra, I cleanse it with a few drops of Ganga Jal or milk. Then I light a ghee lamp and chant the associated mantra 11 or 21 times. This activates the yantra&apos;s vibration.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold mb-3 text-green-800">Step 2: Place it Mindfully</h3>
              <p className="text-gray-700">
                The ideal place is the northeast corner of your home or puja room. Avoid placing it near the bathroom or under the bed.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Step 3: Connect Daily</h3>
              <p className="text-gray-700">
                Spend just 5 minutes each morning. Gaze softly at the yantra and recite its mantra. Let the shapes and sounds settle in your mind. Over time, this daily connection strengthens your aura and brings clarity.
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-gray-700">
              You can also wear a yantra locket or keep a small one in your wallet. Some of my clients even use yantras during meditation to focus better.
            </p>
          </div>
        </div>

        {/* Yantra Calculator Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Yantra Calculator: Why You Should Use One
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Here&apos;s where modern technology meets ancient wisdom.
          </p>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">What is a Yantra Calculator?</h3>
              <p className="text-gray-700 mb-4">
                It&apos;s an online tool that calculates the most effective yantra based on your Vedic birth chart. It checks your planetary strengths and weaknesses—like if your Rahu is troubling, or if Shukra (Venus) is combust—and suggests the yantra that can balance it.
              </p>
              <p className="text-gray-700">
                And yes, if you&apos;re dealing with something intense like Kaal Sarp Dosh, the Yantra Calculator might even suggest a Rahu Yantra or Kaal Sarp Yantra to help pacify the energies.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-2xl font-semibold mb-3 text-green-800">Why I Trust This Tool</h3>
              <p className="text-gray-700 mb-4">
                I&apos;ve used yantras for years and manually studied charts to suggest them. But with accurate birth data, the calculator speeds up the process without missing the deeper planetary insights.
              </p>
              <p className="text-gray-700">
                And don&apos;t worry—if you still want expert guidance, our consultation services are always there.
              </p>
            </div>
          </div>
        </div>

        {/* Final Thoughts & CTA */}
        <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl p-8 border-l-4 border-yellow-400">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Final Thoughts
          </h2>
          <p className="text-gray-700 mb-4 text-lg">
            Whether you&apos;re dealing with financial blocks, emotional confusion, or unexplained struggles, a Yantra Calculator can offer a fresh perspective—rooted in the cosmic design of your life.
          </p>
          <p className="text-gray-700 mb-4 text-lg font-medium">
            It&apos;s not about superstition. It&apos;s about alignment.
          </p>
          <p className="text-gray-700 mb-4">
            If you&apos;re curious, start small. Try a yantra that resonates with your chart. And if you want to go deeper, explore our collection of energized yantras, rudrakshas, and gemstones—each selected to support your spiritual and material goals.
          </p>
          <p className="text-gray-700 mb-6">
            Want personal help with choosing the right yantra? Book a consultation and I&apos;d be happy to guide you.
          </p>
          <div className="text-center">
            <p className="text-gray-700 font-medium text-lg italic">
              Let the geometry of the universe guide your path. One yantra at a time.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="font-semibold mb-3 text-gray-800 text-lg">
                  Q{index + 1}: {faq.question}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
            {/* Internal Links */}
              <div className="space-y-8">
                <InternalLinksGrid />
                <HoroscopeNavigation />
                <CompatibilityLinksGrid />
                <ReportLinksGrid />
                <RecentBlogLinks />
              </div>
      <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
                <Footer />
              </div>
    </div></>
  );
};

export default YantraCalculator;