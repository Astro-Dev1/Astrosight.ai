import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';
import SEOHead from '../components/SEOHead';

const KaalSarpDoshCalculator = () => {
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
    <>
       <SEOHead
        title="Kaal Sarp Dosh Calculator - Free Vedic Astrology Analysis | AstroSight"
        description="Check if you have Kaal Sarp Dosh in your birth chart with our free Vedic astrology calculator. Understand its effects and get personalized remedies for spiritual growth and life balance."
        keywords="Kaal Sarp Dosh calculator, free kaal sarp dosh check, vedic astrology dosh analysis, birth chart karmic dosha, rahu ketu dosha remedies"
        canonical="https://astrosight.ai/kaal-sarp-dosh-calculator"
        ogImage="https://astrosight.ai/images/kaal-sarp-dosh-og.jpg"
        ogType="article"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Kaal Sarp Dosh Calculator",
            "url": "https://astrosight.ai/kaal-sarp-dosh-calculator",
            "description": "Free calculator to detect Kaal Sarp Dosh in your birth chart using authentic Vedic astrology. Learn effects and remedial measures for karmic alignment.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/log.png"
              }
            },
            "image": "https://astrosight.ai/images/kaal-sarp-dosh-og.jpg"
          })
        }}
      />
      <CustomHeader />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Kaal Sarp Dosh Calculator for Free
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Check if you have Kaal Sarp Dosh in your birth chart and understand its effects on your life.
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
                Check Kaal Sarp Dosh
              </button>
            </div>
          </form>
        </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Why Use Our Kaal Sarp Dosh Calculator?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🐍</div>
              <h3 className="text-xl font-semibold mb-2">Accurate Detection</h3>
              <p className="text-gray-600">
                Based on authentic Vedic calculations to identify all 12 types of Kaal Sarp Dosh
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
              <p className="text-gray-600">
                Understand the specific effects and karmic patterns in your life
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Remedial Guidance</h3>
              <p className="text-gray-600">
                Get personalized remedies including puja, rudraksha, and yantra recommendations
              </p>
            </div>
          </div>
        </div>

          {/* Personal Story Introduction */}
          <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Understanding Kaal Sarp Dosh: A Personal Journey
            </h2>
            <p className="text-gray-700 mb-4 font-medium">
              Let me begin with something personal. Years ago, I met a client who had everything going for him. Smart, kind, hardworking. And yet, his relationships fell apart for no clear reason. Career? Always two steps forward, one step back. He came to me exhausted, hoping for answers beyond logic.
            </p>
            <p className="text-gray-700 mb-4">
              When I checked his horoscope, it was there—Kaal Sarp Dosh. That moment changed his life. And it reminded me just how powerful and misunderstood this yog is.
            </p>
            <p className="text-gray-700 mb-4">
              So if you&apos;re here looking for a kaal sarp dosh calculator free, I understand. You want answers. Maybe you&apos;ve heard it can block success. Or delay marriage. Or that it&apos;s dangerous. Let&apos;s talk honestly. Not just about how to calculate it, but what it means for you.
            </p>
          </div>

          {/* What Is Kaal Sarp Dosh Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              What Is Kaal Sarp Dosh? A Quick, Clear Explanation
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Kaal Sarp Dosh happens when all seven planets - Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, fall between the shadowy planets Rahu and Ketu in your birth chart.
              </p>
              <p className="text-gray-700 mb-4">
                Sounds intense? It can be.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">The Deeper Meaning:</h4>
                <p className="text-gray-700 mb-2">
                  This alignment suggests unresolved karmic patterns from past lives. Think of it as cosmic knots that are unfinished business that spills into this life.
                </p>
                <p className="text-gray-700 font-medium">
                  But here&apos;s the truth: It&apos;s not a death sentence. It&apos;s a signal. A nudge from the universe to go inward and evolve.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Use our Kaal Sarp Dosh Calculator to find out if this yog appears in your kundli. It&apos;s completely free and based on authentic Vedic calculations.
              </p>
            </div>
          </div>

          {/* Rahu and Ketu Explanation */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Understanding Rahu and Ketu
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-red-800">What is Rahu?</h3>
                <p className="text-gray-700 mb-4">
                  Rahu isn&apos;t a planet in the traditional sense. It&apos;s a shadow—an eclipse point. But don&apos;t let that fool you. Rahu is powerful.
                </p>
                <p className="text-gray-700 mb-4">
                  It represents obsession, illusions, sudden gains, and desires that burn hot but sometimes leave us confused or lost.
                </p>
                <p className="text-gray-700">
                  <strong>In relationships:</strong> Rahu can create attraction that&apos;s intense… and often unstable.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-blue-800">What is Ketu?</h3>
                <p className="text-gray-700 mb-4">
                  Ketu, Rahu&apos;s counterpart, is about detachment and liberation. It&apos;s deeply spiritual but also mysterious. While Rahu makes us chase, Ketu makes us let go.
                </p>
                <p className="text-gray-700 mb-4">
                  In love and career, Ketu can feel like an invisible wall—something just doesn&apos;t click.
                </p>
                <p className="text-gray-700">
                  <strong>Together:</strong> Rahu and Ketu form the axis of karmic lessons.
                </p>
              </div>
            </div>
            <div className="mt-6 bg-yellow-50 rounded-lg p-6">
              <p className="text-gray-700 font-medium text-center">
                And when all your planets get caught between them? That&apos;s Kaal Sarp Dosh.
              </p>
            </div>
          </div>

          {/* Types of Kaal Sarp Dosh */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Different Types of Kaal Sarp Dosh
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-6">
                There isn&apos;t just one kind. In fact, there are 12 types, based on where Rahu and Ketu sit. Some are more intense than others.
              </p>
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-red-800">Anant Kaal Sarp Dosh</h4>
                  <p className="text-gray-700">
                    <strong>Position:</strong> Rahu in 1st house, Ketu in 7th house
                  </p>
                  <p className="text-gray-700">
                    <strong>Effects:</strong> Trouble with self-worth and partnerships
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-orange-800">Vishdhar Kaal Sarp Dosh</h4>
                  <p className="text-gray-700">
                    <strong>Position:</strong> Rahu in 11th house, Ketu in 5th house
                  </p>
                  <p className="text-gray-700">
                    <strong>Effects:</strong> Blocks in finances and progeny
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-green-800">Takshak Kaal Sarp Dosh</h4>
                  <p className="text-gray-700">
                    <strong>Position:</strong> Rahu in 10th house, Ketu in 4th house
                  </p>
                  <p className="text-gray-700">
                    <strong>Effects:</strong> Career vs home-life struggles
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mt-6 font-medium">
                Curious which one affects you? Our Kaal Sarp Dosh Calculator Free will instantly show your dosh type, including a short interpretation.
              </p>
            </div>
          </div>

          {/* Effects Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Kaal Sarp Dosh Effects You Should Know
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-6">
                I&apos;ve worked with thousands of charts, and here&apos;s what I often see in people with Kaal Sarp Dosh:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Common Challenges:</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Repeated failures just before success</li>
                      <li>• Unexplained delays in marriage, job, house</li>
                      <li>• Intense fear or phobias</li>
                      <li>• Strained family relationships</li>
                      <li>• A deep spiritual restlessness</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">The Higher Path:</h4>
                    <p className="text-gray-700 mb-2">
                      But not everyone faces the same outcomes. Some individuals rise because of this dosh.
                    </p>
                    <p className="text-gray-700">
                      It pushes them toward yoga, meditation, and dharmic choices. That&apos;s the higher path.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>Important Note:</strong> The kaal sarp dosh effects can&apos;t be ignored, especially when combined with a tough dasha (planetary period).
                </p>
              </div>
            </div>
          </div>

          {/* Most Dangerous Type */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Which Kaal Sarp Dosh Is Most Dangerous?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                This is one of the most Googled questions, and I&apos;ll be honest—there&apos;s no one-size-fits-all answer.
              </p>
              <div className="bg-red-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-3 text-red-800">Most Challenging Types:</h4>
                <p className="text-gray-700 mb-2">
                  However, <strong>Shankhpal, Padma, and Vishdhar</strong> types can be especially tricky if the person is going through a Rahu or Ketu Mahadasha.
                </p>
              </div>
              <p className="text-gray-700">
                So if you already know your dasha period and suspect you&apos;re affected, book a deep-dive chart analysis with our expert astrologers for a full explanation.
              </p>
            </div>
          </div>

          {/* Myths Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Myths About Kaal Sarp Dosh
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-6">
                Let&apos;s bust some of the most common myths I hear in consultations:
              </p>
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-red-800">❌ Everyone has it.</h4>
                  <p className="text-gray-700">
                    Nope. Only charts with all planets between Rahu and Ketu qualify.
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-red-800">❌ It ruins your life.</h4>
                  <p className="text-gray-700">
                    Not true. Many successful people have it. It often challenges you into spiritual growth.
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-red-800">❌ You must do expensive pujas immediately.</h4>
                  <p className="text-gray-700">
                    Not always. Remedies should be personalized based on your chart and current dasha.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 mt-6">
                <p className="text-gray-700 font-medium">
                  You deserve clarity, not fear. That&apos;s why we created a free kaal sarp dosh calculator—to empower, not scare.
                </p>
              </div>
            </div>
          </div>

          {/* Remedies Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Kaal Sarp Dosh Remedies and Puja
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-6">
                Here&apos;s what&apos;s helped my clients the most:
              </p>
              <div className="space-y-6">
                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-orange-800">1. Kaal Sarp Dosh Nivaran Puja</h4>
                  <p className="text-gray-700 mb-2">
                    Performed in places like Trimbakeshwar or Ujjain, this ritual calms Rahu-Ketu energies. I&apos;ve seen shifts within days after the puja.
                  </p>
                  <p className="text-gray-700 font-medium">
                    Explore our Kaal Sarp Puja Service for personalized bookings.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-blue-800">2. Rudraksha & Yantra Use</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• 8 Mukhi Rudraksha (Rahu)</li>
                    <li>• 9 Mukhi Rudraksha (Ketu)</li>
                    <li>• Kaal Sarp Yantra for daily protection</li>
                  </ul>
                  <p className="text-gray-700 mt-2 font-medium">
                    You&apos;ll find these on our Yantra & Rudraksha page. Each comes energized and ready for use.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-green-800">3. Daily Upay (Simple Actions)</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Chant Om Namah Shivaya daily</li>
                    <li>• Feed birds, especially on Saturdays</li>
                    <li>• Meditate during Rahu Kaal</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    These small steps align your energy and offer inner stability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Empowerment Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              You&apos;re Not Cursed—You&apos;re Called to Evolve
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Having Kaal Sarp Dosh doesn&apos;t mean you&apos;re doomed. It means your soul chose a path of intensity for a reason.
              </p>
              <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
                <h4 className="font-semibold mb-3 text-gray-800">Your Path Forward:</h4>
                <p className="text-gray-700 mb-2">
                  The first step is awareness. Use our Kaal Sarp Dosh Calculator to know where you stand. It&apos;s free. It&apos;s quick. And it might explain years of confusion in just one click.
                </p>
                <p className="text-gray-700">
                  After that, let&apos;s work together to heal the karmic layers—through puja, rudraksha, yantras, and if needed, a 1-on-1 consultation that dives into your chart with compassion and precision.
                </p>
              </div>
              <p className="text-gray-700 mb-4 font-medium">
                Need deeper guidance? Explore our full range of personalized remedial reports. Every solution is rooted in ancient shastra and customized just for you.
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
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q1: Can I trust a free Kaal Sarp Dosh calculator?</h3>
                <p className="text-gray-700">Yes—if it&apos;s based on accurate Vedic logic. Ours uses traditional chart analysis and gives you a full breakdown.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q2: What if I have partial Kaal Sarp Dosh?</h3>
                <p className="text-gray-700">Partial dosh means the planets aren&apos;t fully enclosed. Effects are milder but still worth watching.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q3: Do I need to do puja every year?</h3>
                <p className="text-gray-700">Not necessarily. One strong puja, combined with remedies, usually suffices unless your dasha demands more.</p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Q4: Can gemstones help?</h3>
                <p className="text-gray-700">Yes, but only if prescribed properly. For Kaal Sarp, Hessonite (Gomed) and Cat&apos;s Eye (Lehsunia) are commonly used under guidance.</p>
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
      <Footer />
    </>
  );
};

export default KaalSarpDoshCalculator;