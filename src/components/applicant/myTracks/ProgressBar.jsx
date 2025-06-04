import { useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(75);
  const [showProgress, setShowProgress] = useState(false);

  return (
    <div className="lg:w-[65%] w-full  relative bg-[#E7ECFF] h-2 rounded-full cursor-pointer">
      <div
        onMouseEnter={() => setShowProgress(true)}
        onMouseLeave={() => setShowProgress(false)}
        className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      {showProgress && (
        <div
          className="absolute -top-10 bg-[#3B82F6] text-white font-bold text-sm px-2 py-1 rounded-md shadow-md"
          style={{
            left: `calc(${progress}% - 20px)`, 
            transform: "translateX(-50%)",
          }}
        >
          {progress}%
          <div
            className="absolute left-1/2 -bottom-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
            style={{
              borderTopColor: "#3B82F6",
              transform: "translateX(-50%)",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

