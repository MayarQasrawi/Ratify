import React from "react";
import { IoCalendarOutline } from "react-icons/io5";

const HeroHeader = ({ title, subtitle, icon: Icon, stats }) => {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl">
      {/* الخلفية العامة باستخدام متغير اللون */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--main-color)] to-purple-600 opacity-95"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80  rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

      <div className="relative z-10 px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                {title}
              </h1>
              <p className="text-lg text-white/90">{subtitle}</p>
            </div>
          </div>

          {/* <div className="flex items-center space-x-2 text-sm text-white/80">
            <IoCalendarOutline className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6  border-[var(--border)] hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
