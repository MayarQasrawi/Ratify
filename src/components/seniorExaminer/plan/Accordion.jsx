import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

export default function Accordion({ title, description, children, onDelete, badge }) {
    const [toggle,setToggle]= useState(false)
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
    <div 
      className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 cursor-pointer"
      onClick={()=>setToggle(!toggle)}
    >
      <div className="flex items-center">
        {toggle ? (
          <BiChevronDown className="text-blue-500 mr-2" size={20} />
        ) : (
          <BiChevronRight className="text-blue-500 mr-2" size={20} />
        )}
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          {badge && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">
              {badge}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {onDelete && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="ml-4 p-2 text-red-500 hover:text-red-700 focus:outline-none"
          >
            <AiOutlineClose size={18} className='cursor-pointer' />
          </button>
        )}
      </div>
    </div>
    {toggle && (
      <div className="p-4 bg-white border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
  )
}

