import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import useGetTaskCreation from "@/hooks/examiner/task/useGetTaskCreation";
import useGetExamCreation from "@/hooks/examiner/exam/useGetExamCreation";
import { format } from "date-fns";

export default function Event() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: taskCreation, isLoading: isTaskCreationLoading } =
    useGetTaskCreation(true);
  const {
    data: examCreation,
    error,
    isLoading: isExamCreationLoading,
  } = useGetExamCreation(true);

  const allEvents = [
    ...(taskCreation?.data || []),
    ...(examCreation?.data || []),
  ];
  if (selectedDate) {
    const date = new Date(selectedDate);
    var formatted = format(date, "dd MMM yyyy");
  }
  console.log(examCreation, "taskCreation", taskCreation);
  console.log(selectedDate, "selectedDate selectedDate");
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
      console.error("Error parsing date:", assignedDateStr, error);
      return null;
    }
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    console.log("Looking for events on date:", dateStr);

    const apiEvents = allEvents.filter((event) => {
      const eventAssignedDate = parseAssignedDate(event.assignedDate);
      console.log(
        "Event assignedDate:",
        event.assignedDate,
        "parsed as:",
        eventAssignedDate
      );
      return eventAssignedDate === dateStr;
    });

    console.log("Found events for date:", apiEvents);
    return apiEvents;
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

    const apiDates = uniqueDateStrings.map((dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    });

    console.log("Event dates for calendar highlighting:", apiDates);
    return apiDates;
  };

  const hasEventsOnDate = (date) => {
    return getEventsForDate(date).length > 0;
  };

  const handleDateSelect = (date) => {
    if (!date) return;

    console.log("Date selected:", date, "Has events:", hasEventsOnDate(date));
    setSelectedDate(date);
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);
  const eventDates = getEventDates();

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800 border-gray-200";

    switch (status.toLowerCase()) {
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "assigned":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isTaskCreationLoading || isExamCreationLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        <span>Error loading events: {error.message}</span>
      </div>
    );
  }

  console.log("All events loaded:", allEvents);

  return (
    <div className="max-w-4xl  p-4 space-y-6 bg-white  rounded-md flex flex-col items-center">
      <div>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            modifiers={{
              hasEvents: eventDates,
            }}
            modifiersStyles={{
              hasEvents: {
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
                fontWeight: "bold",
                border: "2px solid #3b82f6",
                borderRadius: "6px",
              },
            }}
            modifiersClassNames={{
              hasEvents: "hover:bg-blue-200 transition-colors cursor-pointer",
            }}
          />
        </CardContent>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-md font-semibold font-mono text-[var(--main-color)]">
            Events for {formatted}
          </h2>
        </div>
        <div className="h-96 overflow-y-auto space-y-3 pr-2 scrollbar-custom flex flex-col items-center">
          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event, index) => {
              const isSelected = selectedEvent?.id === event.id;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  className={`border transition-all w-[95%] max-w-md rounded-lg duration-200 cursor-pointer hover:shadow-md
            ${
              isSelected
                ? "bg-blue-50 border-blue-500"
                : "border-gray-200 hover:border-gray-300"
            }
            ${
              isEven
                ? "border-t-4 border-t-blue-500"
                : "border-t-4 border-t-[#003f7dde]"
            }`}
                  onClick={() => handleEventClick(event)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                            {event.stageName || event.title || "Untitled Event"}
                          </h3>
                          {event.status && (
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium border ${getStatusColor(
                                event.status
                              )}`}
                            >
                              {event.status}
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 mb-2">
                          {event.notes ||
                            event.description ||
                            "No description available"}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] sm:text-sm text-gray-500 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.assignedDate.split("T")[0]}</span>
                          </div>
                          {event.trackName && (
                            <>
                              <span>•</span>
                              <span>{event.trackName}</span>
                            </>
                          )}
                          {event.type && (
                            <>
                              <span className="capitalize">{event.type}</span>
                            </>
                          )}
                          {event.dueDate && (
                            <>
                              <span
                                className={
                                  event.daysRemaining < 0
                                    ? "text-red-600"
                                    : "text-orange-600"
                                }
                              >
                                Due: {event.dueDate.split("T")[0]}
                                {event.daysRemaining !== null &&
                                  event.daysRemaining !== undefined &&
                                  ` (${
                                    event.daysRemaining < 0
                                      ? `${Math.abs(
                                          event.daysRemaining
                                        )} days overdue`
                                      : `${event.daysRemaining} days remaining`
                                  })`}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500 w-full">
              <div className="text-center">
                <p className="text-base sm:text-lg">No events scheduled</p>
                <p className="text-sm">for {formatted}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
