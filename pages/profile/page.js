import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchMyProfile, createProfile, uploadFile,fetchHoroscope } from "../../services/centralApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Bell, Globe2, HelpCircle, Mail, Lock } from "lucide-react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
const GOOGLE_MAPS_API_KEY ="AIzaSyDxEVirHNpI2wclTjIe5k6yIvGPToy59jw"|| "";

const ProfilePage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [astroProfile, setAstroProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [chartType, setChartType] = useState("north");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState(null); // Added for error handling

  const router = useRouter();
  const autocompleteRef = useRef(null);

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await fetchMyProfile();
        setAstroProfile(result?.data?.astroProfile || {});
        setUserProfile(result?.data?.userProfile || {});
        setError(null);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again.");
      }
    };
    loadProfile();
  }, []); // Explicit empty dependency array

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl); // Local preview

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData);
      if (response.url) {
        const updatedProfile = { ...userProfile, image: response.url };
        setUserProfile(updatedProfile);
        setProfileImage(response.url);
        await createProfile(updatedProfile); // Save immediately
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const payload = { ...astroProfile };
      await createProfile(payload);
      await fetchHoroscope()
      setEditMode(false);
      setError(null);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile. Please try again.");
    }
  };

  // Loading and error states
  if (!isLoaded) {
    return <div className="text-center mt-10">Loading Google Maps...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!astroProfile || !userProfile) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (<>
        <Header />

    <div className="flex flex-col lg:w-full min-h-screen bg-[#FFF2E2] w-[375px] mx-auto relative pb-16 font-poppins">

      <div className="mt-16 px-4 py-6 flex flex-col gap-6">
        {/* Profile Info */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-[#FF9966]">
              <AvatarImage src={userProfile.image || profileImage || "/default-avatar.png"} alt="Profile" />
              <AvatarFallback className="bg-orange-100 text-[#FF9966]">
                {astroProfile.name?.charAt(0)?.toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-full p-1 cursor-pointer">
                <Camera className="text-white w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{astroProfile.name || "User"}</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <i className="fas fa-phone-alt text-[#FF9966]"></i>
            {editMode ? (
              <input
                type="text"
                value={userProfile.phone || ""}
                onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                className="px-3 py-1 rounded-md text-black bg-white border border-gray-300 text-center text-sm"
                placeholder="Enter Mobile Number"
              />
            ) : (
              `+91-${userProfile.phone || "Not set"}`
            )}
          </p>
        </div>

        {/* Settings Card */}
        <Card className="p-4 shadow-sm rounded-xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#FF9966]" />
                </div>
                <span className="text-gray-700">Notifications</span>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                className="data-[state=checked]:bg-[#FF9966]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-[#FF9966]" />
                </div>
                <span className="text-gray-700">Language</span>
              </div>
              {editMode ? (
                <Select
                  value={language}
                  onValueChange={(value) => {
                    setLanguage(value);
                    setAstroProfile({ ...astroProfile, language: value });
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Kannada">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <span>{language}</span>
                  <i className="fas fa-chevron-right text-sm text-gray-400"></i>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Personal Information Card */}
        <Card className="p-4 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
            <Button
              onClick={() => (editMode ? handleSave() : setEditMode(true))}
              className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center p-0"
            >
              <FontAwesomeIcon
                icon={editMode ? faSave : faEdit}
                style={{ color: "#FF9966", fontSize: "16px" }}
              />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-gray-700">Gender</Label>
              <RadioGroup
                id="gender"
                value={gender}
                onValueChange={(value) => {
                  setGender(value);
                  setAstroProfile({ ...astroProfile, gender: value });
                }}
                className="flex gap-4"
                disabled={!editMode}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" className="text-[#FF9966]" />
                  <Label htmlFor="male" className="text-gray-600">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" className="text-[#FF9966]" />
                  <Label htmlFor="female" className="text-gray-600">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" className="text-[#FF9966]" />
                  <Label htmlFor="other" className="text-gray-600">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-gray-700">Date of Birth</Label>
              <div className="relative">
                <Input
                  id="dob"
                  type="date"
                  value={astroProfile.dob ? new Date(astroProfile.dob).toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setAstroProfile({ ...astroProfile, dob: e.target.value });
                    }
                  }}
                  disabled={!editMode}
                  className="w-full border-gray-300 rounded-lg focus:border-[#FF9966] focus:ring-[#FF9966]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-gray-700">Birth Time</Label>
              <div className="relative">
                <Input
                  id="birthTime"
                  type="time"
                  value={astroProfile.birthTime || ""}
                  onChange={(e) => setAstroProfile({ ...astroProfile, birthTime: e.target.value })}
                  disabled={!editMode}
                  className="w-full border-gray-300 rounded-lg focus:border-[#FF9966] focus:ring-[#FF9966]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthPlace" className="text-gray-700">Birth Place</Label>
              <div className="relative">
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={() => {
                    if (editMode) {
                      const place = autocompleteRef.current.getPlace();
                      if (place?.formatted_address) {
                        setAstroProfile({ ...astroProfile, birthPlace: place.formatted_address });
                      }
                    }
                  }}
                >
                  <Input
                    id="birthPlace"
                    type="text"
                    value={astroProfile.birthPlace || ""}
                    onChange={(e) => setAstroProfile({ ...astroProfile, birthPlace: e.target.value })}
                    disabled={!editMode}
                    className="w-full border-gray-300 rounded-lg focus:border-[#FF9966] focus:ring-[#FF9966] pr-10"
                    placeholder={editMode ? "Enter Birth Place" : astroProfile.birthPlace || "Not set"}
                  />
                </Autocomplete>
                {!editMode && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className="fas fa-map-marker-alt text-gray-400"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Support Card */}
        <Card className="p-4 shadow-sm rounded-xl">
          <div className="flex flex-col divide-y divide-gray-100">
            <Button
              variant="ghost"
              className="flex items-center justify-between py-3 text-left w-full cursor-pointer"
              onClick={() => router.push("/help")}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-[#FF9966]" />
                </div>
                <span className="text-gray-700">Help & Support</span>
              </div>
              <i className="fas fa-chevron-right text-sm text-gray-400"></i>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-between py-3 text-left w-full cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#FF9966]" />
                </div>
                <span className="text-gray-700">Contact Us</span>
              </div>
              <i className="fas fa-chevron-right text-sm text-gray-400"></i>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-between py-3 text-left w-full cursor-pointer"
              onClick={() => router.push("/privacy-policy")}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#FF9966]" />
                </div>
                <span className="text-gray-700">Privacy Policy</span>
              </div>
              <i className="fas fa-chevron-right text-sm text-gray-400"></i>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-between py-3 text-left w-full cursor-pointer"
              onClick={() => router.push("/terms")}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <i className="fas fa-file-contract text-[#FF9966]"></i>
                </div>
                <span className="text-gray-700">Terms and Conditions</span>
              </div>
              <i className="fas fa-chevron-right text-sm text-gray-400"></i>
            </Button>
          </div>
        </Card>

        {/* Astrological Charts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Astrological Charts</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className={chartType === "north" ? "text-[#FF9966] font-medium" : "text-gray-500"}>North</span>
              <Switch
                checked={chartType === "south"}
                onCheckedChange={(checked) => setChartType(checked ? "south" : "north")}
                className="data-[state=checked]:bg-[#FF9966]"
              />
              <span className={chartType === "south" ? "text-[#FF9966] font-medium" : "text-gray-500"}>South</span>
            </div>
          </div>
          <Tabs defaultValue="horoscope" className="w-full">
            <TabsList className="w-full bg-orange-50 p-1 rounded-button">
              <TabsTrigger
                value="horoscope"
                className="w-1/2 data-[state=active]:bg-[#FF9966] data-[state=active]:text-white rounded-button"
              >
                Horoscope Chart
              </TabsTrigger>
              <TabsTrigger
                value="navamsha"
                className="w-1/2 data-[state=active]:bg-[#FF9966] data-[state=active]:text-white rounded-button"
              >
                Navamsha Chart
              </TabsTrigger>
            </TabsList>
            <TabsContent value="horoscope" className="mt-4">
              <Card className="p-4 shadow-sm rounded-xl overflow-hidden">
                <div className="aspect-square w-full relative">
                  <img
                    src="https://readdy.ai/api/search-image?query=Detailed%20astrological%20horoscope%20chart%20with%20zodiac%20signs%2C%20planets%2C%20and%20houses%20in%20North%20Indian%20style%2C%20golden%20sacred%20geometry%20elements%20on%20deep%20blue%20background%2C%20mystical%20cosmic%20design%20with%20stars%20and%20constellations%2C%20professional%20astrology%20diagram%20with%20clear%20divisions%20and%20symbols&width=400&height=400&seq=chart1&orientation=squarish"
                    alt="Horoscope Chart"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-black/50 p-4 rounded-lg text-white">
                      <p className="text-lg font-medium">Horoscope Chart</p>
                      <p className="text-sm">{chartType === "north" ? "North Indian Style" : "South Indian Style"}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="navamsha" className="mt-4">
              <Card className="p-4 shadow-sm rounded-xl overflow-hidden">
                <div className="aspect-square w-full relative">
                  <img
                    src="https://readdy.ai/api/search-image?query=Detailed%20astrological%20navamsha%20chart%20with%20zodiac%20signs%2C%20planets%2C%20and%20houses%20in%20North%20Indian%20style%2C%20golden%20sacred%20geometry%20elements%20on%20deep%20blue%20background%2C%20mystical%20cosmic%20design%20with%20stars%20and%20constellations%2C%20professional%20astrology%20diagram%20with%20clear%20divisions%20and%20symbols&width=400&height=400&seq=chart2&orientation=squarish"
                    alt="Navamsha Chart"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-black/50 p-4 rounded-lg text-white">
                      <p className="text-lg font-medium">Navamsha Chart</p>
                      <p className="text-sm">{chartType === "north" ? "North Indian Style" : "South Indian Style"}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Navigation Bar */}
      {/* <div className="fixed bottom-0 w-full max-w-[375px] bg-white border-t border-gray-200 grid grid-cols-5 py-2 px-4 z-10">
        <button
          className="flex flex-col items-center justify-center text-[#FF9966]"
          onClick={() => router.push("/home")}
        >
          <i className="fas fa-home text-lg"></i>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-gray-500"
          onClick={() => router.push("/favorites")}
        >
          <i className="fas fa-heart text-lg"></i>
          <span className="text-xs mt-1">Favorites</span>
        </button>
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => router.push("/chat")}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF9966] to-[#FF5E62] flex items-center justify-center text-white -mt-5">
            <i className="fas fa-comment-dots text-xl"></i>
          </div>
        </button>
        <button
          className="flex flex-col items-center justify-center text-gray-500"
          onClick={() => router.push("/reports")}
        >
          <i className="fas fa-file-alt text-lg"></i>
          <span className="text-xs mt-1">Reports</span>
        </button>
        <button
          className="flex flex-col items-center justify-center text-gray-500"
          onClick={() => router.push("/remedies")}
        >
          <i className="fas fa-gem text-lg"></i>
          <span className="text-xs mt-1">Remedies</span>
        </button>
      </div> */}
    </div></>
  );
};

export default ProfilePage;