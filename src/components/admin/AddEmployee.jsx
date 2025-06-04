import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { addEmployeeSchema } from "../../validation/validation";
import useAddEmployee from "../../hooks/admin/examiner/useAddEmployee";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "../shared/Spinner";
import Select from "./track/Select";
import Alert from "../shared/Alert";

const inputField = ["Full Name", "Email"];

export default function AddEmployee({ setIsOpen }) {
  const workingTrackId = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(addEmployeeSchema) });
  const {
    mutate: addEmployee,
    isPending,
    isSuccess,
    isError,
  } = useAddEmployee();
  const [password, setPassword] = useState({
    show: false,
    passwordValue: "",
  });
  useEffect(() => {
    if (isSuccess || isError) setTimeout(() => setIsOpen(false), 1500);
  }, [isSuccess, isError]);
  const generatePassword = () => {
    let generatedPassword = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*";
    for (let i = 0; i < 5; i++) {
      generatedPassword += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }
    generatedPassword += alphabet.charAt(
      Math.floor(Math.random() * alphabet.length)
    );
    for (let i = 0; i < 2; i++) {
      generatedPassword += specialChars.charAt(
        Math.floor(Math.random() * specialChars.length)
      );
    }
    setPassword({ ...password, passwordValue: generatedPassword });
  };

  const onSubmit = ({ fullName, email }) => {
    console.log({ fullName, email, password: password.passwordValue });
    console.log(workingTrackId.current, "working track id");
    addEmployee({fullName, email, password: password.passwordValue,workingTrackIds:[workingTrackId.current] });
  };

  return (
    <>
      {isSuccess && <Alert message="Employee added successfully" />}
      {isError && <Alert type="error" message="kkkkk" />}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-500 tracking-tight">
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ]">
          {inputField.map((field, index) => (
            <div key={index} className="relative mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                {field}
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register(
                  field.includes("Full Name") ? "fullName" : "email"
                )}
                className="w-full p-2 border border-[var(--input-border)] rounded-lg outline-none  focus:border-[var(--input-focus)]  transition duration-300 ease-in-out"
              />
              {errors[field.includes("Full Name") ? "fullName" : "email"] && (
                <p className="absolute text-red-500 text-xs mt-1.5  pl-1">
                  {
                    errors[field.includes("Full Name") ? "fullName" : "email"]
                      ?.message
                  }
                </p>
              )}
            </div>
          ))}

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={password.show ? "text" : "password"}
                name="password"
                className="w-full p-2 border border-[var(--input-border)] rounded focus:outline-none focus:border-[var(--input-focus)]"
                readOnly
                value={password.passwordValue}
              />
              <button
                type="button"
                onClick={() =>
                  setPassword({ ...password, show: !password.show })
                }
                className="absolute right-5 top-2 text-[var(--text-color)] hover:text-[var(--main-color)]"
              >
                {password.show ? (
                  <FaEye size={20} className="cursor-pointer" />
                ) : (
                  <FaEyeSlash size={20} className="cursor-pointer" />
                )}
              </button>
            </div>
            <div className="flex gap-1.5 justify-start items-start ">
              <input
                type="checkbox"
                onClick={generatePassword}
                className="relative top-4"
              />
              <p className="text-xs text-[var(--text-color)] mt-1 mb-8">
                Auto-generated 8-character password with letters, numbers, and
                special characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                Track<span className="text-red-500">*</span>
              </label>
              <Select workingTrackId={workingTrackId} />
            </div>
          </div>
          <div className="flex font-medium justify-end space-x-3">
            {!isPending && (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-4 py-2 border border-[var(--input-border)] rounded text-[var(--text-color)] "
              >
                Cancel
              </button>
            )}
            <button
              disabled={isPending}
              type="submit"
              className="px-4 py-2 cursor-pointer  flex items-center gap-1 disabled:cursor-not-allowed bg-[var(--button-hover)] text-white rounded hover:bg-[var(--button-hover)] transition"
            >
              {isPending ? (
                <>
                  <Spinner />
                  <span>Add Employee</span>
                </>
              ) : (
                "Add Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
