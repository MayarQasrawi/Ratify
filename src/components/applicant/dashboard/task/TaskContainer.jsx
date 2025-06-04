import React from 'react'

export default function TaskContainer({children}) {
  return (
    <div className='bg-white mt-2.5 rounded-lg shadow-md p-6 pb-8 min-h-[50vh] '>
      {children}
    </div>
  )
}
