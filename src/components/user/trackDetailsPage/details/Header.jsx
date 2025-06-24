import { useNavigate } from "react-router-dom";
import img from "../../../../assets/img/tracks/frontEnd.png";
import Navbar from "../../shared/Navbar";
import { AiOutlineHome, AiOutlineArrowRight } from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";

export default function Header({name,image}) {
  const navigate=useNavigate()
  return (
    <>
      <header className="bg-[#003F7D] overflow-hidden hidden lg:block pt-5 pb-14 lg:h-[70vh] xl:h-[60vh] rounded-bl-[60px] rounded-br-[60px]">
        <Navbar />
        <div className="flex h-full gap-10 items-center justify-center">
          <div className="relative">
            <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300 ease-out">
              <img 
                src={`${import.meta.env.VITE_API}${image}`}
                className="lg:w-[140px] cursor-pointer xl:w-[180px] rounded-xl shadow-lg filter drop-shadow-lg" 
                alt={name}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-sm -z-10"></div>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-4xl text-[#3B82F6]">
              {name}
            </h1>
          </div>
        </div>
      </header>
      <>
        <header className="block w-[100vw] lg:hidden bg-[#003F7D] rounded-2xl">
          <Navbar />
        </header>
        <div className="lg:hidden mt-8 pl-8 flex items-center gap-2.5 text-sm text-gray-900 font-medium">
          <div onClick={()=>navigate('/')} className="flex gap-1 items-center cursor-pointer">
            <AiOutlineHome className="text-blue-500 text-2xl" />
            <span>Home</span>
          </div>
          <AiOutlineArrowRight className="text-gray-500 text-lg" />
          <div onClick={()=>navigate('/our-tracks')} className="flex gap-2.5 items-center cursor-pointer">
            <MdTrackChanges className="text-blue-500 text-2xl" />
            <span>Tracks</span>
          </div>
        </div>
      </>
    </>
  );
}
