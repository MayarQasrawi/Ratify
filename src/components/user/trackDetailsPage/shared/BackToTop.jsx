import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import the arrow icon

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down the height of the screen
  const toggleVisibility = () => {
    if (window.scrollY >= window.innerHeight) {
     console.log("scroallY",window.scrollY );
     console.log("innerHeight",window.innerHeight );

      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Add a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-8 right-8 p-3 bg-blue-500  z-40 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
};

export default BackToTop;