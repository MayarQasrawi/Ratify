import React from "react";
import { FaEnvelope, FaCheck, FaKey, FaSignInAlt } from "react-icons/fa";

const steps = [
  {
    title: "Send Email",
    icon: <FaEnvelope className="w-5 h-5" />,
    description: "Enter your email address to receive a reset link",
  },
  {
    title: "Verify Email",
    icon: <FaCheck className="w-5 h-5" />,
    description: "Click the link sent to your email to verify",
  },
  {
    title: "Reset Password",
    icon: <FaKey className="w-5 h-5" />,
    description: "Create a new secure password",
  },
  {
    title: "Login",
    icon: <FaSignInAlt className="w-5 h-5" />,
    description: "Sign in with your new password",
  },
];

export default function PasswordResetStepper({ currentStep = 0 }) {
  return (
    <div className="flex flex-col p-10 bg-gray-100 shadow rounded-lg">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                index <= currentStep ? "bg-blue-500" : "bg-blue-300"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-0.5 bg-blue-300 h-16"></div>
            )}
          </div>
          <div className="flex flex-col pt-2 pb-8">
            <span
              className={`text-base font-medium ${
                index <= currentStep ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {step.title}
            </span>
            <span className="text-sm text-gray-500">{step.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
