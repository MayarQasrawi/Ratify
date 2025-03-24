import { useForm } from "react-hook-form";
import useChangePassword from "../../../hooks/auth/useChangePassword";
import { MdEmail, MdAutorenew, MdLockOpen, MdLock } from "react-icons/md";
import { useState } from "react";
import {changePasswordSchema} from '../../../validation/validation'
import ConfirmationModal from "./ConfirmationModal";
import Header from "./Header";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PasswordChangeModal({ setShowPasswordModal }) {
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });
  const [isConfirming, setIsConfirming] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const { mutate: changePassword, isPending } = useChangePassword();

  const handlePasswordChange = () => {
    const formData = getValues();
    changePassword({
      oldPassword: formData.oldPassword,
      email: formData.email,
      newPassword: formData.newPassword,
    });
    console.log({
      oldPassword: formData.oldPassword,
      email: formData.email,
      newPassword: formData.newPassword,
    });
    console.log("jjjjjjjjjjjjjjjjjj");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-96 border border-gray-200">
      <Header title="Change Password" />

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
            onClick={() => {
              if (isValid) setIsConfirming(true);
            }}
            type="button"
            disabled={!isValid}
            className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500  text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2.5 font-medium"
          >
            <MdAutorenew className="w-5 h-5" />
            Change Password
          </button>
        </form>
      ) : (
        <ConfirmationModal
          Confirm={handlePasswordChange}
          Cancle={setShowPasswordModal}
          isPending={isPending}
        >
          {" "}
          Are you want to change Password ?{" "}
        </ConfirmationModal>
      )}
    </div>
  );
}
