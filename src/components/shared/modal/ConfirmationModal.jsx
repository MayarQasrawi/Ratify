import { MdCheck, MdClose } from "react-icons/md";
import Spinner from "../Spinner";
import Alert from "../Alert";

export default function ConfirmationModal({
  children,
  Confirm,
  Cancle,
  isSuccess,
  isPending,
  view = false,
  isError,
  error,
  data,
}) {
  console.log(data, "inside confirmation .....");
  return (
    <>
      {isError && (
        <Alert
          type="error"
          message={error?.response?.data?.message || "Delete Request Fails"}
        />
      )}
      {isSuccess && (
        <Alert message={data?.message|| data.meta || "Delete successfully"} />
      )}
      <div
        className={`${
          view
<<<<<<< HEAD
            ? "flex flex-col text-center items-center py-10 px-12 bg-gradient-to-br bg-white shadow-lg rounded-2xl w-96 border  border-gray-200"
            : "text-center w-full"
        }`}
      >
        <p className="text-lg font-medium ">{children}</p>
        <div className="flex mt-9 gap-4 justify-center font-bold">
          <button
            disabled={isPending}
            onClick={() => Confirm()}
            className="bg-[var(--main-color)] text-white px-3 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition cursor-pointer flex items-center justify-center gap-2 flex-1"
=======
            ? "flex flex-col text-center items-center py-10 px-12 bg-white shadow-lg rounded-2xl  max-w-md border dark:bg-[var(--sidebar-bg)]   border-gray-200 dark:border-gray-700"
            : "text-center w-full"
        }`}
      >
        <p className="text-xl font-medium ">{children}</p>
        <div className="flex mt-9 gap-4 justify-center">
          <button
            disabled={isPending}
            onClick={() => Confirm()}
            className="bg-green-500 text-white px-3 py-2  rounded-lg hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1 disabled:cursor-not-allowed"
>>>>>>> 8aa5940c8c2ff22af87e74ed2db30758b33ac624
          >
            {isPending ? (
              <>
                <Spinner />
                <span>Confirm </span>{" "}
              </>
            ) : (
              <>
                {" "}
                <MdCheck className="w-5 h-5" />
                <span>Confirm</span>
              </>
            )}
          </button>
<<<<<<< HEAD
          <button
            onClick={() => {
              Cancle();
            }}
            className=" border-3  border-[var(--main-color)] text-[var(--main-color)]  px-3 py-2 rounded-lg hover:border-[var(--secondary-color)]  hover:text-[var(--secondary-color)] transition cursor-pointer flex items-center justify-center gap-2 flex-1"
          >
            <MdClose className="w-5 h-5" />
            Cancel
          </button>
=======
          {!isPending && (
            <button
              onClick={() => {
                Cancle();
              }}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
            >
              <MdClose className="w-5 h-5" />
              Cancel
            </button>
          )}
>>>>>>> 8aa5940c8c2ff22af87e74ed2db30758b33ac624
        </div>
      </div>
    </>
  );
}
