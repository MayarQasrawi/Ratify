import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  FileText,
  Users,
  CheckCircle,
  Calendar as CalendarIcon,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Eye,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  Search,
  Filter,
} from "lucide-react";
import { format } from "date-fns";

import useGetTaskCreation from "@/hooks/examiner/task/useGetTaskCreation";
import useGetExamCreation from "@/hooks/examiner/exam/useGetExamCreation";
import useGetStatisticalInfo from "@/hooks/examiner/useGetStatisticalInfo";
import Title from "@/components/admin/shared/Title";
import Welcome from "@/components/admin/shared/Welcome";
import Spinner from "@/components/shared/dashboard/Spinner";

function StatsCard({ config, value, isLoading }) {
  const IconComponent = config.icon;

  if (isLoading) {
    return (
      <div
        className={`${config.bgColor} rounded-2xl p-6 w-full animate-pulse shadow-lg`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-8 bg-gray-300 rounded w-12 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${config.bgColor} rounded-2xl p-6 w-full
        hover:scale-[1.02] hover:shadow-xl transition-all duration-300
        border border-white/20 shadow-lg backdrop-blur-sm
        group cursor-pointer relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10"></div>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <div
          className={`p-3 rounded-xl bg-white/80 backdrop-blur-sm ${config.iconColor} 
            group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
            shadow-lg`}
        >
          <IconComponent size={24} />
        </div>
        <div className="flex flex-col">
          <span className={`text-3xl font-bold ${config.textColor} mb-1`}>
            {value || 0}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {config.label}
          </span>
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-60">
        <TrendingUp className={`w-4 h-4 ${config.textColor}`} />
      </div>
    </div>
  );
}

function EventCard({ event, index, isSelected, onEventClick }) {
  const isEven = index % 2 === 0;

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800 border-gray-200";

    switch (status.toLowerCase()) {
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (daysRemaining) => {
    if (daysRemaining < 0) return "text-red-600 bg-red-50";
    if (daysRemaining <= 3) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div
      className={`border-2 transition-all w-full max-w-md rounded-xl duration-300 cursor-pointer 
        hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm
        ${
          isSelected
            ? "bg-blue-50/80 border-blue-500 shadow-lg"
            : "bg-white/90 border-gray-200 hover:border-blue-300"
        }
        ${
          isEven
            ? "border-t-4 border-t-blue-500"
            : "border-t-4 border-t-indigo-600"
        }`}
      onClick={() => onEventClick(event)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-base leading-tight">
                {event.stageName || event.title || "Untitled Event"}
              </h3>
              {event.status && (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border-2 ${getStatusColor(
                    event.status
                  )}`}
                >
                  {event.status}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {event.notes || event.description || "No description available"}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium">
                  {event.assignedDate?.split("T")[0]}
                </span>
                {event.trackName && (
                  <>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="text-blue-600 font-medium">
                      {event.trackName}
                    </span>
                  </>
                )}
              </div>

              {event.dueDate && (
                <div
                  className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md ${getPriorityColor(
                    event.daysRemaining
                  )}`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">
                    Due: {event.dueDate.split("T")[0]}
                    {event.daysRemaining !== null &&
                      event.daysRemaining !== undefined &&
                      ` (${
                        event.daysRemaining < 0
                          ? `${Math.abs(event.daysRemaining)} days overdue`
                          : `${event.daysRemaining} days remaining`
                      })`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default function ExaminerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: taskCreation, isLoading: isTaskCreationLoading } =
    useGetTaskCreation(true);
  const { data: examCreation, isLoading: isExamCreationLoading } =
    useGetExamCreation(true);
  const { data: statsData, isLoading: isStatsLoading } =
    useGetStatisticalInfo();

  const allEvents = [
    ...(taskCreation?.data || []),
    ...(examCreation?.data || []),
  ];

  const statsConfig = [
    {
      label: "Pending Reviews",
      key: "pendingExamReviews",
      icon: CheckCircle,
      bgColor: "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20",
      textColor: "text-yellow-700",
      iconColor: "text-yellow-600",
    },
    {
      label: "Interview Requests",
      key: "pendingInterviewRequests",
      icon: Users,
      bgColor: "bg-gradient-to-br from-blue-400/20 to-blue-600/20",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
    },
    {
      label: "Task Creations",
      key: "pendingTaskCreations",
      icon: Clock,
      bgColor: "bg-gradient-to-br from-purple-400/20 to-purple-600/20",
      textColor: "text-purple-700",
      iconColor: "text-purple-600",
    },
    {
      label: "Task Submissions",
      key: "pendingTaskSubmissions",
      icon: BarChart3,
      bgColor: "bg-gradient-to-br from-green-400/20 to-green-600/20",
      textColor: "text-green-700",
      iconColor: "text-green-600",
    },
    {
      label: "Scheduled Interviews",
      key: "scheduledInterviews",
      icon: CalendarIcon,
      bgColor: "bg-gradient-to-br from-indigo-400/20 to-indigo-600/20",
      textColor: "text-indigo-700",
      iconColor: "text-indigo-600",
    },
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseAssignedDate = (assignedDateStr) => {
    if (!assignedDateStr) return null;
    try {
      const date = new Date(assignedDateStr);
      if (isNaN(date.getTime())) return null;
      return formatDate(date);
    } catch (error) {
      return null;
    }
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return allEvents.filter((event) => {
      const eventAssignedDate = parseAssignedDate(event.assignedDate);
      return eventAssignedDate === dateStr;
    });
  };

  const getEventDates = () => {
    const uniqueDateStrings = [
      ...new Set(
        allEvents
          .filter(
            (event) =>
              event.assignedDate && parseAssignedDate(event.assignedDate)
          )
          .map((event) => parseAssignedDate(event.assignedDate))
          .filter(Boolean)
      ),
    ];

    return uniqueDateStrings.map((dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    });
  };

  // Function to check if a date has events
  const hasEventsOnDate = (date) => {
    const dateStr = formatDate(date);
    return allEvents.some((event) => {
      const eventAssignedDate = parseAssignedDate(event.assignedDate);
      return eventAssignedDate === dateStr;
    });
  };

  const handleDateSelect = (date) => {
    if (!date) return;
    // Only allow selection if the date has events
    if (hasEventsOnDate(date)) {
      setSelectedDate(date);
      setSelectedEvent(null);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);
  const eventDates = getEventDates();
  const formattedSelectedDate = selectedDate
    ? format(selectedDate, "dd MMM yyyy")
    : "";

  const filteredEvents = eventsForSelectedDate.filter(
    (event) =>
      (event.stageName || event.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (event.notes || event.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  console.log("allEvents", allEvents);

  if (isTaskCreationLoading || isExamCreationLoading || isStatsLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto ">
        <Welcome />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2 dark:text-white">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Statistical Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {statsConfig.map((config, index) => (
                  <StatsCard
                    key={index}
                    config={config}
                    value={statsData?.data?.[config.key]}
                    isLoading={isStatsLoading}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/50 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Event Calendar
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => !hasEventsOnDate(date)}
                  modifiers={{
                    hasEvents: eventDates,
                    disabled: (date) => !hasEventsOnDate(date),
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: "#dbeafe",
                      color: "#1d4ed8",
                      fontWeight: "bold",
                      border: "1px solid #3b82f6",
                      borderRadius: "8px",
                    },
                    disabled: {
                      backgroundColor: "#f3f4f6",
                      color: "#9ca3af",
                      cursor: "not-allowed",
                      opacity: "0.5",
                    },
                  }}
                  modifiersClassNames={{
                    hasEvents:
                      "hover:bg-blue-200 transition-colors cursor-pointer",
                    disabled: "hover:bg-gray-100 cursor-not-allowed",
                  }}
                  className="w-full"
                />
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-200 border border-blue-500 rounded"></div>
                  <span>Dates with events</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/50 dark:border-gray-700 max-h-[420px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Events for {formattedSelectedDate}
                </h3>
                <div className="relative hidden md:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-track-gray-100  scrollbar-custom">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`transition-all cursor-pointer border rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 ${
                        selectedEvent?.id === event.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-100 dark:ring-blue-700/50"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-base font-semibold text-gray-800 dark:text-white">
                          {event.stageName}
                        </h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            event.status === "Overdue"
                              ? "text-red-500 bg-red-100 dark:bg-red-800/30 dark:text-red-400"
                              : "text-blue-600 bg-blue-100 dark:bg-blue-800/30 dark:text-blue-400"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 truncate">
                        {event.description}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Due: {event.dueDate.split("T")[0]}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                      <p className="text-lg font-medium">No events scheduled</p>
                      <p className="text-sm">for {formattedSelectedDate}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedEvent && (
                <div className="mt-6 p-4 border-t pt-4 bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-700/40 rounded-b-2xl">
                  <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    {selectedEvent.title}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {selectedEvent.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {selectedEvent.date}
                    </span>
                    <span
                      className={`text-xs bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full ${
                        selectedEvent.status === "Overdue"
                          ? "text-red-500 bg-red-100 dark:bg-red-800/30 dark:text-red-400"
                          : "text-blue-600 bg-blue-100 dark:bg-blue-800/30 dark:text-blue-400"
                      }`}
                    >
                      Status: {selectedEvent.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
