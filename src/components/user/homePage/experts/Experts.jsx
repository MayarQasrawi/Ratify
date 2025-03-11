import Title from "../../shared/Title";
import img from "../../../../assets/img/home/team.png";
import ExpertCard from "./ExpertCard";
import Button from "../../shared/Button";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const experts = [
  { name: "Abrar Arman", img: img ,role:"Frontend Engineer" },
  { name: "Mayar Qasarwa", img: img,role:"Frontend Engineer"  },
  { name: "Abrar Arman", img: img, role:"Frontend Engineer" },
  { name: "Mayar Qasarwa", img: img, role:"Frontend Engineer" },
];
export default function Experts() {
  const navigate=useNavigate()
  return (
    <section className="w-[90%]  mx-auto mt-20 pb-30 relative ">
      <div className="flex  flex-wrap  w-screen p-30 lg:flex-nowrap gap-8 items-center justify-center bg-radial-[at_50%_100%]   from-blue-50 to-blue-200 px-8 py-10 lg:rounded-s-full">
       <div className="flex flex-col gap-3 items-start"><Title first="Meet Our " last="Experts" />  <Button onClick={()=>navigate('/our-experts')}>Explore all Experts</Button></div> 
        <div className=" w-[70%] grid  sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {experts.slice(0, 4).map((expert, ind) => (
            <ExpertCard key={ind} img={expert.img} name={expert.name} role={expert.role} />
          ))}
        </div>
        <div className="lg:hidden flex gap-2 items-center text-[#3B82F6] text-[18px] md:text-2xl font-semibold cursor-pointer">
          <span className=' hover:underline block' onClick={()=>{navigate('/our-experts')}}>Explore all Experts</span>
         <div className="flex items-center">
          <RiArrowRightSLine className="text-white font-bold" />
         <RiArrowRightSLine className="text-white font-bold" />
         <RiArrowRightSLine className="text-white font-bold" /></div>
         </div>

      </div>
    </section>
  );
}
