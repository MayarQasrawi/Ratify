"use client"

import { useState, useEffect } from "react"
import { FaCalendarAlt, FaSearch, FaList, FaTh } from "react-icons/fa"
import AppointmentList from "./List"
import AppointmentCalendar from "./AppointmentCalendar"
import FilterPanel from "./shared/FilterPanel"
//  import ConfirmationModal from "./confirmation-modal"
import { LuFilter } from "react-icons/lu";
import SeniorAppointment from "@/assets/img/animation/SeniorAppointment.json"
import Lottie from "lottie-react"
import useApproveInterviewBooking from "@/hooks/examiner/interview/useApproveInterviewBooking"
import useRejectInterviewBooking from "@/hooks/examiner/interview/useRejectInterviewBooking"
import useApplicantInterviewBookings from "@/hooks/examiner/interview/useApplicantInterviewBookings"
 
export default function AppointmentDashboard() {
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState("list") // list or calendar
  const [searchQuery, setSearchQuery] = useState("")

const approveBooking = useApproveInterviewBooking();
const rejectBooking = useRejectInterviewBooking();
// const { data: bookings, isLoading:isLoadingAppointments, isError } = useApplicantInterviewBookings(applicantId);
// console.log(bookings)

// const handleApprove = (id) => {
//   approveBooking.mutate(id, {
//     onSuccess: () => {
//       console.log("Booking approved successfully");
//     },
//     onError: (error) => {
//       console.error("Error approving booking:", error);
//     }
//   });
// };

// // للرفض
// const handleReject = (id) => {
//   rejectBooking.mutate(id, {
//     onSuccess: () => {
//       console.log("Booking rejected successfully");
//     },
//     onError: (error) => {
//       console.error("Error rejecting booking:", error);
//     }
//   });
// };


  const handleReject = (id) => {
    openModal({
      title: "Provide Rejection Reason",
      message: "Please provide a reason for rejecting this appointment.",
      confirmText: "Reject Appointment",
      cancelText: "Cancel",
      confirmButtonClass: "bg-red-600 hover:bg-red-700",
      showTextArea: true,
      textAreaLabel: "Rejection Reason",
      textAreaPlaceholder: "Enter reason for rejection...",
      onConfirm: (reason) => {
        updateAppointmentStatus(id, "rejected", reason || "No reason provided")
        closeModal()
      },
    })
  }

  const handleApprove = (id) => {
    openModal({
      title: "Confirm Approval",
      message: "Are you sure you want to approve this appointment?",
      confirmText: "Approve",
      cancelText: "Cancel",
      confirmButtonClass: "bg-green-600 hover:bg-green-700",
      showTextArea: false,
      onConfirm: () => {
        updateAppointmentStatus(id, "approved")
        closeModal()
      },
    })
  }

  const [filters, setFilters] = useState({
    status: "all", // all, pending, approved, rejected
    date: "all", // all, today, thisWeek, thisMonth
  })
  const [showFilters, setShowFilters] = useState(false)

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    confirmButtonClass: "",
    showTextArea: false,
    textAreaLabel: "",
    textAreaPlaceholder: "",
    onConfirm: () => {},
  })

  useEffect(() => {
    async function fetchAppointments() {
      setIsLoading(true)
      try {
        // Mock data
        const mockData = [
          {
            id: "1",
            examinerName: "Dr. Smith",
            userName: "John Doe",
            startTime: "2025-05-18T09:00:00.000Z",
            endTime: "2025-05-18T10:00:00.000Z",
            status: "pending",
            createdAt: "2025-05-15T14:30:00.000Z",
          },
          {
            id: "2",
            examinerName: "Dr. Smith",
            userName: "Jane Wilson",
            startTime: "2025-05-18T10:30:00.000Z",
            endTime: "2025-05-18T11:30:00.000Z",
            status: "approved",
            createdAt: "2025-05-15T15:45:00.000Z",
          },
          {
            id: "3",
            examinerName: "Dr. Johnson",
            userName: "John Doe",
            startTime: "2025-05-19T13:00:00.000Z",
            endTime: "2025-05-19T14:00:00.000Z",
            status: "rejected",
            createdAt: "2025-05-16T09:20:00.000Z",
            rejectionReason: "Schedule conflict",
          },
          {
            id: "4",
            examinerName: "Dr. Johnson",
            userName: "Robert Brown",
            startTime: "2025-05-20T15:00:00.000Z",
            endTime: "2025-05-20T16:00:00.000Z",
            status: "pending",
            createdAt: "2025-05-16T10:15:00.000Z",
          },
          {
            id: "5",
            examinerName: "Dr. Smith",
            userName: "Emily Davis",
            startTime: "2025-05-21T11:00:00.000Z",
            endTime: "2025-05-21T12:00:00.000Z",
            status: "approved",
            createdAt: "2025-05-17T08:30:00.000Z",
          },
        ]

        setAppointments(mockData)
        setFilteredAppointments(mockData)
      } catch (error) {
        console.error("Failed to fetch appointments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  useEffect(() => {
    let result = [...appointments]

    // Filter by status
    if (filters.status !== "all") {
      result = result.filter((appt) => appt.status === filters.status)
    }

    // Filter by date
    if (filters.date !== "all") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const apptDate = (appt) => new Date(appt.startTime)

      if (filters.date === "today") {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        result = result.filter((appt) => {
          const d = apptDate(appt)
          return d >= today && d < tomorrow
        })
      } else if (filters.date === "thisWeek") {
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday start
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 7)
        result = result.filter((appt) => {
          const d = apptDate(appt)
          return d >= startOfWeek && d < endOfWeek
        })
      } else if (filters.date === "thisMonth") {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        result = result.filter((appt) => {
          const d = apptDate(appt)
          return d >= startOfMonth && d <= endOfMonth
        })
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (appt) =>
          appt.userName.toLowerCase().includes(query) ||
          appt.examinerName.toLowerCase().includes(query),
      )
    }

    setFilteredAppointments(result)
  }, [appointments, filters, searchQuery])

  const updateAppointmentStatus = (id, status, rejectionReason = "") => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id
          ? { ...appt, status, rejectionReason: status === "rejected" ? rejectionReason : undefined }
          : appt,
      ),
    )
    console.log(`Appointment ${id} status changed to ${status}`)
  }

  const openModal = (config) => setModalConfig({ ...config, isOpen: true })

  const closeModal = () => setModalConfig((prev) => ({ ...prev, isOpen: false }))



  return (
    <div className="container mx-auto px-4 py-8">
      {/* <ConfirmationModal {...modalConfig} onClose={closeModal} /> */}
      
         

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-[var(--main-color)] ">
          Manage Appointments

        </h1>


        <div className="flex items-center space-x-2">
          <button
            aria-label="List view"
            className={`p-2 rounded-md ${viewMode === "list" ? "bg-[var(--main-color)] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => setViewMode("list")}
          >
            <FaList size={18} />
          </button>
          <button
            aria-label="Calendar view"
            className={`p-2 rounded-md ${viewMode === "calendar" ? "bg-[var(--main-color)] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[var(--input-border)] dark:text-[var(--text-color)] dark:hover:bg-gray-500"}`}
            onClick={() => setViewMode("calendar")}
          >
            <FaTh size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center space-x-1 px-4 py-2 bg-gray-100 dark:bg-[var(--input-border)]  hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md"
            aria-expanded={showFilters}
          >
            <LuFilter size={18} />
            <span>Filters</span>
            <FaChevronDown className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showFilters && <FilterPanel filters={filters} setFilters={setFilters} />}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <FaCalendarAlt size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No appointments found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      ) : viewMode === "list" ? (
        <AppointmentList
          appointments={filteredAppointments}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ) : (
        <AppointmentCalendar
          appointments={filteredAppointments}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
        <div className="hidden md:flex justify-center items-center mt-10">
              <Lottie
                animationData={SeniorAppointment}
                loop={true}
                className="w-32 h-32 md:w-100 md:h-60" 
              />
            </div>
    </div>
  )
}

// Helper FaChevronDown icon for toggle arrow
function FaChevronDown({ className }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
