import { useState, useEffect } from "react";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  isValid,
} from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StatusBadge from "@/components/allExaminer/appointment/shared/StatusBage";
import AppointmentActions from "@/components/allExaminer/appointment/shared/AppointmentActions";

export default function AppointmentCalendar({ appointments, onApprove, onReject }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] = useState([]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const parseAppointmentDate = (appointment, field = "start") => {
    let dateString;
   // ✅ اجعلها تدعم scheduledDate
if (field === 'start') {
  dateString = appointment.scheduledDate || appointment.startDate || appointment.localStartTime || appointment.startTime;
} else if (field === 'end') {
  dateString = appointment.endDate || appointment.localEndTime || appointment.endTime;
}


    if (!dateString) return null;

    try {
      let date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
      if (!isValid(date)) {
        date = new Date(dateString);
      }
      return isValid(date) ? date : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const filtered = appointments?.filter((appointment) => {
      const appointmentDate = parseAppointmentDate(appointment, "start");
      return appointmentDate && isSameDay(appointmentDate, selectedDate);
    }) || [];
    setAppointmentsForSelectedDate(filtered);
  }, [appointments, selectedDate]);

  const getAppointmentsForDay = (day) => {
    return appointments?.filter((appointment) => {
      const appointmentDate = parseAppointmentDate(appointment, "start");
      return appointmentDate && isSameDay(appointmentDate, day);
    }) || [];
  };

  return (
    <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md overflow-hidden">
      <div className="p-2 bg-blue-50 border-b text-xs text-blue-600">
        Total appointments: {appointments?.length || 0} |{" "}
        Selected date: {format(selectedDate, "MMM d, yyyy")} |{" "}
        Appointments for selected: {appointmentsForSelectedDate.length}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 md:divide-x">
        {/* Calendar Grid */}
        <div className="md:col-span-5 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex space-x-2">
              <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                <FaChevronLeft size={16} />
              </button>
              <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}

            {monthDays.map((day, dayIdx) => {
              const dayAppointments = getAppointmentsForDay(day);
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={dayIdx}
                  onClick={() => setSelectedDate(day)}
                  className={`h-24 p-1 border border-gray-200 overflow-hidden cursor-pointer transition-colors
                    ${isSelected ? "bg-blue-50 border-blue-500" : ""}
                    ${isToday ? "ring-2 ring-blue-300" : ""}
                    hover:bg-gray-50`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-sm font-medium ${
                        isSelected
                          ? "text-blue-600"
                          : isToday
                          ? "text-blue-500 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {dayAppointments.length > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white font-medium">
                        {dayAppointments.length}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-1 overflow-hidden max-h-16">
                    {dayAppointments.slice(0, 2).map((appointment, idx) => {
                      const appointmentDate = parseAppointmentDate(appointment, "start");
                      return (
                        <div
                          key={appointment.id || idx}
                          className={`text-xs truncate font-sans px-1 py-0.5 rounded ${
                            appointment.status?.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status?.toLowerCase() === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointmentDate ? format(appointmentDate, "h:mm a") : "Time N/A"}
                        </div>
                      );
                    })}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 px-1">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="md:col-span-2 p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-4">
            {format(selectedDate, "MMMM d, yyyy")}
          </h3>

          {appointmentsForSelectedDate.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-400">📅</span>
              </div>
              <p className="text-gray-500 text-sm">No appointments for this date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointmentsForSelectedDate.map((appointment) => {
                const startDate = parseAppointmentDate(appointment, "start");
                const endDate = parseAppointmentDate(appointment, "end");

                return (
                  <div key={appointment.id} className="bg-white p-3 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.applicantName ||
                          appointment.userName ||
                          appointment.name ||
                          "Unknown User"}
                      </div>
                      <StatusBadge status={appointment.status} />
                    </div>

                    <div className="text-xs text-gray-600 mb-2">
                      {startDate && endDate ? (
                        <>
                          {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
                        </>
                      ) : startDate ? (
                        format(startDate, "h:mm a")
                      ) : (
                        "Time not available"
                      )}
                    </div>

                    {appointment.trackName && (
                      <div className="text-xs text-gray-500 mb-2">
                        Track: {appointment.trackName}
                      </div>
                    )}

                    {appointment.status?.toLowerCase() === "pending" && (
                      <div className="pt-2 border-t">
                        <AppointmentActions
                          appointmentId={appointment.id}
                          onApprove={onApprove}
                          onReject={onReject}
                        />
                      </div>
                    )}

                    {appointment.status?.toLowerCase() === "rejected" &&
                      appointment.rejectionReason && (
                        <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                          <strong>Rejection reason:</strong> {appointment.rejectionReason}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
