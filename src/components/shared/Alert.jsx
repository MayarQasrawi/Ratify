import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';



function Alert({
  type = 'success', 
  message
}) {
  const [visible, setVisible] = useState(true);
  const [animationState, setAnimationState] = useState('entering');
  
  useEffect(() => {
    let timer;
    setTimeout(() => {
      setAnimationState('entered');
    }, 100);
    
    if (visible) {
      timer = setTimeout(() => {
        setAnimationState('exiting');
        setTimeout(() => {
          setVisible(false);
        }, 300);
      }, 5000);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [visible]);
  
  if (!visible) return null;
  
  const animationClasses = {
    entering: 'opacity-0 translate-y-2',
    entered: 'opacity-100 translate-y-0',
    exiting: 'opacity-0 translate-y-2'
  };
  
  return (
    <div 
      className={`${type=='success'?'border-green-500': 'border-red-500'} bg-white border-l-4 shadow-md rounded-md p-4 fixed top-4 right-4 transition-all duration-300 ease-in-out ${animationClasses[animationState]} max-w-sm z-50`} 
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`${type=='success'?"text-green-700":'text-red-500'}`}>
            {type=='success'?<FaCheckCircle className='w-5 h-5' />:<FaExclamationCircle className="h-5 w-5" />}
          </div>
        </div>
        <div className="ml-3 flex-1">
          <div className={`${type=='success'?"text-green-700":'text-red-500'} text-sm font-medium`}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;