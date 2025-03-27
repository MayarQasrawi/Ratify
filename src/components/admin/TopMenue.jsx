import React from 'react';
import { MdOutlineSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PiMoonBold } from "react-icons/pi";
import { useTheme } from '../../hooks/ThemeProvider';
import { FiSun } from "react-icons/fi";
function TopMenue() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className='flex flex-row-reverse gap-3 mb-18'>
      {/* Settings Button */}
      <button
        className='flex items-center p-2 text-[var(--text-color)] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer'
        onClick={() => {
          // Add navigation logic for the Settings page
          console.log("Navigate to Settings");
        }}
      >
        <span className='text-lg'>
          <MdOutlineSettings />
        </span>
      </button>

      {/* User Page Button */}
      <button
        className='flex items-center p-2 text-[var(--text-color)] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer'
        onClick={() => {
          // Add navigation logic for the User page
          console.log("Navigate to User Page");
        }}
      >
        <span className='text-lg'>
          <FaRegUser />
        </span>
      </button>

      {/* Dark Mode Toggle Button */}
      <button
        className='flex items-center p-2 text-[var(--text-color)] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer'
        onClick={toggleDarkMode}
      >
        <span className='text-lg'>
          {!darkMode ? <FiSun /> : <PiMoonBold />} {/* Toggle between sun and moon icons */}
        </span>
      </button>
    </nav>
  );
}

export default TopMenue;