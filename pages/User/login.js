'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { requestOtp, verifyOtp, createProfile,fetchHoroscope,uploadFile } from '../../services/centralApi';

const libraries = ['places'];

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  console.log('Country Code:', countryCode);
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDateOfBirth] = useState('');
  const [birthTime, setTimeOfBirth] = useState({ hour: '', minute: '' });
  const [birthTimePeriod, setBirthTimePeriod] = useState('');
  const [showExactTime, setShowExactTime] = useState(true);
  const [birthPlace, setPlaceOfBirth] = useState('');
  const [placeLat, setPlaceLat] = useState(null);
  const [placeLng, setPlaceLng] = useState(null);
  const [chartType, setChartType] = useState('north');
  const [timezone, setTimezone] = useState('');
  const [step, setStep] = useState('phone');
  const [profileSubStep, setProfileSubStep] = useState(1);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // Store file or base64
  const [profileImageUrl, setProfileImageUrl] = useState(null); // Server-uploaded URL
  const [language, setLanguage] = useState('English');
  const inputRefs = useRef([]);
  const autocompleteRef = useRef(null);
  const router = useRouter();

  const redirectTo = router.query.redirect || '/user/dashboard';
  const totalProfileSteps = 20;
  const progress = (profileSubStep / totalProfileSteps) * 100;
  console.log(progress)

  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDxEVirHNpI2wclTjIe5k6yIvGPToy59jw',
    libraries,
  });

  // OTP countdown timer
  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, step]);

  // Initialize countdown when switching to OTP step
  useEffect(() => {
    if (step === 'otp') {
      setCountdown(30);
    }
  }, [step]);

  // Show error if Google Maps API fails to load
  useEffect(() => {
    if (loadError) {
      setError('Failed to load location services. Please enter the place manually.');
    }
  }, [loadError]);

  const handlePlaceSelect = async () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const city = place.address_components?.find(c => c.types.includes('locality'))?.long_name || place.formatted_address;
      const southStates = ['Karnataka', 'Tamil Nadu', 'Kerala', 'Telangana'];
      const selectedChartType = southStates.some(state =>
        place.formatted_address.toLowerCase().includes(state.toLowerCase())
      ) ? 'south' : 'north';

      setPlaceOfBirth(city);
      setPlaceLat(lat);
      setPlaceLng(lng);
      setChartType(selectedChartType);
      setErrors((prev) => ({ ...prev, birthPlace: '' }));

      try {
        const tzRes = await fetch(`/api/timezone/timezone?latitude=${lat}&longitude=${lng}`);
        if (!tzRes.ok) throw new Error('Failed to fetch timezone');
        const tzData = await tzRes.json();
        setTimezone(tzData.timezone);
      } catch (err) {
        console.error('Timezone fetch error', err);
        setError('Unable to fetch timezone. Please proceed, but timezone may be inaccurate.');
        setTimezone('');
      }
    } else {
      setPlaceOfBirth('');
      setPlaceLat(null);
      setPlaceLng(null);
      setChartType('north');
      setTimezone('');
      setErrors((prev) => ({
        ...prev,
        birthPlace: place ? 'Selected place has no coordinates. Please choose another.' : 'Please select a valid place from the suggestions.',
      }));
    }
  };
const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: 'Please upload a JPEG or PNG image.' }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setErrors((prev) => ({ ...prev, image: 'Image size must be less than 2MB.' }));
      return;
    }

    // Create local preview
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);

    // Prepare FormData for upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadFile(formData);
      if (response.url) {
        setProfileImageUrl(response.url); // Store server URL
        setErrors((prev) => ({ ...prev, image: '' }));
      } else {
        throw new Error('No URL returned from upload');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setError('Failed to upload image. Please try again.');
      setProfileImage(null); // Reset preview on failure
      URL.revokeObjectURL(previewUrl); // Clean up
    }
  };
  const validateSubStep = () => {
    const formErrors = {};
    if (profileSubStep === 1 && !name.trim()) {
      formErrors.name = 'Name is required.';
    }
    if (profileSubStep === 2 && !gender) {
      formErrors.gender = 'Please select gender.';
    }
    if (profileSubStep === 3 && !dob) {
      formErrors.dob = 'Date of birth is required.';
    }
    if (profileSubStep === 4) {
      if (showExactTime && (!birthTime.hour || !birthTime.minute)) {
        formErrors.birthTime = 'Please select hour and minute.';
      } else if (!showExactTime && !birthTimePeriod) {
        formErrors.birthTime = 'Please select a time period.';
      }
    }
    if (profileSubStep === 5) {
      if (!birthPlace.trim()) {
        formErrors.birthPlace = 'Place of birth is required.';
      } else if (placeLat === null || placeLng === null) {
        formErrors.birthPlace = 'Please select a valid place from the suggestions.';
      }
    }
    if (profileSubStep === 6) {
      if (!language) {
        formErrors.language = 'Please select a language.';
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }
    setError('');
    setErrors({});
    setLoading(true);

    try {
      const result = await requestOtp({ phone: Number(phone) });

      if (!result.success) {
        setError(result.message || 'Failed to send OTP');
        setLoading(false);
        return;
      }

      setStep('otp');
    } catch (err) {
      console.error('OTP request error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getToken = () => Cookies.get("token");

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.join('').length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }
    setError('');
    setErrors({});
    setLoading(true);

    try {
      const result = await verifyOtp({ phone: Number(phone), otp: otp.join('') });
      console.log('OTP verification result:', result);

      if (!result.success) {
        setError(result.message || 'Invalid OTP');
        setLoading(false);
        return;
      }

      // Validate response data
      if (!result.data || !result.data.token) {
        setError('Invalid response: Token is missing');
        setLoading(false);
        return;
      }

      // Set cookies
      Cookies.set('token', result.data.token, { expires: 7, path: '/' });
      Cookies.set('user', JSON.stringify({ name: result.data.name || '', role: result.data.role || '' }), { expires: 7, path: '/' });
      console.log('Token after setting:', getToken());
      console.log('User cookie after setting:', Cookies.get('user'));

      if (!result.meta.birthPlace) {
        console.log('No name provided, moving to profile step');
        setStep('profile');
        getToken()
        setProfileSubStep(1);
      } else {
        console.log('Name provided, redirecting to:', redirectTo);
        router.push(redirectTo);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileContinue = () => {
    if (!validateSubStep()) return;
console.log(getToken())
    if (profileSubStep < totalProfileSteps) {
      setProfileSubStep(profileSubStep + 1);
      setErrors({});
    } else {
      handleProfileSubmit();
    }
  };

  const handleProfilePrevious = () => {
    if (profileSubStep > 1) {
      setProfileSubStep(profileSubStep - 1);
      setErrors({});
    } else {
      setStep('otp');
      setErrors({});
    }
  };

  const handleProfileSubmit = async () => {
    setLoading(true);
    try {
      const profilePayload = {
        name,
        phone: Number(phone),
        gender,
        dob,
        birthTime: showExactTime ? `${birthTime.hour}:${birthTime.minute}` : birthTimePeriod,
        birthPlace,
        placeLat,
        placeLng,
        chart: chartType,
        language,
        image: profileImageUrl || null,
        timezone,
      };
      const profileResponse = await createProfile(profilePayload);
await fetchHoroscope()
      if (!profileResponse.success) {
        setError(profileResponse.message || 'Failed to create profile');
        setLoading(false);
        return;
      }

      // Cookies.set('token', profileResponse.data.token, { expires: 7, path: '/' });
      // Cookies.set('user', JSON.stringify(profileResponse.data), { expires: 7, path: '/' });
      router.push(redirectTo);
    } catch (err) {
      console.error('Profile creation error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown === 0 && !isResending) {
      setIsResending(true);
      setError('');
      try {
        const result = await requestOtp({ phone: Number(phone) });
        if (!result.success) {
          setError(result.message || 'Failed to resend OTP');
        } else {
          setCountdown(30);
          setOtp(Array(4).fill(''));
          inputRefs.current[0]?.focus();
        }
      } catch (err) {
        console.error('Resend OTP error:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsResending(false);
      }
    }
  };

  // Form animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const maleIconUrl =
    'https://readdy.ai/api/search-image?query=3D%20cartoon%20Indian%20male%20avatar%2C%20traditional%20Indian%20features%2C%20warm%20skin%20tone%2C%20black%20hair%2C%20wearing%20modern%20Indian%20attire%2C%20friendly%20smiling%20expression%2C%20smooth%20rounded%20shapes%2C%20soft%20lighting%2C%20centered%20composition%2C%20isolated%20on%20light%20background%2C%20playful%20aesthetic%2C%20high%20detail%20quality%2C%20clean%20look%2C%20professional%203D%20rendering&width=120&height=120&seq=5&orientation=squarish';
  const femaleIconUrl =
    'https://readdy.ai/api/search-image?query=3D%20cartoon%20Indian%20female%20avatar%2C%20traditional%20Indian%20features%2C%20warm%20skin%20tone%2C%20long%20black%20hair%2C%20bindi%2C%20wearing%20modern%20Indian%20attire%2C%20friendly%20smiling%20expression%2C%20smooth%20rounded%20shapes%2C%20soft%20lighting%2C%20centered%20composition%2C%20isolated%20on%20light%20background%2C%20playful%20aesthetic%2C%20high%20detail%20quality%2C%20clean%20look%2C%20professional%203D%20rendering&width=120&height=120&seq=6&orientation=squarish';
  const dobBackgroundUrl =
    'https://readdy.ai/api/search-image?query=Abstract%20minimalist%20celestial%20background%20with%20subtle%20star%20patterns%20and%20gentle%20cosmic%20elements%2C%20soft%20gradient%20in%20warm%20peach%20tones%2C%20ethereal%20and%20mystical%20atmosphere%2C%20perfect%20for%20astrology%20app%2C%20elegant%20and%20calming%20design%2C%20professional%20quality%20illustration&width=375&height=400&seq=bg001&orientation=portrait';
  const birthPlaceBackgroundUrl =
    'https://readdy.ai/api/search-image?query=Celestial%20sky%20with%20subtle%20stars%20and%20planets%2C%20mystical%20cosmic%20pattern%2C%20soft%20pastel%20colors%20with%20beige%20and%20cream%20tones%2C%20ethereal%20and%20dreamy%20atmosphere%2C%20minimalist%20design%2C%20perfect%20for%20astrology%20app%20background%2C%20spiritual%20and%20calming%20aesthetic%2C%20subtle%20sacred%20geometry%20elements&width=375&height=762&seq=bg001&orientation=portrait';

  const renderProfileSubStep = () => {
    if (profileSubStep === 1) {
      return (
        <div className="">
          <div className="">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step 1 of 5</span>
              <span className="text-sm font-medium">20%</span>
            </div>
            <div className="w-full h-2 bg-[#FFE5CC] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF9933] rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
          <Card className="border-none shadow-sm rounded-[20px] ">
            <CardContent className="pt-4 pb-6 px-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-medium mb-2">Your good name?</h2>
                <p className="text-gray-500 text-sm">So I can greet you like an old friend.</p>
              </div>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="e.g. Raj Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent mb-4"
                />
                {errors.name && <p className="text-red-600 text-sm text-center">{errors.name}</p>}
                <Button
                  onClick={handleProfileContinue}
                  className={`w-full py-6 flex items-center justify-center space-x-2 !rounded-xl transition-colors ${
                    name.trim() ? 'bg-[#FF9933] hover:bg-[#FF9933]/90' : 'bg-[#FFE5CC]'
                  }`}
                  disabled={!name.trim()}
                >
                  <span className={name.trim() ? 'text-white' : 'text-black'}>Continue</span>
                  <i className={`fas fa-arrow-right ${name.trim() ? 'text-white' : 'text-black'}`}></i>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (profileSubStep === 2) {
      return (
        <div className="">
          <div className="">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step 2 of 5</span>
              <span>40%</span>
            </div>
            <div className="w-full h-2 bg-[#FFE5CC] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF9933]" style={{ width: '40%' }}></div>
            </div>
          </div>
          <Card className="w-full  shadow-sm">
            <CardContent className="pt-2 pb-1">
              <div className="text-center pb-2">
                <h2 className="text-2xl font-bold">Select Your Gender</h2>
                <p className="text-gray-600 mt-2">Different planetary alignments influence each gender uniquely.</p>
              </div>
              <RadioGroup
                value={gender}
                onValueChange={setGender}
                className="flex justify-center space-x-12 mt-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-[#FFE5CC] flex items-center justify-center mb-3 overflow-hidden">
                    <img src={maleIconUrl} alt="Male" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="cursor-pointer" />
                    <Label htmlFor="male" className="cursor-pointer">Male</Label>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-[#FFE5CC] flex items-center justify-center mb-3 overflow-hidden">
                    <img src={femaleIconUrl} alt="Female" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="cursor-pointer" />
                    <Label htmlFor="female" className="cursor-pointer">Female</Label>
                  </div>
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-red-600 text-sm text-center mt-4">{errors.gender}</p>}
            </CardContent>
            <div className="px-4 pb-4">
              <Button
                onClick={handleProfileContinue}
                className={`w-full py-3 !rounded-button ${
                  gender ? 'bg-[#FF9933] hover:bg-[#FF8000] text-gray-800' : 'bg-[#FFE5CC] text-gray-400 cursor-not-allowed'
                }`}
                disabled={!gender}
              >
                <span className="flex-1 text-center">Continue</span>
                <i className="fas fa-arrow-right"></i>
              </Button>
            </div>
          </Card>
          <div className="mt-4 text-center">
            <Button
              onClick={handleProfilePrevious}
              variant="ghost"
              className="text-[#FF9933] text-sm font-medium cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </Button>
          </div>
        </div>
      );
    }
    if (profileSubStep === 3) {
      return (
        <div className="">
          <div className="">
            <div className="flex justify-between items-center mb-">
              <span className="text-sm text-[#333333]">Step 3 of 5</span>
              <span className="text-sm text-[#333333]">60%</span>
            </div>
            <div className="h-2 bg-[#FFE5CC] rounded-full">
              <div className="h-full bg-[#FF9933] rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <Card className="w-full bg-white shadow-md rounded-xl ">
            <CardContent className="">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-[#333333] mb-2">Pick your exact birth date</h1>
                <p className="text-sm text-[#666666]">This is crucial for calculating your birth chart.</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="birthdate" className="block text-sm font-medium text-[#333333]">
                    Date of birth
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <Input
                      id="birthdate"
                      type="date"
                      
                      value={dob}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="pl-16 h-12 border-gray-200 rounded-md focus:ring-[#FF9933] focus:border-[#FF9933] w-full"
                    />
                  </div>
                  {errors.dob && <p className="text-red-600 text-sm text-center">{errors.dob}</p>}
                </div>
                <Button
                  onClick={handleProfileContinue}
                  className={`w-full h-12 ${dob ? 'bg-[#FF9933] hover:bg-[#FF9933]/90' : 'bg-[#FFE5CC]'} text-white rounded-md flex items-center justify-center cursor-pointer !rounded-button`}
                  disabled={!dob}
                >
                  <span className="mr-2">Continue</span>
                  <i className="fas fa-arrow-right"></i>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 text-center">
            <Button
              onClick={handleProfilePrevious}
              variant="ghost"
              className="text-[#FF9933] text-sm font-medium cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 -z-10 overflow-hidden">
            <img
              src={dobBackgroundUrl}
              alt="Celestial background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        </div>
      );
    }
    if (profileSubStep === 4) {
      const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
      const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
      return (
        <div className="">
          <div className="">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700">Step 4 of 5</span>
              <span className="text-sm text-gray-700">80%</span>
            </div>
            <div className="w-full h-2 bg-[#FFE5CC] rounded-full">
              <div className="h-full bg-[#FF9933] rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <Card className="w-full bg-white rounded-xl p-2 shadow-sm">
    
            <div className="text-center ">
              <h1 className="text-2xl font-semibold  mb-3">Enter your birth time</h1>
              <p className="text-gray-600 text-[11px] mb-2 px-6">
                Accurate birth time provides the most precise astrological insights for your chart.
              </p>
            </div>
         
            {showExactTime ? (
              <>
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-center text-gray-700">Hour</label>
                      <Select
                        value={birthTime.hour || ''}
                        onValueChange={(value) => setTimeOfBirth({ ...birthTime, hour: value })}
                      >
                        <SelectTrigger className="w-full border rounded-md h-12">
                          <div className="flex items-center">
                            <i className="fas fa-clock text-gray-400 mr-2"></i>
                            <SelectValue placeholder="HH" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {hours.map((h) => (
                            <SelectItem key={h} value={h}>
                              {h}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-center text-gray-700">Minute</label>
                      <Select
                        value={birthTime.minute || ''}
                        onValueChange={(value) => setTimeOfBirth({ ...birthTime, minute: value })}
                      >
                        <SelectTrigger className="w-full border rounded-md h-12">
                          <div className="flex items-center">
                            <i className="fas fa-clock text-gray-400 mr-2"></i>
                            <SelectValue placeholder="MM" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {minutes.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {errors.birthTime && <p className="text-red-600 text-sm text-center mt-4">{errors.birthTime}</p>}
                </div>
                <div className="text-center mb-6">
                  <button
                    className="text-[#FF9933] text-sm font-medium cursor-pointer border border-[#FF9933] py-2 px-6 !rounded-button hover:bg-transparent"
                    onClick={() => setShowExactTime(false)}
                  >
                    I don&apos;t know my birth time
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-4">
                    If you don&apos;t know your exact birth time, select from below:
                  </p>
                  <RadioGroup
                    value={birthTimePeriod}
                    onValueChange={setBirthTimePeriod}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="border rounded-md p-4 cursor-pointer hover:border-[#FF9933]">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="morning" id="morning" className="mt-1" />
                        <Label htmlFor="morning" className="cursor-pointer">
                          <div className="font-medium">Morning (6AM - 12PM)</div>
                        </Label>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer hover:border-[#FF9933]">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="noon" id="noon" className="mt-1" />
                        <Label htmlFor="noon" className="cursor-pointer">
                          <div className="font-medium">Noon (12PM - 4PM)</div>
                        </Label>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer hover:border-[#FF9933]">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="evening" id="evening" className="mt-1" />
                        <Label htmlFor="evening" className="cursor-pointer">
                          <div className="font-medium">Evening (4PM - 8PM)</div>
                        </Label>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer hover:border-[#FF9933]">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="night" id="night" className="mt-1" />
                        <Label htmlFor="night" className="cursor-pointer">
                          <div className="font-medium">Night (8PM - 6AM)</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {errors.birthTime && <p className="text-red-600 text-sm text-center mt-4">{errors.birthTime}</p>}
                </div>
                <div className="text-center mb-6">
                  <button
                    className="text-[#FF9933] text-sm font-medium cursor-pointer border border-[#FF9933] py-2 px-6 !rounded-button hover:bg-transparent"
                    onClick={() => setShowExactTime(true)}
                  >
                    I know my exact birth time
                  </button>
                  
                </div>
              </>
            )}
            <Button
              onClick={handleProfileContinue}
              className={`w-full h-12 flex items-center justify-center text-white !rounded-button ${
                (showExactTime ? birthTime.hour && birthTime.minute : birthTimePeriod)
                  ? 'bg-[#FF9933] hover:bg-[#FF9933]/90'
                  : 'bg-[#FFCC99]'
              }`}
              disabled={showExactTime ? !birthTime.hour || !birthTime.minute : !birthTimePeriod}
            >
              <span className="mr-2">Continue</span>
              <i className="fas fa-arrow-right"></i>
            </Button>
          </Card>
     <div className="mt-4 text-center">
            <Button
              onClick={handleProfilePrevious}
              variant="ghost"
              className="text-[#FF9933] text-sm font-medium cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </Button>
          </div>
        </div>
      );
    }
   if (profileSubStep === 5) {
      return (
        <div className="">
          <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
            <span>Step 5 of 6</span>
            <span>83%</span>
          </div>
          <div className="h-2 bg-[#FFE5CC] rounded-full ">
            <div className="h-full bg-[#FF9933] rounded-full" style={{ width: '83%' }}></div>
          </div>
          <Card className="p-6 shadow-md rounded-xl bg-white">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-3">Where were you born?</h1>
              <p className="text-gray-600">This helps us calculate your exact ascendant and planetary houses.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="birthCity" className="block text-sm font-medium text-gray-700 mb-2">
                City / Town
              </label>
              <div className="relative">
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                    onPlaceChanged={handlePlaceSelect}
                    restrictions={{ types: ['(cities)'] }}
                  >
                    <Input
                      id="birthCity"
                      type="text"
                      placeholder="Start typing..."
                      value={birthPlace}
                      onChange={(e) => {
                        setPlaceOfBirth(e.target.value);
                        if (!e.target.value) {
                          setPlaceLat(null);
                          setPlaceLng(null);
                          setChartType('north');
                          setTimezone('');
                          setErrors((prev) => ({ ...prev, birthPlace: '' }));
                        }
                      }}
                      className="w-full pl-3 pr-10 py-2 border-none shadow-sm focus:ring-2 focus:ring-[#FFD8B1] text-sm"
                    />
                  </Autocomplete>
                ) : (
                  <Input
                    id="birthCity"
                    type="text"
                    placeholder="Loading location services..."
                    value={birthPlace}
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border-none shadow-sm focus:ring-2 focus:ring-[#FFD8B1] text-sm"
                    disabled
                  />
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <i className="fas fa-map-marker-alt text-gray-400"></i>
                </div>
              </div>
              {errors.birthPlace && <p className="text-red-600 text-sm text-center mt-2">{errors.birthPlace}</p>}
       
            </div>
            <Button
              onClick={handleProfileContinue}
              className={`w-full py-3 ${birthPlace && placeLat !== null && placeLng !== null ? 'bg-[#FF9933] hover:bg-[#FF9933]/90' : 'bg-[#FFE5CC]'} text-white font-medium rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 !rounded-button`}
              disabled={!birthPlace || placeLat === null || placeLng === null}
            >
              Continue
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Card>
          <div className="mt-4 text-center">
            <Button
              onClick={handleProfilePrevious}
              variant="ghost"
              className="text-[#FF9933] text-sm font-medium cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </Button>
          </div>
          <div className="fixed inset-0 z-[-1] opacity-10">
            <img
              src={birthPlaceBackgroundUrl}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }
    if (profileSubStep === 6) {
      return (
        <div className="w-full max-w-md mx-auto relative">
          <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
            <span>Step 6 of 6</span>
            <span>100%</span>
          </div>
          <div className="h-2 bg-[#FFE5CC] rounded-full mb-6">
            <div className="h-full bg-[#FF9933] rounded-full" style={{ width: '100%' }}></div>
          </div>
          <Card className="p-6 shadow-md rounded-xl bg-white">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-3">Personalize Your Profile</h1>
              <p className="text-gray-600">Add a profile image and select your preferred language.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image (Optional)
              </label>
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full bg-[#FFE5CC] flex items-center justify-center mb-3 overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <i className="fas fa-user text-[#FF9933] text-2xl"></i>
                  )}
                </div>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('profileImage').click()}
                  variant="outline"
                  className="border-[#FF9933] text-[#FF9933] hover:bg-[#FFE5CC] !rounded-button"
                >
                  {profileImage ? 'Change Image' : 'Upload Image'}
                </Button>
              </div>
              {errors.image && <p className="text-red-600 text-sm text-center mt-2">{errors.image}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full border rounded-md h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Kannada">Kannada</SelectItem>
                </SelectContent>
              </Select>
              {errors.language && <p className="text-red-600 text-sm text-center mt-2">{errors.language}</p>}
            </div>
            <Button
              onClick={handleProfileSubmit}
              className={`w-full py-3 ${language ? 'bg-[#FF9933] hover:bg-[#FF9933]/90' : 'bg-[#FFE5CC]'} text-white font-medium rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 !rounded-button`}
              disabled={!language || loading}
            >
              Submit
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Card>
          <div className="mt-4 text-center">
            <Button
              onClick={handleProfilePrevious}
              variant="ghost"
              className="text-[#FF9933] text-sm font-medium cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </Button>
          </div>
          <div className="fixed inset-0 z-[-1] opacity-10">
            <img
              src={birthPlaceBackgroundUrl}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`flex flex-col items-center min-h-screen ${step === 'phone' ? 'bg-[#FFF6E9]' : 'bg-[#fff5e6]'} p-4 ${step === 'phone' ? 'pt-12 pb-20' : 'pt-16'}`}>
      <div className="w-full max-w-md flex flex-col items-center">
        {step === 'phone' && (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 mb-4">
                <img
                  src="https://static.readdy.ai/image/e1ad140f06e9f805aceb1cb99df5419f/3e144224aee4bafeca7c3cd737f3085e.png"
                  alt="Zodiac Circle"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-[#FF9D42] mb-1">astrosight</h1>
              <p className="text-[#5A6B87] text-sm">Your Trusted Personal Jyotishi</p>
            </div>
            <Card className="w-full p-4 shadow-md mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFEBD6] flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-star text-[#FF9D42]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#FF9D42] mb-1">Daily Personalized Predictions</h3>
                  <p className="text-sm text-[#5A6B87]">Get AI-powered cosmic insights tailored just for you</p>
                </div>
              </div>
            </Card>
          </>
        )}
        <Card className="w-full p-6 mb-6 shadow-md rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={`${step}-${profileSubStep}`} variants={formVariants} initial="hidden" animate="visible" exit="exit">
              {step === 'phone' ? (
                <>
                  <h2 className="text-2xl font-semibold text-center mb-6">Namaste</h2>
                  {error && <p className="text-center text-red-600 mb-4">{error}</p>}
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-[#5A6B87] mb-2">Phone Number</label>
                    <div className="flex gap-2">
                      <Select defaultValue="+91" onValueChange={setCountryCode}>
                        <SelectTrigger className="w-24 border !rounded-button">
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                          <SelectItem value="+61">+61</SelectItem>
                          <SelectItem value="+86">+86</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="flex-1 border !rounded-button"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handlePhoneSubmit}
                    className={`w-full py-2 !rounded-button ${phone.length === 10 ? 'bg-[#FF9933]' : 'bg-[#FFE5CC]'} text-white ${phone.length === 10 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    disabled={loading || phone.length !== 10}
                  >
                    {loading ? 'Sending OTP...' : 'Continue'}
                  </Button>
                </>
              ) : step === 'otp' ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Verify Your Phone Number</h1>
                    <p className="text-sm text-gray-600 mt-2">
                      We have sent an OTP to <span className="text-[#FF9D42] font-bold">+91 {phone}</span>
                    </p>
                  </div>
                  {error && <p className="text-center text-red-600 mb-4">{error}</p>}
                  <div className="flex justify-between gap-3 mb-6">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="w-full">
                        <input
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength={1}
                          className="w-full aspect-square text-center text-xl font-medium border border-gray-300 rounded-lg focus:border-[#FFA07A] focus:ring-1 focus:ring-[#FFA07A] focus:outline-none"
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          autoComplete="one-time-code"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <Button
                      onClick={handleOtpSubmit}
                      className="w-full py-6 bg-[#FF8000] hover:bg-[#FFA766] text-white font-medium rounded-lg !rounded-button cursor-pointer"
                      disabled={loading || otp.join('').length !== 4}
                    >
                      {loading ? 'Verifying OTP...' : 'Verify'}
                    </Button>
                    <Button
                      onClick={handleResendOtp}
                      variant="ghost"
                      className={`w-full py-6 font-medium rounded-lg !rounded-button ${
                        countdown > 0 || isResending
                          ? 'bg-[#FF8000] text-gray-500 cursor-not-allowed'
                          : 'bg-[#FF9933] hover:bg-[#FF8000] text-white'
                      }`}
                      disabled={countdown > 0 || isResending}
                    >
                      {isResending ? 'Sending...' : countdown > 0 ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                    </Button>
                  </div>
                </>
              ) : (
                renderProfileSubStep()
              )}
            </motion.div>
          </AnimatePresence>
        </Card>
        <div className="text-center text-sm text-[#8A9AAC]">
          By continuing, you agree to our{' '}
          <Link href="#" className="text-[#FF9966] hover:underline">
            Terms
          </Link>{' '}
          &{' '}
          <Link href="#" className="text-[#FF9966] hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}