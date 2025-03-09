import React from 'react'

import { MdOutlinePushPin } from "react-icons/md";
import { BiShowAlt } from "react-icons/bi";

function TracksCard({header, description,img}) {
  return (
   <div class=" flex flex-col gap-0 max-w-sm rounded-lg  bg-[#2A5C8A]  items-center   text-center justify-center  w-78 h-80 p-6">
      
      <div  className='  mt-20'>
      {img} </div>

    <div class=" bg-white  text-xl  w-72 h-48 rounded-lg p-4 mt-4  ">
    <div className='h-24 items-center '>
    <h1 className='font-bold ' >{header}</h1>
     
     <p class="text-gray-600  text-sm overflow-hidden">
      {description}
     </p>
    </div>
    

    <div class="mt-4 ">
      <a href="#" class="text-[#3B82F6]  text-base  text-sm border-1 items-center border-[#3B82F6]  py-1 px-4 rounded-lg hover:border-[#2A5C8A] hover:text-[#2A5C8A]">
       Details <BiShowAlt className='inline text-xl '/>
        
      </a>
      <div class="mt-4">
      <a href="#" class="inline-block  bg-blue-500 text-white text-sm py-1 px-16 rounded-3xl hover:bg-[#2A5C8A]">
      <MdOutlinePushPin  className='inline text-lg'/> Enroll Now
      </a>
    </div>
    </div>

 
    </div>
  
  
   
  </div>
  )
}

export default TracksCard