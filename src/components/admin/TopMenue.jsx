import React, { useState } from "react";
import {
  MdEdit,
  MdEmail,
  MdOutlineSettings,
  MdPassword,
  MdPhotoCamera,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PiMoonBold } from "react-icons/pi";
import { useTheme } from "../../contexts/ThemeProvider";
import { FiSun } from "react-icons/fi";
import { useAuthContext } from "../../contexts/AuthProvider";
import { HiOutlineLogout } from "react-icons/hi";
import Modal from "../shared/modal/Modal";
import PasswordChangeModal from "../shared/modal/PasswordChangeModal";
import Extract from "../../utils/Extract";
import EmailChangeModal from "../shared/modal/EmailChangeModal";
import ExaminerInfoModal from "../allExaminer/ExaminerInfoModal";
import Notification from "../shared/Notification";
function TopMenue() {
  const { logout, auth } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const { darkMode, toggleDarkMode } = useTheme();
  let role = "Admin";
  if (auth) role = Extract(auth, "role");
  return (
    <>
      {selectedModel == "Password" && (
        <Modal>
          <PasswordChangeModal
            setShowPasswordModal={() => setSelectedModel(null)}
          />
        </Modal>
      )}
      {selectedModel == "Email" && (
        <Modal>
          <EmailChangeModal setShowEmailModal={() => setSelectedModel(null)} />
        </Modal>
      )}
      {selectedModel == "UpdateImage" && (
        <ExaminerInfoModal  setShowModal={()=>setSelectedModel(null)} isUpdate={true} updateImage={true}/>
      )}
      {selectedModel == "UpdateInfo" && (
        <ExaminerInfoModal  setShowModal={()=>setSelectedModel(null)} isUpdate={true} />
      )}
      <nav className="flex flex-row-reverse gap-3 mb-5 p-2 ">
        <div className="relative ">
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
            <div
              className="absolute right-2 mt-2 w-56 bg-[var(--sidebar-bg)]  text-sm font-medium text-gray-700 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="space-y-1">
                {role !== "Admin" && (
                  <>
                    <div className="px-3 pt-3 pb-2 text-xs uppercase tracking-widest text-gray-500">
                      Profile
                    </div>
                    <button
                      onClick={() => {setIsOpen(false);setSelectedModel('UpdateInfo')}}
                      className="flex w-full hover:text-[var(--main-color)] text-[var(--text-color)] cursor-pointer items-center px-3 py-2 gap-2 focus:outline-none transition-colors "
                    >
                      <MdEdit className="w-5 h-5" />
                      <span>Update Info</span>
                    </button>
                    <button
                      onClick={() => {setIsOpen(false);setSelectedModel('UpdateImage')}}
                      className="flex w-full cursor-pointer text-[var(--text-color)] items-center px-3 py-2 gap-2 hover:text-[var(--main-color)] focus:outline-none transition-colors"
                    >
                      <MdPhotoCamera className="w-5 h-5" />
                      <span>Update Image</span>
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <div className="px-3 pt-2 pb-1 text-xs uppercase tracking-widest text-gray-500">
                      Security
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedModel("Email");
                      }}
                      className="flex w-full cursor-pointer text-[var(--text-color)] items-center px-3 py-2 gap-2 hover:text-[var(--main-color)] focus:outline-none transition-colors"
                    >
                      <MdEmail className="w-5 h-5" />
                      <span>Change Email</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedModel("Password");
                  }}
                  className="flex w-full text-[var(--text-color)] cursor-pointer items-center px-3 py-2 gap-2 hover:text-[var(--main-color)] focus:outline-none transition-colors"
                >
                  <MdPassword className="w-5 h-5" />
                  <span>Change Password</span>
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <button
                  onClick={logout}
                  className="flex w-full cursor-pointer items-center px-3 py-2 gap-2 text-[var(--text-color)] hover:text-[var(--main-color)] focus:outline-none transition-colors"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  <span className="">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <Notification />
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