import { motion } from "framer-motion";
import { Bot, Star } from "lucide-react";

const ChatMessage = ({ message, isUser, persona }) => {
  // Map personas to their respective avatar images
  const personaAvatars = {
 
    expert: "/AIAvatar/Jaimini.png",
    balanced: "/AIAvatar/Auro.png",
    youth: "/AIAvatar/Avi.png", };

  // Map personas to their display names
  const personaNames = {
    expert: "Jaimini",
    balanced: "Arya",
    youth: "Zara",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end " : "justify-start relative -left-2"} w-full font-serif ${!isUser ? "ml-2 md:ml-4" : "ml-2 "}`}
    >
      <div
        className={`flex items-start ${isUser ? "flex-row-reverse" : "flex-row"} max-w-full md:max-w-[85%]`}
      >
        {/* Avatar */}
        <div className=" text-white">
          {isUser ? (
            <Bot className="w-8 h-8 text-white bg-orange-700 rounded-full p-1" />
          ) : (
            <img
              src={personaAvatars[persona] || personaAvatars.expert}
              alt={personaNames[persona] || "Jaimini"}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </div>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-2 py-2 text-sm shadow-md ${
            isUser
              ? "bg-white text-black font-bold rounded-br-none"
              : "bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-bl-none max-w-[240px]"
          }`}
        >
          <p className="whitespace-pre-wrap text-[10px]">{message.content}</p>
          <div className="text-xs mt-1 opacity-60 flex items-center">
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {!isUser && (
              <span className="flex items-center text-yellow-400">
                <Star className="w-3 h-3 mr-1" />
                {personaNames[persona] || "AstroAnswer AI"}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;