import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const InitialForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    date: "",
    time: "",
    place: "",
    latitude: 0,
    longitude: 0,
    timezone: 0,
    visit: false,
    last_query: "",
    has_last_query: false,
    language: "english",
    persona: ""
  });

  const autocompleteRef = useRef(null);
  const wsRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    wsRef.current = new WebSocket('wss://jipewwoh09.execute-api.ap-south-1.amazonaws.com/production/');
    wsRef.current.onopen = () => {
      console.log("WebSocket connected.");
    };
    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }, []);

  const handlePlaceSelect = async () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      const city = place.formatted_address;

      const res = await fetch(`/api/timezone/timezone?latitude=${latitude}&longitude=${longitude}`);
      const { timezone } = await res.json();

      setFormData(prev => ({
        ...prev,
        place: city,
        latitude,
        longitude,
        timezone,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    if (wsRef.current.readyState === WebSocket.OPEN) {
      const [year, month, day] = formData.date.split('-').map(Number);
      const [hour, minute] = formData.time.split(':').map(Number);
console.log(formData.persona)
      const payload = {
        type: "setBirthData",
        birthData: {
          year,
          month,
          day,
          hour,
          minute,
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
        visit: formData.visit,
        last_query: formData.last_query,
        has_last_query: !!formData.last_query,
        language: formData.language,
        persona: formData.persona,
      };

      wsRef.current.send(JSON.stringify(payload));
    } else {
      alert("WebSocket not connected.");
    }
  };

  const handleChange = (e) => {
    console.log( e.target)
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="min-h-screen cosmic-container flex flex-col items-center justify-center">
      <h2 className="text-xl text-white mb-4">Enter Your Birth Details</h2>
      <form onSubmit={handleSubmit} className="cosmic-card p-6 w-full max-w-md space-y-4">
        {/* Basic Fields */}
        <input className="cosmic-input" name="name" placeholder="Name" onChange={handleChange} required />
        <select name="gender" className="cosmic-input" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input className="cosmic-input" name="date" type="date" onChange={handleChange} required />
        <input className="cosmic-input" name="time" type="time" onChange={handleChange} required />
        {isLoaded ? (
          <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect}>
            <input className="cosmic-input" name="place" placeholder="Place of Birth" required />
          </Autocomplete>
        ) : (
          <input className="cosmic-input" name="place" placeholder="Place of Birth" disabled />
        )}

        {/* Extra Fields Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-white text-lg font-semibold">Additional Preferences</h3>

          <label className="flex items-center gap-2 text-white">
            <input type="checkbox" name="visit" onChange={handleChange} />
            Returning Visitor?
          </label>

          <input
            className="cosmic-input"
            name="last_query"
            placeholder="Your Last Query (optional)"
            onChange={handleChange}
          />

          <select name="language" className="cosmic-input" onChange={handleChange}>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="kannada">Kannada</option>
          </select>

          <select name="persona" className="cosmic-input" onChange={handleChange}>
            <option value="expert">expert</option>
            <option value="balanced">balanced</option>
            <option value="youth">youth</option>
          </select>
        </div>

        <Button type="submit" className="cosmic-button w-full">Start Chat</Button>
      </form>
    </div>
  );
};

export default InitialForm;
