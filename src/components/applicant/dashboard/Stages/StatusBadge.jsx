import React from 'react';

const statusStyles = {
  completed: "bg-green-500/10 text-green-600",
  "InProgress": "bg-purple-500/10 text-purple-600",
  pending: "bg-yellow-500/10 text-yellow-600",
  failed: "bg-red-500/100 text-red-600"
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || "bg-gray-100 text-gray-800";
  const label = status

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
