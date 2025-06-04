"use client"

import { useState } from "react"
import Table from "@/components/admin/shared/Table"
import { format, parseISO } from "date-fns"
import {
 
  FaChevronDown
} from "react-icons/fa"
import StatusBadge from "@/components/allExaminer/appointment/shared/StatusBage"
import AppointmentActions from "@/components/allExaminer/appointment/shared/AppointmentActions"
import FormattedTimeRange from "@/components/allExaminer/appointment/shared/FormattedTimeRange"
import { MdOutlineCalendarToday } from "react-icons/md";
import { TfiTime } from "react-icons/tfi";

function List({ appointments, onApprove, onReject }) {
  const [expandedAppointment, setExpandedAppointment] = useState(null)

  const handleExpand = (id) => {
    setExpandedAppointment((prev) => (prev === id ? null : id))
  }

  const tableColumns = ["User Name", "Date & Time", "Status", "Actions"]

  const renderRow = (appointment) => (
    <tr key={appointment.id} className="text-sm text-start hover:bg-gray-50  dark:hover:bg-gray-700/20 border-b">
      <td className="py-4 px-2 whitespace-nowrap font-medium text-gray-900">
        {appointment.userName}
        <div className="text-xs text-gray-500">User ID: {appointment.userId}</div>
      </td>

    

      <td className="py-4 px-2 whitespace-nowrap">
        <div className="flex flex-col items-start text-sm">

          <div className="flex items-center font-medium">
            <MdOutlineCalendarToday className="mr-1 text-gray-500 font-bold" />
            {format(parseISO(appointment.startTime), "MMM d, yyyy")}
          </div>
          <div className="flex items-center text-gray-500">
            <TfiTime className="mr-1" />
            <FormattedTimeRange
              startTime={appointment.startTime}
              endTime={appointment.endTime}
            />
          </div>
        </div>
      </td>

      <td className="py-4 px-2 whitespace-nowrap">
        <StatusBadge status={appointment.status} />
      </td>

      <td className="py-4 px-2 ">
        {appointment.status === "pending" ? (
          <AppointmentActions
            appointmentId={appointment.id}
            onApprove={onApprove}
            onReject={onReject}
          />
        ) : (
          <button
            onClick={() => handleExpand(appointment.id)}
            className="text-blue-600 hover:text-blue-800  flex items-center"
          >
            Details
            <FaChevronDown
              className={`ml-1 transition-transform ${
                expandedAppointment === appointment.id ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </td>
    </tr>
  )

  return (
    <div>
      <Table
        cols={tableColumns}
        data={appointments}
        row={renderRow}
        headerColor="bg-gray-100 dark:bg-[var(--input-border)]"
        headerTextColor="text-gray-500 dark:text-[var(--text-color)]"
      />
    </div>
  )
}

export default List
