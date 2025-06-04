import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TrackCard({isLoading,tracks,isError}) {
  const [currentIndex, setCurrentIndex] = useState(0);
 const navigate= useNavigate()
 console.log(tracks,isLoading,'inside track card')
 if(isError)
  return <div>error</div>
  return (
    <>
      <div className=" gap-2 relative hidden md:flex  lg:hidden">
       {isLoading && <div className="bg-gray-300  flex h-[200px] items-center gap-4 animate-pulse rounded-xl w-[320px] px-3"></div>}
        {!isLoading && <><div className="bg-[#E7ECFF] flex cursor-pointer items-center gap-4 h-full rounded-xl w-[320px] px-3">
          <h3 className="text-[18px] font-semibold">
            <span className="text-[var(--main-color)]">{tracks[currentIndex].name} </span>
            <br />
            <span className="text-[#003F7D]">Developing</span>
          </h3>
          <img src={tracks[currentIndex].image} className="w-[160px]" />
        </div>
        <div className="flex gap-2.5 absolute left-36 -bottom-5 ">
          {Array.from({ length: tracks.length }, (_, ind) => (
            <div
              key={ind}
              className={`w-3 h-3 rounded-full  transition-colors duration-300 ${
                ind === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3 absolute -top-12 left-[280px] ">
          {currentIndex != 0 && (
            <div className="bg-[var(--main-color)] w-[30px] h-[30px] rounded-full flex items-center justify-center">
              {" "}
              <FaArrowLeft
                onClick={() => {
                  setCurrentIndex(currentIndex - 1);
                }}
                className="text-white text-[15px] cursor-pointer  "
              />
            </div>
          )}
          {currentIndex != tracks.length - 1 && (
            <div className="bg-[var(--main-color)] w-[30px] h-[30px] rounded-full flex items-center justify-center">
              <FaArrowRight
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                }}
                className="text-white text-[15px] cursor-pointer "
              />
            </div>
          )}
        </div></>}  
      </div>
      <div className="md:hidden grid grid-cols-1 lg:grid lg:grid-cols-2 gap-x-4 gap-y-8 cursor-pointer">
        {isLoading ? Array.from({length:4},(_,ind)=><div key={ind}  className="bg-gray-300 w-[300px] h-[200px] animate-pulse flex items-center gap-4 rounded-xl px-3 py-2 ">
        </div>)
        : tracks.slice(0, 4).map((track, index) => (
          <div
            key={index}
            className="bg-[#E7ECFF] flex items-center gap-4 rounded-xl px-3 py-2 hover:scale-105 transition-transform duration-300"
          >
            <div className="">
              <h3 className="text-[18px] font-semibold">
                <span className="text-[var(--main-color)]">{track.name}</span>
                <br />
                <span className="text-[#003F7D]">Developing</span>
              </h3>
            </div>
            <img src={track.image} alt={track.name} className="w-[140px]" />
          </div>
        ))}
        <button onClick={()=>{navigate('/our-tracks')}} className="text-white lg:hidden text-sm bg-[var(--main-color)] px-6 py-3 lg:py-2 rounded-full font-semibold cursor-pointer">
          Explore all Tracks
        </button>
      </div>
    </>
  );
}
