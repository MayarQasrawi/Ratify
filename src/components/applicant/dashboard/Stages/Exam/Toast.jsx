import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";

function Toast ({ id, message, type, onClose }){
  const bgClass = type === "success" ? "bg-green-500" : "bg-red-500";
  const Icon = type === "success" ? AiOutlineCheckCircle : AiOutlineCloseCircle;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${bgClass}`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={() => onClose(id)} className="ml-auto">
        <AiOutlineClose size={16} />
      </button>
    </div>
  );
};

export default Toast;
