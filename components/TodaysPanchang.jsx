
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  Calendar, Moon, Star, Sunrise, Sunset, Circle, SquareAsterisk } from 'lucide-react';
import { format } from 'date-fns';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import Link from 'next/link';
import Image from 'next/image';
const libraries = ['places'];

const TodaysPanchang = () => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState('Bengaluru, India');
  const [panchangaData, setPanchangaData] = useState(null);
  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const fetchPanchangaData = async (timezone = 5.5, latitude = 12.9716, longitude = 77.5946) => {
    try {
      const response = await fetch('https://api.astrosight.co/panchanga/panchanga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: format(date, 'yyyy-MM-dd'),
          latitude,
          longitude,
          timezone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching panchanga data:', errorData);
        setPanchangaData(null);
      } else {
        const data = await response.json();
        setPanchangaData(data);
      }
    } catch (error) {
      console.error('Network error fetching panchanga data:', error);
      setPanchangaData(null);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchPanchangaData();
    }
  }, [date, isLoaded]);

  const handlePlaceSelect = async () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      const cityComponent = place.address_components?.find((component) =>
        component.types.includes('locality')
      );
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      const city = cityComponent?.long_name || place.formatted_address || 'Unknown Location';
      setPlace(city);

      try {
        const response = await fetch(
          `/api/timezone/timezone?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();
        if (response.ok) {
          fetchPanchangaData(data.timezone, latitude, longitude);
        } else {
          console.error('Error fetching timezone:', data.error);
          fetchPanchangaData(5.5, latitude, longitude); // Fallback
        }
      } catch (error) {
        console.error('Error fetching timezone:', error);
        fetchPanchangaData(5.5, latitude, longitude); // Fallback
      }
    }
  };

  const handlePrevDay = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  const handleNextDay = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  const handleToday = () => {
    setDate(new Date());
  };

  if (!isLoaded || !panchangaData) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="mb-6">
      
      <div className="text-center mb-6">
            <div className="flex items-start p-auto justify-center md:gap-[18px] gap-[9px]">
      
      {/* Left pattern image */}
      <Image
        alt="Heading pattern"
        src="/hed.png"
        width={250}
        height={250}
        loading="lazy"
        decoding="async"
        className="md:w-10 w-[40px] md:h-[40px] h-[30px] -rotate-90"
        style={{ color: 'transparent' }}
      />
      
      {/* Heading text */}
      <h2 className="text-2xl font-bold font-kohinoor lg:text-[36px] text-center mb-5">
        Today&apos;s <span className="text-[#cf4526] font-kohinoor">Panchang</span>
      </h2>

      {/* Right pattern image rotated 180 degrees */}
      <Image
        alt="Heading pattern"
        src="/hed.png"
        width={250}
        height={250}
        loading="lazy"
        decoding="async"
        className="md:w-10 w-[40px] md:h-[40px] h-[30px] rotate-90"
        style={{ color: 'transparent' }}
      />
    </div>

      </div>
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className="flex-1">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <Input
              type="text"
              placeholder="Enter place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="bg-white border-[#FF9933] text-gray-700 text-sm h-10 w-full"
            />
          </Autocomplete>
        </div>
        <div className="gap-2 flex items-center">
          <Input
            type="date"
            value={format(date, 'yyyy-MM-dd')}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="bg-white border-[#FF9933] text-gray-700 h-10 w-full appearance-none  text-sm rounded-lg"
          />

        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Button
          onClick={handlePrevDay}
          variant="outline"
          className="bg-[#FFE5CC] hover:bg-[#FF9933] text-gray-700 hover:text-gray-100 rounded-md h-10 px-4 flex items-center justify-center"
        >
          Yestarday          </Button>
        <Button
          onClick={handleToday}
          variant="outline"
          className="bg-[#FFE5CC] hover:bg-[#FF9933] text-gray-700 hover:text-gray-100 rounded-md h-10 px-4 flex items-center justify-center"
        >
          Today
        </Button>
        <Button
          onClick={handleNextDay}
          variant="outline"
          className="bg-[#FFE5CC] hover:bg-[#FF9933] hover:text-gray-100 text-gray-700  rounded-md h-10 px-4 flex items-center justify-center"
        >
          Tomorrow          </Button>
      </div>
      <Link
        href="/panchanga"
        data-readdy="true"
      >
        <Card className="bg-white p-5 rounded-xl shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-3  gap-1">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <Calendar className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Day</p>
                <p className="text-sm font-medium">{panchangaData.weekday || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <Moon className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Thithi</p>
                <p className="text-sm font-medium">{panchangaData.tithi || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <Star className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nakshatra</p>
                <p className="text-sm font-medium">{panchangaData.nakshatra_1 || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <Sunrise className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sunrise</p>
                <p className="text-sm font-medium">{panchangaData.sunrise || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <Sunset className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sunset</p>
                <p className="text-sm font-medium">{panchangaData.sunset || 'N/A'}</p>
              </div>
            </div>              <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <Circle className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Yoga</p>
                <p className="text-sm font-medium">{panchangaData.yoga_1 || 'N/A'}</p>
              </div>
            </div>              <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <SquareAsterisk className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Karana</p>
                <p className="text-sm font-medium">{panchangaData.karana_1 || 'N/A'}</p>
              </div>
            </div>              <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
                <Calendar className="h-4 w-4 text-[#FF9933]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Purnimanta Month</p>
                <p className="text-sm font-medium">{panchangaData.purnimanta_month|| 'N/A'}</p>
              </div>

            </div>
            <div className="flex items-center">
  <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3 flex-shrink-0">
    <Calendar className="h-4 w-4 text-[#FF9933]" />
  </div>
  <div>
    <p className="text-sm text-gray-500">Amanta Month</p>
    <p className="text-sm font-medium">{panchangaData.amanta_month || 'N/A'}</p>
  </div>
</div>

          </div>
        </Card>
      </Link>
    </div>
  );
};

export default TodaysPanchang;
