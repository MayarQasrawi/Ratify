import { useState, useEffect } from "react"
import { MdEdit, MdEmail, MdOutlineSettings, MdPassword, MdPhotoCamera } from "react-icons/md"
import { PiMoonBold, PiListBold } from "react-icons/pi"
import { useTheme } from "../../contexts/ThemeProvider"
import { FiSun } from "react-icons/fi"
import { useAuthContext } from "../../contexts/AuthProvider"
import { HiOutlineLogout } from "react-icons/hi"
import Modal from "../shared/modal/Modal"
import PasswordChangeModal from "../shared/modal/PasswordChangeModal"
import Extract from "../../utils/Extract"
import EmailChangeModal from "../shared/modal/EmailChangeModal"
import ExaminerInfoModal from "../allExaminer/ExaminerInfoModal"
import Notification from "../shared/Notification"
import { useSidebar } from "../../contexts/SidebarProvider"

function TopMenue() {
  const { logout, auth } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(null)
  const { darkMode, toggleDarkMode } = useTheme()
  const { toggleSidebar } = useSidebar()

  let role = "Admin"
  if (auth) role = Extract(auth, "role")

 

  return (
    <>
      {selectedModel == "Password" && (
        <Modal>
          <PasswordChangeModal setShowPasswordModal={() => setSelectedModel(null)} />
        </Modal>
      )}
      {selectedModel == "Email" && (
        <Modal>
          <EmailChangeModal setShowEmailModal={() => setSelectedModel(null)} />
        </Modal>
      )}
      {selectedModel == "UpdateImage" && (
        <ExaminerInfoModal setShowModal={() => setSelectedModel(null)} isUpdate={true} updateImage={true} />
      )}
      {selectedModel == "UpdateInfo" && (
        <ExaminerInfoModal setShowModal={() => setSelectedModel(null)} isUpdate={true} />
      )}

      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg cursor-pointer text-[var(--text-color)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 
          `}
          aria-label="Toggle Sidebar"
        >
          <PiListBold className="text-xl" />
        </button>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Notification />

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2  cursor-pointer rounded-lg text-[var(--text-color)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {!darkMode ? <FiSun className="text-xl" /> : <PiMoonBold className="text-xl" />}
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2  rounded-lg cursor-pointer text-[var(--text-color)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Settings"
            >
              <MdOutlineSettings className="text-xl" />
            </button>

            {isOpen && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-[var(--sidebar-bg)] text-sm font-medium rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="py-1">
                    {role !== "Admin" && (
                      <>
                        <div className="px-4 py-2 text-xs uppercase tracking-widest text-gray-500 bg-gray-50 dark:bg-gray-800">
                          Profile
                        </div>
                        <button
                          onClick={() => {
                            setIsOpen(false)
                            setSelectedModel("UpdateInfo")
                          }}
                          className="flex cursor-pointer w-full items-center px-4 py-2 gap-3 text-[var(--text-color)] hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--main-color)] transition-colors"
                        >
                          <MdEdit className="w-4 h-4" />
                          <span>Update Info</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false)
                            setSelectedModel("UpdateImage")
                          }}
                          className="flex w-full cursor-pointer items-center px-4 py-2 gap-3 text-[var(--text-color)] hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--main-color)] transition-colors"
                        >
                          <MdPhotoCamera className="w-4 h-4" />
                          <span>Update Image</span>
                        </button>
                        <hr className="border-gray-200 dark:border-gray-700" />
                        <div className="px-4 py-2 text-xs uppercase tracking-widest text-gray-500 bg-gray-50 dark:bg-gray-800">
                          Security
                        </div>
                        <button
                          onClick={() => {
                            setIsOpen(false)
                            setSelectedModel("Email")
                          }}
                          className="flex w-full cursor-pointer items-center px-4 py-2 gap-3 text-[var(--text-color)] hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--main-color)] transition-colors"
                        >
                          <MdEmail className="w-4 h-4" />
                          <span>Change Email</span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => {
                        setIsOpen(false)
                        setSelectedModel("Password")
                      }}
                      className="flex w-full items-center px-4 py-2 gap-3 text-[var(--text-color)] hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--main-color)] transition-colors"
                    >
                      <MdPassword className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>

                    <hr className="border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        logout()
                      }}
                      className="flex w-full items-center px-4 py-2 gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <HiOutlineLogout className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TopMenue
