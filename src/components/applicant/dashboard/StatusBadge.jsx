import React from 'react';

const statusStyles = {
  completed: "bg-green-100 text-green-800",
  "in-progress": "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  locked: "bg-gray-100 text-gray-800",
  failed: "bg-red-100 text-red-800"
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || "bg-gray-100 text-gray-800";
  const label = status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
