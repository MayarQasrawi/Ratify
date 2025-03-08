import WorkCard from "./WorkCard";
import Workflow from "./Workflow";
import { FaChevronRight } from "react-icons/fa";
import myImg from '../../../assets/img/home/work_start.svg'

export default function Work() {
  return (
    <section className="w-[90%] mx-auto rounded-xl mt-22 relative">
    <h2 className="bg-[#3B82F6] mx-auto z-20 relative -bottom-2 text-white font-bold w-fit px-7 py-1 text-center rounded-md">
      How It Works
    </h2>
  
    <div className="bg-[#003F7D] relative z-10 rounded-2xl py-6 px-3 items-start flex md:items-center gap-2 ">
      <div className="absolute w-24 h-24 border-[#3B82F6] border-14 rounded-full -top-12 right-0  -z-10 hidden lg:block"></div>
      <WorkCard text="Loss Job Seeker" img={myImg} />
      <Workflow />
      
    </div>
  </section>
  
  )
}
