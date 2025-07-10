import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

const DashaCalculator = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    dashaType: 'vimshottari'
  });

  const [errors, setErrors] = useState({});

  const dashaTypes = [
    { value: 'vimshottari', label: 'Vimshottari Dasha (120 years)', desc: 'Most popular and widely used' },
    { value: 'ashtottari', label: 'Ashtottari Dasha (108 years)', desc: 'For those born during day time' },
    { value: 'yogini', label: 'Yogini Dasha (36 years)', desc: 'Special calculations for women' },
    { value: 'chara', label: 'Chara Dasha', desc: 'Based on sign lordship' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.birthTime) newErrors.birthTime = 'Birth time is required';
    if (!formData.birthPlace.trim()) newErrors.birthPlace = 'Birth place is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('🔮 Coming Soon! Our advanced Dasha calculator with detailed planetary periods is under development!');
    }
  };

  return (
    <>
      <Head>
        <title>Dasha Calculator | Planetary Periods in Vedic Astrology - AstroSight</title>
        <meta name="description" content="Calculate your Dasha periods - Vimshottari, Ashtottari, Yogini, and Chara Dasha. Free Vedic astrology planetary period calculator with detailed analysis." />
        <meta name="keywords" content="dasha calculator, vimshottari dasha, planetary periods, vedic astrology, mahadasha, antardasha, pratyantardasha" />
        <meta property="og:title" content="Dasha Calculator | Planetary Periods Calculator" />
        <meta property="og:description" content="Discover your planetary periods and life phases with our advanced Dasha calculator based on Vedic astrology." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 font-kohinoor py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-purple-600">Dasha</span> Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your planetary periods and understand the timing of life events through Vedic astrology
            </p>
          </div>

          {/* Main Calculator Card */}
          <Card className="p-8 bg-white shadow-xl rounded-2xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔮</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Planetary Period Analysis
              </h2>
              <p className="text-gray-600">
                Calculate your Mahadasha, Antardasha, and sub-periods for life timing predictions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      errors.fullName ? 'border-red-500' : 'border-purple-200'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      errors.birthDate ? 'border-red-500' : 'border-purple-200'
                    }`}
                  />
                  {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => handleInputChange('birthTime', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      errors.birthTime ? 'border-red-500' : 'border-purple-200'
                    }`}
                  />
                  {errors.birthTime && <p className="text-red-500 text-sm mt-1">{errors.birthTime}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Place <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      errors.birthPlace ? 'border-red-500' : 'border-purple-200'
                    }`}
                    placeholder="City, State, Country"
                  />
                  {errors.birthPlace && <p className="text-red-500 text-sm mt-1">{errors.birthPlace}</p>}
                </div>
              </div>

              {/* Dasha Type Selection */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Select Dasha System
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashaTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.dashaType === type.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => handleInputChange('dashaType', type.value)}
                    >
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          name="dashaType"
                          value={type.value}
                          checked={formData.dashaType === type.value}
                          onChange={(e) => handleInputChange('dashaType', e.target.value)}
                          className="mr-3 text-purple-600"
                        />
                        <h4 className="font-semibold text-gray-900">{type.label}</h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-semibold rounded-lg transition-colors"
              >
                Calculate Dasha Periods
              </Button>
            </form>

            {/* Features List */}
            <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-3">Your Dasha Report Will Include:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-purple-600 mr-2">🌟</span>
                  Current Mahadasha and remaining period
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-purple-600 mr-2">⏰</span>
                  Antardasha and Pratyantardasha periods
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-purple-600 mr-2">📊</span>
                  Complete life timeline (120 years)
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-purple-600 mr-2">🎯</span>
                  Favorable and challenging periods
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-purple-600 mr-2">💼</span>
                  Career and business timing
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-purple-600 mr-2">💕</span>
                  Marriage and relationship timing
                </div>
              </div>
            </div>
          </Card>

          {/* Dasha Information Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-semibold mb-2">Mahadasha</h3>
              <p className="text-sm text-gray-600">
                Major planetary periods ranging from 6 to 20 years
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Antardasha</h3>
              <p className="text-sm text-gray-600">
                Sub-periods within each Mahadasha for detailed timing
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Life Events</h3>
              <p className="text-sm text-gray-600">
                Predict timing of major life changes and opportunities
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashaCalculator;
