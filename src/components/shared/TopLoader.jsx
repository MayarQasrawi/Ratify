import { useEffect, useRef, useState } from "react";

export default function TopLoader({isLoading}) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    console.log(isLoading,'inside top loader')
    const view = useRef();
    useEffect(() => {
      let interval;
  
      if (isLoading) {
        setVisible(true); 
        setProgress(20); 
        interval = setInterval(() => {
          setProgress((prev) => (prev >= 90 ? prev : prev + 15)); 
        }, 700);
      } else  {
        setProgress(100); 
      }
      console.log("1");
      return () => clearInterval(interval);
    }, [isLoading]);
    useEffect(() => {
      if (progress == 100 && !isLoading) {
        setTimeout(() => (view.current.style.display = "none"), 2);
        console.log("2");
      }
    }, [progress]);
    console.log(view.current,'iiiii')
    return (
      <div
        ref={view}
        className="h-screen w-screen flex flex-col items-center justify-center gap-8 "
      >
        <h1 className="text-5xl font-bold text-[#003F7DDE]">Ratify</h1>
        <div className="w-[200px] rounded-full h-2 bg-[#E7ECFF]">
          {" "}
          <div
            className={` h-2 rounded-full bg-[#3B82F6] ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };
   
