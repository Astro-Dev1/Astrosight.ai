import React from 'react';
import { Calendar, Info } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import CustomHeader from '../components/CustomHeader';
import Footer from '../components/Footer';
import {
  InternalLinksGrid,
  CompatibilityLinksGrid,
  HoroscopeNavigation,
  ReportLinksGrid,
  RecentBlogLinks
} from '../components/InternalLinksGrid';

const festivalData = {
  "January 2025": [
    { date: "Jan 6", day: "Monday", festival: "Guru Gobind Singh Jayanti" },
    { date: "Jan 13", day: "Monday", festival: "Lohri" },
    { date: "Jan 14", day: "Tuesday", festival: "Makar Sankranti / Pongal" },
    { date: "Jan 26", day: "Sunday", festival: "Republic Day" },
  ],
  "February 2025": [
    { date: "Feb 2", day: "Sunday", festival: "Vasant Panchami / Saraswati Puja" },
    { date: "Feb 26", day: "Wednesday", festival: "Maha Shivaratri" },
  ],
  "March 2025": [
    { date: "Mar 13", day: "Thursday", festival: "Holika Dahan" },
    { date: "Mar 14", day: "Friday", festival: "Holi" },
    { date: "Mar 30", day: "Sunday", festival: "Chaitra Navratri begins" },
  ],
  "April 2025": [
    { date: "Apr 6", day: "Sunday", festival: "Rama Navami" },
    { date: "Apr 12", day: "Saturday", festival: "Hanuman Jayanti" },
    { date: "Apr 14", day: "Monday", festival: "Vishu / Puthandu / Baisakhi" },
  ],
  "May 2025": [
    { date: "May 29", day: "Thursday", festival: "Vinayaka Chaturthi" },
    { date: "May 30", day: "Friday", festival: "Akshaya Tritiya" },
  ],
  "June 2025": [
    { date: "Jun 1", day: "Sunday", festival: "Skanda Sashti" },
    { date: "Jun 5", day: "Thursday", festival: "Ganga Dussehra" },
    { date: "Jun 6", day: "Friday", festival: "Nirjala Ekadashi" },
    { date: "Jun 10", day: "Tuesday", festival: "Savitri Pooja" },
    { date: "Jun 27", day: "Friday", festival: "Puri Rath Yatra" },
  ],
  "July 2025": [
    { date: "Jul 10", day: "Thursday", festival: "Guru Purnima" },
  ],
  "August 2025": [
    { date: "Aug 8", day: "Friday", festival: "Nag Panchami" },
    { date: "Aug 9", day: "Saturday", festival: "Varalakshmi Vrat" },
    { date: "Aug 17", day: "Sunday", festival: "Raksha Bandhan" },
  ],
  "September 2025": [
    { date: "Sep 5", day: "Friday", festival: "Onam" },
    { date: "Sep 6", day: "Saturday", festival: "Ganesh Chaturthi" },
  ],
  "October 2025": [
    { date: "Sep 29 - Oct 7", day: "Mon – Tue", festival: "Navaratri" },
    { date: "Oct 8", day: "Wednesday", festival: "Dussehra / Vijayadashami" },
    { date: "Oct 30", day: "Thursday", festival: "Karva Chauth" },
  ],
  "November 2025": [
    { date: "Nov 1", day: "Saturday", festival: "Diwali / Deepavali" },
    { date: "Nov 2", day: "Sunday", festival: "Govardhan Puja" },
    { date: "Nov 3", day: "Monday", festival: "Bhai Dooj" },
  ],
  "December 2025": [
    { date: "Dec 19", day: "Friday", festival: "Hanuman Jayanti (Tamil Nadu)" },
  ]
};

export default function FestivalCalendarPage() {
  return (
    <>
      <Head>
        <title>2025 Festival Calendar | Month-wise Hindu Celebration Dates — AstroSight</title>
        <meta
          name="description"
          content="Plan your 2025 with the official Hindu festival calendar by AstroSight. Dates for Holi, Diwali, Navratri, Makar Sankranti, and more by month."
        />
        <meta name="keywords" content="2025 festival calendar, Hindu holidays, Diwali 2025, Holi dates 2025, Indian calendar, Vedic astrology festival guide" />
        <link rel="canonical" href="https://astrosight.ai/2025-festival-calendar" />
      </Head>

      <div className="min-h-screen bg-[#FFF2E2] text-gray-800">
        <CustomHeader title="2025 Festival Calendar" showBackButton />

        <main className="max-w-5xl px-4 py-10 mx-auto space-y-12">

          {/* Intro */}
          <section className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-6 shadow">
            <h1 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-yellow-500" /> Month-by-Month Guide to Indian Festivals
            </h1>
            <p className="text-gray-700 text-lg">
              India is a land of festivals — every sunrise brings the promise of a new celebration. From family gatherings to spiritual resets, our 2025 Festival Calendar helps you honor India’s cultural rhythm with clarity.
            </p>
          </section>

          {/* Monthly Breakdown */}
          <div className="space-y-12">
            {Object.entries(festivalData).map(([month, events]) => (
              <section key={month} className="bg-white rounded-xl shadow p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-orange-600 mb-4">{month}</h2>
                <ul className="space-y-2 text-sm text-gray-800">
                  {events.map((item, idx) => (
                    <li key={idx} className="flex flex-row items-start justify-between border-b border-gray-100 py-1">
                      <span>{item.date} ({item.day})</span>
                      <span>{item.festival}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* FAQs */}
          <section className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" /> Festival FAQs
            </h3>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>Q: Why do Hindu festival dates change every year?</strong>
                <p>A: Because they&apos;re set by the lunar calendar. Dates shift yearly on the Gregorian calendar.</p>
              </div>
              <div>
                <strong>Q: What’s the difference between the lunar and solar calendars?</strong>
                <p>A: Lunar calendars follow Moon phases, while solar (like Shaka Samvat) follow the Sun&apos;s progression. Some festivals use both.</p>
              </div>
              <div>
                <strong>Q: Is this calendar applicable pan-India?</strong>
                <p>A: Major ones like Diwali, Holi, Navratri are celebrated nationally. Others depend on regions — like Onam in Kerala, Pongal in Tamil Nadu.</p>
              </div>
              <div>
                <strong>Q: How to always stay updated?</strong>
                <p>A: Bookmark this page or subscribe to AstroSight&apos;s newsletter for real-time updates aligned with planetary motion!</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 p-6 border-l-4 border-orange-400">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">🪔 Stay Synced with the Stars</h4>
            <p className="text-sm text-gray-700">
              Looking for personalized tips and festival remedies? Explore our <Link href="/guidance-report" className="underline text-orange-600">Guidance Reports</Link> or <Link href="/shop" className="underline text-orange-600">Astro Remedies</Link> section.
            </p>
          </section>

          {/* Internal Navigation */}
          <div className="space-y-8 mt-12">
            <InternalLinksGrid />
            <HoroscopeNavigation />
            <CompatibilityLinksGrid />
            <ReportLinksGrid />
            <RecentBlogLinks />
          </div>
        </main>

        <div className="bg-[#f46434] mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
}
