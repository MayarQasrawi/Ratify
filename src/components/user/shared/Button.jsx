import React from 'react'

export default function Button({children,onClick}) {
  return (
    <button onClick={onClick} className="text-white  hover:bg-[#3B82FF] transition hidden lg:block text-sm bg-[#3B82F6] px-12 font-medium py-2 lg:py-2 rounded-full  cursor-pointer">
    {children}
  </button>
  )
}
