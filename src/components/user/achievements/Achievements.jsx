import Title from "../shared/Title";
import { FaUserTie, FaBookOpen } from "react-icons/fa";
import img from '../../../assets/img/home/achievements.svg'
export default function Achievements() {
  return (
    <section className="bg-[#F3F3F3] p-6 text-center mt-8">
      <Title  first='Our ' last='Achievements'/>
      <div className="flex  mt-5 flex-wrap  justify-center gap-6 items-center">
       <div className="mt-3" >
        <img src={img } className="w-96"/>
       </div>
       <div className=" w-[60%] flex justify-center gap-8  flex-wrap">
          <div className="bg-white rounded-2xl  p-6 w-[200px] shadow-md flex flex-col items-center gap-2  ">
             <span className="text-[#3B82F6] font-bold sm:text-4xl  text-2xl">100</span>
             <div className="flex gap-2 items-center text-[#303030]"> <FaUserTie size={30} /> <span className="text-[16px] font-medium">Experts</span> </div>
          </div>
          <div className="bg-white rounded-md  p-6 w-[200px] shadow flex flex-col items-center gap-2 ">
             <span className="text-[#3B82F6] font-bold  text-2xl sm:text-4xl">50</span>
             <div className="flex gap-2 items-center text-[#303030]"> <FaBookOpen size={30} /> <span className="text-[16px] font-medium">Track <br />Available</span> </div>
          </div>
          <div className="w-full bg-white rounded-2xl  p-6 text-center shadow text-[#3B82F6] text-[20px] sm:text-2xl font-bold">Start your journey <span className='text-[#003F7D]'>now</span> </div>
       </div>
       
      </div>

    </section>
  )
}
