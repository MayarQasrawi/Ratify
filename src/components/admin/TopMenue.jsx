import React, { useState } from "react";
import { MdOutlineSettings, MdPassword } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PiMoonBold } from "react-icons/pi";
import { useTheme } from "../../hooks/ThemeProvider";
import { FiSun } from "react-icons/fi";
import { useAuthContext } from "../../contexts/AuthProvider";
import { HiOutlineLogout } from "react-icons/hi";
import Modal from "../shared/modal/Modal";
import PasswordChangeModal from "../shared/modal/PasswordChangeModal";
function TopMenue() {
  const { logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      {viewModal && (
        <Modal>
          <PasswordChangeModal
            setShowPasswordModal={() => setViewModal(false)}
          />
        </Modal>
      )}
      <nav className="flex flex-row-reverse gap-3 mb-8 ">
        <div className="relative   ">
          <button
            className="flex relative items-center p-2 text-[var(--text-color)] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span className="text-lg">
              <MdOutlineSettings />
            </span>
          </button>
          {isOpen && (
            <div className="absolute right-0 px-2 mt-.5 w-48 bg-white text-sm font-medium text-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setViewModal(true);
                }}
                className="flex w-full py-1 gap-1.5  cursor-pointer mb-1 items-center hover:bg-gray-100"
              >
                <MdPassword className="w-5 h-5 pl-.5 " /> Change Password
              </button>
              <button
                className="flex cursor-pointer py-1  items-center gap-1.5 w-full   hover:bg-gray-100"
                onClick={() => logout()}
              >
                <HiOutlineLogout className="w-5 h-5 pl-.5" />
                <span className="text-[15px]">Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* User Page Button */}
        <button
          className="flex items-center p-2 text-[var(--text-color)] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
          onClick={() => {
            // Add navigation logic for the User page
            console.log("Navigate to User Page");
          }}
        >
          <span className="text-lg">
            <FaRegUser />
          </span>
        </button>

        {/* Dark Mode Toggle Button */}
        <button
          className="flex items-center p-2 text-[var(--text-color)] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
          onClick={toggleDarkMode}
        >
          <span className="text-lg">
            {!darkMode ? <FiSun /> : <PiMoonBold />}{" "}
            {/* Toggle between sun and moon icons */}
          </span>
        </button>
      </nav>
    </>
  );
}

export default TopMenue;
