import React from 'react'

export default function Title({first,last}) {
  return (
    <h2 className='font-bold text-2xl md:text-3xl lg:text-[32px]'>
      <span className='text-[#003F7D] '>{first}</span><span className='text-[#3B82F6]'>{last}</span>
    </h2>
  )
}
