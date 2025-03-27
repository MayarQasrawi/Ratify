import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAddEmployee from '../../hooks/examiner/useAddEmployee';

const inputField = ['Full Name', 'Email'];

export default function AddEmployee({ setIsOpen }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate } = useAddEmployee();
  const [password, setPassword] = useState({
    show: false,
    passwordValue: '',
  });

  const generatePassword = () => {
    let password = '';
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*";
    for (let i = 0; i < 5; i++) {
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    for (let i = 0; i < 2; i++) {
      password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    }
    setPassword({ ...password, passwordValue: password });
  };

  const onSubmit = ({ fullName, email }) => {
    mutate({ fullName, email, password: password.passwordValue });
  };

  return (
    <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-[var(--main-color)]">Add New Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputField.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
              {field}
            </label>
            <input
              {...register(field.includes('Full Name') ? 'fullName' : 'email')}
              className="w-full p-2 border border-[var(--input-border)] rounded focus:outline-none focus:border-[var(--input-focus)]"
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Password
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
              onClick={() => setPassword({ ...password, show: !password.show })}
              className="absolute right-5 top-2 text-[var(--text-color)] hover:text-[var(--main-color)]"
            >
              {password.show ? <FaEye size={20} className="cursor-pointer" /> : <FaEyeSlash size={20} className="cursor-pointer" />}
            </button>
          </div>
          <div className="flex gap-1 items-center">
            <input type="checkbox" onClick={generatePassword} />
            <p className="text-xs text-[var(--text-color)] mt-1">
              Auto-generated 8-character password with letters, numbers, and special characters
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-[var(--input-border)] rounded text-[var(--text-color)] hover:bg-[var(--sidebar-icon-bg)] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--button-bg)] text-white rounded hover:bg-[var(--button-hover)] transition"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}