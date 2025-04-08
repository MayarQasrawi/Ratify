import React from "react";
import Lottie from "lottie-react";
import person from "../../../assets/img/animation/person.json";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate=useNavigate()
  return (
    <div>
      <div className="absolute  h-screen  w-[105%] md:rotate-[-5deg] rotate-[-4deg] mt-[-180px]  md:mt-[-200px]  z-0  ml-2  rounded-[80px] overflow-hidden  bg-radial-[at_100%_75%]   from-blue-50 to-blue-100 "></div>
      <section className="flex   justify-between w-screen items-center min-h-screen  mx-8 z-2  md:p-9 ">
        <article className="flex1 w-[100%]   md:w-2/3  md:text-left z-1 ">
          <motion.h1
            className="text-3xl  lg:text-5xl font-bold text-[#003F7DDE] md:mb-6 mb-2"
            initial={{ opacity: 0, y: -50 }} // Start hidden and 50px above
            animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} // Smooth easing
          >
            <span className="text-[#3B82F6]">Evaluate</span> Your Skills
            <br />
            <span className="text-[#3B82F6]">Discover</span> Your True Potential
          </motion.h1>

          <p className="text-lg text-gray-700 md:mb-8  mb-4">
            Get certified and take the next step toward success.{" "}
          </p>
          <button onClick={()=>navigate('/our-tracks')} className="bg-[#003F7DDE] text-white md:w-48 w-32 font-bold py-3 cursor-pointer rounded-lg hover:bg-[#3B82F6] transition duration-300">
            Join Us
          </button>
        </article>

        <div className="flex1   hidden md:block md:w-1/3 mr-10 ">
          <Lottie
            animationData={person}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
