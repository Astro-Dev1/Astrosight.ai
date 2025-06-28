import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Image from 'next/image';
// import { RefreshCw } from 'lucide-react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

// Function to truncate text
const truncateText = (text, limit) => {
  if (!text) return '';
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

const HoroscopePage = () => {
  const [dailyHoroscopes, setDailyHoroscopes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyHoroscopes();
  }, []);

  const fetchDailyHoroscopes = async () => {
    const today = new Date();
    const istDate = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const year = String(istDate.getFullYear());
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const day = String(istDate.getDate()).padStart(2, '0');

    try {
      const response = await fetch(`/api/horoscopes/daily-horoscopes-${year}.json`);
      if (!response.ok) throw new Error('Failed to fetch horoscopes.');
      const data = await response.json();
      setDailyHoroscopes(data[`${year}-${month}`][day] || {});
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    fetchDailyHoroscopes();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p>Error: {error}</p>
      <button onClick={handleRefresh} className="btn-refresh">Retry</button>
    </div>
  );

  return (
    <div className="bg-[#faefe0] mb-9 w-full flex flex-col items-center">
      {/* Page Header */}
      <header className="text-center bg-orange-500 p-6 w-full">
        <h1 className="text-4xl font-bold text-[#fdfcfc] mb-2">Today Horoscope</h1>
        <h2 className="text-2xl text-white">Discover Daily, Weekly, and Monthly Predictions</h2>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Daily Horoscope Summary</h2>
          <p className="text-gray-700">
            Explore the daily horoscope insights for your zodiac sign and find cosmic guidance for your day.
          </p>
        </section>

        {/* Horoscope Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {zodiacSigns.map((sign) => (
            <Link key={sign} href={`/horoscope/${sign.toLowerCase()}`} className="text-orange-600 hover:underline w-full flex justify-center">
              <Card key={sign} className="bg-white shadow-md hover:scale-105 hover:shadow-lg w-full">
              <div className="relative h-48">
                <Image
                  src={`/${sign.toLowerCase()}.jpg`}
                  alt={`${sign} horoscope`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-t-lg" />
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{sign}</h3>
              </div>
              <CardContent>
                <CardHeader>
                  <h3 className="text-xl font-semibold">{`${sign}'s Horoscope Today`}</h3>
                </CardHeader>
                <p className="text-gray-700">{truncateText(dailyHoroscopes[sign]?.personal || '', 100)}</p>
                <div className="mt-4 text-center text-orange-600 hover:underline">
                  Read More
                </div>
              </CardContent>
            </Card>
        </Link>

          ))}
        </div>
        {/* FAQ Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">What is a daily horoscope?</h3>
              <p className="text-gray-700">Daily horoscopes are insights based on your zodiac sign for the day.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">How are horoscopes created?</h3>
              <p className="text-gray-700">Horoscopes are crafted using astrological techniques and planetary alignments.</p>
            </div>
          </div>
        </section>

        {/* Internal Linking */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Explore More Horoscopes</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {zodiacSigns.map((sign) => (
              <Link key={sign} href={`/horoscope/${sign.toLowerCase()}`} className="text-orange-600 hover:underline">{`${sign} Daily Horoscope`}</Link>
            ))}
            <Link href="/horoscope/monthly" className="text-orange-600 hover:underline">Monthly Horoscopes</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HoroscopePage;
