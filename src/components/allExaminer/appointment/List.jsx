import { useState } from "react";
import Table from "@/components/admin/shared/Table";
import { format, parseISO } from "date-fns";
import { FaEye } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TfiTime } from "react-icons/tfi";
import StatusBadge from "@/components/allExaminer/appointment/shared/StatusBage";
import AppointmentActions from "@/components/allExaminer/appointment/shared/AppointmentActions";
import FormattedTimeRange from "@/components/allExaminer/appointment/shared/FormattedTimeRange";
import InterviewDetailsModal from "@/components/allExaminer/appointment/InterviewDetailsModal";

function List({ appointments, onApprove, onReject }) {
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpand = (id) => {
    setExpandedAppointment((prev) => (prev === id ? null : id));
  };

  const handleShowDetails = (appointment) => {
    setSelectedInterview(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  let tableColumns;
  if (appointments?.some((apt) => apt.scheduledDate)) {
    tableColumns = ["User Name", "Date & Time", "Status", "Actions"];
  } else {
    tableColumns = ["User Name", "Status", "Actions", "Details"];
  }

  console.log("Appointments:", appointments);

  const renderRow = (appointment) => (
    <tr
      key={appointment.id}
      className="text-sm text-center hover:bg-gray-50 dark:hover:bg-gray-700/20 border-b "
    >
      <td className="py-4 px-2 whitespace-nowrap font-medium text-gray-900">
        {appointment.applicantName || "Mayar Yaser"}
        <div className="text-xs text-gray-500">
          User ID: {appointment.applicantId}
        </div>
      </td>
      {
        appointment.scheduledDate && (
          <td className="py-4 px-2 whitespace-nowrap">
            <div className="flex flex-col items-start text-sm">
              <div className="flex items-center font-medium">
                <MdOutlineCalendarToday className="mr-1 text-gray-500 font-bold" />
                {format(parseISO(appointment.scheduledDate), "MMM d, yyyy")}
              </div>
              <div className="flex items-center text-gray-500">
                <TfiTime className="mr-1" />
                {format(parseISO(appointment.scheduledDate), "h:mm a")}
              </div>
            </div>
          </td>
        )
      }

      <td className="py-4 px-2 whitespace-nowrap">
        <StatusBadge status={appointment.status} />
      </td>
      <td className="py-4 px-2">
        {/* ✅ إضافة فحص أمان للحالة */}
        {appointment?.status?.toLowerCase() === "pending" ? (
          <AppointmentActions
            appointmentId={appointment.id}
            onApprove={onApprove}
            onReject={onReject}
          />
        ) : (
          <button
            onClick={() => handleShowDetails(appointment)}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[var(--main-color)] hover:bg-blue-700 transition-colors"
          >
            <FaEye className="mr-1" size={12} />
            Details
          </button>
        )}
      </td>
      <td className="py-4 px-2">
        {/* ✅ إضافة فحص أمان للحالة */}
        {appointment?.status?.toLowerCase() === "pending" && (
          <button
            onClick={() => handleShowDetails(appointment)}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[var(--main-color)] hover:bg-blue-700 transition-colors"
          >
            <FaEye className="mr-1" size={12} />
            Details
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div>
      <Table
        cols={tableColumns}
        data={appointments}
        row={renderRow}
        headerColor="bg-gray-100 dark:bg-[var(--input-border)]"
        headerTextColor="text-gray-500 dark:text-[var(--text-color)]"
      />
      <InterviewDetailsModal
        interview={selectedInterview}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default List;
