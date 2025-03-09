import React from 'react'
import TrackItem from './TrackItem';
const tracks = [{id:1,name:'Front End'}, {id:2,name:'Back End'},{id:4,name:'Data '}, {id:3,name:'AI'}];//assume get from api
export default function Sidebar({searchParams,setSearchParams}) {
  let loading=false;
  if(loading){
    return (
      <ul className='flex flex-row justify-center flex-wrap sm:flex-col w-min-[180px] gap-3.5 w-[90%] mt-16'>
     {Array.from({length:5},(_,ind)=> <li key={ind}  className='rounded-lg pl-3 pr-6 py-2 sm:w-min-[180px] animate-pulse border border-gray-300 bg-slate-200 animate-puls h-[40px] '></li>)} 
      
    </ul>
    )
  }
  return (
    <aside className=' overflow-y-auto  p-3 '>
      <p className='mb-6 text-gray-600 hidden md:block'>Browse experts by specialty</p>
      <ul className='flex flex-row justify-center flex-wrap sm:flex-col w-min-[180px] gap-3.5 w-[90%]'>
        {tracks.map(track=><TrackItem key={track.id} name={track.name} id={track.id} searchParams={searchParams} setSearchParams={setSearchParams}/>)}
      </ul>

    </aside>
  )
}
