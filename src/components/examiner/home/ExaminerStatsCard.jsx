import React from "react";
import {
  Clock,
  FileText,
  Users,
  CheckCircle,
  Calendar,
  BarChart3,
} from "lucide-react";
import useGetStatisticalInfo from "@/hooks/examiner/useGetStatisticalInfo";

function SkeletonCard({ bgColor }) {
  return (
    <div
      className={`${bgColor} dark:bg-gray-800 rounded-2xl p-6 w-full animate-pulse`}
    >
      <div className="flex flex-col items-start">
        <div className="mb-3">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="mb-1">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>
        <div className="w-full">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export default function ExaminerStatsCard() {
  const { data: statsData, isLoading } = useGetStatisticalInfo();
  console.log(statsData, "useGetStatisticalInfo");

 const statsConfig = [
  {
    label: "Pending Exam Creations",
    key: "pendingExamCreations",
    icon: FileText,
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-600 dark:text-blue-300",
    iconColor: "text-blue-500 dark:text-blue-300",
  },
  {
    label: "Pending Exam Reviews",
    key: "pendingExamReviews",
    icon: CheckCircle,
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-600 dark:text-yellow-300",
    iconColor: "text-yellow-500 dark:text-yellow-300",
  },
  {
    label: "Interview Requests",
    key: "pendingInterviewRequests",
    icon: Users,
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-600 dark:text-blue-300",
    iconColor: "text-blue-500 dark:text-blue-300",
  },
  {
    label: "Pending Task Creations",
    key: "pendingTaskCreations",
    icon: Clock,
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-600 dark:text-yellow-300",
    iconColor: "text-yellow-500 dark:text-yellow-300",
  },
  {
    label: "Task Submissions",
    key: "pendingTaskSubmissions",
    icon: BarChart3,
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-600 dark:text-blue-300",
    iconColor: "text-blue-500 dark:text-blue-300",
  },
  {
    label: "Scheduled Interviews",
    key: "scheduledInterviews",
    icon: Calendar,
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-600 dark:text-yellow-300",
    iconColor: "text-yellow-500 dark:text-yellow-300",
  },
];


  return (
    <div className="w-[85%] mx-auto md:w-full  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {isLoading
          ? statsConfig.map((config, index) => (
              <SkeletonCard key={index} bgColor={config.bgColor} />
            ))
          : statsConfig.map((config, index) => {
              const IconComponent = config.icon;
              const value = statsData.data[config.key] || 0;

              return (
                <div
                  key={index}
                  className={`${config.bgColor} rounded-2xl p-6 w-full hover:shadow-md transition-all duration-200 cursor-pointer`}
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <IconComponent size={24} className={config.iconColor} />
                      <span
                        className={`text-2xl font-bold ${config.textColor} mb-1`}
                      >
                        {value}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {config.label}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
