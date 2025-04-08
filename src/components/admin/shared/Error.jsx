import React from 'react';
import PropTypes from 'prop-types';
import { TbFaceIdError } from "react-icons/tb";

const Error = ({ message, className, iconSize = "w-24 h-24" }) => {
  return (
    <div 
      role="alert"
      aria-live="assertive"
      className={`flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 ${className}`}
    >
      <TbFaceIdError className={`${iconSize} text-red-500 dark:text-red-300`} />
      <div className="text-center space-y-1">
        <strong className="text-lg font-semibold text-red-600 dark:text-red-300">
          Error!
        </strong>
        <p className="text-sm text-red-500 dark:text-red-400">
          {message}
        </p>
      </div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  iconSize: PropTypes.string
};

Error.defaultProps = {
  className: '',
  iconSize: 'w-24 h-24'
};

export default Error;