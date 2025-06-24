import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { format, startOfWeek, endOfWeek } from "date-fns";
import Link from "next/link";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent } from "@/components/ui/tabs";

const validSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const validTypes = ["weekly", "monthly", "yearly"];

const HoroscopePage = () => {
  const router = useRouter();
  const { sign, wmysigne } = router.query;
  const type = wmysigne;

  const capitalizedSign = sign && validSigns.includes(sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase())
    ? sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase()
    : "";

  // const signKey = capitalizedSign.toLowerCase();
  const horoscopeType = type && validTypes.includes(type.toLowerCase()) ? type.toLowerCase() : "weekly";

  const [horoscope, setHoroscope] = useState(null);
  const [weeklyHoroscope, setWeeklyHoroscope] = useState(null);
  const [monthlyHoroscope, setMonthlyHoroscope] = useState(null);
  const [yearlyHoroscope, setYearlyHoroscope] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sign || !capitalizedSign || !type || !validTypes.includes(horoscopeType)) {
      setError("Invalid or missing zodiac sign or type");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchHoroscopes = async () => {
      try {
        if (horoscopeType === "weekly") {
          await fetchWeeklyHoroscope();
          setCurrentDate(`Week of ${format(startOfWeek(new Date(), { weekStartsOn: 1 }), "MMMM d")} - ${format(endOfWeek(new Date(), { weekStartsOn: 1 }), "MMMM d")}`);
        } else if (horoscopeType === "monthly") {
          await fetchMonthlyHoroscope();
          setCurrentDate(format(new Date(), "MMMM yyyy"));
        } else if (horoscopeType === "yearly") {
          await fetchYearlyHoroscope();
          setCurrentDate(new Date().getFullYear().toString());
        }

        await Promise.all([
          fetchWeeklyHoroscope(true),
          fetchMonthlyHoroscope(true),
          fetchYearlyHoroscope(true),
        ]);
      } catch (err) {
        console.error(err);
        setError("Failed to load horoscope data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoroscopes();
  }, [sign, type]);

  const fetchWeeklyHoroscope = async (forAlsoCheck = false) => {
    const today = new Date();
    const weekStart = format(startOfWeek(today), 'yyyy-MM-dd');
    // const weekEnd = format(endOfWeek(today), 'yyyy-MM-dd');

    try {
      const response = await fetch(`/api/horoscopes/weekly-horoscopes-${weekStart}.json`);
      const data = await response.json();
      const horoscopeData = data.horoscopes?.[capitalizedSign] || { text: ["Weekly horoscope not available."], sections: {} };
      const formattedData = { ...horoscopeData, dateRange: `${format(startOfWeek(today), "d MMM")} - ${format(endOfWeek(today), "d MMM")}` };
      forAlsoCheck ? setWeeklyHoroscope(formattedData) : setHoroscope(formattedData);
      console.log(weeklyHoroscope)
    } catch (error) {
      const fallback = { text: ["Weekly horoscope unavailable."], sections: {}, dateRange: `${format(startOfWeek(today), "d MMM")} - ${format(endOfWeek(today), "d MMM")}` };
      forAlsoCheck ? setWeeklyHoroscope(fallback) : setHoroscope(fallback);
    }
  };

  const fetchMonthlyHoroscope = async (forAlsoCheck = false) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");

    try {
      const response = await fetch(`/api/horoscopes/monthly-horoscopes-${year}-${month}.json`);
      const data = await response.json();
      const horoscopeData = data?.[`${year}-${month}`]?.[capitalizedSign] || { text: ["Monthly horoscope not available."], sections: {} };
      const formattedData = { ...horoscopeData, dateRange: format(today, "MMMM yyyy") };
      forAlsoCheck ? setMonthlyHoroscope(formattedData) : setHoroscope(formattedData);
      console.log(monthlyHoroscope)
    } catch (error) {
      const fallback = { text: ["Monthly horoscope unavailable."], sections: {}, dateRange: format(today, "MMMM yyyy") };
      forAlsoCheck ? setMonthlyHoroscope(fallback) : setHoroscope(fallback);
    }
  };

  const fetchYearlyHoroscope = async (forAlsoCheck = false) => {
    const year = new Date().getFullYear();

    try {
      const response = await fetch(`/api/horoscopes/yearly-horoscopes-${year}.json`);
      const data = await response.json();
      const horoscopeData = data?.[year]?.[capitalizedSign] || { text: ["Yearly horoscope not available."], sections: {} };
      const formattedData = { ...horoscopeData, dateRange: year.toString() };
      forAlsoCheck ? setYearlyHoroscope(formattedData) : setHoroscope(formattedData);
      console.log(yearlyHoroscope)
    } catch (error) {
      const fallback = { text: ["Yearly horoscope unavailable."], sections: {}, dateRange: year.toString() };
      forAlsoCheck ? setYearlyHoroscope(fallback) : setHoroscope(fallback);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (error || !capitalizedSign || !validTypes.includes(horoscopeType)) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error || "Invalid or missing zodiac sign or type"}</p>
        <Link href="/" className="text-blue-500 underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{capitalizedSign} {horoscopeType.charAt(0).toUpperCase() + horoscopeType.slice(1)} Horoscope | AstroAnswer</title>
      </Head>      {/* Tab navigation */}


      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">
          {capitalizedSign} {horoscopeType.charAt(0).toUpperCase() + horoscopeType.slice(1)} Horoscope
        </h1>
        <div className="grid w-full grid-cols-3 gap-2 px-4">
        {validTypes.map((t) => (
          <Link
            key={t}
            href={`/horoscope/${sign}/${t}`}
            className={`text-center text-sm py-2 rounded-md border transition-colors ${
              horoscopeType === t
                ? "bg-orange-100 text-orange-600 font-semibold border-orange-400"
                : "bg-white text-gray-600 border-gray-300 hover:bg-orange-50"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </div>
        <p className="text-gray-600 mb-4 text-sm">{currentDate}</p>

          <p  className="text-base text-gray-800 leading-relaxed mb-2">{horoscope?.text}</p>

        {horoscope?.sections && Object.entries(horoscope.sections).map(([title, content]) => (
          <div key={title} className="mt-4">
            <h3 className="font-semibold text-orange-500 text-sm mb-1">{title}</h3>
            <p className="text-sm text-gray-700">{content}</p>
          </div>
        ))}

        {horoscope?.remedy && (
          <div className="bg-orange-100 border-l-4 border-orange-500 mt-6 p-4 rounded">
            <h4 className="text-orange-800 font-semibold text-sm mb-1">Remedy</h4>
            <p className="text-sm text-gray-800">{horoscope.remedy}</p>
          </div>
        )}
      </div>

      
    </>
  );
};

export default HoroscopePage;
