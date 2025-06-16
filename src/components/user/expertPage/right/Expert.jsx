import { useState } from "react";
import img from "../../../../assets/img/home/team.png";
import ExpertCard from "./ExpertCard";
import Search from "./Search";
import { FaSadTear } from "react-icons/fa";
import { MdClose} from "react-icons/md";
import Pagination from "./Pagination";
import useGetExaminers from "../../../../hooks/Admin/useGetExaminers";
const experts = [
  {
    id: 1,
    trackId: 1,
    fullName: "Abrar Arman",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 2,
    trackId: 1,
    fullName: "Mayar Qasarwa",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 3,
    trackId: 1,
    fullName: "Abrar Arman",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 4,
    trackId: 1,
    fullName: "Mayar Qasarwa",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 5,
    trackId: 2,
    fullName: "Mayar Qasarwa",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 6,
    trackId: 2,
    fullName: "Mayar Qasarwa",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 7,
    trackId: 2,
    fullName: "Mayar Qasarwa",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
  {
    id: 8,
    trackId: 3,
    fullName: "Mayar Qasarwa",
    image: img,
    Bio: "Expert in artificial intelligence with 10+ years of experience in machine learning and neural networks.",
  },
];
export default function Expert({ searchParams ,setSearchParams }) {
  const [currentPage, setCurrentPage] = useState(1);
  const {data:Teams, isLoading, isError,error}=useGetExaminers({page:currentPage,itemsPerPage:10})
  const [searchQuery, setsearchQuery] = useState('');
  const specialtyFilter = searchParams.get("specialty");
  const searchFilter=searchParams.get('query')
  console.log(specialtyFilter);
  // const loading=false;
  console.log(isLoading,'insude team page')
  console.log(Teams,'inside expert page check .......................',currentPage)
  if(isLoading){
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
  let expertsFilter =Teams && Teams.data.data.slice()  ;
  if ( specialtyFilter) {
    expertsFilter = expertsFilter.filter(
      (expert) => expert.
workingTracks.map(exp=>exp.id)[0] == specialtyFilter
    );
  }
  if (searchFilter) {
    expertsFilter = expertsFilter.filter(
      (expert) => expert.fullName.toLowerCase().includes(searchFilter.toLowerCase())
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
      <Search  setsearchQuery={setsearchQuery} setSearchParams={setSearchParams} />
      {searchQuery && <div onClick={()=>{setsearchQuery(''),setSearchParams('query',null)}} className="text-white mt-2 cursor-pointer bg-[#003F7D] w-fit px-8 rounded-full py-1 t text-center flex items-center gap-1">{searchQuery}<MdClose className="hover:text-red-500 text-lg" /></div>}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {expertsFilter.length>0 && expertsFilter.map((expert, index) => (
          <ExpertCard key={expert.id} expert={expert} index={index} />
        ))}
      </div>
      <div className="mt-5  p-5">
       {Teams?.data?.totalPages >1 && <Pagination  totalPage={Teams?.data?.totalPages || 5} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
      </div>
    </section>
  );
}
