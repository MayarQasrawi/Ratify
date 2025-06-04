import React from "react";
import { FaHome, FaSearchMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen  items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-[#3B82F6] p-6">
          <div className="flex items-center justify-center">
            <FaSearchMinus className="text-white h-12 w-12" />
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-5xl font-bold text-center text-[#3B82F6] mb-2">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Page Not Found
          </h2>

          <div className="bg-indigo-50 border-l-4 border-[#3B82F6] p-4 mb-6">
            <p className="text-[#3B82F6] font-medium">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex-1 cursor-pointer bg-[#3B82F6] hover:bg-[#003F7D] text-white py-2 px-4 rounded-md font-medium transition duration-200 flex items-center justify-center"
            >
              <FaHome className="mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
