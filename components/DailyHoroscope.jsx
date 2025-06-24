"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchMyProfile } from "../services/centralApi";
import Image from "next/image";
import Link from "next/link";



const DailyHoroscope = () => {
  const [currentSign, setCurrentSign] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [horoscope, setHoroscope] = useState({});

  const fetchDailyHoroscope1 = async (sign) => {
    setLoading(true);
    try {
      const today = new Date();
      const year = today.getFullYear(); // 2025
      const month = String(today.getMonth() + 1).padStart(2, '0'); // 05
      const day = String(today.getDate()).padStart(2, '0'); // 21

      const capitalizedSign = sign.charAt(0).toUpperCase() + sign.slice(1); // Capricorn
      const response = await fetch('/api/horoscopes/daily-horoscopes-2025.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from server');
      }
      const data = JSON.parse(text);

      // Try multiple key variations to handle potential differences
      const horoscopeData =
        data?.[`${year}-${month}`]?.[day]?.[capitalizedSign] ||
        data?.[`${year}-${month}`]?.[day]?.[sign.toLowerCase()] ||
        data?.[`${year}-${parseInt(month)}`]?.[day]?.[capitalizedSign] ||
        data?.[`${year}-${month}`]?.[parseInt(day)]?.[capitalizedSign] ||
        null;

      console.log(
        'Fetched data:',
        horoscopeData,
        sign,
        `${year}-${month}`,
        day,
        capitalizedSign
      ); // Debugging log

      if (!horoscopeData || !horoscopeData.Overall) {
        throw new Error(
          `Horoscope not found for ${capitalizedSign} on ${year}-${month}-${day} or missing Overall field`
        );
      }

      setHoroscope((prev) => ({
        ...prev,
        [sign.toLowerCase()]: horoscopeData,
      }));
    } catch (error) {
      console.error('Error fetching daily horoscope:', error);
      setError(error.message);
      setHoroscope((prev) => ({
        ...prev,
        [sign.toLowerCase()]: {
          Overall: 'Horoscope data unavailable. Please try again later.',
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyProfile();
        let data;
        if (response.json && typeof response.json === "function") {
          data = await response.json();
        } else {
          data = response;
        }
        console.log('Fetched profile:', data);
        const sign = data.data?.astroProfile?.zodiac?.toLowerCase() || 'gemini';
        setCurrentSign({ sign });
        await fetchDailyHoroscope1(sign);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError(err.message);
        setCurrentSign({ sign: 'gemini' });
        await fetchDailyHoroscope1('gemini');
      }
    };

    fetchData();
  }, []);

  const fallbackSign = {
    sign: 'gemini',
  };

  const displaySign = currentSign || fallbackSign;
  const signKey = displaySign.sign.toLowerCase();
  console.log('Current sign:', signKey);
  const signData = horoscope[signKey] || { Overall: 'No horoscope data available.' };
  console.log('Sign data:', signData);
  const zodiacImage = displaySign.sign ;

  if (loading) {
    return <div className="mb-6 text-center text-gray-700">Loading Horoscope...</div>;
  }

  return (
    <div className="mb-6 mx-auto max-w-5xl px-4">
      <h2 className="text-xl font-bold  text-center mb-6">
        {displaySign.sign.charAt(0).toUpperCase() + displaySign.sign.slice(1)} Today’s <span className="text-[#FF6D3F]"> Horoscope</span>
      </h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">Error: {error}</p>}

      <Card className="bg-gradient-to-r from-[#FF9933] to-[#FF5733] p-6 rounded-xl shadow-lg mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={`/zodicimg/${zodiacImage}.jpg`}
            width={64}
            height={64}
            alt={`${displaySign.sign} Symbol`}
            className="w-16 h-16 rounded-full bg-white/10 p-2"
          />
          <h3 className="text-2xl font-semibold text-white">
            {displaySign.sign.charAt(0).toUpperCase() + displaySign.sign.slice(1)}
          </h3>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
          <p className="text-white text-base leading-relaxed">{signData.Overall}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <h4 className="text-white text-sm font-medium mb-1">Auspicious Time</h4>
            <p className="text-white/90 text-sm">9am - 10:30 am</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <h4 className="text-white text-sm font-medium mb-1">Inauspicious Time</h4>
            <p className="text-white/90 text-sm">11:30 am - 1 pm</p>
          </div>
        </div>
        <Link
          href="/horoscope/{signKey}"
          data-readdy="true"
        >
          <Button className="bg-white hover:bg-white/90 text-[#FF9933] w-full rounded-full cursor-pointer">
            Read More
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default DailyHoroscope;