import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';

const ConsultationPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const astrologers = [
    {
      id: 1,
      name: 'Dr. Rajesh Sharma',
      specialization: 'Vedic Astrology & Career Guidance',
      experience: '15+ Years',
      languages: ['Hindi', 'English', 'Sanskrit'],
      rating: 4.9,
      consultations: '5000+',
      image: '/astrologers/rajesh.jpg',
      expertise: ['Career', 'Business', 'Finance', 'Life Purpose']
    },
    {
      id: 2,
      name: 'Pandit Suresh Gupta',
      specialization: 'Marriage & Relationship Expert',
      experience: '20+ Years',
      languages: ['Hindi', 'English', 'Gujarati'],
      rating: 4.8,
      consultations: '8000+',
      image: '/astrologers/suresh.jpg',
      expertise: ['Marriage', 'Love', 'Compatibility', 'Family']
    },
    {
      id: 3,
      name: 'Acharya Priya Devi',
      specialization: 'Health & Remedial Astrology',
      experience: '12+ Years',
      languages: ['Hindi', 'English', 'Bengali'],
      rating: 4.9,
      consultations: '4500+',
      image: '/astrologers/priya.jpg',
      expertise: ['Health', 'Remedies', 'Spiritual Growth', 'Gemstones']
    },
    {
      id: 4,
      name: 'Guru Vikram Singh',
      specialization: 'Numerology & Vastu Expert',
      experience: '18+ Years',
      languages: ['Hindi', 'English', 'Punjabi'],
      rating: 4.7,
      consultations: '6500+',
      image: '/astrologers/vikram.jpg',
      expertise: ['Numerology', 'Vastu', 'Business', 'Property']
    }
  ];

  const consultationTypes = [
    {
      id: 1,
      title: 'Quick Consultation',
      duration: '15 Minutes',
      price: '₹299',
      features: ['Basic birth chart analysis', 'One specific question', 'Quick remedies'],
      popular: false
    },
    {
      id: 2,
      title: 'Standard Consultation',
      duration: '30 Minutes',
      price: '₹599',
      features: ['Detailed birth chart reading', 'Multiple questions', 'Personalized remedies', 'Written summary'],
      popular: true
    },
    {
      id: 3,
      title: 'Premium Consultation',
      duration: '60 Minutes',
      price: '₹1199',
      features: ['Complete life analysis', 'Unlimited questions', 'Detailed remedies', 'Future predictions', 'Follow-up support'],
      popular: false
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
          <h1 className="text-2xl font-bold text-[#FF9D42] ml-4">Astrologer Consultation</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FF9D42] to-[#FFB366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">1:1 Video Consultation with Expert Astrologers</h2>
          <p className="text-lg opacity-90 mb-6">
            Get personalized guidance from our certified astrologers through secure video calls
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <i className="fas fa-video" />
              <span>HD Video Calls</span>
            </div>
            <i className="fas fa-circle text-xs" />
            <div className="flex items-center space-x-2">
              <i className="fas fa-user-graduate" />
              <span>Expert Astrologers</span>
            </div>
            <i className="fas fa-circle text-xs" />
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt" />
              <span>100% Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <i className="fas fa-video text-3xl" />
            <div>
              <h3 className="text-2xl font-semibold">Video Consultations Coming Soon</h3>
              <p className="text-sm opacity-90">Were setting up our platform for the best consultation experience</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-4">
            <p className="text-sm font-medium">🎉 Early Bird Offer: First consultation at 50% off!</p>
          </div>
        </div>
      </div>

      {/* Consultation Packages */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Consultation Packages</h3>
          <p className="text-gray-600">Choose the perfect consultation duration for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {consultationTypes.map((consultation) => (
            <Card key={consultation.id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${consultation.popular ? 'border-2 border-[#FF9D42] transform scale-105' : ''}`}>
              {consultation.popular && (
                <div className="bg-[#FF9D42] text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{consultation.title}</h3>
                  <div className="text-3xl font-bold text-[#FF9D42] mb-2">{consultation.price}</div>
                  <p className="text-gray-600">{consultation.duration}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {consultation.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <i className="fas fa-check text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gray-200 text-gray-500 cursor-not-allowed"
                  disabled
                >
                  <i className="fas fa-clock mr-2" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expert Astrologers */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Meet Our Expert Astrologers</h3>
            <p className="text-gray-600">Certified professionals with years of experience in Vedic astrology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {astrologers.map((astrologer) => (
              <Card key={astrologer.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#FF9D42] to-[#FFB366] rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-user-tie text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{astrologer.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{astrologer.specialization}</p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mb-3">
                      <span><i className="fas fa-star text-yellow-500 mr-1" />{astrologer.rating}</span>
                      <span><i className="fas fa-clock text-[#FF9D42] mr-1" />{astrologer.experience}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs">
                      <span className="font-semibold text-gray-700">Languages: </span>
                      <span className="text-gray-600">{astrologer.languages.join(', ')}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-gray-700">Consultations: </span>
                      <span className="text-gray-600">{astrologer.consultations}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {astrologer.expertise.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-[#FFF6E9] text-[#FF9D42] text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gray-200 text-gray-500 cursor-not-allowed text-sm"
                    disabled
                  >
                    <i className="fas fa-video mr-2" />
                    Book Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">How Video Consultation Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-plus text-blue-500 text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">1. Book Appointment</h4>
              <p className="text-gray-600 text-sm">Choose your preferred astrologer and time slot</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-credit-card text-green-500 text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">2. Make Payment</h4>
              <p className="text-gray-600 text-sm">Secure payment through multiple options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-video text-purple-500 text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">3. Join Video Call</h4>
              <p className="text-gray-600 text-sm">Connect through our secure video platform</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-alt text-orange-500 text-2xl" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">4. Get Insights</h4>
              <p className="text-gray-600 text-sm">Receive personalized guidance and written summary</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#FF9D42] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-bell text-[#FF9D42] text-3xl" />
            </div>
            
            {!isSubscribed ? (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Notified When We Launch</h3>
                <p className="text-gray-600 mb-6">
                  Be the first to book a consultation with our expert astrologers and get exclusive launch discounts!
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
                <p className="text-gray-600">Youll be the first to know when consultations are available!</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <i className="fas fa-user-shield text-[#FF9D42] text-2xl mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">Verified Astrologers</h4>
                <p className="text-xs text-gray-600">Certified & experienced professionals</p>
              </div>
              <div className="text-center">
                <i className="fas fa-lock text-[#FF9D42] text-2xl mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">100% Confidential</h4>
                <p className="text-xs text-gray-600">Your privacy is our priority</p>
              </div>
              <div className="text-center">
                <i className="fas fa-clock text-[#FF9D42] text-2xl mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">Flexible Timing</h4>
                <p className="text-xs text-gray-600">Available 24/7 for your convenience</p>
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
                When will video consultations be available?
              </h4>
              <p className="text-gray-600 text-sm">We re launching soon! Sign up to be notified when bookings open.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-question-circle text-[#FF9D42] mr-2" />
                What do I need for a video consultation?
              </h4>
              <p className="text-gray-600 text-sm">Just a device with camera, microphone, and stable internet connection.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-question-circle text-[#FF9D42] mr-2" />
                Can I reschedule my appointment?
              </h4>
              <p className="text-gray-600 text-sm">Yes, you can reschedule up to 2 hours before your appointment time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-question-circle text-[#FF9D42] mr-2" />
                Will I get a recording of the session?
              </h4>
              <p className="text-gray-600 text-sm">Youll receive a written summary with key insights and recommendations.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#FFF6E9] rounded-xl p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            <i className="fas fa-headset text-[#FF9D42] mr-2" />
            Need Help?
          </h4>
          <p className="text-gray-600 mb-4">Our support team is here to assist you with any questions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:consultations@astrosight.ai" className="text-[#FF9D42] font-medium hover:underline">
              <i className="fas fa-envelope mr-2" />
              consultations@astrosight.ai
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

export default ConsultationPage;