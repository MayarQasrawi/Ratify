import React from 'react';
import Lottie from 'lottie-react';
import loading from '../../../assets/img/animation/loading.json';

const Loading = ({ 
  text = "Loading...", 
  subText = "This will just take a moment",
  size = "medium", // small, medium, large
  showSubtext = true
}) => {
  // Define sizes for the animation based on the size prop
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32"
  };

  return (

      <div className="flex flex-col items-center space-y-4 p-6  py-12 rounded-lg  bg-white dark:bg-gray-300   border border-[var(--table-border)] transition-all duration-300 hover:shadow-sm">
        <div className="relative">
          <Lottie 
            animationData={loading} 
            loop={true} 
            className={`mx-auto ${sizeClasses[size]}`}
          />
          <div className="absolute inset-0 "></div>
        </div>
        
        <div className="text-lg font-semibold text-[var(--main-color)] animate-pulse transition-colors">
          {text}  
        </div>
        
        {showSubtext && (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
            {subText}
          </div>
        )}
      </div>
  
  );
};

export default Loading;