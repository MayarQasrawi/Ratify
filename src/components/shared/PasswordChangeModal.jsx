import { useForm } from "react-hook-form";
import useChangePassword from "../../hooks/auth/useChangePassword";
import {
  MdEmail,
  MdCheck,
  MdClose,
  MdAutorenew,
  MdLockOpen,
  MdLock,
} from "react-icons/md";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";

export default function PasswordChangeModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [isConfirming, setIsConfirming] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const { mutate, isPending } = useChangePassword();

  const handlePasswordChange = ({ newPassword, oldPassword, email }) => {
    mutate({ oldPassword, email, newPassword });
    console.log({ oldPassword, email, newPassword });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-96 border border-gray-200">
      <div className="flex items-center justify-center w-full mb-8">
        <MdLock className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
      </div>

      {!isConfirming ? (
        <form className="w-full flex flex-col gap-6">
          <div className="relative">
            <div
              className={`absolute left-3 top-3 flex items-center gap-3 transition-all duration-200 ${
                focusedField === "email" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <MdEmail className="w-5 h-5" />
              <span className="text-sm">Email Address</span>
            </div>
            <input
              type="email"
              {...register("email")}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`w-full p-3 pl-12 border rounded-lg outline-none pt-7 pb-3 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 transition-colors`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <div
              className={`absolute left-3 top-3 flex items-center gap-3 transition-all duration-200 ${
                focusedField === "oldPassword"
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              <MdLockOpen className="w-5 h-5" />
              <span className="text-sm">Current Password</span>
            </div>
            <input
              type="password"
              {...register("oldPassword")}
              onFocus={() => setFocusedField("oldPassword")}
              onBlur={() => setFocusedField(null)}
              className={`w-full p-3 pl-12 border rounded-lg outline-none pt-7 pb-3 ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 transition-colors`}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className="relative">
            <div
              className={`absolute left-3 top-3 flex items-center gap-3 transition-all duration-200 ${
                focusedField === "newPassword"
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              <MdLock className="w-5 h-5" />
              <span className="text-sm">New Password</span>
            </div>
            <input
              type="password"
              {...register("newPassword")}
              onFocus={() => setFocusedField("newPassword")}
              onBlur={() => setFocusedField(null)}
              className={`w-full p-3 pl-12 border rounded-lg outline-none pt-7 pb-3 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 transition-colors`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit(() => setIsConfirming(true))}
            type="button"
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2.5 font-medium"
          >
            <MdAutorenew className="w-5 h-5" />
            Change Password
          </button>
        </form>
      ) : (
        <div className="text-center w-full">
          <p className="text-lg font-medium text-gray-700">
            Are you sure you want to change your password?
          </p>
          <div className="flex mt-9 gap-4 justify-center">
            <button
              disabled={isPending}
              onClick={handleSubmit(handlePasswordChange)}
              className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1 disabled:opacity-70"
            >
              <MdCheck className="w-5 h-5" />
              {isPending ? "Updating..." : "Confirm"}
            </button>
            <button
              // onClick={handleCancel}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
            >
              <MdClose className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
