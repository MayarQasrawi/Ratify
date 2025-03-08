import React from "react";
import Lottie from "lottie-react";
import person from "../assets/img/animation/person.json";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <>
      <div className="absolute h-screen w-[100%] rotate-[-8deg] mt-[-180px] z-0  rounded-[80px] overflow-x-hidden bg-blue-50 "></div>
      <section className="flex  justify-between w-screen  items-center min-h-screen mx-8 z-1 pt-19 p-9 ">
        <article className="flex1   md:w-2/3 text-center md:text-left z-1 ">
          <motion.h1
            className="text-4xl  md:text-5xl font-bold text-[#003F7DDE] mb-6"
            initial={{ opacity: 0, y: -50 }} // Start hidden and 50px above
            animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} // Smooth easing
          >
            <span className="text-[#3B82F6]">Evaluate</span> Your Skills
            <br />
            <span className="text-[#3B82F6]">Discover</span> Your True Potential
          </motion.h1>

          <p className="text-lg text-gray-700 mb-8 ">
            Get certified and take the next step toward success.{" "}
          </p>
          <button className="bg-[#003F7DDE] text-white w-48 font-bold py-3 cursor-pointer rounded-lg hover:bg-[#3B82F6] transition duration-300">
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
    </>
  );
}

export default HeroSection;
