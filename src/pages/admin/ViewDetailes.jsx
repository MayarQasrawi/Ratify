"use client"

import { useLocation } from "react-router-dom"
import { MdOutlineMail } from "react-icons/md"
import { BsFillPersonFill } from "react-icons/bs"
import { FaBirthdayCake, FaUserEdit, FaUserSlash } from "react-icons/fa"
import { useState } from "react"
import { FaUserShield } from "react-icons/fa6"
import { FaUserClock } from "react-icons/fa6"
import DeleteModal from "../../components/admin/ViewDetailes/DeleteModal"
import IconActionButton from "../../components/Button/IconActionButton"
import EmailChangeModal from "../../components/shared/modal/EmailChangeModal"
import Modal from "../../components/shared/modal/Modal"
import { IoIosReturnLeft } from "react-icons/io"
import { HashLink } from "react-router-hash-link"
import ViewExaminerWorkLoad from "../../components/admin/Team/ViewExaminerWorkLoad"

export default function ViewDetails() {
  const { state } = useLocation()
  const [showWorkLoadModal, setShowWorkLoadModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditeExaminerModal, setShowEditeExaminerModal] = useState(false)
  const member = state?.member

  if (!member) return <div className="p-4 text-red-500">No member data found</div>

  const infoItems = [
    {
      icon: MdOutlineMail,
      label: "Email",
      value: member.email,
    },
    {
      icon: BsFillPersonFill,
      label: "Name",
      value: member.fullName,
    },
    {
      icon: BsFillPersonFill,
      label: "Specialization",
      value: member.specialization,
    },
    {
      icon: FaUserClock,
      label: "Examiner Loads",
      value: (
        <button
          onClick={() => setShowWorkLoadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--main-color)] text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <FaUserClock className="w-4 h-4" />
          View Details
        </button>
      ),
    },
    {
      icon: FaBirthdayCake,
      label: "Date of Birth",
      value: new Date(member.dateOfBirth).toLocaleDateString(),
    },
    {
      icon: FaUserShield,
      label: "Role",
      value: member.userType,
    },
  ]

  return (
    <div className="p-2 sm:p-4 lg:p-6 max-w-6xl mx-auto">
      <HashLink
        className="text-[var(--main-color)] mb-4 lg:mb-6 px-2 text-right font-medium flex items-center justify-end gap-1 w-full hover:text-purple-600 transition-colors duration-200"
        to={{
          pathname: "/dashboard/admin/teams",
          search: `?page=${state.page}`,
          hash: `#${member.id}`,
        }}
        scroll={(el) => {
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "end" })
          }
        }}
      >
        <IoIosReturnLeft size={20} className="sm:w-6 sm:h-6" />
        <span className="text-sm sm:text-base">Back To Table</span>
      </HashLink>

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-br from-[var(--main-color)] via-purple-600 to-purple-600 h-32 relative">
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 -mt-16 relative z-10">
          {/* Profile Section */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-[var(--sidebar-icon-bg)] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <BsFillPersonFill className="w-12 h-12 sm:w-20 sm:h-20 lg:w-32 lg:h-32 text-[var(--main-color)]" />
            </div>
            <h2 className="mt-4 lg:mt-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center tracking-tight">
              {member.fullName}
            </h2>

            <div className="flex gap-3 lg:gap-4 mt-4 lg:mt-6">
              <IconActionButton
                onClick={() => setShowEditeExaminerModal(true)}
                color="blue"
                Icon={FaUserEdit}
                label="Edit Email"
                ariaLabel="Edit user Email"
              />

              <IconActionButton
                onClick={() => setShowDeleteModal(true)}
                color="red"
                Icon={FaUserSlash}
                label="Delete Account"
                ariaLabel="Delete user account"
              />
            </div>
          </div>

          {/* General Information */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--main-color)] mb-6 lg:mb-8 pb-3 lg:pb-4 border-b-2 border-[var(--main-color)] tracking-tight">
                General Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {infoItems.map((item, index) => (
                  <InfoItem key={index} icon={item.icon} label={item.label} value={item.value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal} />}
      {showEditeExaminerModal && (
        <Modal>
          <EmailChangeModal setShowEmailModal={setShowEditeExaminerModal} />
        </Modal>
      )}
      {showWorkLoadModal && (
        <ViewExaminerWorkLoad isOpen={showWorkLoadModal} setOpen={setShowWorkLoadModal} state={member} />
      )}
    </div>
  )
}

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start gap-3 lg:gap-4">
        <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-[var(--sidebar-icon-bg)] rounded-xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--main-color)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs lg:text-sm font-semibold text-gray-600 mb-1 lg:mb-2 tracking-wide uppercase">{label}</p>
          <div className="text-gray-800 font-medium text-base lg:text-md break-words">{value || "N/A"}</div>
        </div>
      </div>
    </div>
  )
}
