import React from 'react';
import Lottie from 'lottie-react';
import loading from '../../../assets/img/animation/loading.json'; // Adjust the path to your loading animation JSON file

const Loading = ({text}) => {
     return (
          <div className="flex flex-col  items-center justify-center ">
               <div className="flex flex-col items-center space-y-4 p-6 dark:rounded-xl  dark:bg-white   dark:shadow-lg dark:border dark:border-[var(--table-border)]">
                    <Lottie 
                         animationData={loading} 
                         loop={true} 
                         className="w-24 h-24 mx-auto"
                    />
                    <div className="text-lg font-semibold text-[var(--main-color)] animate-pulse">
                    {text}  
                    </div>
                    <div className="text-sm text-gray-500 ">
                         This will just take a moment
                    </div>
               </div>
          </div>
     );
};

export default Loading;