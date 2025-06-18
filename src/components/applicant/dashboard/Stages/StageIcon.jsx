import React from 'react';
import {
  HiPencilAlt,        // Exam
  HiClipboardList,    // Task
  HiUserGroup         // Interview
} from 'react-icons/hi';

const StageIcon = ({ type }) => {
  
  switch (type.toLowerCase()) {
    case "exam":
      return (
        <div className="rounded-full bg-blue-100 p-3">
          <HiPencilAlt className="h-6 w-6 text-[var(--main-color)]" />
        </div>
      );
    case "task":
      return (
        <div className="rounded-full bg-blue-100 p-3">
          <HiClipboardList className="h-6 w-6 text-[var(--main-color)]" />
        </div>
      );
    case "interview":
      return (
        <div className="rounded-full bg-blue-100 p-3">
          <HiUserGroup className="h-6 w-6 text-[var(--main-color)]" />
        </div>
      );
    default:
      return null;
  }
};

export default StageIcon;
