import Spinner from "../../../shared/Spinner";
import Title from "./shared/Title";
import { useForm } from "react-hook-form";

export default function AddCriteriaModal({ isPending, onCancel, onSubmit,current }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
console.log(current,'inside add')
  const submitHandler =  (data) => {
   console.log({...data,weight:current.current.weight
})
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-[var(--sidebar-bg)] dark:border-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-100"
    >
      <div>
        <Title>Add Criteria</Title>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-black/70 mb-1.5">
              Name <span className="text-red-500 dark:text-red-700">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`block w-full border rounded-md p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-black/70 mb-1.5">
              Description{" "}
              <span className="text-red-500 dark:text-red-700">*</span>
            </label>
            <textarea
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
              className={`block w-full border rounded-md p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        {!isPending && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 border dark:border-gray-700 border-gray-300 rounded-md dark:text-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-0.5 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isPending && <Spinner />}
          <span>{isPending ? "Submitting..." : "Submit"}</span>
        </button>
      </div>
    </form>
  );
}
