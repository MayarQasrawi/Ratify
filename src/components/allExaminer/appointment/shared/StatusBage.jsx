import React from "react"

import { LuCircleCheckBig } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";
import { LuTimerReset } from "react-icons/lu";

import { IoReload } from "react-icons/io5";
const StatusBadge = ({ status }) => {
  const commonClasses = "flex items-center px-2.5 py-1 rounded-full text-xs font-medium max-w-24 justify-center"

  switch (status) {
    case "pending":
      return (
        <span className={`${commonClasses} bg-yellow-100 text-yellow-600`}>
          <IoReload className="mr-1" size={14} />
          Pending
        </span>
      )
    case "approved":
      return (
        <span className={`${commonClasses} bg-green-100 text-green-600`}>
          <LuCircleCheckBig className="mr-1" size={14} />
          Approved
        </span>
      )
    case "rejected":
      return (
        <span className={`${commonClasses} bg-red-100 text-red-600`}>
          <TiDeleteOutline className="mr-1" size={16} />
          Rejected
        </span>
      )
    default:
      return null
  }
}

export default StatusBadge
