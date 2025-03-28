import React from 'react'
import Title from '../shared/Title'
const number=[
    {type:'interview',total:4},
    {type:'Exam',total:5},
    {type:'Task',total:9},
]
export default function AdditionalInformation() {
  return (
    <div className='mt-20 w-[90%] mx-auto'>
       <div className='flex items-center gap-2'>  
            <Title>Additional Information</Title>
            <div className=' sm:w-[50%] lg:w-[70%]  border-t-2 border-[var(--main-color)]'></div>
            </div> 
        <div className='flex flex-wrap justify-center mt-8  gap-10'>
            {number.map((info,ind)=><div className='bg-[var(--secondary-color)] rounded-full w-[200px] h-[200px] flex justify-center items-center text-white font-medium text-4xl' key={ind}><div className='flex flex-col gap-2'><p className='text-center'>{info.total}</p><span className='text-2xl'>{info.type}</span></div></div>)}
        </div>
    </div>
  )
}
