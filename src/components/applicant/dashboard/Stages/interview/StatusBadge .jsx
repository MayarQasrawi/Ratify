import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; // Importing from react-icons

const StatusBadge = ({ status }) => {


  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          text: "Success",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          icon: <FiCheckCircle className="w-4 h-4" />, // Using react-icons
        };
      case "failed":
        return {
          text: "Failed",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          icon: <FiXCircle className="w-4 h-4" />, // Using react-icons
        };
      default:
        return {
          text: "Unknown",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          borderColor: "border-gray-200",
          icon: <div className="w-4 h-4 bg-gray-400 rounded-full"></div>,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} font-medium text-sm`}
    >
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

export default StatusBadge;