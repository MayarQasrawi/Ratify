import React from 'react'

export default function Button({children}) {
  return (
    <button className="text-white hidden lg:block text-sm bg-[#3B82F6] px-7 py-2 lg:py-2 rounded-full font-semibold cursor-pointer">
    {children}
  </button>
  )
}
