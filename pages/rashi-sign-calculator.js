import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

const RisingSignCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
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

  const risingSignData = [
    {
      sign: 'Aries Rising',
      traits: 'Bold, assertive, quick-moving',
      description: 'You present yourself as confident and energetic, often taking the lead in situations. People see you as a natural initiator.'
    },
    {
      sign: 'Taurus Rising',
      traits: 'Calm, sensual, stable',
      description: 'You come across as grounded and reliable. Others perceive you as someone who values comfort and stability.'
    },
    {
      sign: 'Gemini Rising',
      traits: 'Talkative, curious, youthful',
      description: 'You appear communicative and intellectually curious. People often see you as versatile and mentally agile.'
    },
    {
      sign: 'Cancer Rising',
      traits: 'Nurturing, cautious, emotional',
      description: 'You present yourself as caring and protective. Others perceive you as emotionally sensitive and family-oriented.'
    },
    {
      sign: 'Leo Rising',
      traits: 'Confident, warm-hearted, expressive',
      description: 'You come across as charismatic and dramatic. People see you as naturally theatrical and generous.'
    },
    {
      sign: 'Virgo Rising',
      traits: 'Detail-oriented, modest, practical',
      description: 'You appear organized and analytical. Others perceive you as helpful and methodical in your approach.'
    },
    {
      sign: 'Libra Rising',
      traits: 'Social, balanced, graceful',
      description: 'You present yourself as diplomatic and charming. People see you as naturally harmonious and aesthetically minded.'
    },
    {
      sign: 'Scorpio Rising',
      traits: 'Intense, secretive, magnetic',
      description: 'You come across as mysterious and powerful. Others perceive you as deeply perceptive and transformative.'
    },
    {
      sign: 'Sagittarius Rising',
      traits: 'Free-spirited, adventurous, blunt',
      description: 'You appear optimistic and philosophical. People see you as naturally adventurous and truth-seeking.'
    },
    {
      sign: 'Capricorn Rising',
      traits: 'Reserved, goal-driven, mature',
      description: 'You present yourself as responsible and ambitious. Others perceive you as naturally authoritative and disciplined.'
    },
    {
      sign: 'Aquarius Rising',
      traits: 'Innovative, aloof, forward-thinking',
      description: 'You come across as unique and progressive. People see you as naturally humanitarian and intellectually independent.'
    },
    {
      sign: 'Pisces Rising',
      traits: 'Dreamy, compassionate, sensitive',
      description: 'You appear intuitive and empathetic. Others perceive you as naturally spiritual and artistically inclined.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Rising Sign Calculator – Free Ascendant Calculator | Vedic & Western Astrology | AstroSight"
        description="Discover your rising sign (ascendant) with our precise calculator. Learn how your ascendant shapes your personality, appearance, and first impressions using accurate Vedic astrology methods."
        keywords="rising sign calculator, ascendant calculator, vedic rising sign, how to calculate rising sign, ascendant sign meaning, rising sign astrology, free ascendant calculator"
        canonical="https://astrosight.ai/rising-sign-ascendant-calculator"
        ogImage="https://astrosight.ai/images/rising-sign-og.jpg"
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Rising Sign Calculator – Free Ascendant Calculator",
            "url": "https://astrosight.ai/rising-sign-ascendant-calculator",
            "description": "Discover your rising sign (ascendant) with our precise calculator. Learn how your ascendant shapes your personality, appearance, and first impressions using accurate Vedic astrology methods.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/rising-sign-og.jpg"
          })
        }}
      />
      <CustomHeader />
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Rising Sign Calculator - Ascendant Calculator
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Discover your rising sign (ascendant) - the zodiac sign that was rising on the eastern horizon at your birth. 
              Your ascendant shapes how you present yourself to the world and influences your entire birth chart structure.
            </p>
           
            <div className="space-y-6 mt-7">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date *
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your birth date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Time * (Critical for Accurate Rising Sign)
                  </label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your exact birth time"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Note: Rising sign changes every 2 hours. Exact time is essential for accuracy.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Place *
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your birth place (City, State, Country)"
                />
              </div>
              
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                >
                  Calculate My Rising Sign
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content from PDF */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Why Your Rising Sign Matters More Than You Think
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4 italic">
                When people come to me with questions like &quot;Why don&apos;t I fully relate to my zodiac sign?&quot; — my 
                first response is always the same: &quot;Have you checked your rising sign yet?&quot;
              </p>
              
              <p className="text-gray-700 mb-4">
                As a Vedic astrologer with over 18 years of experience, I can tell you with full confidence—your 
                rising sign, or Ascendant, is often more important than your sun sign when it comes to personality, 
                appearance, and life experiences. And today, I want to walk you through how to discover it using a rising sign calculator.
              </p>
              
              <p className="text-gray-700 mb-4 font-semibold">
                Let&quot;s dive in—this might just change how you see yourself.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">What Is a Rising Sign or Ascendant?</h3>
              <p className="text-gray-700 mb-4">
                Your rising sign is the zodiac sign that was rising in the eastern horizon at the exact moment you 
                were born. It shifts every two hours, which means two people born on the same day can have 
                completely different Ascendants!
              </p>
              
              <p className="text-gray-700 mb-4">
                Think of your rising sign as the front door of your personality. It&quot;s how you interact with the world. 
                It affects your body language, your physical features, the way people perceive you—and it sets 
                the stage for your entire birth chart.
              </p>
              
              <p className="text-gray-700 mb-4">
                Still wondering how to calculate rising sign or Ascendant? Don&quot;t worry—I&quot;ll show you how.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Key Points About Your Rising Sign:</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>It&apos;s the zodiac sign rising on the eastern horizon at your birth moment</li>
                  <li>Changes every 2 hours - making exact birth time crucial</li>
                  <li>Acts as the front door of your personality</li>
                  <li>Influences your physical appearance and first impressions</li>
                  <li>Sets the foundation for your entire birth chart structure</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                Here&apos;s something most people don&apos;t realize: your Ascendant sign defines the 12 houses in your 
                horoscope. That means it determines where each planet is placed and how they influence 
                different parts of your life like relationships, money, health, and career.
              </p>

              <p className="text-gray-700 mb-4">
                For example, if you&apos;re a Cancer Sun but have Capricorn Rising, you may come across as 
                reserved and practical, even though your core nature is emotional and nurturing.
              </p>

              <p className="text-gray-700 mb-4">
                Personally, I&apos;ve seen so many cases where people only felt seen or validated after discovering 
                their rising sign. It fills in the gaps your sun or moon sign can&apos;t explain.
              </p>

              <p className="text-gray-700 mb-4">
                If you&apos;re curious, I suggest using our Rising Sign Calculator or better still, get a deep-dive 
                personalized report that combines your Sun, Moon, and Ascendant.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">Understanding the Degree of Your Ascendant</h3>
              <p className="text-gray-700 mb-4">
                Okay, here&apos;s where it gets more technical—but don&apos;t worry, I&apos;ll keep it simple.
              </p>
              
              <p className="text-gray-700 mb-4">
                The degree of your rising sign gives further precision. Someone with Aries rising at 2° feels 
                quite different from someone with Aries rising at 29°. Why? Because the degree affects how 
                early or late in that sign&apos;s energy your chart begins.
              </p>
              
              <p className="text-gray-700 mb-4">
                In Vedic astrology, we use this degree to analyze divisional charts (like D9 for marriage, D10 for 
                career), so getting your exact birth time is essential.
              </p>
              
              <p className="text-gray-700 mb-4">
                No guesswork here—use an accurate ascendant sign calculator, or book a consultation with 
                me for personalized insight.
              </p>
            </div>
          </div>

          {/* The 12 Rising Signs Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              The 12 Rising Signs and What They Mean
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Now, let me quickly walk you through what each rising sign brings to the table. 
              These are general traits, but they offer a great starting point:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {risingSignData.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.sign}</h3>
                  <p className="text-blue-600 font-medium mb-3">{item.traits}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-700 mb-4">
                Each rising sign brings its own energy and initiates a different life path. 
                Curious which one is yours? Use our free rising sign calculator to know yours.
              </p>
            </div>
          </div>

          {/* Rising Sign vs Sun vs Moon Section */}
          <div className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Rising Sign vs Sun Sign vs Moon Sign
            </h2>
            <p className="text-gray-700 mb-6">
              Here&quot;s how I like to explain it to my clients:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-4 text-center">☀️</div>
                <h3 className="text-lg font-semibold mb-3 text-center text-gray-800">Your Sun Sign</h3>
                <p className="text-gray-700 text-center">
                  Your soul&apos;s essence—who you are at the core. Your fundamental identity and life purpose.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-4 text-center">🌙</div>
                <h3 className="text-lg font-semibold mb-3 text-center text-gray-800">Your Moon Sign</h3>
                <p className="text-gray-700 text-center">
                  Your emotional nature—how you feel and process. Your inner world and subconscious patterns.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-4 text-center">🌅</div>
                <h3 className="text-lg font-semibold mb-3 text-center text-gray-800">Your Rising Sign</h3>
                <p className="text-gray-700 text-center">
                  Your outer layer—how you present to the world. Your mask, appearance, and first impressions.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg p-6">
              <p className="text-gray-700 text-center">
                <strong>You need all three to fully understand yourself.</strong> That&quot;s why tools like a Sun Moon Rising Sign 
                Calculator are so powerful—and why I recommend exploring a complete Vedic astrology 
                report rather than just your zodiac sign.
              </p>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 bg-blue-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Try the Rising Sign Calculator Now
            </h2>
            <p className="text-center mb-6">
              Ready to uncover your Ascendant?
            </p>
            
            <div className="text-center space-y-4">
              <p className="mb-4">
                Use our Rising Sign Calculator – just enter your date, time, and place of birth.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Calculate Rising Sign
                </button>
                <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                  Get Personalized Report
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="mb-4">
                If you want to go deeper, check out our personalized astrology reports, or book a 1-on-1 
                consultation with our astrologers.
              </p>
              
              <p className="text-sm">
                Want to strengthen or balance your rising sign&apos;s energy? Depending on your Ascendant and its 
                ruling planet, specific Rudrakshas, Yantras, or Gemstones tailored to your chart can help you.
              </p>
            </div>
          </div>

          {/* Closing Message */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Discover Your True Self
              </h2>
              <p className="text-gray-700 mb-4">
                When you know your Ascendant, your entire birth chart becomes clear. You stop guessing and 
                start understanding. And that, my dear reader, is the first step toward living with purpose and peace.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q1: Can I know my rising sign without my birth time?</h3>
                <p className="text-gray-700">
                  Not accurately. You need your exact birth time, ideally within 1-2 minutes. If you&apos;re unsure, I 
                  offer birth time rectification services to help you find it.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q2: Why do I relate more to my rising sign than my sun sign?</h3>
                <p className="text-gray-700">
                  Because it governs your day-to-day behavior and how others perceive you. It&apos;s the you the 
                  world sees first!
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q3: How does rising sign affect appearance?</h3>
                <p className="text-gray-700">
                  It shapes your facial structure, body type, and even your style. For instance, Scorpio risings 
                  often have sharp eyes and intense stares, while Libra risings may have symmetrical features 
                  and a graceful gait.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q4: Is rising sign more important in Vedic or Western astrology?</h3>
                <p className="text-gray-700">
                  In Vedic astrology, the Ascendant is extremely important. It determines planetary strength, 
                  dashas (timing), and your karmic blueprint.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q5: Can two people have the same rising sign but different charts?</h3>
                <p className="text-gray-700">
                  Yes! Even with the same Ascendant, the degrees and planetary positions will differ based on 
                  time and location. That&apos;s why you need a precise chart.
                </p>
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
        
        <div className="bg-[#f46434] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default RisingSignCalculator;