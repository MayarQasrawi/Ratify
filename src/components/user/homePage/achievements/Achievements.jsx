import Title from "../../shared/Title";
import { FaUserTie, FaBookOpen,FaRocket  } from "react-icons/fa";
import img from '../../../../assets/img/home/achievements.svg'
export default function Achievements() {
  return (
    <section className="p-6 text-center mt-22">
      <Title  first='Our ' last='Achievements'/>
      <div className="flex  mt-8 flex-wrap  justify-center gap-7 items-center">
       <div className="mt-3" >
        <img src={img } className="w-96"/>
       </div>
       <div className=" w-[60%] mt-8 flex justify-center gap-8  flex-wrap">
          <div className="bg-white  cursor-pointer hover:translate-y-[-10px] transition duration-300 rounded-2xl  p-6 w-[200px] shadow-md flex flex-col items-center gap-2  ">
             <span className="text-[#3B82F6] font-bold sm:text-4xl  text-2xl">100</span>
             <div className="flex gap-2 items-center text-[#303030]"> <FaUserTie size={30} /> <span className="text-[16px] font-medium">Experts</span> </div>
          </div>
          <div className="bg-white cursor-pointer hover:translate-y-[-10px] transition duration-300 rounded-md  p-6 w-[200px] shadow flex flex-col items-center gap-2 ">
             <span className="text-[#3B82F6] font-bold  text-2xl sm:text-4xl">50</span>
             <div className="flex gap-2 items-center text-[#303030]"> <FaBookOpen size={30} /> <span className="text-[16px] font-medium">Track <br />Available</span> </div>
          </div>
          <div className=" bg-[#3B82F6] rounded-2xl hover:bg-[#003F7D] transition p-6 text-center shadow text-white text-[20px] sm:text-2xl font-bold w-[95%]">
           <span> Start your journey </span>
            <span >now</span>
            <FaRocket className="mt-1.5 text-white"/>
            </div>
       </div>
       
      </div>

    </section>
  )
}
