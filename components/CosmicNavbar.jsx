import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShareAlt, faHistory, faTimes } from "@fortawesome/free-solid-svg-icons";
import { fetchMyQuestion } from "../services/centralApi";
import Image from "next/image";

const CosmicNavbar = ({ persona, setShowHistory }) => {
  // Map personas to their respective avatar images
  const personaAvatars = {
    expert: "/AIAvatar/Jaimini.png",
    balanced: "/AIAvatar/Auro.png",
    youth: "/AIAvatar/Avi.png",
  };

  // Map personas to their display names
  const personaNames = {
    expert: "Jaimini",
    balanced: "Arya",
    youth: "Zara",
  };

  const [showHistory, setLocalShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMyQuestion();
        if (response.success && Array.isArray(response.data.questions)) {
          const transformedHistory = response.data.questions.map((item) => ({
            id: item._id,
            preview: item.questionText || "Untitled Chat",
          }));
          setChatHistory(transformedHistory);
        } else {
          setError("Failed to fetch chat history");
        }
      } catch (err) {
        setError("Error fetching chat history");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  const toggleHistory = () => {
    setLocalShowHistory(!showHistory);
    setShowHistory(!showHistory); // Update parent state
  };

  const handleSessionClick = (messages) => {
    console.log("Selected session messages:", messages);
    setLocalShowHistory(false);
    setShowHistory(false); // Update parent state
  };

  return (
    <>
      {/* Header */}
      <div className=" fixed flex items-center justify-between p-6 border-b border-orange-200 bg-[#FFF2E2] z-10 fixed top-0 w-full max-w-[375px]">
        <Link
          href="/"
          className="text-orange-500 cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </Link>
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={personaAvatars[persona] || personaAvatars.expert}
              width={40}
              height={40}
              alt={personaNames[persona] || "Jaimini"}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-medium text-xl text-orange-600">
            {personaNames[persona] || "Jaimini"}
          </span>
        </div>
        <div className="flex space-x-4">
          <button className="text-orange-500 cursor-pointer">
            <FontAwesomeIcon icon={faShareAlt} className="text-xl" />
          </button>
          <button
            id="historyButton"
            className="text-orange-500 cursor-pointer"
            onClick={toggleHistory}
          >
            <FontAwesomeIcon icon={faHistory} className="text-xl" />
          </button>
        </div>
      </div>

      {/* History Slide Panel */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-[#FFF2E2] transform transition-transform duration-300 ease-in-out z-50 ${
          showHistory ? "translate-x-0" : "translate-x-full"
        } shadow-2xl`}
      >
        <div className="p-6 border-b border-orange-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-orange-600">Chat Histor</h2>
            <button
              onClick={toggleHistory}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
        </div>
        <div className="h-[calc(100%-80px)] p-4 overflow-y-auto scrollbar-custom">
          {isLoading && (
            <p className="text-center text-gray-600">Loading chat history...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && !error && chatHistory.length === 0 && (
            <p className="text-center text-gray-600">No chat history available</p>
          )}
          {chatHistory.map((session) => (
            <div
              key={session.id}
              className="mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-orange-200"
              onClick={() => handleSessionClick(session.messages)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-orange-600">{session.preview}</h3>
                <span className="text-xs text-gray-500"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {showHistory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={toggleHistory}
        ></div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #FFF2E2;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #fb923c;
        }
      `}</style>
    </>
  );
};

export default CosmicNavbar;