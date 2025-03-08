import React from 'react'

export default function ExpertCard({expert,index}) {
  return (
    <div className='border-3 max-w-[320px] relative group cursor-pointer border-r-4 odd:border-[#3B82F6] even:border-[#003F7D] rounded-xl'>
    <div className='relative'>
      <img src={expert.img} className='w-full' alt={expert.name} />
      <h2 
        className={`absolute w-full text-white font-medium py-2 rounded-tl-xl rounded-tr-none text-center bottom-0 left-0 ${
          index % 2 === 0 ? 'bg-[#3B82F6]' : 'bg-[#003F7D]'
        }`}
      >
        {expert.name}
      </h2>
    </div>
    <div 
      className={`bg-white shadow-lg z-10 opacity-0 group-hover:opacity-100 
        w-[110%] absolute -top-3 
        ${index % 2 === 0 ? 'left-1/2 transform -translate-x-1/2' : 'right-1/2 transform translate-x-1/2'} 
        rounded-lg border border-gray-300 p-4 h-[110%] transition-opacity duration-300 ease-in-out`}
    >
      <div className="h-full flex flex-col justify-between">
        <p className="text-[#0E2A46] text-center">{expert.Bio}</p>
        
        {/* Arrow at bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div 
            className={`w-0 h-0 border-l-8 border-r-8 border-t-8 
              ${index % 2 === 0 ? 'border-t-[#3B82F6]' : 'border-t-[#003F7D]'} 
              border-l-transparent border-r-transparent`}
          />
        </div>
      </div>
    </div>
  </div>
  )
}
