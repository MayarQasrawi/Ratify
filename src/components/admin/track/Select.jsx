import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const options = [
  { id: 1, value: "Abrar" },
  { id: 2, value: "Abr" },
  { id: 3, value: "Abrar" },
];
export default function Select({selectRef}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  selectRef.current=selectedOption;
  return (
    <div className="bg-[var(--sidebar-icon-bg)] rounded-lg p-3 text-gray-900 font-medium">
      <p className="text-sm sm:text-[16px] md:text-lg font-semibold text-gray-900">Track Manager</p>
      <div className="mt-3 relative" >
        <div
          className="w-full text-gray-900 p-2  bg-white  rounded-lg flex justify-between items-center cursor-pointer"
          onClick={()=>setIsOpen(!isOpen)}
        >
          <span
          className="text-sm"
          >
            {selectedOption ? selectedOption : "Choose Manager"}
          </span>
          <FiChevronDown />
        </div>

        {isOpen && (
          <div className="absolute -mt-.5  text-sm text-gray-900 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.id}
                className='p-2 cursor-pointer hover:bg-gray-50 text-gray-900'
                onClick={() =>{setSelectedOption(option.value);setIsOpen(false)}}
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
