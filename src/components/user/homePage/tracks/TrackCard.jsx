import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TrackCard({ isLoading, tracks, isError }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  console.log(tracks, isLoading, 'inside track card');

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[200px] bg-red-50 rounded-xl">
        <p className="text-red-600 font-medium">Error loading tracks</p>
      </div>
    );
  }

  return (
    <>
      <div className="gap-2 relative hidden md:flex lg:hidden">
        {isLoading ? (
          <div className="bg-gray-300 flex h-[240px] items-center gap-4 animate-pulse rounded-xl w-[380px] px-4"></div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-[#E7ECFF] to-[#F5F8FF] flex cursor-pointer items-center gap-6 h-[240px] rounded-2xl w-[380px] px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex-1">
                <h3 className="text-[20px] font-bold leading-tight">
                  <span className="text-[var(--main-color)]">{tracks[currentIndex].name}</span>
                  <br />
                </h3>
              </div>
              <div className="relative">
                <img 
                  src={`${import.meta.env.VITE_API}${tracks[currentIndex].image}`} 
                  alt={tracks[currentIndex].name}
                  className="w-[160px] h-[160px] object-cover rounded-xl shadow-md"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png'; 
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
            
            <div className="flex gap-2.5 absolute left-1/2 transform -translate-x-1/2 -bottom-6">
              {Array.from({ length: Math.min(4, tracks.length) }, (_, ind) => (
                <button
                  key={ind}
                  onClick={() => setCurrentIndex(ind)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    ind === currentIndex ? "bg-[var(--main-color)] scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-3 absolute -top-12 right-0">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentIndex === 0 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 shadow-md"
                }`}
              >
                <FaArrowLeft className={`text-[15px] ${currentIndex === 0 ? "text-gray-500" : "text-white"}`} />
              </button>
              
              <button
                onClick={() => setCurrentIndex(Math.min(tracks.length - 1, currentIndex + 1))}
                disabled={currentIndex === tracks.length - 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentIndex === tracks.length - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 shadow-md"
                }`}
              >
                <FaArrowRight className={`text-[15px] ${currentIndex === tracks.length - 1 ? "text-gray-500" : "text-white"}`} />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="md:hidden grid grid-cols-1 lg:grid lg:grid-cols-2 gap-x-6 gap-y-8">
        {isLoading ? (
          Array.from({ length: 4 }, (_, ind) => (
            <div key={ind} className="bg-gray-300 w-full max-w-[350px] h-[220px] animate-pulse rounded-2xl mx-auto"></div>
          ))
        ) : (
          tracks.slice(0, 4).map((track, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#E7ECFF] to-[#F5F8FF] flex items-center gap-4 rounded-2xl px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer max-w-[350px] mx-auto w-full"
            >
              <div className="flex-1">
                <h3 className="text-[18px] font-bold leading-tight">
                  <span className="text-[var(--main-color)]">{track.name}</span>
                  <br />
                </h3>
              </div>
              <div className="relative flex-shrink-0">
                <img 
                  src={`${import.meta.env.VITE_API}${track.image}`} 
                  alt={track.name} 
                  className="w-[140px] h-[140px] object-cover rounded-xl shadow-md"
                 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          ))
        )}
        
        <div className="lg:col-span-2 flex justify-center lg:justify-start">
          <button 
            onClick={() => navigate('/our-tracks')} 
            className="text-white lg:hidden text-sm bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 px-8 py-3 rounded-full font-semibold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Explore all Tracks
          </button>
        </div>
      </div>
    </>
  );
}
