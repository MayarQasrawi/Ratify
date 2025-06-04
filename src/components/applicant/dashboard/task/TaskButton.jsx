import React from "react";

export default function TaskButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="cursor-pointer font-semibold px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
      {children}
    </button>
  );
}
