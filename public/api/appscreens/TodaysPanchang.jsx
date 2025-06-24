import React from "react";
import { Card } from "@/components/ui/card";

const TodaysPanchang = ({ panchangData }) => {
  return (
    <div className="mb-6">
      <h2 className="text-black text-xl font-semibold mb-3">Today&apos;s Panchang</h2>
      <a
        href="https://readdy.ai/home/ee4c356e-147d-4338-904b-93df931486fa/7008b89f-e01e-4bbf-acee-8df9d06fb650"
        data-readdy="true"
      >
        <Card className="bg-white p-5 rounded-xl shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-calendar-day text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Day</p>
                <p className="text-sm font-medium">{panchangData.day}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-moon text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Thithi</p>
                <p className="text-sm font-medium">{panchangData.thithi}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-star text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nakshatra</p>
                <p className="text-sm font-medium">{panchangData.nakshatra}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-sun text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sunrise</p>
                <p className="text-sm font-medium">{panchangData.sunrise}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-sunset text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sunset</p>
                <p className="text-sm font-medium">{panchangData.sunset}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-om text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Yoga</p>
                <p className="text-sm font-medium">{panchangData.yoga}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-dharmachakra text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Karana</p>
                <p className="text-sm font-medium">{panchangData.karana}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFE5CC] flex items-center justify-center mr-3">
                <i className="fas fa-om text-[#FF9933]"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hindu Month</p>
                <p className="text-sm font-medium">{panchangData.hinduMonth}</p>
              </div>
            </div>
          </div>
        </Card>
      </a>
    </div>
  );
};

export default TodaysPanchang;