import React from "react";
import Card from "./Card";
import why1 from "../../../../assets/img/why1.png";
import why2 from "../../../../assets/img/why2.png";
import why3 from "../../../../assets/img/why3.png";
import { motion } from "framer-motion";
import Button from "../../shared/Button";
import Title from "../../shared/Title";
function HomePage() {
  const why = [
    {
      header: "Bridge the Gap",
      text: "University education often misses the mark in aligning with industry demands.",
      image: why1, // Replace with your image URL
    },
    {
      header: "Know Your Level",
      text: "Avoid surprises—get an honest assessment of your skills.",
      image: why2, // Replace with your image URL
    },
    {
      header: "Seize Opportunities",
      text: "Identify gaps, improve, and stand out to employers.",
      image: why3, // Replace with your image URL
    },
  ];

  return (
    <div className="min-h-[70%]  m-0 overflow-x-hidden">
      <div className="   items-center">
        
        <div
          className=" mb-20 text-center" // Animation duration and delay
        >
         <Title first="  Why Choose Our Platform?"/>
        </div>

        <section className="flex flex-wrap items-center justify-center gap-20 p-6 mb-8">
          {why.map((item, index) => (
            <Card
              key={index}
              header={item.header}
              text={item.text}
              image={<img src={item.image} alt="image" />}
            />
          ))}
        </section>

        <div className="text-center">

       
          <button className="hover:bg-[var(--main-color)] text-white cursor-pointer px-8 py-3 m-20 rounded-4xl  font-bold text-sm bg-[var(--secondary-color)] transition duration-300 shadow-lg hover:shadow-xl">
            Start your journey to success today!
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
