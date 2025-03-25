import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { addEmployeeSchema } from "../../validation/validation";
import useAddEmployee from "../../hooks/examiner/useAddEmployee";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "../shared/Spinner";

const inputField = ["Full Name", "Email"];

export default function AddEmployee({ setIsOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(addEmployeeSchema) });
  const { mutate: addEmployee, isPending } = useAddEmployee();
  const [password, setPassword] = useState({
    show: false,
    passwordValue: "",
  });

  const generatePassword = () => {
    let generatedPassword = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*";
    for (let i = 0; i < 5; i++) {
      generatedPassword += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    generatedPassword += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    for (let i = 0; i < 2; i++) {
      generatedPassword += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    }
    setPassword({ ...password, passwordValue: generatedPassword });
  };

  const onSubmit = ({ fullName, email }) => {
    console.log({ fullName, email, password: password.passwordValue });
    addEmployee({ fullName, email, password: password.passwordValue });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-auto">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-[#003F7DDE] tracking-tight">
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {inputField.map((field, index) => (
          <div key={index} className="relative mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
              {field}
            </label>
            <input
              {...register(field.includes("Full Name") ? "fullName" : "email")}
              className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none  focus:border-[#003F7DDE]  transition duration-300 ease-in-out"
            />
            {errors[field.includes("Full Name") ? "fullName" : "email"] && (
              <p className="absolute text-red-500 text-xs mt-1.5  pl-1">
                {errors[field.includes("Full Name") ? "fullName" : "email"]?.message}
              </p>
            )}
          </div>
        ))}
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
            Password
          </label>
          <div className="relative">
            <input
              type={password.show ? "text" : "password"}
              name="password"
              className="w-full p-3 border-2 border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-[#003F7DDE] focus:border-transparent transition duration-300 ease-in-out"
              readOnly
              value={password.passwordValue}
            />
            <button
              type="button"
              onClick={() => setPassword({ ...password, show: !password.show })}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {password.show ? (
                <FaEye size={20} className="cursor-pointer" />
              ) : (
                <FaEyeSlash size={20} className="cursor-pointer" />
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              onClick={generatePassword} 
              className="rounded text-[#003F7DDE] focus:ring-[#003F7DDE]"
            />
            <p className="text-xs text-gray-500">
              Auto-generate 8-character password with letters, numbers, and special characters
            </p>
          </div>
        </div>
        
        <div className="flex justify-between space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 cursor-pointer py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 px-4 py-2 cursor-pointer bg-[#003F7DDE] text-white rounded-lg hover:bg-[#3B82F6] transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <Spinner /> : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}


