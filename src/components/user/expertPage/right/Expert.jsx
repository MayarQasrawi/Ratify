import { useState } from "react";
import img from "../../../../assets/img/home/team.png";
import ExpertCard from "./ExpertCard";
import Search from "./Search";
import { FaSadTear } from "react-icons/fa";
const experts = [
  {
    id: 1,
    trackId: 1,
    name: "Abrar Arman",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 2,
    trackId: 1,
    name: "Mayar Qasarwa",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 3,
    trackId: 1,
    name: "Abrar Arman",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 4,
    trackId: 1,
    name: "Mayar Qasarwa",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 5,
    trackId: 2,
    name: "Mayar Qasarwa",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 6,
    trackId: 2,
    name: "Mayar Qasarwa",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 7,
    trackId: 2,
    name: "Mayar Qasarwa",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 8,
    trackId: 3,
    name: "Mayar Qasarwa",
    img: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
];
export default function Expert({ searchParams ,setSearchParams }) {
  const [searchQuery, setsearchQuery] = useState('');
  const specialtyFilter = searchParams.get("specialty");
  const searchFilter=searchParams.get('query')
  console.log(specialtyFilter);
  const loading=false;
  if(loading){
    return (
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {Array.from({length:8},(_,ind)=>
        (
          <div key={ind} className="max-w-[320px] relative bg-slate-200  h-[200px] rounded-xl animate-pulse  ">
          <h2 className='absolute w-full py-2 rounded-tl-xl rounded-tr-none h-[70px] bg-slate-200 border border-gray-300  bottom-0 left-0    
         '
        >
        </h2></div>))}
      </div>
    )
  }
  let expertsFilter = experts.slice();
  if ( specialtyFilter) {
    expertsFilter = expertsFilter.filter(
      (expert) => expert.trackId == specialtyFilter
    );
  }
  if (searchFilter) {
    expertsFilter = expertsFilter.filter(
      (expert) => expert.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }
  if(searchFilter && expertsFilter.length==0){
    return <div className="">
       <Search   setsearchQuery={setsearchQuery} setSearchParams={setSearchParams} />
      <div className="mt-6 b h-[50vh] justify-center flex flex-col items-center gap-3 text-gray-500">
    <FaSadTear className="mx-auto  text-4xl text-blue-500" /> 
    <p className="text-lg font-semibold mt-2">No results found</p>
    <p className="text-sm">Try searching for a different expert.</p>
    </div> 
  </div>
  }
  return (
    <section>
      <Search   setsearchQuery={setsearchQuery} setSearchParams={setSearchParams} />
      {searchQuery && <div onClick={()=>setsearchQuery('')} className="text-white mt-2 cursor-pointer bg-[#003F7D] w-fit px-6 rounded py-1 t text-center">{searchQuery}</div>}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {expertsFilter.length>0 && expertsFilter.map((expert, index) => (
          <ExpertCard key={expert.id} expert={expert} index={index} />
        ))}
      </div>
    </section>
  );
}
