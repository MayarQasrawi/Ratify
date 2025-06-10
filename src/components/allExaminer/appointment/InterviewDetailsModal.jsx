"use client"

import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaExternalLinkAlt,
  FaTag,
  FaHourglassHalf,
} from "react-icons/fa"
import StatusBadge from "./shared/StatusBage"

export default function InterviewDetailsModal({ interview, isOpen, onClose }) {
  if (!isOpen || !interview) return null

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

  const DetailItem = ({ label, value, icon }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
        {icon && <span className="mr-2 text-[var(--main-color)]">{icon}</span>}
        {label}
      </label>
      <p className="text-sm text-gray-900 dark:text-white">{value}</p>
    </div>
  )

  // Check if interview is scheduled or pending
  const isScheduled = interview.status === "Scheduled" || interview.scheduledDateTime
  const isPending = interview.status === "Pending"

  // Build sections based on interview type
  const sections = [
    {
      title: "Applicant Information",
      icon: <FaUser />,
      items: [
        { 
          label: "Name", 
          value: interview.userName || interview.applicantName 
        },
        { 
          label: "Applicant ID", 
          value: interview.applicantId 
        },
      ],
    },
    {
      title: "Interview Information",
      icon: <FaTag />,
      items: [
        { label: "Stage", value: interview.stageName },
        { label: "Track", value: interview.trackName },
        ...(isScheduled ? [
          { label: "Examiner", value: interview.examinerName },
        ] : []),
        { label: "Stage Progress ID", value: interview.stageProgressId },
        ...(isPending ? [
          { label: "Interview ID", value: interview.interviewId },
          { label: "Stage ID", value: interview.stageId },
        ] : []),
      ],
    },
  ]

  // Add schedule section for scheduled interviews
  if (isScheduled) {
    sections.push({
      title: "Schedule Information",
      icon: <FaCalendarAlt />,
      items: [
        { label: "Date", value: formatDate(interview.scheduledDateTime) },
        { label: "Time", value: formatTime(interview.scheduledDateTime) },
        {
          label: "Duration",
          value: (
            <span className="flex items-center">
              <FaClock className="mr-1" size={12} />
              {interview.durationMinutes} minutes
            </span>
          ),
        },
        {
          label: "Status",
          value: <StatusBadge status={interview.status} />
        },
      ],
    })
  }

  // Add pending information section for pending interviews
  if (isPending) {
    sections.push({
      title: "Appointment Status",
      icon: <FaHourglassHalf />,
      items: [
        {
          label: "Request Date",
          value: formatDate(interview.requestDate)
        },
        {
          label: "Days Waiting",
          value: `${interview.daysWaiting} day${interview.daysWaiting !== 1 ? 's' : ''}`
        },
        {
          label: "Max Days to Book",
          value: `${interview.maxDaysToBook} days`
        },
        {
          label: "Status",
          value: <StatusBadge status={interview.status} />
        },
      ],
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white dark:bg-gray-800 rounded-sm shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-[var(--main-color)] dark:text-white">
            Interview Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content Sections */}
        <div className="p-6 space-y-6">
          {sections.map((section, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                {section.icon && (
                  <span className="mr-2 text-[var(--main-color)]">
                    {section.icon}
                  </span>
                )}
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, j) => (
                  <DetailItem
                    key={j}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Meeting Link - Only show for scheduled interviews */}
          {isScheduled && interview.meetingLink && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Meeting Link
              </h3>
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-600">
                <span className="text-sm text-gray-600 dark:text-gray-400 truncate mr-2">
                  {interview.meetingLink}
                </span>
                <a
                  href={interview.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-[var(--main-color)] text-white text-sm font-medium rounded-md hover:brightness-110 transition-colors"
                >
                  <FaExternalLinkAlt className="mr-1" size={10} />
                  Join
                </a>
              </div>
            </div>
          )}

          {/* Pending Status Message */}
          {isPending && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-center">
                <FaHourglassHalf className="text-yellow-600 dark:text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  This interview appointment is pending scheduling. You have waited {interview.daysWaiting} day{interview.daysWaiting !== 1 ? 's' : ''} out of a maximum {interview.maxDaysToBook} days.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}