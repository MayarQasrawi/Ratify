import Modal from "@/components/shared/modal/Modal";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

export default function ExpertCard({ expert, index }) {
  const [showModal, setShowModal] = useState(false);
  console.log(expert.image, "expert.image");
  const handleCardClick = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <div 
        className="border-3 max-w-[320px] h-[200px] relative group cursor-pointer border-r-4 odd:border-[var(--main-color)] even:border-[#003F7D] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={
              expert.image && expert.image.trim() !== ""
                ? `${import.meta.env.VITE_API}${expert.image}`
                : `https://www.gravatar.com/avatar/?d=mp&s=180`
            }
            className="w-full h-[200px] object-cover"
            alt={expert.fullName}
          />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaEye className={`text-white text-2xl drop-shadow-lg ${index % 2 === 0 ? "hover:text-[var(--main-color)]" : "hover:text-[#003F7D]"} `} />
          </div>

          <h2
            className={`absolute w-full text-white font-medium py-2 text-center bottom-0 left-0 transition-all duration-300 ${
              index % 2 === 0 ? "bg-[var(--main-color)]" : "bg-[#003F7D]"
            }`}
          >
            {expert.fullName}
          </h2>
        </div>
      </div>

      {showModal && (
       <Modal>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono">{expert.fullName}</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                 <AiOutlineClose size={20} className="cursor-pointer"  />
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <img
                src={
                  expert.image && expert.image.trim() !== ""
                    ? `${import.meta.env.VITE_API}${expert.image}`
                    : `https://www.gravatar.com/avatar/?d=mp&s=180`
                }
                className="w-32 h-32 rounded-full object-cover mb-4"
                alt={expert.fullName}
              />
              
              <div className="text-center">
                <h4 className="font-semibold text-lg mb-2 font-mono">{expert.fullName}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {expert.bio !== '----' ? expert.bio : null}

                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
