import React from 'react'

export default function Title({first,last}) {
  return (
    <h2 className='font-bold text-3xl md:text-3xl lg:text-[34px]'>
      <span className='text-[var(--secondary-color)] '>{first}</span><span className='text-[var(--main-color)]'>{last}</span>
    </h2>
  )
}
