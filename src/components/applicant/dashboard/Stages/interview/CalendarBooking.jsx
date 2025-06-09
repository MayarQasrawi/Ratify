import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import useGetAvailableSlots from "@/hooks/applicant/interview/getAvailableSlots";
import Extract from "@/utils/Extract";
import { useAuthContext } from "@/contexts/AuthProvider";
import ErrorPage from "@/pages/general/ErrorPage";
import useBookInterview from "@/hooks/applicant/interview/useBookInterview";
import ConfirmationModal from "@/components/shared/modal/ConfirmationModal";
import Alert from "@/components/shared/Alert";

export default function CalendarBooking({
  stageId,
  setStageData,
  interviewId,
}) {
  const [date, setDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  console.log("interviewId", interviewId);
  const { auth } = useAuthContext();

  const applicantId = Extract(auth, "nameid");

  const { data, error, isLoading } = useGetAvailableSlots({
    stageId,
    applicantId,
  });
  console.log("Available Slots Data:", data);
  const {
    mutate: bookInterview,
    isPending,
    isError: bookError,
    isSuccess,
    data: responseData,
    error: bookErrorData,
  } = useBookInterview({
    // onSuccess: (data) => {
    //   setStageData((prev) => ({
    //     ...prev,
    //     actionStatus: "BookingPending",
    //     additionalData: {
    //       ...prev.additionalData,
    //       InterviewBookId: data,
    //     },
    //   }));
    // },
    onError: () => {
      setShowAlert(true); // Show alert when error occurs
    },
  });

  // ... rest of your component logic stays the same ...

  // Extract available dates from server data
  const getAvailableDates = () => {
    if (!data || !Array.isArray(data)) return [];

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return data
      .map((dateItem) => {
        // Parse the date string (e.g., "2025-05-21T00:00:00")
        const dateStr = dateItem.date;
        return new Date(dateStr);
      })
      .filter((date) => {
        // Filter out invalid dates and past dates
        return !isNaN(date.getTime()) && date >= today;
      });
  };

  // Get available time slots for selected date
  const getAvailableTimeSlotsForDate = (selectedDate) => {
    if (!data || !Array.isArray(data) || !selectedDate) return [];

    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    const dateItem = data.find((item) => {
      const itemDateStr = new Date(item.date).toISOString().split("T")[0];
      return itemDateStr === selectedDateStr;
    });

    if (!dateItem || !dateItem.slots) return [];

    const now = new Date();

    return dateItem.slots
      .filter((slot) => {
        // Filter out booked slots and past time slots
        if (slot.isBooked) return false;

        const slotDateTime = new Date(slot.startTime);
        return slotDateTime > now; // Only show future time slots
      })
      .map((slot) => {
        // Extract time from startTime (e.g., "2025-05-21T15:00:00" -> "15:00")
        const startTime = new Date(slot.startTime);
        const hours = startTime.getHours().toString().padStart(2, "0");
        const minutes = startTime.getMinutes().toString().padStart(2, "0");
        return {
          time: `${hours}:${minutes}`,
          appointmentId: slot.appointmentId,
          startTime: slot.startTime,
          endTime: slot.endTime,
        };
      });
  };

  const availableDates = getAvailableDates();
  const availableTimeSlots = getAvailableTimeSlotsForDate(date);

  const isDateAvailable = (date) => {
    if (!date) return false;
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );
  };

  const disableUnavailableDates = (date) => {
    return !isDateAvailable(date);
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
  };

  const handleBookAppointment = () => {
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedTime && date) {
      bookInterview({
        applicantId,
        interviewId,
        appointmentId: selectedTime.appointmentId,
      });
      setShowModal(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 mb-4">
          {/* Calendar Skeleton */}
          <div
            className="border-2 rounded-lg p-2 md:p-4 w-full md:w-auto"
            style={{ borderColor: "var(--table-border)" }}
          >
            <div className="animate-pulse">
              {/* Calendar header skeleton */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-24"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Days of week skeleton */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded"></div>
                  ))}
              </div>

              {/* Calendar days skeleton */}
              <div className="grid grid-cols-7 gap-1">
                {Array(35)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded"></div>
                  ))}
              </div>
            </div>
          </div>

          {/* Time slots skeleton */}
          <div className="flex-1 w-full mt-4 md:mt-0">
            <div className="animate-pulse">
              {/* Title skeleton */}
              <div className="h-6 bg-gray-300 rounded w-32 mb-3"></div>

              {/* Time slots grid skeleton */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 w-full max-w-md mb-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded-lg"></div>
                  ))}
              </div>

              {/* Button skeleton */}
              <div className="h-12 bg-gray-300 rounded-lg w-full max-w-md"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show success state
  if (isSuccess && responseData) {
    return (
      <div className="p-4 w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-96 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto"
              style={{ color: "var(--main-color)" }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--main-color)" }}
          >
            Interview Booked Successfully!
          </h2>
          <p className="text-lg mb-6" style={{ color: "var(--text-color)" }}>
Your interview has been scheduled successfully.          </p>

          {/* Rest of success content stays the same... */}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      {/* Show error alert if there's an error */}
      {showAlert && bookErrorData && (
        <div className="mb-4">
          <Alert
            type="error"
            message={
              bookErrorData?.errors?.message ||
              "An error occurred while booking the interview."
            }
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}

      {/* Rest of your component JSX stays the same... */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 mb-4">
        {/* Calendar Section */}
        <div
          className="border-2 rounded-lg p-2 md:p-4 w-full md:w-auto"
          style={{ borderColor: "var(--table-border)" }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="mx-auto"
            disabled={disableUnavailableDates}
            defaultMonth={
              availableDates.length > 0 ? availableDates[0] : new Date()
            }
            style={{ color: "var(--text-color)" }}
          />
        </div>

        {/* Time selection and confirmation modal remain the same... */}
        {date && (
          <div className="flex-1 w-full mt-4 md:mt-0">
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: "var(--secondary-color)" }}
            >
              Pick a time
            </h3>

            {availableTimeSlots.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 w-full max-w-md">
                  {availableTimeSlots.map((timeSlot) => (
                    <button
                      key={timeSlot.appointmentId}
                      type="button"
                      onClick={() => handleTimeSelect(timeSlot)}
                      className="py-2 px-3 md:px-4 rounded-lg border-2 text-center font-medium cursor-pointer transition-all"
                      style={{
                        backgroundColor:
                          selectedTime?.appointmentId === timeSlot.appointmentId
                            ? "var(--main-color)"
                            : "transparent",
                        color:
                          selectedTime?.appointmentId === timeSlot.appointmentId
                            ? "#fff"
                            : "var(--text-color)",
                        borderColor:
                          selectedTime?.appointmentId === timeSlot.appointmentId
                            ? "var(--main-color)"
                            : "var(--table-border)",
                      }}
                    >
                      {timeSlot.time}
                    </button>
                  ))}
                </div>

                <div className="mt-4 md:mt-6 text-sm text-gray-500 text-center w-full max-w-md">
                  All Times are in Palestine Local Time (GMT+3)
                </div>

                <div className="mt-4 md:mt-6">
                  <button
                    disabled={!selectedTime}
                    onClick={handleBookAppointment}
                    className="w-full max-w-md py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: selectedTime
                        ? "var(--main-color)"
                        : "#9ca3af",
                      cursor: selectedTime ? "pointer" : "not-allowed",
                    }}
                  >
                    <span className="mr-2">Book Appointment</span>
                    {selectedTime && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center w-full max-w-md">
                <p className="text-gray-500">
                  No available time slots for this date
                </p>
              </div>
            )}
          </div>
        )}

        {!date && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <p className="text-lg text-gray-500">
              Please select a date to see available times
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <ConfirmationModal
            Confirm={handleConfirmBooking}
            Cancle={() => setShowModal(false)}
            isPending={isPending}
            isSuccess={isSuccess}
            // isError={bookError}
            // error={bookErrorData}
            data={responseData}
            view={true}
          >
            Are you sure you want to book an interview on{" "}
            <span className="font-semibold">{date.toDateString()}</span> at{" "}
            <span className="font-semibold">{selectedTime.time}</span>?
          </ConfirmationModal>
        </div>
      )}
    </div>
  );
}
