import React from 'react'
import { FaSearch } from 'react-icons/fa'
import useAutoFocus from '../../../hooks/useAutoFocus'

export default function Search({search,setSearch}) {
  const searchInput= useAutoFocus()
  return (
    <div className="relative flex-grow max-w-md">
    <input
      ref={searchInput}
      type="text"
      className="w-full pl-10 pr-4 py-2 placeholder:text-sm rounded-lg border border-gray-300 focus:caret-sky-700 outline-none transition-all"
      placeholder="Search by name, email or role..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <FaSearch className="absolute left-3 top-3 text-gray-400" />
  </div>
  )
}
