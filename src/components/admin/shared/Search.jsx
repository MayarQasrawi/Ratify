import React from 'react';
import { FaSearch } from 'react-icons/fa';
import useAutoFocus from '../../../hooks/useAutoFocus';

export default function Search({ search, setSearch }) {
  const searchInput = useAutoFocus();
  return (
    <div className="relative ">
      <input
        ref={searchInput}
        type="text"
        className="w-full pl-10 focus:caret-blue-500 pr-4 py-2 placeholder:text-sm rounded-lg border  border-[var(--input-border)]  outline-none transition-all"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-3 text-[var(--text-color)]" />
    </div>
  );
}