import React, { useState } from 'react'
import { AiOutlineClose,AiOutlineRollback } from 'react-icons/ai';
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

export default function Accordion({ title, description,isActive, children, onDelete, badge,length,ind=false }) {
  const [toggle, setToggle] = useState(false)
  
  return (
    <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-4 transition-all duration-200 hover:shadow-lg">
      <div
        className={`flex justify-between items-center p-4 ${toggle ? "bg-blue-50 dark:bg-gray-700" : "bg-[var(--sidebar-bg)] hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-500"} cursor-pointer transition-colors duration-200`}
        onClick={() => setToggle(!toggle)}
      >
        <div className="flex items-center flex-1 ">
          {toggle ? (
            <BiChevronDown className="text-blue-600 mr-2 flex-shrink-0" size={22} />
          ) : (
            <BiChevronRight className="text-blue-600 mr-2 flex-shrink-0" size={22} />
          )}
          <div className='w-full'>
            <div className='flex justify-between items-center  w-full'>
            <h3 className="font-medium text-lg text-gray-800 dark:text-white">{title}</h3>
             <div className="flex items-center ml-2">
          {onDelete && ind && length==1? null : (
            <button
             title={isActive?' delete':'Activate'}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="ml-2 p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-700 transition-color duration-200 focus:outline-none"
              aria-label="Delete"
            >
             {isActive ? <AiOutlineClose size={18} className="cursor-pointer" />:<BsToggleOn size={18} className="cursor-pointer"  /> } 
            </button>
          )}
        </div>
              </div>
            <div className="text-gray-600 text-sm mt-1">{description}</div>
            {badge && (
              <span className="text-xs bg-blue-100 dark:bg-white text-blue-700 font-medium px-3 py-1 rounded-full mt-2 inline-block">
                {badge}
              </span>
            )}
          </div>
        </div>
       
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          toggle ? "max-h-[2000px] opacity-100 overflow-y-auto scrollbar-custom" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5  bg-[var(--sidebar-bg)] dark:border-gray-700 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}

