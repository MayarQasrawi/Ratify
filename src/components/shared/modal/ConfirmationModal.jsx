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
        <Alert message={data?.message|| data?.meta || "Delete successfully"} />
      )}
      <div
        className={`${
          view
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
          <button
            onClick={() => {
              Cancle();
            }}
            className=" border-3  border-[var(--main-color)] text-[var(--main-color)]  px-3 py-2 rounded-lg hover:border-[var(--secondary-color)]  hover:text-[var(--secondary-color)] transition cursor-pointer flex items-center justify-center gap-2 flex-1"
          >
            <MdClose className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
