import React from 'react'
import TrackItem from './TrackItem';
const tracks = [{id:1,name:'Front End'}, {id:2,name:'Back End'},{id:4,name:'Data '}, {id:3,name:'AI'}];//assume get from api
export default function Sidebar({searchParams,setSearchParams}) {
  return (
    <aside className=' overflow-y-auto  p-3 '>
      <p className='mb-6 text-gray-600 hidden md:block'>Browse experts by specialty</p>
      <ul className='flex flex-row justify-center flex-wrap sm:flex-col w-min-[180px] gap-2 w-[90%]'>
        {tracks.map(track=><TrackItem key={track.id} name={track.name} id={track.id} searchParams={searchParams} setSearchParams={setSearchParams}/>)}
      </ul>

    </aside>
  )
}
