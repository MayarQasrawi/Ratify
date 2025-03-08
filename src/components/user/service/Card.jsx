import React from "react";

function Card({ header, text, image }) {
  return (
    <div className="bg-white p-6 w-80 h-64 rounded-lg shadow-md max-w-sm text-center  flex-col cursor-pointer transform transition-all duration-300 hover:rotate-2 hover:scale-105 hover:shadow-xl">
      <div className="h-32">
        <h2 className="text-2xl  font-bold  text-[#003F7DDE]  mb-4 ">
          {header}
        </h2>

        <p className="text-gray-600">{text}</p>
      </div>

      <div className="w-32 h-32 rounded-full bg-[#3B82F6] m-auto flex item-center overflow-hidden mt-4 text-center  ">
        <div className="w-20 h-20  m-auto">{image}</div>
        {/* {className="w-full h-full object-cover} */}
      </div>
    </div>
  );
}

export default Card;
