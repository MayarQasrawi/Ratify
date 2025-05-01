import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { TbReload } from 'react-icons/tb';
import IconActionButton from '../../Button/IconActionButton';

const Error = ({
  message = "Something went wrong",
  title = "Error Occurred",
  onRetry = null,
  errorCode =null,
 
}) => {



  return (
    <div className="flex flex-col items-center justify-center gap-y-1 w-full min-h-[200px] py-12 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
        <div className={`text-blue-500 animate-bounce`}>
          <IoWarningOutline size={48} />
        </div>
        
        <div className="text-xl font-bold text-[var(--main-color)] text-center">
          {title}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
          {message}
        </div>
        
        {errorCode && (
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-black/10 px-2 py-1 rounded">
            Error Code: {errorCode}
          </div>
        )}
        
        {onRetry && (
          <IconActionButton
            onClick={onRetry}
            color="gray"
            Icon={TbReload}
            label="Try Again"
            className="mt-4"
            ariaLabel="Retry"
          />
          
        )}
      
    </div>
  );
};

export default Error;