import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostAppTask from "@/hooks/applicant/task/usePostAppTask";
import { LuLink } from "react-icons/lu";
import ConfirmationModal from "@/components/shared/modal/ConfirmationModal";
import Toast from "@/components/applicant/dashboard/Stages/Exam/Toast";
import { FaRegFaceSmileBeam } from "react-icons/fa6";

const submissionSchema = z.object({
  submissionUrl: z.string().url({ message: "Please enter a valid URL" }),
  notes: z.string().optional(),
});

function SubmitURL({ AppTaskId, refreshStage }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // Fixed: better naming and initial value

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset to clear form after successful submission
  } = useForm({ resolver: zodResolver(submissionSchema) });

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const { mutate: postAppTask, isLoading: isSubmitting, isSuccess, isError, error } = usePostAppTask({
    onSuccess: () => {
      refreshStage();
      addToast("Task submitted successfully", "success");
      setShowModal(false);
      setIsSubmitted(true); // Mark as submitted after success
      reset(); // Clear the form
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Submission failed";
      addToast(msg, "error");
      setShowModal(false);
      setIsSubmitted(false); // Reset submission state on error
    },
  });

  const onSubmit = (data) => {
    const payload = {
      taskApplicantId: AppTaskId,
      submissionUrl: data.submissionUrl,
      notes: data.notes,
    };
    setFormData(payload);
    setShowModal(true);
  };

  const handleConfirm = () => {
    postAppTask(formData);
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="p-6">
      {isSuccess && isSubmitted ? (
        <div className="bg-green-50 border border-green-200 flex flex-col py-8 rounded-lg px-4 font-light text-lg items-center gap-4">
          <FaRegFaceSmileBeam className="w-12 h-12 text-green-600" /> 
          <p className="text-green-700 text-center font-medium">Your submission was successful!</p>
          <p className="text-green-600 text-sm text-center">
            Thank you for submitting your task. You will receive feedback soon.
          </p>
          {/* Optional: Add a button to submit another task or go back */}
          <button
            onClick={handleTryAgain}
            className="mt-2 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
          >
            Submit Another Task
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-500">
          <div className="space-y-2">
            <label htmlFor="submission-url" className="block text-lg font-bold text-gray-700">
              <LuLink className="inline mr-1 text-gray-400 font-black" /> Submission URL 
            </label>
            <input
              id="submission-url"
              type="url"
              placeholder="https://github.com/username/repo or https://your-demo.com"
              {...register("submissionUrl")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 focus:shadow-md"
            />
            {errors.submissionUrl && (
              <p className="text-red-600 text-sm">{errors.submissionUrl.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Provide a link to your GitHub repository, live demo, or other relevant URL
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="submission-notes" className="block font-bold text-lg text-gray-700">
              Additional Notes (Optional)
            </label>
            <textarea
              id="submission-notes"
              rows={3}
              placeholder="Any additional information about your submission..."
              {...register("notes")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 focus:shadow-md resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full hover:bg-[var(--main-color)] bg-[var(--secondary-color)] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Task"}
          </button>
        </form>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <ConfirmationModal
            Confirm={handleConfirm}
            Cancle={() => setShowModal(false)}
            isPending={isSubmitting}
            isSuccess={false}
            isError={false}
            view={true}
          >
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Confirm Submission</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to submit this task?</p>
              {formData && (
                <div className="bg-gray-50 p-3 rounded-md text-left text-sm">
                  <p><strong>URL:</strong> {formData.submissionUrl}</p>
                  {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
                </div>
              )}
            </div>
          </ConfirmationModal>
        </div>
      )}

      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
}

export default SubmitURL;