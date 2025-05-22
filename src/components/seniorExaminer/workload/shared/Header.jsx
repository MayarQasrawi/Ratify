import React from 'react'

export default function Header({children}) {
  return (
   <header className="bg-[var(--main-color)] p-4 text-white ">
            <h2 className="text-2xl font-semibold text-center">{children}</h2>
          </header>
  )
}
