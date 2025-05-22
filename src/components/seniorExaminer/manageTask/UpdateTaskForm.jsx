import { useForm } from "react-hook-form";
import { FiAlertCircle } from "react-icons/fi";
import useUpdateTask from "../../../hooks/seniorExaminer/manageTask/useUpdateTask";
import { useEffect } from "react";
import Alert from "../../shared/Alert";

const fields = [
  {
    name: "title",
    label: " Title",
    type: "input",
    required: true,
  },
  {
    name: "requirement",
    label: "Requirement",
    type: "textarea",
    required: true,
    rows: 3,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
  required: true,
    rows: 6,
  },
];

export default function UpdateTaskForm({ task = {}, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: task,
    mode: "onChange",
  });
  const { isError, error,isPending, mutate:updateTask,isSuccess,data }=useUpdateTask()
  useEffect(()=>{
   if(isError || isSuccess)
    setTimeout(()=>onCancel(),1500)
  },[isError,isSuccess])
  const onSubmit = (data) => {
    console.log(task.id,'inside update task')
    console.log(data, "update ggggg");
    updateTask({...data,id:task.id})
  };

  console.log(errors, "form errors");

  return (
    <>
     {isError && <Alert message='Failed to update Task. Please try again' type='error' /> }
     {isSuccess && <Alert message='Task updated successfully'  /> }
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div className="space-y-4">
        {fields.map(({ name, label, type, required, rows }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {label} <span className="text-red-500">*</span>
            </label>

            {type === "textarea" ? (
              <textarea
                id={name}
                {...register(name, {
                  required: required ? `${label} is required` : false,
                })}
                rows={rows}
                className="w-full p-3 border border-[var(--input-border)] bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none transition"
              />
            ) : (
              <input
                id={name}
                type="text"
                {...register(name, {
                  required: required ? `${label} is required` : false,
                })}
                className="w-full p-3 border border-[var(--input-border)] bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none transition"
              />
            )}

            {errors[name] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                {errors[name].message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
       {!isPending && <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 cursor-pointer border rounded-lg text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          Cancel
        </button>} 
        <button
          disabled={isPending}
          type="submit"
          className="px-6 py-2 cursor-pointer disabled:cursor-not-allowed bg-blue-500  text-white rounded-lg hover:bg-blue-600  transition"
        >
          Save Changes
        </button>
      </div>
    </form>
    </>
  );
}
