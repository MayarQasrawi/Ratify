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
import { BiErrorCircle } from "react-icons/bi"
import { MdArrowBack } from "react-icons/md"

export default function ViewDetails() {
  const { state } = useLocation()
  const [showWorkLoadModal, setShowWorkLoadModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditeExaminerModal, setShowEditeExaminerModal] = useState(false)
  const member = state?.member

  if (!member) {
    return (
     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full">
    <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 relative">
      
      {/* Animated Icon */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-full animate-pulse"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center">
          <BiErrorCircle className="w-12 h-12 text-red-500" />
        </div>
      </div>

      {/* Title and Message */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3">
        No Data Available
      </h1>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Sorry, the requested member data could not be found. 
        <br />
        It might have been deleted or is currently unavailable.
      </p>

      {/* Elegant Divider */}
      <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-8"></div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <HashLink
          to="/dashboard/admin/teams"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--main-color)] text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Team List
        </HashLink>

        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-[var(--main-color)] hover:text-[var(--main-color)] hover:bg-gray-50 transition-all duration-200"
        >
          Reload Page
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-red-300 rounded-full opacity-60"></div>
      <div className="absolute top-8 right-6 w-1 h-1 bg-orange-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-red-400 rounded-full opacity-50"></div>
    </div>
  </div>
</div>

    )
  }

  const infoItems = [
    {
      icon: MdOutlineMail,
      label: "Email Address",
      value: member.email,
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
    {
      icon: FaUserClock,
      label: "Examiner Loads",
      value: (
         <span 
          onClick={() => setShowWorkLoadModal(true)}
          className="inline-flex items-center gap-2 text-[var(--main-color)] hover:text-purple-600 cursor-pointer font-medium transition-all duration-200 hover:underline decoration-2 underline-offset-2"
        >
          Click to view details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <HashLink
          className="inline-flex items-center gap-2 text-[var(--main-color)] mb-6 px-4 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 font-medium"
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
          <IoIosReturnLeft size={20} />
          <span>Back To Table</span>
        </HashLink>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="h-48 bg-gradient-to-r from-[var(--main-color)] to-purple-600 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            {/* Profile Image Positioned */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-[var(--sidebar-icon-bg)] to-gray-100 rounded-full flex items-center justify-center">
                  <BsFillPersonFill className="w-16 h-16 text-[var(--main-color)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            {/* Name and Actions */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{member.fullName}</h1>
              <p className="text-lg text-[var(--main-color)] font-medium capitalize">{member.userType}</p>
              
              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
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

            {/* Bio Section */}
            {member.bio && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <BsFillPersonFill className="w-5 h-5 text-[var(--main-color)]" />
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {member.bio}
                  </p>
                </div>
              </div>
            )}

            {/* Information Grid */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Personal Information
              </h3>
              
              <div className="grid gap-4">
                {infoItems.map((item, index) => (
                  <InfoCard key={index} icon={item.icon} label={item.label} value={item.value} />
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

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg hover:border-[var(--main-color)] transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-[var(--main-color)] bg-opacity-10 rounded-xl group-hover:bg-opacity-20 transition-all duration-300">
          <Icon className="w-6 h-6 text-[var(--main-color)]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">{label}</p>
          <div className="text-gray-800 font-semibold text-lg">
            {typeof value === 'string' ? value : value}
          </div>
        </div>
      </div>
    </div>
  )
}