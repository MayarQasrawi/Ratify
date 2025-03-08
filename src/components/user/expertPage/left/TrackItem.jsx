
export default function TrackItem({name,id,searchParams,setSearchParams}) {
  const specialty =searchParams.get('specialty');
  return (
    <li onClick={() =>specialty==id?setSearchParams('specialty',null):setSearchParams('specialty',id)} className={`cursor-pointer hover:bg-[#3B82F6] hover:text-white ${specialty==id && 'bg-[#3B82F6] text-white'} transition rounded-lg pl-3 pr-6 py-2 sm:w-min-[180px] text-center sm:text-left text-[#171725] border border-gray-300`}>
      {name}
    </li>
  )
}
