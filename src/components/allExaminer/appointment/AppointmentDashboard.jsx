"use client";

import { useState, useEffect, use } from "react";
import { FaCalendarAlt, FaSearch, FaList, FaTh } from "react-icons/fa";
import AppointmentList from "./List";
import AppointmentCalendar from "./AppointmentCalendar";
import FilterPanel from "./shared/FilterPanel";
import ConfirmationModal from "./ConfirmationModal";
import { LuFilter } from "react-icons/lu";
import SeniorAppointment from "@/assets/img/animation/SeniorAppointment.json";
import Lottie from "lottie-react";
import useApproveInterviewBooking from "@/hooks/examiner/interview/useApproveInterviewBooking";
import useRejectInterviewBooking from "@/hooks/examiner/interview/useRejectInterviewBooking";
import useExaminerInterviewBookings from "@/hooks/examiner/interview/useExaminerInterviewBookings";
import Extract from "@/utils/Extract";
import { useAuthContext } from "@/contexts/AuthProvider";
import useExaminerInterviewRequest from "@/hooks/examiner/interview/useExaminerInterviewRequest";
import ErrorPage from "@/pages/general/ErrorPage";
import Loading from "@/components/admin/shared/Loading";
import DashboardTabsAndFilters from "./DashboardTabsAndFilters";
export default function AppointmentDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // list or calendar
  const [activeTab, setActiveTab] = useState("bookings"); // bookings or requests
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useAuthContext();
  const id = Extract(auth, "nameid");

  const {
    data: bookings,
    isLoading: isLoadingAppointments,
    isError,
    error: berror,
  } = useExaminerInterviewBookings();
  const {
    data: requestsData,
    isLoading: isLoadingRequests,
    isError: isErrorRequests,
    error: rerror,
  } = useExaminerInterviewRequest();

  if (isErrorRequests && activeTab !== "bookings") {
    <ErrorPage error={rerror?.errorDetails} />;
  } else if (isError && activeTab === "bookings") {
    <ErrorPage error={berror?.errorDetails} />;
  }
  if (isLoadingAppointments && activeTab !== "bookings") {
    <Loading />;
  } else if (isLoadingRequests && activeTab === "bookings") {
    <Loading />;
  }

  useEffect(() => {
    if (bookings) {
      setAppointments(bookings);
    }
  }, [bookings]);

  useEffect(() => {
    if (requestsData) {
      setRequests(requestsData);
    }
  }, [requestsData]);

  const isLoading =
    activeTab === "bookings" ? isLoadingAppointments : isLoadingRequests;
  console.log("Get Booking for examiner: ", bookings);
  console.log("Get Requests for examiner: ", requestsData);

  const approveBooking = useApproveInterviewBooking();
  const rejectBooking = useRejectInterviewBooking();

  const handleReject = (id) => {
    openModal({
      title: "Confirm Rejection ",
      message: "Are you sure you want to reject this appointment?",
      confirmText: "Reject Appointment",
      cancelText: "Cancel",
      confirmButtonClass: "bg-red-600 hover:bg-red-700",

      onConfirm: () => {
        rejectBooking.mutate(id, {
          onSuccess: (updatedAppointment) => {
            if (activeTab === "bookings") {
              setAppointments((prev) =>
                prev.map((appt) => (appt.id === id ? updatedAppointment : appt))
              );
            } else {
              setRequests((prev) =>
                prev.map((req) => (req.id === id ? updatedAppointment : req))
              );
            }
            console.log("Booking rejected successfully");
          },
          onError: (error) => {
            console.error("Error rejecting booking:", error);
          },
        });
        closeModal();
      },
    });
  };

  const handleApprove = (id) => {
    openModal({
      title: "Confirm Approval",
      message: "Are you sure you want to approve this appointment?",
      confirmText: "Approve",
      cancelText: "Cancel",
      confirmButtonClass: "bg-green-600 hover:bg-green-700",
      onConfirm: () => {
        approveBooking.mutate(id, {
          onSuccess: (updatedAppointment) => {
            if (activeTab === "bookings") {
              setAppointments((prev) =>
                prev.map((appt) => (appt.id === id ? updatedAppointment : appt))
              );
            } else {
              setRequests((prev) =>
                prev.map((req) => (req.id === id ? updatedAppointment : req))
              );
            }
            console.log("Booking approved successfully");
            closeModal();
          },
          onError: (error) => {
            console.error("Error approving booking:", error);
            closeModal();
          },
        });
      },
    });
  };

  const [filters, setFilters] = useState({
    status: "all", // all, pending, approved, rejected
    date: "all", // all, today, thisWeek, thisMonth
  });
  const [showFilters, setShowFilters] = useState(false);

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
  });

  // Filter appointments based on active tab
  useEffect(() => {
    const currentData = activeTab === "bookings" ? appointments : requests;
    let result = [...currentData];

    // Filter by status
    if (filters.status !== "all") {
      result = result.filter((item) => item.status === filters.status);
    }

    // Filter by date
    if (filters.date !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const itemDate = (item) => new Date(item.startTime);

      if (filters.date === "today") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        result = result.filter((item) => {
          const d = itemDate(item);
          return d >= today && d < tomorrow;
        });
      } else if (filters.date === "thisWeek") {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday start
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        result = result.filter((item) => {
          const d = itemDate(item);
          return d >= startOfWeek && d < endOfWeek;
        });
      } else if (filters.date === "thisMonth") {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        result = result.filter((item) => {
          const d = itemDate(item);
          return d >= startOfMonth && d <= endOfMonth;
        });
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.userName?.toLowerCase().includes(query) ||
          item.examinerName?.toLowerCase().includes(query)
      );
    }

    if (activeTab === "bookings") {
      setFilteredAppointments(result);
    } else {
      setFilteredRequests(result);
    }
  }, [appointments, requests, filters, searchQuery, activeTab]);

  // const updateAppointmentStatus = (id, status, rejectionReason = "") => {
  //   if (activeTab === "bookings") {
  //     setAppointments((prev) =>
  //       prev.map((appt) =>
  //         appt.id === id
  //           ? { ...appt, status, rejectionReason: status === "rejected" ? rejectionReason : undefined }
  //           : appt,
  //       ),
  //     )
  //   } else {
  //     setRequests((prev) =>
  //       prev.map((req) =>
  //         req.id === id
  //           ? { ...req, status, rejectionReason: status === "rejected" ? rejectionReason : undefined }
  //           : req,
  //       ),
  //     )
  //   }
  //   console.log(`${activeTab === "bookings" ? "Appointment" : "Request"} ${id} status changed to ${status}`)
  // }

  const openModal = (config) => setModalConfig({ ...config, isOpen: true });

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  const getCurrentData = () => {
    return activeTab === "bookings" ? filteredAppointments : filteredRequests;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfirmationModal {...modalConfig} onClose={closeModal} />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-[var(--main-color)]">
          Manage Appointments
        </h1>

        <div className="flex items-center space-x-2">
          <button
            aria-label="List view"
            className={`p-2 rounded-md ${
              viewMode === "list"
                ? "bg-[var(--main-color)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaList size={18} />
          </button>
          <button
            aria-label="Calendar view"
            className={`p-2 rounded-md ${
              viewMode === "calendar"
                ? "bg-[var(--main-color)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[var(--input-border)] dark:text-[var(--text-color)] dark:hover:bg-gray-500"
            }`}
            onClick={() => setViewMode("calendar")}
          >
            <FaTh size={18} />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <DashboardTabsAndFilters
        tabs={[
          { key: "bookings", label: "Interview Bookings" },
          { key: "requests", label: "Interview Requests" },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemsByTab={{ bookings: appointments, requests: requests }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        placeholder={`Search ${activeTab}...`}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : getCurrentData().length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <FaCalendarAlt size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No {activeTab === "bookings" ? "bookings" : "requests"} found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : viewMode === "list" ? (
        <AppointmentList
          appointments={getCurrentData()}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ) : (
        <AppointmentCalendar
          appointments={getCurrentData()}
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
  );
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
  );
}
