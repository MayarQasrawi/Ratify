import React from "react"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { LuCircleCheckBig } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";

export default function AppointmentActions({ appointmentId, onApprove, onReject }) {
  return (
    <div className="flex font-medium ">
      <button
        onClick={() => onApprove(appointmentId)}
        className="text-sm px-2 py-1  text-green-600 max-w-24  hover:text-green-800 flex items-center"
      >
        <LuCircleCheckBig size={14} className="mr-1" />
        Approve
      </button>
      <button
        onClick={() => onReject(appointmentId)}
        className="text-sm px-2 py-1 text-red-500 max-w-24 hover:text-red-800 flex items-center"
      >
        <TiDeleteOutline size={16} className="mr-1" />
        Reject
      </button>
    </div>
  )
}
