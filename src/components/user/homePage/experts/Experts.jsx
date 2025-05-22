import Title from "../../shared/Title";
import img from "../../../../assets/img/home/team.png";
import ExpertCard from "./ExpertCard";
import Button from "../../shared/Button";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useGetExaminers from "../../../../hooks/Admin/useGetExaminers";
const Teams = [
  { fullName: "Abrar Arman", image: img ,role:"Frontend Engineer" },
  { fullName: "Mayar Qasarwa", image: img,role:"Frontend Engineer"  },
  { fullName: "Abrar Arman", image: img, role:"Frontend Engineer" },
  { fullName: "Mayar Qasarwa", image: '', role:"Frontend Engineer" },
];
export default function Experts() {
  const {data:Team, isLoading:isTeamLoading, isError,error}=useGetExaminers({currentPage:1,itemsPerPage:4})
  const navigate=useNavigate()
  let isLoading=false;
  console.log(Team?.data?.data,'inside team home ////////////////')
  return (
    <section className="w-[90%]  mx-auto mt-32 pb-30 relative  ">
      <div className="flex  flex-wrap  w-screen p-30 lg:flex-nowrap gap-x-8 gap-y-10 items-center justify-center lg:bg-radial-[at_50%_100%]  lg: from-blue-50 to-blue-200 px-8 py-10 lg:rounded-s-full">
       <div className="flex flex-col gap-7 items-start"><Title first="Meet Our " last="Teams" />  <Button onClick={()=>navigate('/our-experts')}>Explore all Teams</Button></div> 
        <div className=" w-[70%] grid  sm:grid-cols-2 xl:grid-cols-4 gap-10">
          {isTeamLoading ? Array(4).fill(0).map((_,ind)=><ExpertCard key={ind} isLoading={isTeamLoading}/>) : Team?.data?.data.slice(0, 4).map((expert, ind) => (
            <ExpertCard isLoading={isLoading} key={ind} img={expert.image} name={expert.fullName} />
          ))}
        </div>
        <div className="lg:hidden flex gap-2 items-center text-[var(--main-color)] text-[18px] md:text-2xl font-semibold cursor-pointer">
          <span className=' hover:underline block' onClick={()=>{navigate('/our-experts')}}>Explore all Teams</span>
         <div className="flex items-center">
          <RiArrowRightSLine className="text-black font-bold" />
          <RiArrowRightSLine className="text-black font-bold" />
          <RiArrowRightSLine className="text-black font-bold" /></div>
         </div>
      </div>
    </section>
  );
}
