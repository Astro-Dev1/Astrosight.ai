import React, { useState,useRef, useEffect } from 'react'
import {  ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import Link from 'next/link';
import Image from 'next/image'
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

export default function Panchanga() {
  const [date, setDate] = useState(new Date())
  const [place, setPlace] = useState('Bengaluru, India')
    const autocompleteRef = useRef(null);
  
  const [panchangaData, setPanchangaData] = useState(null)
  // const blurDataURL = '/'
    const libraries = ["places"];
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries,
    });
    console.log(isLoaded)
  const fetchPanchangaData = async (timezone,latitude,longitude) => {
    try {
      const response = await fetch(' https://am8c7vna0d.execute-api.ap-south-1.amazonaws.com/prod/panchanga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: format(date, 'yyyy-MM-dd'),  // Manually test with a fixed date
          latitude: latitude||12.9716,    // Use correct key 'latitude'
          longitude: longitude||77.5946,   // Use correct key 'longitude'
          timezone: timezone||5.5,        // Ensure timezone is correctly passed
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching panchanga data:', errorData);
      } else {
        const data = await response.json();
        setPanchangaData(data);
      }
    } catch (error) {
      console.error('Network error fetching panchanga data:', error);
    }
  };
  useEffect(() => {
    fetchPanchangaData()
  }, [date])



  const handlePrevDay = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)))
  }

  const handleNextDay = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)))
  }

  const handleToday = () => {
    setDate(new Date())
  }

  if (!panchangaData) {
    return <div>Loading...</div>
  }
  const handlePlaceSelect = async() => {
    const place = autocompleteRef.current.getPlace();
    let cityComponent
    if (place && place.formatted_address) {
        if (place && place.address_components) {
             cityComponent = place.address_components.find((component) =>
              component.types.includes("locality"))
        }
        // console.log(cityComponent.short_name)
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      try {
        const response = await fetch(
          `/api/timezone/timezone?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();
        const city = cityComponent?.long_name || place.formatted_address || "Unknown Location";
        setPlace(city)
        if (response.ok) {
        
          fetchPanchangaData(data.timezone,latitude,longitude)
          console.log(data.timezone,latitude,longitude)
        } else {
          console.error("Error fetching timezone:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
  
    }
  };
  return (

    <div className="max-w-4xl mt-7 mx-auto pt-2 bg-orange-50">
      {/* Header */}

      <div className="flex justify-between items-center bg-gradient-to-r from-orange-300 to-orange-500 bg-orange-200 p-4 rounded-t-lg shadow-lg">
        <div className="flex items-center space-x-2">
          {/* <img src="/navami.png?height=80&width=80" alt="Moon phase" className="w-20 h-20 rounded-full" /> */}
          <Image
            src={`/panchanga/${panchangaData.paksha.split(' ')[0].toLowerCase()}_${panchangaData.tithi.toLowerCase()}.jpg`}
            alt="Moon phase"
            width={200}
            height={300}
            className="w-20 h-20 rounded-full"
          />

          <div>
            <div className='month'>
              <h2 className="text-3xl font-bold text-orange-800 mb-2">{panchangaData.hindu_month}</h2>
            </div>
            <div className='thithi'>
              <p className="text-xl font-bold text-orange-700 mb-2">{panchangaData.paksha}, {panchangaData.tithi}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-orange-200 mb-2">{format(date, 'd')}</h2>
          <p className="text-xl font-bold text-orange-200 mb-2">{format(date, 'MMMM yyyy')}</p>
          <p className="text-lg font-bold text-orange-200 mb-2">{format(date, 'EEEE')}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-0">

      <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={handlePlaceSelect}
              >
          <Input
            type="text"
            placeholder="Enter place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-64 bg-white border-orange-300"
          />
                    </Autocomplete>


            <input
              type="date"
              value={format(date, 'yyyy-MM-dd')}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="border rounded-md p-2 w-[240px] bg-white border-orange-300 text-orange-700"
            />
          </div>

      {/* Date and Place Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-orange-100 p-4 rounded-b-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-0">
      
        </div>

        <div className="flex flex-row flex-wrap justify-between space-x-2 sm:flex-nowrap sm:space-y-0 mb-4 sm:mb-0 w-full">
          <Button onClick={handlePrevDay} variant="outline" className="flex-1 bg-orange-200 hover:bg-orange-300 mb-2 sm:mb-0">
            <ChevronLeft className="h-4 w-4" />
            Prev Day
          </Button>
          <Button onClick={handleToday} variant="outline" className="flex-1 bg-orange-200 hover:bg-orange-300 mb-2 sm:mb-0">
            Today
          </Button>
          <Button onClick={handleNextDay} variant="outline" className="flex-1 bg-orange-200 hover:bg-orange-300 mb-2 sm:mb-0">
            Next Day
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

      </div>

      {/* Sunrise and Moonrise */}
      <div className="pt-4 mt-4 mb-4 text-justify bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg">
        <h3 className="pl-5 text-xl font-semibold text-orange-600 mb-2 ">Sunrise and Moonrise</h3>
        <div className="grid grid-cols-2 gap-4 bg-orange-200 bg-opacity-50 backdrop-blur-lg p-4 rounded-b-lg shadow-lg">
          <div>
            <p className="text-lg text-orange-900 mb-2">Sunrise: {panchangaData.sunrise}</p>
            <p className="text-lg text-orange-900 mb-2">Moonrise: {panchangaData.moonrise}</p>
          </div>
          <div>
            <p className="text-lg text-orange-900 mb-2">Sunset: {panchangaData.sunset}</p>
            <p className="text-lg text-orange-900 mb-2">Moonset: {panchangaData.moonset}</p>
          </div>

        </div>
      </div>
  
      {/* Panchang */}
      <div className="pt-4 mt-4 mb-4 text-justify bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg">
        <h3 className="pl-5 text-xl font-semibold text-orange-600 mb-4">Panchanga</h3>
        <div className=" md:grid-cols-2  grid grid-cols-2 gap-4 bg-orange-200 bg-opacity-50 backdrop-blur-lg p-4 rounded-b-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-orange-700">Tithi:</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.tithi_detail_1}</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.tithi_detail_2}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-orange-700">Yoga:</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.yoga_1}</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.yoga_2}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-orange-700">Weekday:</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.weekday}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-orange-700">Nakshatra:</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.nakshatra_1}</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.nakshatra_2}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-orange-700">Karana:</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.karana_1}</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.karana_2}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-orange-700">Paksha:</p>
              <p className="text-lg text-orange-900 pl-4">{panchangaData.paksha}</p>
            </div>
          </div>
        </div>
      </div>
    
      {/* Auspicious and Inauspicious Timings */}
      <div className="pt-4 mt-4 mb-4 text-justify bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg">
        <h3 className="pl-5 text-xl font-semibold text-orange-600 mb-2">Auspicious Timings</h3>
        <div className="grid grid-cols-2 gap-4 bg-orange-200 bg-opacity-50 backdrop-blur-lg p-4 rounded-b-lg shadow-lg">
          {panchangaData?.auspicious_timings?.length > 0 ? (
            panchangaData.auspicious_timings.map((timing, index) => (
              <p key={index} className="text-lg text-orange-900 mb-2">{timing}</p>
            ))
          ) : (
            <p className="text-lg text-orange-900 mb-2">No auspicious timings available.</p>
          )}
        </div>
      </div>
 
      <div className="pt-4 mt-4 mb-4 text-justify bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg">
        <h3 className="pl-5 text-xl font-semibold text-orange-600 mb-2">Inauspicious Timings</h3>
        <div className="grid grid-cols-2 gap-4 bg-orange-200 bg-opacity-50 backdrop-blur-lg p-4 rounded-b-lg shadow-lg">
          {panchangaData?.inauspicious_timings?.length > 0 ? (
            panchangaData.inauspicious_timings.map((timing, index) => (
              <p key={index} className="text-lg text-orange-900 mb-2">{timing}</p>
            ))
          ) : (
            <p className="text-lg text-orange-900 mb-2">No inauspicious timings available.</p>
          )}
        </div>
      </div>
    </div>
  )
}