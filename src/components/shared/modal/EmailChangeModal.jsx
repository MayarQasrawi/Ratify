import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdClose } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import useChangeEmail from "../../../hooks/auth/useChangeEmail";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";
import { emailSchema } from "../../../validation/validation";
import ConfirmationModal from "./ConfirmationModal";
import Header from "./Header";
import { useParams } from "react-router";
import { RiMailSendLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";

export default function EmailChangeModal({ setShowEmailModal }) {
  const { auth } = useAuthContext();

  const { id: id } = useParams(); // Extracting the userId from the URL parameters
  // const id = Extract(auth, 'role') === 'admin' ? paramId : Extract(auth, 'nameid');
   

   console.log(id)
  const {
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });


  const [isConfirming, setIsConfirming] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const {
    mutate: changeEmail,
    isPending,
    isSuccess,
    isError,
    error,
    data
  } = useChangeEmail();
  const watchEmail = watch("email");

  
  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => setShowEmailModal(), 1500);
    }
  }, [isSuccess, isError]);
  const handleEmailChange = () => {
    const email = getValues();
    changeEmail({id,newEmail:email.email})
    console.log({id,newEmail:email.email});
  };
console.log(data,'ehhhhhhhhhhhhhhhh')
  return (
      <div className="flex flex-col  items-center py-10 px-12 bg-white relative shadow-lg rounded-2xl w-96 border border-gray-200">
        <button
          onClick={() => setShowEmailModal()}
          className="absolute top-4 cursor-pointer  right-4 text-gray-500 hover:text-red-500 transition"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <Header title="Change Email Address" />
        {!isConfirming ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full flex flex-col gap-6"
          >
            <div className="relative">
              <div
                className={`absolute left-3 flex items-center gap-1 ${
                  isFocused || watchEmail
                    ? "text-xs text-blue-500 -top-4.5 bg-white px-2 font-medium "
                    : "text-gray-500 top-3 font-medium"
                } transition-all duration-200`}
              >
                <MdEmail className="w-5 h-5 " />
                <span className="text-sm">Email Address</span>
              </div>
              <input
                type="email"
                {...register("email")}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none   pt-4"
              />

              {errors.email && (
                <p className="mt-2  pl-3 py-2 bg-red-50 border-l-4 border-red-700 rounded-md text-red-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                if (isValid) setIsConfirming(true);
              }}
              type="submit"
              disabled={!isValid}
              className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500  text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2.5 font-medium"
            >
              
              Change Email Address
              <RiMailSendLine className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <ConfirmationModal
            isPending={isPending}
            Cancle={setShowEmailModal}
            Confirm={handleEmailChange}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            data={data}
          >
            Are you sure you want to change your email to{" "}
            <span className="text-[#003F7D] font-semibold underline">
              {watchEmail}
            </span>
            ?
          </ConfirmationModal>
        )}
      </div>
  );
}
