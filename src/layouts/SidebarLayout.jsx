"use client";

import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router";
import { HiArrowLeft, HiHome, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import StageIcon from "@/components/applicant/dashboard/Stages/StageIcon";

const IconButton = ({ icon: Icon, title, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
    title={title}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStage = location.state?.stage;

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg h-screen transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Top Buttons */}
        <div className="flex items-center justify-between p-4 ">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <IconButton icon={HiArrowLeft} title="Back" onClick={() => navigate(-1)} />
              <IconButton icon={HiHome} title="Home" onClick={() => navigate("/applicant")} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <IconButton icon={HiArrowLeft} title="Back" onClick={() => navigate(-1)} />
              <IconButton icon={HiHome} title="Home" onClick={() => navigate("/applicant")} />
            </div>
          )}
          {/* Collapse/Expand Button */}
          {!isCollapsed && (
            <IconButton
              icon={HiChevronLeft}
              title="Collapse"
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex"
            />
          )}
        </div>

        {/* Current Stage */}
        {/* {currentStage && (
          <div className={`p-4 border-b border-gray-200 ${isCollapsed ? "flex justify-center" : ""}`}>
            <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
              <StageIcon type={currentStage.stageType} />
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-800 truncate text-sm">
                    {currentStage.stageName}
                  </h2>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 bg-blue-100 text-blue-700">
                    {currentStage.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        )} */}

        {/* Expand Button */}
        {/* {isCollapsed && (
          <div className="p-2 border-t border-gray-200">
            <IconButton
              icon={HiChevronRight}
              title="Expand"
              onClick={() => setIsCollapsed(false)}
              className="w-full flex justify-center"
            />
          </div>
        )} */}
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 ${isCollapsed ? "ml-16" : "ml-64"}`}>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
