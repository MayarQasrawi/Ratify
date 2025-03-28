import React from 'react'
import { FaCertificate } from "react-icons/fa";
import { GiTargetShot } from "react-icons/gi";
import Title from '../shared/Title';

const outcomes = [
  { icon: "&#127891;", text: "Certificate" },
  { icon: "&#127919;", text: "Enhanced Technical Knowledge" },
  { icon: "&#127919;", text: "Soft Skills Development" },
  { icon: "&#127919;", text: "Portfolio Enhancement" },
  { icon: "&#127919;", text: "Feedback-Driven Improvement" },
  { icon: "&#127919;", text: "Lifelong Learning Mindset" },
];
export default function Outcome() {
  return (
    <section  className="mt-20 w-[90%] mx-auto">
     <div className='flex items-center gap-2'>  
      <Title>Outcomes</Title>
      <div className='w-full border-t-2 border-[var(--main-color)]'></div>
      </div> 
      <div className="grid  mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {outcomes.map((item, index) => (
          <div key={index} className="flex items-center  flex-wrap gap-1.5 p-3 bg-white shadow-md rounded-lg p-x-4 py-8">
            <span className="text-blue-500 text-2xl" dangerouslySetInnerHTML={{ __html: item.icon }}></span>
            <span className="ml-2 font-medium text-[#2A5C8A]">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
