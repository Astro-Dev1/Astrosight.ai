import { Calculator, Heart, Users, Star, Sparkles, User, Crown, Shield, UserX } from 'lucide-react';
import React, { useState } from 'react';
// import Head from 'next/head';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../components/InternalLinksGrid';

const FlamesCalculator = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    partnerName: ''
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.yourName && formData.partnerName) {
      // Simple FLAMES calculation
      const name1 = formData.yourName.toLowerCase().replace(/\s/g, '');
      const name2 = formData.partnerName.toLowerCase().replace(/\s/g, '');
      
      // Remove common letters
      let str1 = name1;
      let str2 = name2;
      
      for (let char of name1) {
        if (str2.includes(char)) {
          str1 = str1.replace(char, '');
          str2 = str2.replace(char, '');
        }
      }
      
      const totalCount = str1.length + str2.length;
      const flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemies', 'Siblings'];
      const resultIndex = (totalCount - 1) % 6;
      setResult(flames[resultIndex]);
    } else {
      alert('Please enter both names');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const flamesMeanings = [
    {
      letter: 'F',
      title: 'Friends',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      description: "You'll probably build a great friendship. A strong bond, lots of laughs, and someone you'll always count on."
    },
    {
      letter: 'L',
      title: 'Love',
      icon: <Heart className="h-6 w-6 text-red-600" />,
      description: "There's romantic chemistry here. The spark is real! But love needs nurturing — even if FLAMES gives the green light."
    },
    {
      letter: 'A',
      title: 'Affection',
      icon: <Sparkles className="h-6 w-6 text-pink-600" />,
      description: "This is the sweet middle ground. It means there's warmth, attraction, maybe even flirtation, but not full-blown romance or marriage."
    },
    {
      letter: 'M',
      title: 'Marriage',
      icon: <Crown className="h-6 w-6 text-yellow-600" />,
      description: "The ultimate result! The FLAMES calculator thinks there's long-term potential here. You might just be endgame!"
    },
    {
      letter: 'E',
      title: 'Enemies',
      icon: <UserX className="h-6 w-6 text-red-600" />,
      description: "Oops! Looks like the name clash wasn't too friendly. It's not uncommon in fun games — don't take it to heart."
    },
    {
      letter: 'S',
      title: 'Siblings',
      icon: <Shield className="h-6 w-6 text-green-600" />,
      description: "You vibe like family. Comforting, familiar, and probably great banter without romantic undertones."
    }
  ];

  const useCases = [
    "Playing with your partner for laughs",
    "Breaking the ice with someone new",
    "Throwback school reunion party",
    "Instagram story fun"
  ];

  const limitations = [
    "It doesn't use planetary alignments",
    "It doesn't account for values, goals, or maturity",
    "It's not meant for life decisions"
  ];

  const faqs = [
    {
      question: "Is the Flames Calculator real or just a game?",
      answer: "It's a game. But like many things from our childhood, it has charm and nostalgia. And sometimes, surprisingly true results."
    },
    {
      question: "Can I trust the result to make relationship decisions?",
      answer: "No. It's fun but not scientific or spiritual. For real decisions, try a personal love consultation."
    },
    {
      question: "How is your Flames Calculator different from others?",
      answer: "I designed it with intention — clean logic, no ads, instant result. Plus, it's wrapped in guidance if you want to go deeper."
    },
    {
      question: "Can I use it for same-gender names or friendships?",
      answer: "Absolutely. The tool is name-based, not gender-locked."
    },
    {
      question: "Is this related to astrology or numerology?",
      answer: "Not directly. It doesn't use birth data. But you can explore accurate love compatibility with your birth chart or numerology report."
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      {/* Calculator Form */}
      <CustomHeader/>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-pink-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-pink-400 to-red-400 p-3 rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              FLAMES Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Know your love compatibility with this nostalgic childhood game
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-purple-600" />
                  Your Name *
                </label>
                <input
                  type="text"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Heart className="h-4 w-4 mr-2 text-purple-600" />
                  Partner&apos;s Name *
                </label>
                <input
                  type="text"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter partner's name"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                <Calculator className="inline h-5 w-5 mr-2" />
                Calculate FLAMES
              </button>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-xl p-6 border border-yellow-200 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Result:</h3>
                <div className="text-4xl font-bold text-pink-600 mb-2">{result}</div>
                <p className="text-gray-600">
                  {flamesMeanings.find(m => m.title === result)?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        
        {/* Opening Story */}
        <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-8 border-l-4 border-pink-400">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            A Trip Down Memory Lane
          </h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Let me take you back to a simpler time. Remember scribbling names on the last page of your notebook? Drawing hearts, playing with initials, and calculating FLAMES compatibility with a mix of curiosity and excitement? Yes, I&apos;ve been there too.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Back then, it was just a game. But today, with everything digital, the flames calculator has made a nostalgic comeback now quicker, cleaner, and still just as fun! And while it&apos;s not as deep as an astrological chart or a karmic compatibility reading, it&apos;s a lovely way to smile, connect, and stir up some light-hearted excitement.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Let&apos;s explore how this playful tool works, what it reveals, and when to use it.
          </p>
        </div>

        {/* What is FLAMES */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">What is FLAMES?</h2>
          <p className="text-gray-700 mb-6 text-lg">
            FLAMES is a popular childhood game that tries to predict the relationship between two people based on their names.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-800">The letters in FLAMES stand for:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flamesMeanings.map((meaning, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-purple-600">{meaning.letter}</span>
                  <span className="text-gray-700">– {meaning.title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-gray-700 text-lg">
            You&apos;d write both names, cancel common letters, and count the remaining ones. That number would help you cycle through the letters of FLAMES until you landed on one final result. Sounds fun, right? It still is.
          </p>
        </div>

        {/* What is a Flames Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">What is a Flames Calculator?</h2>
          <div className="space-y-4">
            <p className="text-gray-700 text-lg">
              A flames calculator is simply the digital version of that classic school game.
            </p>
            <p className="text-gray-700">
              Instead of doing all the letter counting and looping manually, the online tool does it for you. It&apos;s fast and easy. Just enter two names—yours and the other person&apos;s—and it instantly shows you your relationship result.
            </p>
            <p className="text-gray-700">
              People today use it for everything—from date night games to playful Instagram content. It doesn&apos;t replace serious compatibility tools, but it&apos;s perfect for a quick burst of fun.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How does this Flames Calculator work?</h2>
          <p className="text-gray-700 mb-6 text-lg">
            You type two names into the calculator. That&apos;s it.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Behind the scenes, here&apos;s what happens:</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <p className="text-gray-700">All matching letters between the two names are eliminated.</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <p className="text-gray-700">The number of remaining letters is counted.</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <p className="text-gray-700">That number is used to cycle through the word FLAMES until one letter is left.</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 text-lg font-medium">
            And voila! You get your result — Love? Marriage? Friends? Enemies? You&apos;ll know in seconds.
          </p>
          
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Behind the Scenes: Simple Math Meets Sweet Nostalgia</h4>
            <p className="text-gray-700">
              The algorithm itself is super simple. No horoscopes, no moon charts. Just letter matching and counting. But what makes it magical is the feeling — that little rush when you see the word Marriage pop up next to your crush&apos;s name. It&apos;s pure, innocent fun.
            </p>
          </div>
        </div>

        {/* FLAMES Meanings */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            What is the Meaning of Each Letter in the FLAMES Calculator?
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Let me walk you through what each letter means. These interpretations are playful, not predictive, so take them with a smile!
          </p>
          
          <div className="grid md:grid-cols-1 gap-6">
            {flamesMeanings.map((meaning, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {meaning.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {meaning.letter} – {meaning.title}
                    </h3>
                    <p className="text-gray-700">{meaning.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accuracy & Fun */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Are FLAMES Results Accurate or Just for Fun?
          </h2>
          <p className="text-gray-700 mb-4 text-lg">
            The flames calculator is more symbolic than serious. It&apos;s not astrology. It&apos;s not numerology. But it is fun — and sometimes eerily accurate.
          </p>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <p className="text-gray-700">
              If you&apos;re genuinely seeking love compatibility answers, you&apos;d need a deep-dive relationship reading based on your birth chart, planetary periods, and karmic alignment. You can explore those kinds of relationship reports or even consult with an astrologer for detailed guidance.
            </p>
          </div>
        </div>

        {/* When to Use It */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            When to Use It – Icebreaker, Date Night, or Just For Laughs
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{useCase}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-700 text-lg font-medium">
            Basically, any time you want a light-hearted moment.
          </p>
        </div>

        {/* Limitations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            What are the Limitations of the Flames Calculator?
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            It&apos;s important to understand its boundaries:
          </p>
          <div className="space-y-3 mb-6">
            {limitations.map((limitation, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <span className="text-red-600">●</span>
                  <span className="text-gray-700">{limitation}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <p className="text-gray-700 mb-4">
              For example, someone might get Enemies in FLAMES but have beautiful long-term compatibility astrologically.
            </p>
            <p className="text-gray-700">
              So if you&apos;re seriously wondering Should I marry this person?, please don&apos;t rely on just FLAMES. Get a karmic compatibility consultation or explore our deep-dive love report that includes divisional chart analysis, remedies, and future period forecasts.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-8 border-l-4 border-pink-400">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to try it? Just enter your name and your partner&apos;s. It takes two seconds — and who knows, it might just say Marriage 😄
          </h2>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Want deeper love insights?</h3>
            <p className="text-gray-700 mb-4 text-lg">
              If FLAMES got you curious, why not explore your deeper karmic love story?
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-800 mb-3">You can:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Get a love compatibility report based on your birth charts</li>
                <li>• Buy gemstones or yantras to attract or stabilize love</li>
                <li>• Consult with us one-on-one for guidance on relationships, marriage timing, or unresolved love patterns</li>
              </ul>
              <p className="text-gray-700 mt-4 italic">
                These remedies and insights go beyond fun — they align you with dharma and destiny.
              </p>
            </div>
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
                {/* Internal Links */}
        <div className="space-y-8">
          <InternalLinksGrid />
          <HoroscopeNavigation />
          <CompatibilityLinksGrid />
          <ReportLinksGrid />
          <RecentBlogLinks />
        </div>
      </div>
    

    </div>
        <div className="bg-[#f46434]  mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div></>
  );
};

export default FlamesCalculator;