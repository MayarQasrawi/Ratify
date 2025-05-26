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
  console.log(isError, "gggggg");
  return (
    <>
      {isError && (
        <Alert
          type="error"
          message={error?.response?.data?.message || "Delete Request Fails"}
        />
      )}
      {isSuccess && (
        <Alert message={data?.message|| "Delete successfully"} />
      )}
      <div
        className={`${
          view
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
        </div>
      </div>
    </>
  );
}
