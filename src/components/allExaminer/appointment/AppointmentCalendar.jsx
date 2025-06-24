"use client"

import { useState } from "react"
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import {
  FaChevronLeft,
  FaChevronRight,

} from "react-icons/fa"
import StatusBadge from "@/components/allExaminer/appointment/shared/StatusBage"
import AppointmentActions from "@/components/allExaminer/appointment/shared/AppointmentActions"
export default function AppointmentCalendar({ appointments, onApprove, onReject }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })



  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const appointmentsForSelectedDate = appointments.filter((appointment) =>
    isSameDay(parseISO(appointment.startTime), selectedDate),
  )

  return (
    <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-7 md:divide-x">
        {/* Calendar Grid */}
        <div className="md:col-span-5 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{format(currentMonth, "MMMM yyyy")}</h2>
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
              const dayAppointments = appointments.filter((appointment) =>
                isSameDay(parseISO(appointment.startTime), day),
              )

              const isSelected = isSameDay(day, selectedDate)

              return (
                <div
                  key={dayIdx}
                  onClick={() => setSelectedDate(day)}
                  className={`h-24 p-1 border border-gray-200 overflow-hidden cursor-pointer
                    ${isSelected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50"}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium  ${isSelected ? "text-blue-600" : "text-gray-700"}`}>
                      {format(day, "d")}
                    </span>
                    {dayAppointments.length > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                        {dayAppointments.length}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-1 overflow-hidden max-h-16">
                    {dayAppointments.slice(0, 2).map((appointment, idx) => (
                      <div
                        key={idx}
                        className={`text-sm truncate font-sans px-1 py-0.5 rounded ${
                          appointment.status === "pending"
                            ? "bg-yellow-100"
                            : appointment.status === "approved"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {format(parseISO(appointment.startTime), "h:mm a")}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 px-1">+{dayAppointments.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="md:col-span-2 p-4 bg-gray-100">
          <h3 className="font-medium text-gray-900 mb-4">{format(selectedDate, "MMMM d, yyyy")}</h3>

          {appointmentsForSelectedDate.length === 0 ? (
            <p className="text-gray-500 text-sm">No appointments for this date</p>
          ) : (
            <div className="space-y-4">
              {appointmentsForSelectedDate.map((appointment) => (
                <div key={appointment.id} className="bg-white p-3 rounded-md shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">{appointment.userName}</div>
                   <StatusBadge status={appointment.status} />

                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    {format(parseISO(appointment.startTime), "h:mm a")} -{" "}
                    {format(parseISO(appointment.endTime), "h:mm a")}
                  </div>
                  {appointment.status === "pending" && (
                    <div >
                          <AppointmentActions
                      appointmentId={appointment.id}
                      onApprove={onApprove}
                      onReject={onReject}
                    />
                         </div>

                  )}


                  {appointment.status === "rejected" && appointment.rejectionReason && (
                    <div className="mt-2 text-xs text-gray-500 italic">
                      Reason: {appointment.rejectionReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
