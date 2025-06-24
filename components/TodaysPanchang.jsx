
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

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
      const response = await fetch('https://uoi9zyf3bh.execute-api.ap-south-1.amazonaws.com/Prod/panchanga', {
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
      <h2 className="text-black text-xl font-semibold mb-3">Today&apos;s Panchang</h2>
      <div className="flex  gap-1 flex-row sm:flex-row items-center  sm:space-y-0 sm:space-x-2 mb-4">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <Input
            type="text"
            placeholder="Enter place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-auto  bg-white border-[#FF9933] text-gray-700"
          />
        </Autocomplete>
        <input
          type="date"
          value={format(date, 'yyyy-MM-dd')}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="w-auto rounded-lg  bg-white border-[#FF9933] text-gray-700"
        />
   
      </div>
           <div className="flex items-center justify-center space-x-2 mb-4">
          <Button
            onClick={handlePrevDay}
            variant="outline"
            className="bg-[#FFE5CC] hover:bg-[#FF9933] text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleToday}
            variant="outline"
            className="bg-[#FFE5CC] hover:bg-[#FF9933] text-gray-700"
          >
            Today
          </Button>
          <Button
            onClick={handleNextDay}
            variant="outline"
            className="bg-[#FFE5CC] hover:bg-[#FF9933] text-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      <a
        href="https://readdy.ai/home/ee4c356e-147d-4338-904b-93df931486fa/7008b89f-e01e-4bbf-acee-8df9d06fb650"
        data-readdy="true"
      >
        <Card className="bg-white p-5 rounded-xl shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-calendar-day text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Day</p>
                <p className="text-sm font-medium">{panchangaData.weekday || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-moon text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Thithi</p>
                <p className="text-sm font-medium">{panchangaData.tithi || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-star text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nakshatra</p>
                <p className="text-sm font-medium">{panchangaData.nakshatra_1 || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-sun text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sunrise</p>
                <p className="text-sm font-medium">{panchangaData.sunrise || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-sunset text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sunset</p>
                <p className="text-sm font-medium">{panchangaData.sunset || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-om text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Yoga</p>
                <p className="text-sm font-medium">{panchangaData.yoga_1 || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-dharmachakra text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Karana</p>
                <p className="text-sm font-medium">{panchangaData.karana_1 || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-om text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hindu Month</p>
                <p className="text-sm font-medium">{panchangaData.hindu_month || 'N/A'}</p>
              </div>
            </div>
          </div>
        </Card>
      </a>
    </div>
  );
};

export default TodaysPanchang;
