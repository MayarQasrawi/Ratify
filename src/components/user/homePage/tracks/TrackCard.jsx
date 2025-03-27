import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import myImg from "../../../../assets/img/Frame.svg";
const traks = [
  { id: 1, title: "Front-End", img: myImg },
  { id: 2, title: "Back-End", img: myImg },
  { id: 3, title: "Front-End", img: myImg },
  { id: 3, title: "Front-End", img: myImg },
];
export default function TrackCard({isLoading}) {
  const [currentIndex, setCurrentIndex] = useState(1);
  return (
    <>
      <div className=" gap-2 relative hidden md:flex  lg:hidden">
      {isLoading && <div className="bg-gray-300  flex h-[200px] items-center gap-4 animate-pulse rounded-xl w-[320px] px-3"></div>}
      {!isLoading &&<><div className="bg-[#E7ECFF] flex cursor-pointer items-center gap-4 h-full rounded-xl w-[320px] px-3">
          <h3 className="text-[18px] font-semibold">
            <span className="text-[#3B82F6]">{traks[currentIndex].title} </span>
            <br />
            <span className="text-[#003F7D]">Developing</span>
          </h3>
          <img src={traks[currentIndex].img} className="w-[160px]" />
        </div>
        <div className="flex gap-2.5 absolute left-36 -bottom-5 ">
          {Array.from({ length: traks.length }, (_, ind) => (
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
            <div className="bg-[#3B82F6] w-[30px] h-[30px] rounded-full flex items-center justify-center">
              {" "}
              <FaArrowLeft
                onClick={() => {
                  setCurrentIndex(currentIndex - 1);
                }}
                className="text-white text-[15px] cursor-pointer  "
              />
            </div>
          )}
          {currentIndex != traks.length - 1 && (
            <div className="bg-[#3B82F6] w-[30px] h-[30px] rounded-full flex items-center justify-center">
              <FaArrowRight
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                }}
                className="text-white text-[15px] cursor-pointer  "
              />
            </div>
          )}
        </div></>}  
      </div>

      {/* Desktop Grid: Visible on md and larger screens */}
      <div className="md:hidden grid grid-cols-1 lg:grid lg:grid-cols-2 gap-x-4 gap-y-8 cursor-pointer">
        {isLoading ?Array.from({length:4},(_,ind)=><div key={ind}  className="bg-gray-300 w-[300px] h-[200px] animate-pulse flex items-center gap-4 rounded-xl px-3 py-2 ">
        </div>)
        : traks.slice(0, 4).map((track, index) => (
          <div
            key={index}
            className="bg-[#E7ECFF] flex items-center gap-4 rounded-xl px-3 py-2 hover:scale-105 transition-transform duration-300"
          >
            <div className="">
              <h3 className="text-[18px] font-semibold">
                <span className="text-[#3B82F6]">{track.title}</span>
                <br />
                <span className="text-[#003F7D]">Developing</span>
              </h3>
            </div>
            <img src={track.img} alt={track.title} className="w-[140px]" />
          </div>
        ))}
        <button className="text-white lg:hidden text-sm bg-[#3B82F6] px-6 py-1 lg:py-2 rounded-full font-semibold cursor-pointer">
          Explore all Tracks
        </button>
      </div>
    </>
  );
}
