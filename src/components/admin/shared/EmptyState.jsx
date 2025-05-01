

import React from 'react'
import { RiFileList3Line } from "react-icons/ri";

function EmptyState({ search, roleFilter, setSearch, setRoleFilter }) {
  return (
     <div className="flex flex-col items-center justify-center py-12 bg-[var(--sidebar-bg)] rounded-lg shadow-sm border border-[var(--table-border)]">
     <RiFileList3Line className="text-gray-400 w-16 h-16 mb-4" />
     <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No team members found</h3>
     <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">
       {search || roleFilter !== null 
         ? "Try adjusting your search or filters to find what you're looking for."
         : "There are no team members available at the moment."}
     </p>
     {(search || roleFilter !== null) && (
       <button 
         onClick={() => {
           setSearch("");
           setRoleFilter(null);
         }}

         className="px-4 py-2 text-sm font-medium text-white bg-[var(--button-bg)] rounded-md hover:bg-[var(--button-hover)] transition-colors"
       >
         Clear filters
       </button>
     )}
   </div>
  )
}

export default EmptyState
