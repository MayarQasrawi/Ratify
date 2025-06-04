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

function SubmitURL({ AppTaskId }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [submitted,setSubmitted]=useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(submissionSchema) });

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const { mutate: postAppTask, isLoading: isSubmitting, isSuccess } = usePostAppTask({
    onSuccess: () => {
      addToast("Task submitted successfully", "success");
      setShowModal(false);
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Submission failed";
      addToast(msg, "error");
      setShowModal(false);
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
    setSubmitted(false)
  };

  const handleConfirm = () => {
         setSubmitted(false)

    postAppTask(formData);
  };

  return (
    <div className="p-6">
      {isSuccess && !submitted ? (
        <div className="bg-blue-600/5 flex flex-col  py-15 rounded-lg px-4 font-light text-lg items-center gap-4">
          <FaRegFaceSmileBeam className="w-10 h-10"/> 
          <p>Your submission was successful!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-15 text-gray-500">
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
            disabled={isSubmitting || isSuccess}
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
            Are you sure you want to submit this task?
          </ConfirmationModal>
        </div>
      )}

      <div className="fixed top-5 right-5 space-y-2 z-60">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
}

export default SubmitURL;
