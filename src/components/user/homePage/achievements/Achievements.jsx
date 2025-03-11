import Title from "../../shared/Title";
import { FaUserTie, FaBookOpen, FaRocket } from "react-icons/fa";
import img from '../../../../assets/img/home/achievements.svg';

export default function Achievements() {
  return (
    <>
      <section className=" bg- p-6 py-[5%] text-center my-[10%]">
        <Title first='Our ' last='Achievements' />
        
        <div className="flex mt-8 flex-wrap justify-between items-center">
          {/* Image Container */}
          <div className="w-1/2 flex justify-center">
            <img src={img} className="w-full max-w-[400px]" alt="Achievements" />
          </div>

          {/* Grid Container */}
          <div className="w-1/2 grid grid-cols-4 gap-4  ">
            {/* First Box */}
            <div className="bg-white col-span-1 cursor-pointer hover:translate-y-[-10px] transition duration-300 rounded-2xl p-6 shadow-md flex flex-col items-center gap-2">
              <span className="text-[#3B82F6] font-bold sm:text-4xl lg:text-5xl">100</span>
              <div className="flex gap-2 items-center text-left text-[#303030]">
                <FaUserTie size={30} />
                <span className="text-[16px] font-medium">Experts</span>
              </div>
            </div>

            {/* Second Box */}
            <div className="bg-white col-span-1 cursor-pointer hover:translate-y-[-10px] transition duration-300 rounded-2xl p-6 shadow-md flex flex-col items-center gap-2">
              <span className="text-[#3B82F6] font-bold lg:text-5xl sm:text-4xl">50</span>
              <div className="flex gap-2 items-center text-left text-[#303030]">
                <FaBookOpen size={30} />
                <span className="text-[16px] font-medium">Track <br />Available</span>
              </div>
            </div>

            {/* Third Box */}
            <div className="text-white col-span-2 col-start-1  bg-[var(--main-color)] rounded-2xl col-span-2 cursor-pointer hover:bg-[var(--secondary-color)] shadow-md transition duration-300 p-6 text-center text-[20px] sm:text-2xl">
              <span>Start your journey</span>
              <FaRocket size={25} className="inline ml-2" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}