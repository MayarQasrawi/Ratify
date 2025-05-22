import React from 'react';
import { FaCheckCircle, FaUpload } from 'react-icons/fa';
import { MdOutlineAssignment } from "react-icons/md";

const steps = [
  { name: 'Criteria', icon: FaCheckCircle },
  { name: 'Task Details', icon: MdOutlineAssignment },
  { name: 'Submission', icon: FaUpload }
];

export default function TaskSidbar({ currentStep, setCurrentStep }) {
  return (
    <aside className="md:w-64 md:h-90 bg-white shadow-md rounded-2xl mt-2.5">
      <nav className="p-6 space-y-8">
        <ol className="md:space-y-4 text-center">
          {steps.map((step, idx) => {
            const active = idx === currentStep;
            const completed = idx < currentStep;
            const Icon = step.icon;
            return (
              <li
                key={step.name}
                className={`inline-block ml-2 sm:ml-4  md:flex md:items-center gap-3 cursor-pointer prounded-lg transition-all duration-200 py-2.5 px-3 rounded-lg ${
                  active ?'md:bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() =>{ setCurrentStep(idx);scrollTo(0, 0)}}
              >
                <div
                  className={`p-2 rounded-full md:border-2 ${
                    completed
                      ? 'border-[var(--main-color)] text-[var(--main-color)]'
                      : active
                      ? 'border-blue-500 text-blue-600'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    active ? 'text-blue-600' : completed ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}

