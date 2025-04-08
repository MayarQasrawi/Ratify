import React from 'react'

export default function Button({children}) {
  return (
    <button
    type="submit"
    className="px-5 py-2 cursor-pointer  bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-[12px] sm:text-sm"
  >
   {children}
  </button>
  )
}
