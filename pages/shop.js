import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';

const ShopPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = [
    {
      id: 1,
      title: 'Rudraksha',
      description: 'Sacred beads for spiritual growth, protection, and peace of mind',
      icon: 'seedling',
      color: 'bg-green-500',
      gradient: 'from-green-400 to-green-600',
      items: ['1 Mukhi Rudraksha', '5 Mukhi Rudraksha', '7 Mukhi Rudraksha', 'Rudraksha Malas']
    },
    {
      id: 2,
      title: 'Gemstones',
      description: 'Authentic precious and semi-precious stones for planetary remedies',
      icon: 'gem',
      color: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-600',
      items: ['Ruby', 'Emerald', 'Blue Sapphire', 'Yellow Sapphire', 'Pearl', 'Red Coral']
    },
    {
      id: 3,
      title: 'Crystals',
      description: 'Healing crystals to balance energy and enhance positive vibrations',
      icon: 'cube',
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600',
      items: ['Rose Quartz', 'Amethyst', 'Clear Quartz', 'Black Tourmaline', 'Citrine']
    },
    {
      id: 4,
      title: 'Energized Bracelets',
      description: 'Specially energized bracelets for protection and good fortune',
      icon: 'circle',
      color: 'bg-orange-500',
      gradient: 'from-orange-400 to-orange-600',
      items: ['7 Chakra Bracelet', 'Protection Bracelet', 'Wealth Bracelet', 'Health Bracelet']
    },
    {
      id: 5,
      title: 'Yantras',
      description: 'Sacred geometric designs for meditation and spiritual advancement',
      icon: 'star-of-david',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-yellow-600',
      items: ['Sri Yantra', 'Mahalakshmi Yantra', 'Hanuman Yantra', 'Saraswati Yantra']
    },
    {
      id: 6,
      title: 'Idols & Statues',
      description: 'Beautiful divine idols for worship and spiritual decoration',
      icon: 'praying-hands',
      color: 'bg-red-500',
      gradient: 'from-red-400 to-red-600',
      items: ['Ganesha Idol', 'Krishna Idol', 'Lakshmi Idol', 'Buddha Statue']
    },
    {
      id: 7,
      title: 'Kawach (Amulets)',
      description: 'Protective amulets and talismans for safety and prosperity',
      icon: 'shield-alt',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-400 to-indigo-600',
      items: ['Hanuman Kawach', 'Durga Kawach', 'Ganesha Kawach', 'Mahamrityunjaya Kawach']
    },
    {
      id: 8,
      title: 'Puja Items',
      description: 'Essential items for daily worship and spiritual rituals',
      icon: 'candle-holder',
      color: 'bg-pink-500',
      gradient: 'from-pink-400 to-pink-600',
      items: ['Incense Sticks', 'Diya & Oil Lamps', 'Puja Thali', 'Sacred Threads']
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
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
          <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Spiritual Shop</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FF9D42] to-[#FFB366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Sacred Items for Spiritual Journey</h2>
          <p className="text-lg opacity-90 mb-6">
            Discover authentic spiritual products to enhance your spiritual practice and bring positive energy into your life
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <i className="fas fa-certificate" />
              <span>Authentic Products</span>
            </div>
            <i className="fas fa-circle text-xs" />
            <div className="flex items-center space-x-2">
              <i className="fas fa-om" />
              <span>Spiritually Energized</span>
            </div>
            <i className="fas fa-circle text-xs" />
            <div className="flex items-center space-x-2">
              <i className="fas fa-shipping-fast" />
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <i className="fas fa-store text-3xl" />
            <div>
              <h3 className="text-2xl font-semibold">Shop Opening Soon</h3>
              <p className="text-sm opacity-90">We&apos;re curating the finest spiritual products for you</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-4">
            <p className="text-sm font-medium">🎉 Pre-Launch Offer: Get 20% off on your first order!</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Product Categories</h3>
          <p className="text-gray-600">Explore our wide range of spiritual and astrological products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
              <div className={`h-3 bg-gradient-to-r ${category.gradient}`} />
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <i className={`fas fa-${category.icon} text-white text-2xl`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-list text-[#FF9D42] mr-2" />
                    Popular Items:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-circle text-[#FF9D42] text-xs mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full bg-gray-200 text-gray-500 cursor-not-allowed text-sm"
                  disabled
                >
                  <i className="fas fa-clock mr-2" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#FF9D42] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-envelope-open text-[#FF9D42] text-3xl" />
            </div>
            
            {!isSubscribed ? (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Be First to Know</h3>
                <p className="text-gray-600 mb-6">
                  Get notified when our spiritual shop launches and receive exclusive early bird discounts!
                </p>
                
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 rounded-lg border border-gray-300 bg-gray-50"
                    required
                  />
                  <Button
                    type="submit"
                    className="h-12 px-6 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold rounded-lg"
                  >
                    <i className="fas fa-bell mr-2" />
                    Notify Me
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-green-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">You&apos;ll be the first to know when our shop opens!</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <i className="fas fa-certificate text-[#FF9D42] text-2xl mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">Authentic Products</h4>
                <p className="text-xs text-gray-600">Certified genuine items</p>
              </div>
              <div className="text-center">
                <i className="fas fa-hands text-[#FF9D42] text-2xl mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">Energized by Experts</h4>
                <p className="text-xs text-gray-600">Blessed by spiritual masters</p>
              </div>
              <div className="text-center">
                <i className="fas fa-truck text-[#FF9D42] text-2xl mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">Secure Packaging</h4>
                <p className="text-xs text-gray-600">Safe delivery guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-question-circle text-[#FF9D42] mr-2" />
                When will the shop be available?
              </h4>
              <p className="text-gray-600 text-sm">We&apos;re launching soon! Sign up for notifications to be the first to know.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-question-circle text-[#FF9D42] mr-2" />
                Are products authentic?
              </h4>
              <p className="text-gray-600 text-sm">Yes, all our products are sourced from trusted suppliers and verified for authenticity.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-question-circle text-[#FF9D42] mr-2" />
                Do you provide certificates?
              </h4>
              <p className="text-gray-600 text-sm">Yes, gemstones and precious items come with authenticity certificates.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-question-circle text-[#FF9D42] mr-2" />
                What about shipping?
              </h4>
              <p className="text-gray-600 text-sm">We offer secure packaging and reliable delivery across all major cities.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#FFF6E9] rounded-xl p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            <i className="fas fa-headset text-[#FF9D42] mr-2" />
            Have Questions?
          </h4>
          <p className="text-gray-600 mb-4">Our spiritual product experts are here to help you choose the right items</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:shop@astrosight.ai" className="text-[#FF9D42] font-medium hover:underline">
              <i className="fas fa-envelope mr-2" />
              shop@astrosight.ai
            </a>
            <a href="tel:+911234567890" className="text-[#FF9D42] font-medium hover:underline">
              <i className="fas fa-phone mr-2" />
              +91 12345 67890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;