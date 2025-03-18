import { useState } from "react";
import AddEmployee from "../AddEmployee";

export default function Add({ icon, text, table }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex cursor-pointer items-center justify-center px-3 py-2  bg-[#3B82F6] text-white rounded-lg hover:bg-[#003F7D] transition-colors shadow-sm font-medium"
      >
        {icon}
        <span>{text}</span>
      </button>
      {isOpen && table == "teams" && (
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <AddEmployee setIsOpen={setIsOpen} />
        </div>
      )}
    </>
  );
}
