import React from 'react'

export default function Button({children,onClick}) {
  return (
    <button onClick={onClick} className="text-white  hover:bg-[#003F7D] transition hidden lg:block text-sm bg-[var(--main-color)] px-12 font-medium py-2 lg:py-2 md:text-lg rounded-full  cursor-pointer">
    {children}
  </button>
  )
}
