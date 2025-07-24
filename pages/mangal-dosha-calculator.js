import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';

const MangalDoshaCalculator = () => {
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
        title="Free Mangal Dosha Calculator with Remedies | AstroSight"
        description="Check if you have Manglik Dosha using our free Mangal Dosha Calculator. Understand Mars' position in your birth chart, types, effects, and effective remedies from experienced Vedic astrologers."
        keywords="mangal dosha calculator, manglik dosha check, mars dosha kundli, manglik remedies, vedic astrology mangal dosha, kundli matching manglik check"
        canonical="https://astrosight.ai/mangal-dosha-calculator"
        ogImage="https://astrosight.ai/images/mangal-dosha-og.jpg"
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Free Mangal Dosha Calculator with Remedies",
            "url": "https://astrosight.ai/mangal-dosha-calculator",
            "description": "Check Manglik Dosha in your birth chart with our free, authentic Vedic astrology calculator. Learn the types, effects, and powerful remedies for Mangal Dosha.",
            "publisher": {
              "@type": "Organization",
              "name": "AstroSight",
              "url": "https://astrosight.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://astrosight.ai/logo.png"
              }
            },
            "image": "https://astrosight.ai/images/mangal-dosha-og.jpg"
          })
        }}
      />

      <CustomHeader />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Free Mangal Dosha Calculator with Remedies
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Check your birth chart for Manglik Dosha and understand its impact on your relationships and life with trusted Vedic astrology.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
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
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Time of Birth *</label>
                <input
                  type="time"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Place of Birth *</label>
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
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Check Mangal Dosha
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        {/* Article and Explanation Sections from PDF */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">What is Planet Mars in Vedic Astrology?</h2>
          <p className="text-gray-700 mb-4">
            Mars, or Mangal, is the planet of fire. It represents action, courage, willpower, and at times—aggression. When placed strongly,
            Mars gives leadership, passion, and tremendous inner strength.
          </p>
          <p className="text-gray-700 mb-4">
            But when Mars is afflicted or wrongly placed, especially in key houses of your birth chart, it can cause disturbances—especially in
            relationships and marriage. This is where Manglik Dosha comes in.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">What is Mangal or Manglik Dosha?</h2>
          <p className="text-gray-700 mb-4">Mangal Dosha happens when Mars sits in any of these six houses in your birth chart:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>1st house</li>
            <li>2nd house</li>
            <li>4th house</li>
            <li>7th house</li>
            <li>8th house</li>
            <li>12th house</li>
          </ul>
          <p className="text-gray-700 mb-4">
            These houses relate to marriage, emotions, family peace, or personal stability. Mars in these sensitive houses causes imbalance leading
            to delays in marriage, arguments, emotional distance, or breakups if left unaddressed.
          </p>
          <p className="text-gray-700">
            Manglik Dosha is analyzed in Kundli matching and is a primary concern in Indian marriages.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Types of Mangal or Manglik Dosha</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>
              <strong>Anshik Manglik:</strong> Mars in a sensitive house but under benefic influences like Jupiter, resulting in weaker intensity.
            </li>
            <li>
              <strong>Full Manglik:</strong> Mars strongly placed in dosha houses without relief, resulting in stronger relational impact.
            </li>
            <li>
              <strong>Intensity depends on:</strong> Moon sign, Navamsa chart, and Dasha periods.
            </li>
          </ul>
          <p className="text-gray-700">
            The Manglik Dosha calculator by date of birth is a starting step but final judgment requires expert chart interpretation.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Common Traits for Manglik Dosha</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Highly independent or headstrong nature</li>
            <li>Clashes with authority or family on personal decisions</li>
            <li>Impatience or aggression in relationships</li>
            <li>Delays or disruptions in marriage</li>
          </ul>
          <p className="text-gray-700 mt-4">
            These are tendencies, not fate; a detailed report assesses whether it&quot;s a temporary phase or karmic pattern.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Effects of Mangal Dosha by House</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li><strong>1st House:</strong> Dominating personality; spouse may feel neglected</li>
            <li><strong>2nd House:</strong> Family/in-law conflicts; financial instability in marriage</li>
            <li><strong>4th House:</strong> Unsettled home life; frequent moves or dissatisfaction</li>
            <li><strong>7th House:</strong> Marital tension; ego clashes and arguments</li>
            <li><strong>8th House:</strong> Emotional distance; post-marriage misfortunes or health issues</li>
            <li><strong>12th House:</strong> Sexual mismatch; sleep problems; hidden frustrations</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Remedies That Actually Work</h2>
          <p className="text-gray-700 mb-4">
            Remedies include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Kumbh or Vishnu Vivah (symbolic rituals in extreme cases)</li>
            <li>Fasting on Tuesdays</li>
            <li>Chanting Mangal Beej Mantra daily (108 times)</li>
            <li>Offering red flowers to Hanuman Ji on Tuesdays</li>
            <li>Lighting a ghee lamp under a Peepal tree on Tuesday evenings</li>
            <li>Regular recital of Hanuman Chalisa</li>
            <li>Wearing Red Coral (Moonga) gemstone after expert consultation</li>
          </ul>
          <p className="text-gray-700">
            Consultations are recommended for personalized remedial advice.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How the Calculator Works</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Input birth date, time, and place</li>
            <li>System checks Mars’s house position in your Lagna chart</li>
            <li>Computer assesses cancellation yogas or relief aspects</li>
            <li>Shows if you are Manglik, Non-Manglik, or Partial Manglik</li>
          </ul>
          <p className="text-gray-700">
            This calculator serves as a first step — expert guidance is advised for final interpretations.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Final Thoughts</h2>
          <p className="text-gray-700 mb-4">
            Mangal Dosha is energy that needs balancing, not a curse. Awareness and remedial measures can lead to peaceful, successful lives even for Mangliks.
          </p>
          <p className="text-gray-700">
            Choose spiritual remedies, rudrakshas, yantras, and gemstones carefully and under guidance.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-6 text-gray-700 text-sm">
            <div>
              <strong>Q1: Is Mangal Dosha lifelong?</strong>
              <p>Not always. Its influence may reduce over time depending on dasha and chart maturity.</p>
            </div>
            <div>
              <strong>Q2: Can Manglik marry non-Manglik?</strong>
              <p>Yes, if cancellation yogas are present; careful matchmaking is necessary.</p>
            </div>
            <div>
              <strong>Q3: Does Mangal Dosha affect only marriage?</strong>
              <p>Primarily yes, but it can also impact property, emotions, and health.</p>
            </div>
            <div>
              <strong>Q4: When does Mangal Dosha go away?</strong>
              <p>Sometimes after age 28; varies with remedies and planetary periods.</p>
            </div>
            <div>
              <strong>Q5: How to check cancellation of Mangal Dosha?</strong>
              <p>Use specialized cancellation checks or consult astrologers for guidance.</p>
            </div>
          </div>
        </section>

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
    </>
  );
};

export default MangalDoshaCalculator;
