import { MdCheck, MdClose } from "react-icons/md";
import Spinner from "../Spinner";

export default function ConfirmationModal({
  children,
  Confirm,
  Cancle,
  isPending,
  view=false
}) {
  return (
   <div className={`${view ? 'flex flex-col text-center items-center py-10 px-12 bg-white shadow-lg rounded-2xl w-96 border  border-gray-200':'text-center w-full'}`}> 
      <p className="text-lg font-medium ">{children}</p>
      <div className="flex mt-9 gap-4 justify-center">
        <button
          disabled={isPending}
          onClick={() => Confirm()}
          className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
        >
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <MdCheck className="w-5 h-5" />
              Confirm
            </>
          )}
        </button>
        <button
          onClick={() => {
            Cancle();
          }}
          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
        >
          <MdClose className="w-5 h-5" />
          Cancel
        </button>
      </div>
    </div>
    
  );
}
