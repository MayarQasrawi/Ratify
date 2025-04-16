import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

export default function Accordion({ title, description, children, onDelete, badge }) {
  const [toggle, setToggle] = useState(false)
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden mb-4 transition-all duration-200 hover:shadow-lg">
      <div
        className={`flex justify-between items-center p-4 ${toggle ? "bg-blue-50" : "bg-white hover:bg-blue-50"} cursor-pointer transition-colors duration-200`}
        onClick={() => setToggle(!toggle)}
      >
        <div className="flex items-center flex-1">
          {toggle ? (
            <BiChevronDown className="text-blue-600 mr-2 flex-shrink-0" size={22} />
          ) : (
            <BiChevronRight className="text-blue-600 mr-2 flex-shrink-0" size={22} />
          )}
          <div>
            <h3 className="font-medium text-lg text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
            {badge && (
              <span className="text-xs bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full mt-2 inline-block">
                {badge}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center ml-2">
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-color duration-200 focus:outline-none"
              aria-label="Delete"
            >
              <AiOutlineClose size={18} className="cursor-pointer" />
            </button>
          )}
        </div>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          toggle ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5 bg-white border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}

