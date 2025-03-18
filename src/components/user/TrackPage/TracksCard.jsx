import React from 'react';
import { BiShowAlt } from "react-icons/bi";
import Button from '../trackDetailsPage/shared/Button';

function TracksCard({ header, description, img }) {
  return (
    <div className='h-105 '>
<div className="flex flex-col gap-0 max-w-sm rounded-lg bg-[#2A5C8A] items-center text-center justify-center w-78 h-80 p-6 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      
      <div className="mt-20">
        {img}
      </div>

      <div className="bg-white text-xl w-72 h-48 rounded-lg p-4 mt-4">
        <div className="h-24 items-center">
          <h1 className="font-bold">{header}</h1>
          <p className="text-gray-600 text-sm ">
            {description}
          </p>
        </div>

        <div className="mt-4">
          <a href="#" className="text-[#3B82F6]  text-sm border-1 items-center border-[#3B82F6] py-1 px-4 rounded-lg hover:border-[#2A5C8A] hover:text-[#2A5C8A]">
            Details <BiShowAlt className="inline text-xl" />
          </a>
          <div className="mt-4">
            <Button  />
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default TracksCard;