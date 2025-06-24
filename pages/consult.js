
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import CosmicBackground from "../components/CosmicBackground";
import CosmicNavbar from "../components/CosmicNavbar";
import ChatMessage from "../components/ChatMessage";
import { motion } from "framer-motion";
import { Send, Sparkles, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { fetchMyProfile, processQuestion, updateQuestion, likeDislike } from "../services/centralApi";
// import { set } from "date-fns";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [persona, setPersona] = useState("expert");
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [reviews, setReviews] = useState([]); // Store question, questionId, and review status
  const hasFetchedProfile = useRef(false);
  const latestQuestionRef = useRef("");
  const router = useRouter();
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const [count,setCount] = useState(0);

  const loadingMessages = [
    "Analyzing your birth chart...",
    "Examining planetary positions...",
    "Calculating house influences...",
    "Interpreting cosmic alignments...",
    "Exploring karmic connections...",
    "Reviewing dasha periods..."
  ];

  const [statusMessage, setStatusMessage] = useState("");
  const statusIndex = useRef(0);

  const personas = [
    { id: "expert", name: "Expert", description: "Detailed and technical astrological insights." },
    { id: "balanced", name: "Balanced", description: "A mix of depth and approachability." },
    { id: "youth", name: "Youth", description: "Fun and easy-to-understand responses." },
  ];
useEffect(() => {
    const { persona: queryPersona ,input} = router.query;
    console.log( input);
    setInput(input || "");
    const validPersona = personas.find((p) => p.id === queryPersona)?.id || "expert";
    console.log("Setting persona from query:", validPersona);
    setPersona(validPersona);
  }, [router.query]);
  // Function to fetch latitude/longitude from Google Geocoding API
  async function getLatLongFromGoogle(cityName) {
    const encodedCity = encodeURIComponent(cityName);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedCity}&key=AIzaSyDxEVirHNpI2wclTjIe5k6yIvGPToy59jw`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.status !== 'OK' || data.results.length === 0) {
        throw new Error('No results found or error from API.');
      }
  
      const { lat, lng } = data.results[0].geometry.location;
      return {
        latitude: lat,
        longitude: lng,
      };
    } catch (error) {
      console.error('Error fetching coordinates:', error.message);
      return null;
    }
  }

  // Loading messages rotation
  useEffect(() => {
    if (!isLoading) return;
  
    const intervalId = setInterval(() => {
      setStatusMessage(loadingMessages[statusIndex.current]);
      statusIndex.current = (statusIndex.current + 1) % loadingMessages.length;
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isLoading]);

  // Fetch profile data on mount and on route change
  useEffect(() => {
    const fetchProfile = async () => {
      if (hasFetchedProfile.current) return;
      hasFetchedProfile.current = true;
      console.log("Fetching profile...");

      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("Please sign in to access the chatbot");
          router.push("/login");
          return;
        }

        const profileResult = await fetchMyProfile();
        if (!profileResult.success) {
          setError(profileResult.message || "Failed to fetch profile");
          return;
        }

        const profile = profileResult.data.astroProfile;
        const userCookie = JSON.parse(Cookies.get("user") || "{}");

        const coords = await getLatLongFromGoogle(profile.birthPlace);
        if (!coords) {
          setError("Failed to fetch location coordinates");
          return;
        }

        const dob = new Date(profile.dob);
        const date = `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, "0")}-${String(dob.getDate()).padStart(2, "0")}`;
        
        setUserInfo({
          date,
          time: profile.birthTime,
          latitude: coords.latitude,
          longitude: coords.longitude,
          language: profile.language || userCookie.language || "en",
          timezone: profile.timezone || userCookie.timezone || "UTC",
          visit: false,
          last_query: ""
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Something went wrong. Please try again.");
      }
    };

    fetchProfile();

    const handleRouteChange = () => {
      console.log("Route changed, re-fetching profile...");
      hasFetchedProfile.current = false;
      fetchProfile();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // WebSocket connection
  useEffect(() => {
    if (!userInfo) return;

    socket.current = new WebSocket('wss://jipewwoh09.execute-api.ap-south-1.amazonaws.com/production');

    const sendBirthData = () => {
      if (socket.current.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket not open yet, retrying...");
        setTimeout(sendBirthData, 100);
        return;
      }

      const [year, month, day] = userInfo.date.split('-').map(Number);
      const cleanTime = (time) =>
        time && typeof time === 'string'
          ? time.toLowerCase().replace(/(am|pm)/, '').trim()
          : '00:00';
      const cleanedTime = cleanTime(userInfo.time);
      let [hour, minute] = cleanedTime.split(':').map(Number);

      if (isNaN(hour) || hour < 0 || hour > 23) hour = 0;
      if (isNaN(minute) || minute < 0 || minute > 59) minute = 0;
      const isPM = userInfo.time.toLowerCase().includes('pm');
      const isAM = userInfo.time.toLowerCase().includes('am');
      if (isAM && hour === 12) hour = 0;
      if (isPM && hour !== 12) hour += 12;

      const { latitude, longitude } = userInfo;

      const payload = {
        type: "setBirthData",
        birthData: {
          year,
          month,
          day,
          hour,
          minute,
          latitude,
          longitude,
          model: "o3-mini"
        },
        visit: userInfo.visit || false,
        last_query: userInfo.last_query || "",
        has_last_query: !!userInfo.last_query,
        language: userInfo.language.toLowerCase() || "en",
        password: "gpCzxONKKHa9gxlJORJ5J3zOfIfEe6A571DyByO8",
        persona: "expert",
        timezone: userInfo.timezone
      };
      
      socket.current.send(JSON.stringify(payload));
    };

    socket.current.onopen = () => {
      sendBirthData();
    };

    socket.current.onmessage = async (event) => {
      try {
        if (typeof event.data !== 'string') {
          console.warn("WebSocket event.data is not string:", event.data);
          return;
        }

        const data = JSON.parse(event.data);
        
        if (data.type === 'typing') {
          setIsLoading(true);
        } else if (data.type === 'welcomeMessage') {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              content: data.message,
              timestamp: new Date(),
              isUser: false,
              animate: true,
            },
          ]);
          if (Array.isArray(data.suggestedQuestions)) {
            let delay = 0;
            const newSuggestions = [];
            data.suggestedQuestions.forEach((s) => {
              setTimeout(() => {
                newSuggestions.push(s);
                setSuggestions([...newSuggestions]);
              }, delay);
              delay += 500;
            });
          } else {
            setSuggestions([]);
          }
        } else if (data.type === 'astroResponse') {
          setIsLoading(false);
          const lastUserMessage = latestQuestionRef.current;

          if (!lastUserMessage) {
            console.warn("No last user message for astroResponse");
            setError("No user question associated with this response.");
            return;
          }

          try {
            const questionResponse = await processQuestion({ questionText: lastUserMessage });
            if (!questionResponse.success) {
              console.error("Failed to process question:", questionResponse.message);
              setError("Failed to process question. Please try again.");
              return;
            }

            const questionId = questionResponse.data.questionId;
            setCount((prevCount) => prevCount + 1);
            console.log("Question ID:", questionId, "Count:", count);
            if (questionId&&count>5) {
              console.error("received from processQuestion");       
                          await updateQuestion(questionId, "completed");
            }
            if (!questionId) {
              console.error("No questionId received from processQuestion");
              setError("Failed to retrieve question ID.");
              return;
            }

            setMessages((prev) => [
              ...prev,
              {
                content: data.message,
                timestamp: new Date(),
                isUser: false,
                animate: true,
                questionId: questionId,
              },
            ]);

            setReviews((prev) => [
              ...prev,
              {
                question: lastUserMessage,
                questionId: questionId,
                thumbsUp: false,
                thumbsDown: false,
              },
            ]);

            // Check if updateQuestion is a function before calling
            
            

            if (Array.isArray(data.suggestedQuestions)) {
              let delay = 0;
              const newSuggestions = [];
              data.suggestedQuestions.forEach((s) => {
                setTimeout(() => {
                  newSuggestions.push(s);
                  setSuggestions([...newSuggestions]);
                }, delay);
                delay += 500;
              });
            } else {
              setSuggestions([]);
            }
          } catch (err) {
            console.error("Failed to process question after WebSocket response:", err);
            setError("Failed to process question. Please try again.");
          }
        } else if (data.type === 'error') {
          console.error("Server error:", data.message);
          setError(data.message);
        } else {
          console.warn("Unknown message type:", data.type, data);
        }
      } catch (parseError) {
        console.error("WebSocket message parsing failed:", parseError);
      }
    };
    
    socket.current.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("Connection error. Please try again.");
    };

    socket.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
      }
    };
  }, [userInfo]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle thumbs up
  const handleThumbsUp = async (questionId) => {
    try {
      await likeDislike(questionId, "like");
      setReviews((prev) =>
        prev.map((review) =>
          review.questionId === questionId
            ? { ...review, thumbsUp: true, thumbsDown: false }
            : review
        )
      );
    } catch (err) {
      console.error("Failed to send thumbs up:", err);
      setError("Failed to send feedback. Please try again.");
    }
  };

  // Handle thumbs down
  const handleThumbsDown = async (questionId) => {
    try {
      await likeDislike(questionId, "dislike");
      setReviews((prev) =>
        prev.map((review) =>
          review.questionId === questionId
            ? { ...review, thumbsUp: false, thumbsDown: true }
            : review
        )
      );
    } catch (err) {
      console.error("Failed to send thumbs down:", err);
      setError("Failed to send feedback. Please try again.");
    }
  };

  const handleSuggestionClick = async (text) => {
    const message = { content: text, timestamp: new Date(), isUser: true };
    setMessages((prev) => [...prev, message]);
    setIsLoading(true);
    setSuggestions([]);
    latestQuestionRef.current = text;

    try {
      // const questionResponse = await processQuestion({ questionText: text });
      // if (!questionResponse.success) {
      //   console.error("Failed to process suggestion:", questionResponse.message);
      //   setError("Failed to process suggestion. Please try again.");
      //   return;
      // }

      // const questionId = questionResponse.data.questionId;
      // if (!questionId) {
      //   console.error("No questionId received from processQuestion");
      //   setError("Failed to retrieve question ID.");
      //   return;
      // }

      if (socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(
          JSON.stringify({
            type: "askQuestion",
            message: text,
            model: "o3-mini",
            language: userInfo.language.toLowerCase() || "en",
            persona: persona,
          })
        );
      } else {
        console.warn("WebSocket not open, cannot send suggestion");
        setError("Connection not ready. Please try again.");
      }
    } catch (err) {
      console.error("Failed to process suggestion:", err);
      setError("Failed to process suggestion. Please try again.");
    }
  };

  const handlePersonaChange = (personaId) => {
    setPersona(personaId);
    setIsPersonaModalOpen(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message = { content: input, timestamp: new Date(), isUser: true };
    setMessages((prev) => [...prev, message]);
    setIsLoading(true);
    setSuggestions([]);
    latestQuestionRef.current = input;

    try {
      // const questionResponse = await processQuestion({ questionText: input });
      // if (!questionResponse.success) {
      //   console.error("Failed to process question:", questionResponse.message);
      //   setError("Failed to process question. Please try again.");
      //   return;
      // }

      // const questionId = questionResponse.data.questionId;
      // if (!questionId) {
      //   console.error("No questionId received from processQuestion");
      //   setError("Failed to retrieve question ID.");
      //   return;
      // }

      if (socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(
          JSON.stringify({
            type: "askQuestion",
            message: input,
            model: "o3-mini",
            language: userInfo.language.toLowerCase() || "en",
            persona: persona,
          })
        );
      } else {
        console.warn("WebSocket not open, cannot send message");
        setError("Connection not ready. Please try again.");
      }
    } catch (err) {
      console.error("Failed to process question:", err);
      setError("Failed to process question. Please try again.");
    }

    setInput("");
  };

  if (error) {
    return (
      <div className="min-h-screen cosmic-container font-serif flex flex-col items-center justify-center text-white">
        <CosmicBackground starCount={150} />
        <p className="text-red-400 text-center">{error}</p>
        <button
          onClick={() => router.push("/signup")}
          className="mt-4 px-4 py-2 bg-cosmic-gold text-black rounded-full hover:bg-cosmic-gold/80"
        >
          Go to Signup
        </button>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen cosmic-container font-serif flex flex-col items-center justify-center text-white">
        <CosmicBackground starCount={150} />
        <p className="text-cosmic-gold animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-container font-serif flex flex-col">
      <CosmicBackground starCount={150} />
<CosmicNavbar persona={persona} setShowHistory={setIsPersonaModalOpen} />     
 <main className="flex-1 container mx-auto  px-1 mt-20 py-6 text-black  flex flex-col ">
        
        <div className="flex-1  overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-1 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <ChatMessage message={msg} isUser={msg.isUser} persona={persona} />
                {!msg.isUser && msg.questionId && (
                  <div className="flex space-x-1 justify-start">
                    <button
                      onClick={() => handleThumbsUp(msg.questionId)}
                      disabled={reviews.find((r) => r.questionId === msg.questionId)?.thumbsUp}
                      className={`p-1 rounded-full ${
                        reviews.find((r) => r.questionId === msg.questionId)?.thumbsUp
                          ? "text-green-500"
                          : "text-gray-400 hover:text-green-500"
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleThumbsDown(msg.questionId)}
                      disabled={reviews.find((r) => r.questionId === msg.questionId)?.thumbsDown}
                      className={`p-1 rounded-full ${
                        reviews.find((r) => r.questionId === msg.questionId)?.thumbsDown
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 px-1">
                {suggestions.map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.5 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white text-black px-2  py-2 rounded-full text-[10px] hover:bg-cosmic-gold border border-cosmic-gold transition-all duration-200 shadow"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="text-center mt-4 text-cosmic-gold text-sm font-medium animate-pulse">
                {statusMessage}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-cosmic-purple/30">
            <form
              onSubmit={handleSendMessage}
              className="fixed bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2 border-t border-gray-700 z-50"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                rows={1}
                disabled={isLoading}
                className="flex-grow text-sm text-black font-bold font-serif bg-white border border-gray-300 rounded-full px-4 py-3 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 shadow-sm disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition duration-200 text-white disabled:opacity-60"
              >
                {isLoading ? (
                  <Sparkles className="h-5 w-5 animate-pulse" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setIsPersonaModalOpen(true)}
                  className="px-3 py-1 bg-cosmic-gold text-black rounded-full hover:bg-cosmic-gold/80 text-sm flex items-center"
                >
                  <User className="w-4 h-4 ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      {isPersonaModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsPersonaModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-cosmic-purple mb-4">Choose Your Persona</h2>
            <div className="space-y-3">
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePersonaChange(p.id)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    persona === p.id
                      ? "bg-cosmic-purple text-white border-cosmic-purple"
                      : "bg-gray-50 text-black border-gray-300 hover:bg-cosmic-gold/20"
                  }`}
                >
                  <span className="font-medium">{p.name}</span>
                  <p className="text-sm opacity-80">{p.description}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsPersonaModalOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
