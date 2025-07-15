import React from 'react';
import { Card} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBriefcase,  faHeartbeat, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

function HoroscopeCard({ title, date, horoscope, Todays = false, weekly = false, monthly = false }) {
  console.log(horoscope, title,date, Todays, weekly, monthly);
  


  const getFavorabilityColor = (favorability) => {
    switch (favorability) {
      case "most-favorable":
        return "bg-green-500";
      case "favorable":
        return "bg-green-300";
      case "neutral":
        return "bg-yellow-300";
      case "unfavorable":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };
  // Map for category details: title, icon, and progress bar color
  const detailKeys = Object.keys(horoscope?.["Detailed Predictions"] || {}).filter(
  (key) => key !== "percentage"
);

const categories = detailKeys.map((key, index) => {
  const iconMap = [
    faHeart,
    faBriefcase,
    faHeartbeat,
    faSeedling
  ];

  const colorMap = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-purple-500"
  ];

  return {
    key,
    title: key,
    icon: iconMap[index] || faSeedling,
    progressColor: colorMap[index] || "text-gray-500",
    value: horoscope?.["Detailed Predictions"]?.[key]?.percentage || Math.random() * 100,
     text: horoscope?.["Detailed Predictions"]?.[key] || "Not available"
  };
});

  console.log(categories);

  return (
    <>


      <div className="">
        {horoscope ? (
          <div>
            {/* Daily Horoscope */}
            {Todays && (
              <div className="mb-8">
                <h3 className="text-black text-xl font-semibold mb-4">
                  Detailed Predictions
                </h3>
                {categories.map((category) => (
                  <Card key={category?.key} className="bg-white rounded-xl shadow-sm overflow-hidden mb-3">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${category.title === "Love & Relationships"
                              ? "bg-red-100"
                              : category.title === "Health & Wellness"
                                ? "bg-blue-100"
                                : category.title === "Career & Money"
                                  ? "bg-yellow-100"
                                  : "bg-yellow-100"
                            }`}
                        >
                          <div className={`w-10 h-10 rounded-full text-center flex items-center justify-center  ${category.bgColor}`}>
                            <FontAwesomeIcon icon={category.icon} className={`${category.progressColor}`} />
                          </div>
                        </div>
                        <span className="font-medium text-gray-800">{category.key}</span>
                      </div>
                      <div className="text-gray-700">
                        <p className="text-sm">{category.text?.["Text"] || "Not available"}</p>
                        <div className="mt-3">
                          <Progress
                            value={category.value} // Replace with actual data if available
                            className="h-2 bg-gray-200"
                            indicatorClassName={
                              category === "Love & Relationship"
                                ? "bg-red-500"
                                : category === "Career"
                                  ? "bg-blue-500"
                                  : category === "Money & Finances"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }
                          />
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">Low</span>
                            <span className="text-xs text-gray-500">High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Lucky Elements */}
            <div className="mb-8">
              <h3 className="text-black text-xl font-semibold mb-4">Lucky Elements</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#FFE5CC] flex items-center justify-center mb-3 mx-auto">
                    <i className="fas fa-dice text-[#FF9933] text-xl"></i>
                  </div>
                  <h4 className="text-center font-medium text-gray-800 mb-2">Lucky Numbers</h4>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {horoscope?.lucky_elements?.lucky_numbers.map((number, index) => (
                      <Badge key={index} className="bg-[#FF9933] hover:bg-[#FF9933]">
                        {number}
                      </Badge>
                    ))}
                  </div>
                </Card>
       <Card className="bg-white p-4 rounded-xl shadow-sm min-w-[150px] flex-shrink-0">
  <div className="w-12 h-12 rounded-full bg-[#FFE5CC] flex items-center justify-center mb-3 mx-auto">
    <i className="fas fa-palette text-[#FF9933] text-xl"></i>
  </div>
  <h4 className="text-center font-medium text-gray-800 mb-2">Lucky Colors</h4>
  <div className="flex justify-center gap-2">
    {horoscope?.lucky_elements?.lucky_colors.map((color, index) => {
      // Map Kannada color names to hex codes
      const colorMap = {
        // English
  "Red": "#FF0000",
  "Blue": "#0000FF",
  "Dark Blue": "#00008B",
  "Sky Blue": "#87CEEB",
  "Green": "#008000",
  "Forest Green": "#228B22",
  "Yellow": "#FFFF00",
  "Golden Yellow": "#FFD700",
  "Orange": "#FFA500",
  "Ash Grey": "#B2BEB5",
  "Grey": "#808080",
  "Black": "#000000",
  "White": "#FFFFFF",
  "Brown": "#8B4513",
  "Pink": "#FFC0CB",
  "Maroon": "#800000",
  "Purple": "#800080",
  "Indigo": "#4B0082",
  "Teal": "#008080",
  "Gold": "#FFD700",

  // Hindi
  "लाल": "#FF0000",
  "नीला": "#0000FF",
  "गहरा नीला": "#00008B",
  "आसमानी नीला": "#87CEEB",
  "हरा": "#008000",
  "वन हरा": "#228B22",
  "पीला": "#FFFF00",
  "सुनहरा पीला": "#FFD700",
  "नारंगी": "#FFA500",
  "राख ग्रे": "#B2BEB5",
  "ग्रे": "#808080",
  "काला": "#000000",
  "सफेद": "#FFFFFF",
  "भूरा": "#8B4513",
  "गुलाबी": "#FFC0CB",
  "गाढ़ा लाल": "#800000",
  "बैंगनी": "#800080",
  "जामुनी": "#4B0082",
  "नील हरा": "#008080",
  "सोने का रंग": "#FFD700",

  // Kannada
  "ಕೆಂಪು": "#FF0000",
  "ನೀಲಿ": "#0000FF",
  "ಆಳವಾದ ನೀಲಿ": "#00008B",
  "ಆಕಾಶ ನೀಲಿ": "#87CEEB",
  "ಹಸಿರು": "#008000",
  "ಕಾಡಿನ ಹಸಿರು": "#228B22",
  "ಹಳದಿ": "#FFFF00",
  "ಗೋಲ್ಡನ್ ಹಳದಿ": "#FFD700",
  "ಕಿತ್ತಳೆ": "#FFA500",
  "ಆಂಜನೆಯ ಬೂದು": "#B2BEB5",
  "ಬೂದು": "#808080",
  "ಕಪ್ಪು": "#000000",
  "ಬಿಳಿ": "#FFFFFF",
  "ಕಾಫಿ ಬಣ್ಣ": "#8B4513",
  "ಗುಲಾಬಿ": "#FFC0CB",
  "ಗಡಸು ಕೆಂಪು": "#800000",
  "ನೇರಳೆ ಬಣ್ಣ": "#800080",
  "ಇಳಿಜಾರಿನ ಬಣ್ಣ": "#4B0082",
  "ಅರಳು ಹಸಿರು": "#008080",
  "ಬಂಗಾರದ ಬಣ್ಣ": "#FFD700",
        // Add more mappings if needed
      };
      const hex = colorMap[color] || "#CCCCCC"; // default fallback

      return (
        <div
          key={index}
          style={{ backgroundColor: hex }}
          className="w-8 h-8 rounded-full border border-gray-200"
          title={color}
        ></div>
      );
    })}
  </div>
</Card>

              </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-8">
              <h3 className="text-black text-xl font-semibold mb-4">Daily Timeline</h3>
              <Card className="bg-white p-5 rounded-xl shadow-lg">
                <div className="relative">
                  {horoscope?.daily_timeline?.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div
                            className={`w-4 h-4 rounded-full ${getFavorabilityColor(item.favorability)} border-2 border-white z-10`}
                          ></div>
                          {index < horoscope?.daily_timeline?.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 -mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-800">{item.time}</span>
                            <Badge
                              className={`
                    ${item.favorability === "most-favorable"
                                  ? "bg-[#22C55E] hover:bg-green-500"
                                  : item.favorability === "favorable"
                                    ? "bg-[#86EFAC] hover:bg-green-300"
                                    : item.favorability === "neutral"
                                      ? "bg-[#FDE047] hover:bg-yellow-300"
                                      : "bg-[#FCA5A5] hover:bg-red-300"
                                }
                  `}
                            >
                              {item.favorability.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{item.activity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-gray-500">Legend:</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#22C55E] mr-1"></div>
                      <span className="text-xs text-gray-500">Most Favorable</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#86EFAC] mr-1"></div>
                      <span className="text-xs text-gray-500">Favorable</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#FDE047] mr-1"></div>
                      <span className="text-xs text-gray-500">Neutral</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#FCA5A5] mr-1"></div>
                      <span className="text-xs text-gray-500">Unfavorable</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Personalized Recommendations */}
            <div className="mb-8">
              <h3 className="text-black text-xl font-semibold mb-4">Personalized Recommendations</h3>
              <Card className="bg-white p-5 rounded-xl shadow-lg">
                <Tabs defaultValue="dos" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="dos" className="text-sm">Do&apos;s</TabsTrigger>
                    <TabsTrigger value="donts" className="text-sm">Don&apos;ts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="dos">
                    <ul className="space-y-3">
                      {horoscope?.personalized_recommendations?.dos?.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <i className="fas fa-check text-green-500 text-xs"></i>
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="donts">
                    <ul className="space-y-3">
                      {horoscope?.personalized_recommendations?.donts?.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <i className="fas fa-times text-red-500 text-xs"></i>
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

          </div>
        ) : (
          <p>Horoscope data is not available.</p>
        )}
      </div>
    </>
  );
}

export default HoroscopeCard;